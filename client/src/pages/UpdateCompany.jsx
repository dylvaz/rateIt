import React from 'react';

import UpdateForm from '../components/UpdateForm/UpdateForm';

const UpdateCompany = () => {
  return (
    <>
      <h1
        className='fw-lighter display-1 text-center'
        style={{ paddingTop: '30px' }}
      >
        Update Company
      </h1>
      <hr style={{ marginBottom: '30px' }}></hr>
      <UpdateForm />
    </>
  );
};

export default UpdateCompany;
