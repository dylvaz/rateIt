import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CompanyFinder from '../apis/CompanyFinder';
import { CompaniesContext } from '../context/CompaniesContext';

const CompanyList = (props) => {
  const { companies, setCompanies } = useContext(CompaniesContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get('/');
        setCompanies(response.data.data.companies);
      } catch (err) {}
    };
    fetchData();
  }, [setCompanies]);

  const deleteEntry = async (id, name) => {
    try {
      if (
        window.confirm(
          `Are you sure you want to delete ${name} and it's reviews?`
        )
      ) {
        await CompanyFinder.delete(`/${id}`);
        setCompanies(companies.filter((company) => company.id !== id));
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateLink = (id) => {
    history.push(`/companies/${id}/update`);
  };

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
                      <button
                        className='btn btn-warning'
                        onClick={() => {
                          updateLink(company.id);
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          deleteEntry(company.id, company.name);
                        }}
                      >
                        Delete
                      </button>
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
