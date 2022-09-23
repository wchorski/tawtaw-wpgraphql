// import React from 'react'
import  {LayoutCoffeeBreak}  from "components/Layouts";
import { useRouter } from "next/router";
import axios  from "axios";
import  Image  from "components/Image";

export default function ProductSingle( {product} ){

  const {name, type, images, description, price_html} = product 

  const img = images?.[0] ?? {};


  const typeSwitch = (type) => {

    switch(type){
      case 'subscription':
        return 'Subscription'
      case 'simple':
        return 'one time purchase'
      default:
        
    }
  }
  
  return (
    <LayoutCoffeeBreak>
      <section>


        <div>
          <Image
            sourceUrl={ img?.src ?? '' }
            altText={ img?.alt ?? ''}
            title={ name ?? '' }
            width="380"
            height="380"
            />
        </div>

        <h1>{name}</h1>

        <div>
          <span>{typeSwitch(type)}</span>
          |
          <span dangerouslySetInnerHTML={{__html: price_html}} style={{background: "green"}} />
        </div>
        <div dangerouslySetInnerHTML={{__html: description}} style={{border: "solid white 1px"}}/>

      </section>
    </LayoutCoffeeBreak>
  )
}

export async function getStaticPaths(){

  const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`)                                               

  const paths = res.data.map(product => {
    return {
      params: {
        id: product.id.toString()
      }
    }
  })

  return {
    paths: paths,
    fallback: false
  }
}


export async function getStaticProps(context){

  const id = context.params.id
  const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API}/wp-json/wc/v3/products/${id}?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`)

  return {
    props: { product: res.data}
  }
}
