import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import CompanyFinder from '../../apis/CompanyFinder';
import './UpdateForm.css';

const UpdateForm = (props) => {
  const { id } = useParams();
  let history = useHistory();

  const [values, setValues] = useState({
    name: '',
    location: '',
    priceRange: 'Price Range',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get(`/${id}`);
        setValues({
          name: response.data.data.company.name,
          location: response.data.data.company.location,
          priceRange: response.data.data.company.price_range,
        });
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await CompanyFinder.patch(`/${id}`, {
        name: values.name,
        location: values.location,
        price_range: values.priceRange,
      });
      history.push('/');
    } catch (err) {
      throw new Error(err);
    }
  };
  // TODO
  // fix the layout and implement
  return (
    <div className='container-md'>
      <form onSubmit={onSubmit}>
        <div>
          <div className='col-6 mb-2 offset-md-3'>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              className='form-control'
              type='text'
              value={values.name}
              onChange={onChange}
            />
          </div>
          <div className='col-6 mb-2 offset-md-3'>
            <label htmlFor='location'>Location</label>
            <input
              name='location'
              className='form-control'
              type='text'
              value={values.location}
              onChange={onChange}
            />
          </div>
          <div className='col-6 mb-2 offset-md-3'>
            <label htmlFor='priceRange'>Price Range</label>

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
          <div className='col d-flex justify-content-center m-4'>
            <button type='submit' className='btn btn-lg btn-primary'>
              Update Entry
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
