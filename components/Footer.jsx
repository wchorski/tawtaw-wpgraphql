/**
 * Internal Dependencies.
 */
import {sanitize} from 'utils/sanitize';
import { getIconComponentByName } from 'utils/icons-map';
import {StyledFooter} from 'styles/Footer.styled'
// import {AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram, AiFillYoutube} from 'react-icons/ai'
 
/**
* External Dependencies.
*/
import {isEmpty, isArray} from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
 
const Footer = ({data}) => {
   
  const { copyrightText, edges: footerMenuItems, sidebarOne, sidebarTwo, socialLinks } = data || {};
  const [isMounted, setMount] = useState(false);
  
  
  useEffect(() => {
    setMount(true);
  }, []);
  
  return (
    
    <StyledFooter className="menu-footer">
    <div className="inner-cont">

      <nav>
        <div className="widgets-cont">
          
          { isMounted ? (
            <>
              {/*Widget One*/}
              <div>
                <div dangerouslySetInnerHTML={{ __html: sanitize( sidebarOne ) }}/>
              </div>
              {/*Widget Two*/}
              <div>
                <div dangerouslySetInnerHTML={{ __html: sanitize( sidebarTwo ) }}/>
              </div>
            </>
          ) : null}
          
          {/*	Footer Menus*/}
          { !isEmpty( footerMenuItems ) && isArray( footerMenuItems ) ? (
            <ul className="menu foot">
              { footerMenuItems.map( menuItem => (
                <li key={menuItem?.node?.id}>
                  <Link href={menuItem?.node.url ?? '/'}>
                    <a dangerouslySetInnerHTML={{ __html: sanitize( menuItem?.node.label ) }} />
                  </Link>
                </li>
              )) }
            </ul>
          ) : null  }

        </div>

        <div >
          { !isEmpty( socialLinks ) && isArray( socialLinks ) ? (
            <ul className="socialLinks-cont">
              { socialLinks.map( socialLink => (
                <li key={socialLink?.iconName}>
                  <a href={ socialLink?.iconUrl || '/' } target="_blank" rel="noreferrer" title={socialLink?.iconName} className="socialLink">
                    { 
                      getIconComponentByName( socialLink?.iconName ) 
                    }
                    <span className="hidden">{socialLink?.iconName}</span>
                  </a>
                </li>
              ) ) }
            </ul>
          ) : null }
        </div>
      </nav>

    </div>
      {/*Copyright Text*/}
      <div className="copyrightText">
        <span style={{opacity: '.4'}}> 
          { 
            copyrightText 
              ? <span style={{opacity: '.4'}}> {copyrightText} </span>
              : <span style={{opacity: '.4'}}> © Copy Right 2022 </span>
          }
        </span> 
      </div>
    </StyledFooter>
  )
}
 
 export default Footer;