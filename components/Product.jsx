import Link from 'next/link';
import Image from 'components/Image';
// import Img from 'next/image';
import { sanitize } from 'utils/sanitize';
// import AddToCart from '../cart/add-to-cart';
import { isEmpty } from 'lodash';
import { StyledProduct } from 'styles/Product.styled';
import AddToCart from 'components/Cart/AddToCart'

const Product = ( { product } ) => {
	
	if ( isEmpty( product ) ) {
		return null;
	}
	
	const img = product?.images?.[0] ?? {};
  // const img = product?.og_image
	const productType = product?.type ?? '';
	
	return (
    <StyledProduct>
			<Link href={product?.permalink ?? '/'}>
				<a>
					<Image
						sourceUrl={ img?.src ?? '' }
						altText={ img?.alt ?? ''}
						title={ product?.name ?? '' }
						width="380"
						height="380"
					/>
          {/* <div className="img-frame">
            <img
              src={ img?.src ?? '' }
              alt={ img?.alt ?? ''}
              title={ product?.name ?? '' }
              width="380"
              height="380"
            />
          </div> */}

          <div className="namePrice-cont">
            <h6>{ product?.name ?? '' }</h6>
            <div className="price" dangerouslySetInnerHTML={{ __html: sanitize( product?.price_html ?? '' ) }}/>
          </div>
				</a>
			</Link>
			
			{ 
        'simple' === productType 
          ? <AddToCart product={product}/> 
          // ? <button>add 2 cart</button>  
          : null 
      }
		</StyledProduct>
	)
}


// BUTTONS


export default Product;