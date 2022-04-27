import React from 'react'

import * as S from './Layout.styled'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <S.Container>{children}</S.Container>
}

export default Layout
