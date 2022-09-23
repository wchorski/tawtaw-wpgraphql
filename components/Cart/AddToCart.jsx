import { isEmpty } from 'lodash';
import { addToCart } from 'utils/cart';
import { useContext, useState } from 'react';
import { AppContext } from 'components/Context';
import Link from 'next/link';
import cx from 'classnames';

const AddToCart = ( { product } ) => {
	
	const [ cart, setCart ] = useContext( AppContext );
	const [ isAddedToCart, setIsAddedToCart ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	const addToCartBtnClasses = cx(
		'btn',
		{
			'notLoading': ! loading,
			'isLoading': loading,
		},
	);
	
	if ( isEmpty( product ) ) {
		return null;
	}
	
	return (
		<>
			<button
				className={ addToCartBtnClasses }
				onClick={ () => addToCart( product?.id ?? 0, 1, setCart, setIsAddedToCart, setLoading ) }
				disabled={ loading }
			>
				{ loading ? 'Adding...' : 'Add to cart' }
			</button>
			{ isAddedToCart && ! loading ? (
				<Link href="/cart">
					<a
						className="btn"
					>
						View cart
					</a>
				</Link>
			) : null }
		</>
	);
};

export default AddToCart;