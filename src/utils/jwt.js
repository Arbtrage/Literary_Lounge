const jwt = require('jsonwebtoken');

const encode=(userId)=>{
    // Create a payload containing the user ID
  const payload = { id: userId };
    console.log(process.env.SECRET);
  // Sign the token with a secret key and set an expiration time
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1year' });

  return token;
}


module.exports={
    encode
}