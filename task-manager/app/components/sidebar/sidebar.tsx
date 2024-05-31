"use client"

import React from 'react'
import styled from 'styled-components'
import { useGlobalState } from "@/app/context/globalProvider";

const Sidebar = () => {

  const { theme } = useGlobalState();


  return (
    <SidebarStyled style={Sidebar} theme={theme}>Sidebar</SidebarStyled>
  )
}

const SidebarStyled = {
  width: `${(props: { theme: { sidebarWidth: any; }; }) => props.theme.sidebarWidth}`
  
}

export default Sidebar