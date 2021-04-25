const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:6437',
      changeOrigin: true,
    })
  );
  console.log("proxy started?");
};
