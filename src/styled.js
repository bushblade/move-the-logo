import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
 * {
   box-sizing: border-box;
 }
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: lightblue;
  }
`
export const HiddenInput = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
`
export const Arena = styled.div`
  width: 90vw;
  height: 90vh;
  margin: auto;
  background: whitesmoke;
`
