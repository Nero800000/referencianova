const jwt = require("jsonwebtoken");

// middleware to validate token
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token)


  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const verified = jwt.verify(token,"Secreat");
    console.log("Minha verificação",verified)
    req.user = verified
    
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ message: "Token invalido!!" });
  }
};

module.exports = checkToken;