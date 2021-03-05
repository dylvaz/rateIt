import axios from 'redaxios';

export default axios.create({
  baseURL: 'http://localhost:1234/api/v1/companies',
});
