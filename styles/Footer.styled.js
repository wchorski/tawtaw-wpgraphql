import styled from "styled-components"

export const StyledFooter = styled.footer`

  background-color: var(--c-2);


  * {
    transition: .3s;
  }

  a{
    &:hover{
      opacity: .7;
    }
  }

  nav{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  ul.menu{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    &.foot {
      a{
        padding: 0 .3em;
        /* border-right: solid var(--c-bg) 1px; */

        &:before {
          content: "~";
          font-size: 20px;
          left: 0;
          color: var(--c-bg);
          display: inline-block;
          padding-right: 5px;
        }
      }
      li:first-child > a::before{
        /* background-color: blue; */
        content: 'ㅤ';
        display: inline-block;
      }
    }
  }

  ul.socialLinks-cont{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .socialLink{
    position: relative;

    padding: 1em;
    svg{
      font-size: 30px;
    }

    span{
      position: absolute;
      top: 0;
      left: 0;
    }

    &:hover{
      span{
        visibility: visible;
        opacity: 1;
        top: -35%;
        left: 0;
      }
    }
  }

  .copyrightText {
    background-color: var(--c-bg);
    display: flex;
    justify-content: center;
    padding: .5em 0;
  }

`