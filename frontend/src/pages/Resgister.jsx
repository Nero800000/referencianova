
import React from "react";
import { useState } from "react";
import './Register.css'

import {validarEmail, validarSenha, RegisterRequest,validarNome} from '../utils/index'


const Register = () => {
    const [email, setEmail] =useState()
    const [password, setPassword] = useState()
    const [Name,setName] = useState()
    const [confirmapassword,setConfirmPassword]= useState()
    const [form, setForm] = useState({})
    const [Errors, setErros] = useState('')

    
  
    const Register = async(e) => {
  
         e.preventDefault()
  
         try {
          setForm({Name,email,password,confirmapassword})
            const response = await validatorInput()
  
            console.log("queroSaberrr", response)
            
            if(response) {
              
              RegisterRequest(form.Name, form.email, form.password, form.confirmapassword)

            }
   
            alert("registrou")
          
            console.log(form)
           
         } catch (error) {
            
         }  

        
    }

    const validatorInput =() => {
      return  validarNome(form.Name, setErros) && validarEmail(form.email,setErros) && validarSenha(form.password, setErros) 

    } 


    return (
        <div className="MyHome">
            <h1>Cadastro</h1>
            <form className="formulario">
            <input type="text" placeholder="Digite seu Nome" name="name" onChange={(e)=> setName(e.target.value)}/>
              <input type="text" placeholder="Digite seu email" name="email"  onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder="Digite sua senha" name="password" onChange={(e)=>setPassword(e.target.value) } />
              <input type="password" placeholder="Confirme sua senha" name="confirmpassword" onChange={(e)=>setConfirmPassword(e.target.value) } />
                   {Errors && <h5>{Errors}</h5>}
               <button className="btn-login" onClick={Register}>Register</button>

            </form>

        </div>
    )
}

export default Register