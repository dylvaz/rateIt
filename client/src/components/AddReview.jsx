import React, { useState } from 'react';
import { useHistory } from 'react-router';

import CompanyFinder from '../apis/CompanyFinder';

const AddReview = ({ id }) => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    body: '',
    rating: 'Rating',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await CompanyFinder.post(`/${id}/reviews`, {
        name: values.name,
        body: values.body,
        rating: values.rating,
      });
      setValues({
        name: '',
        body: '',
        rating: 'Rating',
      });
      history.go(0);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className='mb-2'>
      <form
        className='container-md'
        onSubmit={onSubmit}
        style={{ fontSize: '1.5em' }}
      >
        <div className='row g-3'>
          <div className='col-8 mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              name='name'
              placeholder='Name'
              type='text'
              className='form-control'
              value={values.name}
              onChange={onChange}
            />
          </div>
          <div className='col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              className='form-select'
              name='rating'
              value={values.rating}
              onChange={onChange}
            >
              <option value='Rating' disabled>
                Rating
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='Review'>Review</label>
          <textarea
            id='body'
            className='form-control'
            name='body'
            value={values.body}
            onChange={onChange}
          ></textarea>
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <button type='submit' className='btn btn-primary btn-lg px-5 '>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
