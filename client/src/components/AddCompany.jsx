import React, { useContext, useState } from 'react';

import CompanyFinder from '../apis/CompanyFinder';
import { CompaniesContext } from '../context/CompaniesContext';

const AddCompany = () => {
  const { addCompany } = useContext(CompaniesContext);
  const [values, setValues] = useState({
    name: '',
    location: '',
    priceRange: 'Price Range',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CompanyFinder.post('/', {
        name: values.name,
        location: values.location,
        price_range: values.priceRange,
      });
      addCompany(response.data.data.company);
      setValues({
        name: '',
        location: '',
        priceRange: 'Price Range',
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className='container-xl'>
      <form onSubmit={onSubmit}>
        <div className='row justify-content-start'>
          <div className='col'>
            <input
              className='form-control'
              type='text'
              placeholder='Name'
              name='name'
              value={values.name}
              onChange={onChange}
            />
          </div>
          <div className='col'>
            <input
              className='form-control'
              type='text'
              placeholder='Location'
              name='location'
              value={values.location}
              onChange={onChange}
            />
          </div>
          <div className='col'>
            <select
              className='form-select'
              name='priceRange'
              value={values.priceRange}
              onChange={onChange}
            >
              <option value='Price Range' disabled>
                Price Range
              </option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <div className='col'>
            <button type='submit' className='btn btn-primary'>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCompany;
