import React, { lazy, Suspense } from "react";
import { Layout } from "antd";
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from "./pages/sharedComponents/header";
import ErrorHandler from "./pages/sharedComponents/ErrorHandler";
import Progress from "./pages/sharedComponents/Progress";

import styled from "styled-components";
import 'antd/dist/antd.css'

const CustomerLists = lazy(() => import("./pages/Customer"));
const NewCustomerPage = lazy(() => import("./pages/Customer/new"));
const ShowCustomerPage = lazy(() => import("./pages/Customer/show"));
const EditCustomerPage = lazy(() => import("./pages/Customer/edit"));

function App() {
  return (
    <StyledLayout>
      <Header/>
      <Wrapper>
        <ErrorHandler>
          <Router/>
        </ErrorHandler>
      </Wrapper>
    </StyledLayout>
  );
}

const Router = () => {
  return (
    <Suspense fallback={<Progress />}>
      <Switch>
        <Route exact path="/" component={CustomerLists} />
        <Route exact path="/customers" component={CustomerLists} />
        <Route exact path="/customers/new" component={NewCustomerPage} />
        <Route exact path="/customers/:id" component={ShowCustomerPage} />
        <Route exact path="/customers/:id/edit" component={EditCustomerPage} />
      </Switch>
    </Suspense>
  );
};


const StyledLayout = styled(Layout)`
  background: white;
  .fixed-header {
    top: 0px !important;
  }
  margin-top: 0px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  margin: auto;

  h1 {
    justify-content: center;
    display: flex;
    b {
      margin-left: 5px;
    }
  }
`;

export default App;
