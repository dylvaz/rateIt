import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import CompanyFinder from '../apis/CompanyFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
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
      {selectedCompany.company && (
        <>
          <h1
            className='fw-lighter display-1 text-center'
            style={{ paddingTop: '30px' }}
          >
            {selectedCompany.company.name}
          </h1>
          <div className='text-center display-6 m-3'>
            <StarRating rating={selectedCompany.company.average_rating} />
            <span className='text-warning mx-2' style={{ fontSize: '0.6em' }}>
              {selectedCompany.company.average_rating ?? 0}
            </span>
          </div>
          <div className='container-fluid'>
            <Reviews reviews={selectedCompany.reviews} />
            <AddReview id={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
