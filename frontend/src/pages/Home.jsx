
import React from "react";
import { useState } from "react";
import './Home.css'

const Home = () => {
    const [email, setEmail] =useState()
    const [password, setPassword] = useState()

    return (
        <div className="MyHome">
            <h1>Homee</h1>
            <form className="formulario">
              <input type="text" placeholder="Digite seu email"  onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder="digite sua senha" onChange={(e)=>setPassword(e.target.value) } /> 
               <button className="btn-login">login</button>

            </form>

        </div>
    )
}

export default Home