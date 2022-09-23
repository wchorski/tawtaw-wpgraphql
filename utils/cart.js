import { getSession, storeSession } from './cart-session';
import { getApiCartConfig } from './cart-api';
import axios from 'axios';
import { WC_CART } from 'utils/endpoints';
import { isEmpty, isArray } from 'lodash';

/**
 * Add To Cart Request Handler.
 *
 * @param {int} productId Product Id.
 * @param {int} qty Product Quantity.
 * @param {Function} setCart Sets The New Cart Value
 * @param {Function} setIsAddedToCart Sets A Boolean Value If Product Is Added To Cart.
 * @param {Function} setLoading Sets A Boolean Value For Loading State.
 */
export const addToCart = async ( productId, qty = 1, setCart, setIsAddedToCart, setLoading ) => {
	const storedSession = getSession();
	const addOrViewCartConfig = getApiCartConfig();
	
	setLoading(true);

  // TODO HELP -- using enpoints in POST MAN works as it should, but not here
	axios.post( WC_CART, {
			product_id: productId,
			quantity: qty,
		},
		addOrViewCartConfig,
	)
		.then( ( res ) => {

      
      if ( isEmpty( storedSession ) ) { storeSession( res?.headers?.[ 'x-wc-session' ] ) }
      
			setIsAddedToCart(true)
			setLoading(false)
      console.log('axios.post req.data: ', res?.data);
			viewCart( setCart ) 
		} )
		.catch( err => {
			console.warn( 'err', err )
		} );
};

/**
 * View Cart Request Handler
 *
 * @param {Function} setCart Set Cart Function.
 * @param {Function} setProcessing Set Processing Function.
 */
export const viewCart = async ( setCart, setProcessing = () => {} ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	axios.get( WC_CART, addOrViewCartConfig )
		.then( ( res ) => {


      // TODO HELP -- This is returning 'null'
      console.log('axios.get Cart: ', res);

			const formattedCartData = getFormattedCartData( res?.data ?? [] )
			setCart( formattedCartData );
			setProcessing(false);
		} )
		.catch( err => {
			console.log( 'err', err );
			setProcessing(false);
		} );
};

/**
 * Update Cart Request Handler
 */
export const updateCart = ( cartKey, qty = 1, setCart, setUpdatingProduct ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	setUpdatingProduct(true);
	
	axios.put( `${WC_CART}${cartKey}`, {
		quantity: qty,
	}, addOrViewCartConfig )
		.then( ( res ) => {
			viewCart( setCart, setUpdatingProduct );
		} )
		.catch( err => {
			console.log( 'err', err );
			setUpdatingProduct(false);
		} );
};

/**
 * Delete a cart item Request handler.
 *
 * Deletes all products in the cart of a
 * specific product id ( by its cart key )
 * In a cart session, each product maintains
 * its data( qty etc ) with a specific cart key
 *
 * @param {String} cartKey Cart Key.
 * @param {Function} setCart SetCart Function.
 * @param {Function} setRemovingProduct Set Removing Product Function.
 */
export const deleteCartItem = ( cartKey, setCart, setRemovingProduct ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	setRemovingProduct(true);
	
	axios.delete( `${WC_CART}${cartKey}`, addOrViewCartConfig )
		.then( ( res ) => {
			viewCart( setCart, setRemovingProduct );
		} )
		.catch( err => {
			console.log( 'err', err );
			setRemovingProduct(false);
		} );
};

/**
 * Clear Cart Request Handler
 *
 * @param {Function} setCart Set Cart
 * @param {Function} setClearCartProcessing Set Clear Cart Processing.
 */
export const clearCart = async ( setCart, setClearCartProcessing ) => {
	
	setClearCartProcessing(true);
	
	const addOrViewCartConfig = getApiCartConfig();
	
	try {
		const response = await axios.delete( WC_CART, addOrViewCartConfig );
		viewCart( setCart, setClearCartProcessing );
	} catch ( err ) {
		console.log( 'err', err );
		setClearCartProcessing(false);
	}
};

/**
 * Get Formatted Cart Data.
 *
 * @param cartData
 * @return {null|{cartTotal: {totalQty: number, totalPrice: number}, cartItems: ({length}|*|*[])}}
 */
const getFormattedCartData = ( cartData ) => {
	if ( ! cartData.length ) {
		return null;
	}
	const cartTotal = calculateCartQtyAndPrice( cartData || [] );
	return {
		cartItems: cartData || [],
		...cartTotal,
	};
};

/**
 * Calculate Cart Qty And Price.
 *
 * @param cartItems
 * @return {{totalQty: number, totalPrice: number}}
 */
const calculateCartQtyAndPrice = ( cartItems ) => {
	const qtyAndPrice = {
		totalQty: 0,
		totalPrice: 0,
	}
	
	if ( !isArray(cartItems) || !cartItems?.length ) {
		return qtyAndPrice;
	}
	
	cartItems.forEach( (item, index) => {
		qtyAndPrice.totalQty += item?.quantity ?? 0;
		qtyAndPrice.totalPrice += item?.line_total ?? 0;
	} )
	
	return qtyAndPrice;
}