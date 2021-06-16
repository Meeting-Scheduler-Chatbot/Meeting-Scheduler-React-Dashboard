import React from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {
  HeaderMockUp,
  NavHeaderMockUp,
  NavContentMockUp,
  //ContentMockUp,
  FooterMockUp,
} from '@mui-treasury/mockup/layout';
import {
  Root,
  getHeader,
  getContent,
  getDrawerSidebar,
  getSidebarContent,
  getFooter,
  getSidebarTrigger,
  getCollapseBtn,
  getMuiTreasuryScheme,
} from '@mui-treasury/layout';

import NavHeader from './DrawerHeader/drawerHeader'
import NavContent from './DrawerContent/drawerContent'

const Header = getHeader(styled);
const Content = getContent(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarContent = getSidebarContent(styled);
const Footer = getFooter(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const CollapseBtn = getCollapseBtn(styled);

const muiTreasuryScheme = getMuiTreasuryScheme();

const MuiTreasuryLayout = (props) => {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Root scheme={muiTreasuryScheme}>
        {({ state: { sidebar } }) => (
          <>
            <Header>
              <Toolbar>
                <SidebarTrigger sidebarId="primarySidebar" />
                {/* <HeaderMockUp /> */}
                <h1>APPA</h1>
              </Toolbar>
            </Header>
            <DrawerSidebar sidebarId="primarySidebar">
              <SidebarContent>
                <NavHeader collapsed={sidebar.primarySidebar.collapsed} />
                {/* <NavHeaderMockUp collapsed={sidebar.primarySidebar.collapsed} /> */}
                <NavContent />
                {/* <NavContentMockUp /> */}
              </SidebarContent>
              <CollapseBtn />
            </DrawerSidebar>
            <Content>
              {props.content}
            </Content>
            {/* <Footer>
              <FooterMockUp />
            </Footer> */}
          </>
        )}
      </Root>
    </StylesProvider>
  );
};


export default MuiTreasuryLayout;