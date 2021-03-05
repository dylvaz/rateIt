import React, { useContext, useEffect } from 'react';

import CompanyFinder from '../apis/CompanyFinder';
import { CompaniesContext } from '../context/CompaniesContext';

const CompanyList = () => {
  const { companies, setCompanies } = useContext(CompaniesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get('/');
        setCompanies(response.data.data.companies);
      } catch (err) {}
    };
    fetchData();
  }, [setCompanies]);

  return (
    <div className='container-xxl'>
      <div className='list-group' style={{ marginTop: '20px' }}>
        <table className='table table-dark table-hover'>
          <thead>
            <tr className='table-info'>
              <th scope='col'>Company</th>
              <th scope='col'>Location</th>
              <th scope='col'>Price Range</th>
              <th scope='col'>Ratings</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {companies &&
              companies.map((company) => {
                return (
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.location}</td>
                    <td>{'$'.repeat(company.price_range)}</td>
                    <td>Reviews</td>
                    <td>
                      <button className='btn btn-danger'>Update</button>
                    </td>
                    <td>
                      <button className='btn btn-danger'>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
