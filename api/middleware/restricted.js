


const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../../config/index.js")

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    res.status(401).json("token required")
  }else{
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
      if(err){
        res.status(401).json("token invalid: " + err.message)
      }else{
        req.decodedToken = decoded
        next()
      }
    })
  }

};


  
