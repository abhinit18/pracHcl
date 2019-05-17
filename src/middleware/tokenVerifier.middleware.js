const jwt = require('jsonwebtoken');

const tokenVerifier = (request, response, next) => {
    console.log(request);
 const token = request.headers['x-access-token'];

 if (!token) {
   return response.status(500).json({authentication: false, message: 'No token provided.'});
 }

 jwt.verify(token, process.env.APP_SECRET, (error) => {
   if (error) {
     return response.status(500).json({authentication: false, message: 'Failed to authenticate token.'});
   }

   next();
 });
}

module.exports = tokenVerifier;


