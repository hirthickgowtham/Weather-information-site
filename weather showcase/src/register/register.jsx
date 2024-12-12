import style from "./register.module.css"
import { useState ,useEffect} from "react"
import UseApi from "../custom_hook/apiCall"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


export default function Register(){

    Cookies.remove('token');

    const [email,setEmail] = useState("")
    const [pass1,setpass1] = useState("")
    const [pass2,setpass2] = useState("")
    const [check,setcheck] = useState(false)
    const [passCheck,setPassCheck] = useState(true)
    const [clickCheck,setClick] = useState(false)
    const navigate = useNavigate()
    
    

    useEffect(()=>{
        if(pass1 === pass2){
            setPassCheck(true)
            setClick(true)
        }else{
            if(pass1 !== pass2){
                setPassCheck(false)
                setClick(false)
            }
        }
    
    },[pass1,pass2])


    useEffect(()=>{

        
            const validateEmail = async () => {
                if (isValidEmail(email)) {
                    const response = await UseApi({ path: "userCheck", body: { email } });
                    setcheck(!response);
                    setClick(true);
                } else {
                    setcheck(false);
                    setClick(false);
                }
            };
            validateEmail();

    },[email])


    function isValidEmail(email) {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        
        return emailRegex.test(email);
    }

   async function handleSubmit(e){
        e.preventDefault();

        if(pass1 === pass2){
            setPassCheck(true)
          const result =  await UseApi({path:"register",body:{"email":email,"pass":pass1}})
          
            console.log(result[1].token)
            Cookies.set("token",result[1].token,{secure:true})
            navigate("/Get_Weather")
        }

    }

    

   async function handleChange(e){
        const {name,value} = e.target
    
        switch (name) {
            case "email":
                setEmail(value.trim())
               
                break;
            case "pass1":
                setpass1(value.trim())
            
             
                break;
            case "pass2":
                setpass2(value.trim())
                break;
            
        }
    }

    

    return(
        <>
         <div className={style.page}>
         <div className={style.login}>
            <h2>Register</h2>
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
                   {!check?<p className={style.wrong1}>Email already exist or invalid field</p>:<p className={style.correct}>Valid Email</p>}
                </div>
                <div>
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password2"
                        name="pass1"
                        value={pass1}
                        onChange={handleChange}
                        required
                    />
                   
                </div>
                <div>
                    <label htmlFor="password">Re Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="pass2"
                        value={pass2}
                        onChange={handleChange}
                        required
                    />
                   
                </div>
             {clickCheck?<button type="submit">Register</button>:<button type="submit" disabled style={{"opacity":0.7}}>Register</button>}
            </form>
            {!passCheck?<p className={style.wrong}>Password not match !!!</p>:null}
            
        </div>
        </div>
        </>
    )
}   