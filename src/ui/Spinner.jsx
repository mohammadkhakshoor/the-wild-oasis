import styled, { keyframes } from "styled-components";

const rotateme = keyframes`
0% {
      inset: 0 28px 28px 0;
    }
    12.5% {
      inset: 0 28px 0 0;
    }
    25% {
      inset: 28px 28px 0 0;
    }
    37.5% {
      inset: 28px 0 0 0;
    }
    50% {
      inset: 28px 0 0 28px;
    }
    62.5% {
      inset: 0 0 0 28px;
    }
    75% {
      inset: 0 0 28px 28px;
    }
    87.5% {
      inset: 0 0 28px 0;
    }
    100% {
      inset: 0 28px 28px 0;
    }
`;

const Spinnerme = styled.div`
  width: 52px;
  aspect-ratio: 1;
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50px;
    box-shadow: 0 0 0 3px inset #516843;
    animation: ${rotateme} 2.5s infinite;
  }
  &:after {
    animation-delay: -1.25s;
  }
`;
export { Spinnerme };

/* 
const rotateme = keyframes`
  0% {
    transform: rotate(0deg);
  }
	100% {
    transform: rotate(360deg);
  }
`;  
*/

/* const Spinnerme = styled.div`
  background: transparent;
  width: 50px;
  height: 50px;
  border-top: 4.2px solid #789b62;
  border-right: 4.2px solid #789b62;
  border-bottom: 4.2px solid #789b62;
  border-left: 4.2px solid #f2ca91;
  border-radius: 50%;
  animation: ${rotateme} 0.4s linear infinite;
`; */

// export { Spinnerme };
