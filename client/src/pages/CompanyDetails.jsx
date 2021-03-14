import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import CompanyFinder from '../apis/CompanyFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import { CompaniesContext } from '../context/CompaniesContext';

const CompanyDetails = () => {
  const { selectedCompany, setSelectedCompany } = useContext(CompaniesContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get(`/${id}`);
        setSelectedCompany(response.data.data);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
  }, [id, setSelectedCompany]);

  return (
    <div>
      <h1
        className='fw-lighter display-1 text-center'
        style={{ paddingTop: '30px' }}
      >
        {selectedCompany.company.name}
      </h1>
      {selectedCompany && (
        <>
          <div className='container-fluid'>
            <Reviews reviews={selectedCompany.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
