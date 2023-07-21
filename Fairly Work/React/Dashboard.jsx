import React from "react";
import { Outlet } from "react-router-dom";
import dashboardItems from "../components/sidebar/dashboardItems";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import PropTypes from "prop-types";

const Dashboard = ({ children, ...rest }) => (
  <React.Fragment>
    <Wrapper>
      <Sidebar items={dashboardItems} {...rest} />
      <Main>
        <Navbar />
        <Content>
          {children}
          <Outlet />
        </Content>
        <Footer />
      </Main>
    </Wrapper>
    <Settings />
  </React.Fragment>
);

Dashboard.propTypes = {
  children: PropTypes.shape({}),
};
export default Dashboard;
