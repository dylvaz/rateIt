import React from 'react';

import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
  return (
    <div className='container-md'>
      <div className='row'>
        {reviews &&
          reviews.map((review) => {
            return (
              <div className='col-4' key={review.id}>
                <div className='card text-white bg-primary mb-3'>
                  <div className='card-header d-flex justify-content-between'>
                    <span>{review.name}</span>
                    <span>
                      <StarRating rating={review.rating} />
                    </span>
                  </div>
                  <div className='card-body'>
                    <p className='card-text'>{review.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Reviews;
