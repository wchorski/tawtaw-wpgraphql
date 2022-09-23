import Head from 'next/head'
// import Footer from '../components/Footer'
import { getPostByUri } from 'utils/test-data';
import { client } from "utils/apollo";
import { gql } from "@apollo/client";
import { FaPencilAlt, FaCalendarAlt } from "react-icons/fa";

export default function SlugPage({ post }) {

  return (
    <div>
      <Head>
        <title>Headless uri WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
          <div className="siteHeader">
            <h1 className="title">
                {post.title}
            </h1>
            <span>
              <FaPencilAlt />
              {`${post.author.node.firstName} ${post.author.node.lastName}`} 
              | 
              <FaCalendarAlt />
              { new Date(post.date).toLocaleDateString() }
            </span>
          </div>
            <article dangerouslySetInnerHTML={{__html: post.content}}>   
            </article>
      </main>

      {/* <Footer></Footer> */}

    </div>
  )
}


export async function getStaticProps({ params }){
  
  const GET_POST_BY_URI = gql`
  query GetPostByURI($id: ID!) {
    post(id: $id, idType: URI) {
      title
      content
      date
      uri
      author {
        node {
          firstName
          lastName
          nickname
          name
          avatar {
            url
          }
        }
      }
    }
  }
  `

  // const response = await getPostByUri(params.uri)
  const response = await client.query({
    query: GET_POST_BY_URI,
    variables: {
      id: params.uri
    }
  })


  const post = response?.data?.post
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths(){

  // add most popular links to below array "[/home, /store]". This cashes the pages
  const paths = []
  return {
    paths,
    fallback: 'blocking'
  }
}