
const User = require("../models/User")
const bcrypt = require("bcrypt")
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/getToken')
const jwt = require('jsonwebtoken')
const getUserByToken = require("../helpers/getUserByToken")

module.exports = class userController {
    static async viewData(req,res) {
        
       const {name,email,password, confirmpassword}=req.body

         if(!name) {
          return res.status(400).json({msg:"Digite um nome"})
         }

         if(!email) {
          return res.status(400).json({msg:"Digite um e-mail"})
         }

         if(!password) {
          return res.status(400).json({msg:"Digite uma senha"})
         }
         
         if(!confirmpassword) {
          return res.status(400).json({msg:"a confirmação da senha é obrigatoria"})
         }

         if(password != confirmpassword) {
          return res.status(400).json({msg:"As senhas prescisam ser iguais"})
    }
        // check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
          res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
          return
        }
          
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    const user = new User ({
      name,
      email,
      password:passwordHash,
    })

    try {
      const newUser = await user.save()

      createUserToken(newUser,req,res)
    } catch (error) {
       console.log(error)
    }   
   
    }

    static async login(req,res) {
      const {email,password}= req.body

       if(!email) {
            return res.status(422).json({message:"Por favor digite um email"})
       }

       if(!password) {
        return res.status(422).json({message:"Por favor digite uma Senha"})
   }

    const user =  await User.findOne({email:email})
    if(!user) {
      return res.status(422).json({message:"não há usúario cadastrado com este email"})
    }
  // check if password match
   const checkPassword = await bcrypt.compare(password,user.password)

     if(!checkPassword) {
      return res.status(422).json({message:"Senha invalida"})
     }
     
     await createUserToken(user, req, res)
   
    }


     static async  checkUser(req,res) {

      let currentUser

      console.log(req.headers.authorization)
       
      if(req.headers.authorization) {
           const token = getToken(req)
           const decoded = jwt.verify(token,'Secreat')

           currentUser = await User.findById(decoded.id)

           currentUser.password = undefined
          
      } else {
        currentUser = null
      }

      res.status(200).send(currentUser)
     }

     static async getUserById(req, res) {
      const id = req.params.id
  
      const user = await User.findById(id)
      user.password = undefined
  
      if (!user) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json({ user })
    }




        


    static async editUser(req, res) {
      const token = getToken(req)
  
      //console.log(token);
  
      const user = await getUserByToken(token)
      
  
      // console.log(user);
      // console.log(req.body)
      // console.log(req.file.filename)
  
      const name = req.body.name
      const email = req.body.email
   
      const password = req.body.password
      const confirmpassword = req.body.confirmpassword
  
      let image = ''
  
      if (req.file) {
        image = req.file.filename
      }
  
      // validations
      if (!name) {
        res.status(422).json({ message: 'O nome é obrigatório!' })
        return
      }
  
      user.name = name
  
      if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório!' })
        return
      }
  
      // check if user exists
      const userExists = await User.findOne({ email: email })
  
      if (user.email !== email && userExists) {
        res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
        return
      }
  
      user.email = email
  
      if (image) {
        const imageName = req.file.filename
        user.image = imageName
      }
  
     
  
      // check if password match
      if (password != confirmpassword) {
        res.status(422).json({ error: 'As senhas não conferem.' })
  
        // change password
      } else if (password == confirmpassword && password != null) {
        // creating password
        const salt = await bcrypt.genSalt(12)
        const reqPassword = req.body.password
  
        const passwordHash = await bcrypt.hash(reqPassword, salt)
  
        user.password = passwordHash
      }
  
      try {
        // returns updated data
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true },
        )
        res.json({
          message: 'Usuário atualizado com sucesso!',
          data: updatedUser,
        })
      } catch (error) {
        res.status(500).json({ message: error })
      }
    }

  }
