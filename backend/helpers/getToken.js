

  const getToken = (req) => {
   const request =req.headers.authorization
  const token = request.split(" ")[1]
    
   return token
    

  }

  module.exports = getToken