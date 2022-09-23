import React from 'react'
import axios  from "axios";

export default function ProductSingle({product}){


  console.log(product);
  
  return (
    <div>ProductSingle</div>
  )
}


export async function getStaticProps({ params }){
  const {data: product} = await axios.get(`${process.NEXT_PUBLIC_WP_API}/wp-json/wc/v3/products/${params.permalink}?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`)

  return{
    props: {
      product: product,
    }
  }
}

export async function getStaticPaths(){

  // add most popular links to below array "[/propduct/1, etc]"
  const paths = []
  return {
    paths,
    fallback: 'blocking'
  }
}