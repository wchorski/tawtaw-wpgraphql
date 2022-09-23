import { isArray, isEmpty } from 'lodash';
import Product from './ProductExerpt';
// import {StyledProduct} from 'styles/Product.styled';

export const Products = ({ products }) => {
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	
	return (
		<section className="products">
      
			{ products.length ? products.map( product => {
        return (
          <Product key={ product?.id } product={product} />
          )
        } ) : null }
    </section>

	)
}

// export default Products;