import React, { useState } from 'react';

const AddCompany = () => {
  const [values, setValues] = useState({});

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='container-xl'>
      <form>
        <div className='row justify-content-start'>
          <div className='col'>
            <input
              className='form-control'
              type='text'
              placeholder='Name'
              value={values.username}
              onChange={onChange}
            />
          </div>
          <div className='col'>
            <input
              className='form-control'
              type='text'
              placeholder='Location'
              value={values.location}
              onChange={onChange}
            />
          </div>
          <div className='col'>
            <select
              className='form-select'
              defaultValue={'Price Range'}
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
