import styled from 'styled-components';

import colors from 'styles/colors'

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.85);
  color: ${colors.red};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
`