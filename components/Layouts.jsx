// import type { NextComponentType } from 'next'
// import { AppProvider } from './Context';
import { client } from "utils/apollo";
import { gql } from "@apollo/client";
import Header from './Header';
import Footer from './Footer';

export const LayoutCoffeeBreak = ({children, menus}, props) => {

  const { headerMenus, footerMenu } = menus || {};
  

  return (

    // <AppProvider>

    <div className="layout-cont">

      <Header data={headerMenus}/>

      <main>
        {children}
      </main>

      <Footer data={footerMenu}/>
      
    </div>

    // </AppProvider>
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
  // ---------------------->
  const {data: menusData} = await client.query( {query: GET_MENUS} )

  return{
    props: {
      menus: menusData
    }
  }
}

// export default LayoutCoffeeBreak