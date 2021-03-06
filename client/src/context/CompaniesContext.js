import React, { createContext, useState } from 'react';

export const CompaniesContext = createContext();

export const CompaniesContextProvider = (props) => {
  const [companies, setCompanies] = useState([]);
  return (
    <CompaniesContext.Provider value={{ companies, setCompanies }}>
      {props.children}
    </CompaniesContext.Provider>
  );
};
