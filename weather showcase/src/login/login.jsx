import { useEffect, useState } from "react";
import style from "./login.module.css";
import UseApi from "../custom_hook/apiCall";
import {useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';


export default function Login(){

    

    const [email,setEmail] = useState("")
    const [pass,setpass] = useState("")
    const [clickCheck,setClick] = useState(false)
    const [checkEmail,setCheckEmail] = useState(false)
    const [validateUser,setValidateUser] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        Cookies.remove('token');
    },[])

    function isValidEmail(email) {
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


  async  function handleSubmit(e){
        e.preventDefault();

        if(isValidEmail(email)){
           const result = await UseApi({path:"login",body:{"email":email,"pass":pass}})

           if(result.Auth){

            Cookies.set("token", result.token, { secure: true });
            setValidateUser(true)
            navigate("/Get_Weather")
        return

          }else{
            setValidateUser(false)
          }
           
        }
        
    }


    function handleChange(e){
        const {name,value} = e.target

        if (name == "email"){
            setEmail(value.trim())
            if(isValidEmail(email)){
                setClick(true)
                setCheckEmail(true)
            }else{
                setClick(false)
                setCheckEmail(false)
            }
        }else{
            if(name == "pass"){
                setpass(value.trim())
            }
        }
    }

    console.log({email,pass})
    return(
        <>
        <div className={style.page}>
         <div className={style.login}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                     {!checkEmail?<p className={style.wrong1}>Invalid Email or field</p>:null}
                   
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="pass"
                        value={pass}
                        onChange={handleChange}
                        required
                    />
                   
                </div>
                {clickCheck?<button type="submit">Login</button>:<button type="submit" disabled style={{"opacity":0.7}}>Login</button>}

               
            </form>
        </div>
        </div>
        </>
    )
}