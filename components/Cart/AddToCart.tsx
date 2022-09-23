import { useMutation, gql } from "@apollo/client";
import React, { useContext } from 'react';
import CartContext from 'utils/cart-context'


const AddToCart: React.FC<any> = ( { product } ) => {

  const [ addToCartMutation ] = useMutation( ADD_TO_CART );
  const {items, addToCart, removeFromCart} = useContext(CartContext);

  function handleAddToCart() {
    let id = product.databaseId;
    // add to cart on server
    // addToCartMutation( { variables: { input: { productId: id, quantity: 1, clientMutationId: '123' } } } );
    console.log(product);
    
    // save locally
    addToCart( product )
  }
  return (
    <button
      onClick={ () => handleAddToCart() }
    >
      Add to Cart GQL
    </button>
  )
}
const ADD_TO_CART = gql`
  mutation ATC($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        subtotal
        total
        shippingTotal
        contents {
          itemCount
          nodes {
            product {
              node {
                name
                sku
                databaseId
                ... on SimpleProduct {
                  price
                }
              }
            }
          }
        }
      }
    }
  }
`
export default AddToCart;