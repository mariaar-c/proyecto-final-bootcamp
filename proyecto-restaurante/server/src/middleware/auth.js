const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
  try {
      let token = req.header("Authorization");

      if(!token){
        return res.status(403).json({message:"Access Denied"});
      }
      
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      console.log(req.user);

      next();
      
  } catch (err) {
      res.status(500).json({error: err.message});
  }
}

module.exports = { verifyToken };