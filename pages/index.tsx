import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import axios from 'axios'
import { getAllPosts } from "utils/test-data";
import { client } from "utils/apollo";
import { gql } from "@apollo/client";
import  PostCard  from "components/PostCard";
import  {LayoutCoffeeBreak}  from "components/Layouts";
import { Products } from "components/Products";

const Home: NextPage = ({posts, menus, products}: any = []) => {

  return (

    <LayoutCoffeeBreak menus={menus || []} >
      <section>
        <Products products={products }/>
      </section>

      <section className="grid">
        { posts?.posts?.nodes?.map((post: any) => {
            return (
              <PostCard key={post.uri} post={post} />
            )
          }
        )}
      </section>

    </LayoutCoffeeBreak>
  )
}

export async function getStaticProps() {

  // ---------------------->
  const GET_MENUS = gql`
    query GET_MENUS {
      headerMenus: menuItems(where: {location: PRIMARY}) {
        edges {
          node {
            ...MenuItem
          }
        }
      }
      footerMenu: menuItems(where: {location: FOOTER}) {
        edges {
          node {
            ...MenuItem
          }
        }
      }
    }
    fragment MenuItem on MenuItem {
      id
      label
      url
      path
    }
  `

  // ------------------------>
  const GET_POSTS_EXRP = gql`
    query GetAllPosts {
      posts {
        nodes {
          title
          id
          uri
          date
          excerpt
        }
      }
    }
  `

  // ------------------------- >
  const GET_PRODUCTS = gql`
  query GetAllProducts {
    products {
      nodes {
        date
        id
        link
        name
        onSale
        purchasable
        image {
          altText
          sourceUrl
        }
      }
    }
  }
  `

  // ---------------------->
  // ---------------------->
  // ---------------------->
  const {data: menusData} = await client.query( {query: GET_MENUS} )
  const {data: postsData} = await client.query( {query: GET_POSTS_EXRP} )
  // const {data: productsData} = await client.query( {query: GET_PRODUCTS} )
  // const res = await getAllPosts()
  const { data: productsData } = await axios.get(`${ process.env.NEXT_PUBLIC_WP_API}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`)
  
  
  return{
    props: {
      menus: menusData,
      posts: postsData,
      products: productsData,
    }
  }
}

export default Home
