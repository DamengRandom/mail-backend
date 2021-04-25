require('dotenv').config();
const express = require('express');
const mailRouter = require('../routes/routes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 6437;

// middleware
// json format
app.use(express.json());
// router
app.use(mailRouter);
// cors
app.use(cors())
// proxy: for local development
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:6437',
    changeOrigin: true,
  })
);

// serve
app.listen(port, () => {
  console.log(`Mail server is running on port ${port} ..`);
});
