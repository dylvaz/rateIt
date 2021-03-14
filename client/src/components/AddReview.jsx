import React, { useState } from 'react';

const AddReview = () => {
  const [values, setValues] = useState({
    name: '',
    rating: 'Rating',
    review: '',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
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
              placeholder='Company Name'
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
            id='review'
            className='form-control'
            name='review'
            value={values.review}
            onChange={onChange}
          ></textarea>
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <button className='btn btn-primary btn-lg px-5 '>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
