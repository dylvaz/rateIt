import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import CompanyFinder from '../apis/CompanyFinder';
import { CompaniesContext } from '../context/CompaniesContext';

const CompanyDetails = () => {
  const { selectedCompany, setSelectedCompany } = useContext(CompaniesContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get(`/${id}`);
        setSelectedCompany(response.data.data.company);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
  }, [id, setSelectedCompany]);

  return <div>{selectedCompany && selectedCompany.name}</div>;
};

export default CompanyDetails;
