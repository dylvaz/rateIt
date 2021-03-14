const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const db = require('./db/');
const { errHandler, notFound } = require('./util/middlewares');

const app = express();
const port = process.env.PORT || 1234;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

//Get all companies
app.get('/api/v1/companies', async (req, res) => {
  try {
    const companyRatingsData = await db.query(
      'select * from companies left join (select company_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by company_id) reviews on companies.id = reviews.company_id'
    );
    res.status(200).json({
      results: companyRatingsData.rows.length,
      data: {
        companies: companyRatingsData.rows,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
});

//Get one company
app.get('/api/v1/companies/:id', async (req, res) => {
  try {
    const company = await db.query(
      'select * from companies left join (select company_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by company_id) reviews on companies.id = reviews.company_id where id = $1',
      [req.params.id]
    );

    const reviews = await db.query(
      'SELECT * FROM reviews WHERE company_id = $1',
      [req.params.id]
    );

    res.status(200).json({
      data: {
        company: company.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
});

//Create a review for a company
app.post('/api/v1/companies', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO companies (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      results: results.rows.length,
      data: {
        company: results.rows[0],
      },
    });
  } catch (err) {
    throw new Error(err);
  }
});

//Update a companies review
app.patch('/api/v1/companies/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE companies SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(201).json({
      results: results.rows.length,
      data: {
        company: results.rows[0],
      },
    });
  } catch (err) {
    throw new Error(err);
  }
});

//Delete a company review
app.delete('/api/v1/companies/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM companies WHERE id = $1', [req.params.id]);
    res.status(200).send('Succesfully deleted. 🚀');
  } catch (err) {
    throw new Error(err);
  }
});

//Adding a review
app.post('/api/v1/companies/:id/reviews', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO reviews (company_id, name, body, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.params.id, req.body.name, req.body.body, req.body.rating]
    );
    res.status(201).json({
      results: results.rows.length,
      data: {
        reviews: results.rows[0],
      },
    });
  } catch (err) {
    throw new Error(err);
  }
});

//More middlewares
app.use(notFound);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
