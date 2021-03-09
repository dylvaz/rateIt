import React, { createContext, useState } from 'react';

export const CompaniesContext = createContext();

export const CompaniesContextProvider = (props) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const addCompany = (company) => {
    setCompanies([...companies, company]);
  };
  return (
    <CompaniesContext.Provider
      value={{
        companies,
        setCompanies,
        addCompany,
        selectedCompany,
        setSelectedCompany,
      }}
    >
      {props.children}
    </CompaniesContext.Provider>
  );
};
