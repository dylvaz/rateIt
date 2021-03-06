import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CompaniesContextProvider } from './context/CompaniesContext';
import CompanyDetails from './pages/CompanyDetails';
import Home from './pages/Home';
import UpdateCompany from './pages/UpdateCompany';

const App = () => {
  return (
    <CompaniesContextProvider>
      <div
        style={{
          background: 'linear-gradient(360deg,#949494 10%,#efefef 360%)',
          width: '100vw',
          height: '100vh',
        }}
      >
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/companies/:id/update'
              component={UpdateCompany}
            />
            <Route exact path='/companies/:id' component={CompanyDetails} />
          </Switch>
        </Router>
      </div>
    </CompaniesContextProvider>
  );
};

export default App;
