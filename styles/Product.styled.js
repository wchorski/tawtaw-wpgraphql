import styled from "styled-components"

export const StyledProduct = styled.article`

  background-color: whitesmoke;
  background: linear-gradient(151deg,rgba(240,240,240,1) 0%,rgb(205 205 205) 91%,rgba(217,217,217,1) 100%);
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin: .3em;
  padding: 1em;
  box-shadow: black 1px 1p;

  width: 15em;
  height: auto;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .img-frame{
    /* background-color: blue; */
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;

    img{
      width: 80%;
      height: auto;
    }
  }

  .namePrice-cont{
    margin-bottom: 1em;
  }
  .price{
    color: black;
  }

  button{
    padding: 1em;
  }

`