import React from 'react';

import AddCompany from '../components/AddCompany';
import CompanyList from '../components/CompanyList';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <AddCompany />
      <CompanyList />
    </div>
  );
};

export default Home;
