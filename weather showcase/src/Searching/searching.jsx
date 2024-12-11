import { useState ,useEffect } from "react"
import style from "./searching.module.css"
import Weather_detail from "../custom_hook/WeatherApi"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"


export default function Searching(){

    const [cookieCheck,setCookie] = useState(null)
    const [city,setCity] = useState(null)
    const [country,setCuntry] = useState(null)
    const [getCity,setGetCity] = useState(null)
    const [temperature,setTemperature] = useState(null)
    const [description,setDescription] = useState(null)
    const [fieldCheck,setFieldCheck] = useState(false)
    const  [icon,setIcon] = useState(null)
    const navigate = useNavigate()


    useEffect(()=>{

        function check(){

            setCookie(Cookies.get("token"))
        }

        check()
       

        
    },[])
    if(!cookieCheck){
        navigate("/login")
    }

    console.log(cookieCheck)
   async function handlesubmit(e){
    e.preventDefault();
        if(city){

        setFieldCheck(true)      
        }else{
            setFieldCheck(false)
        }
       const result =  await Weather_detail(city.trim())

       setGetCity(result.location.name+","+" ")
       setCuntry(result.location.country)
       setTemperature(result.current.temperature+" "+"°C")
       setDescription(result.current.weather_descriptions[0]) 
       setIcon(result.current.weather_icons[0])
    }
    console.log(country,getCity,temperature,description)



    function handleinput(e){
        const {value} = e.target
        setCity(value)  
        

        console.log(fieldCheck)
    }


    return(
        <>
        <div className={style.cover}>
            <div className={style.input_field}>
                <h1>Weather Information</h1>
                <form className={style.box}>

                <input type="text" name="city" value={city} onChange={handleinput} placeholder="Enter the city" required/>
                <div>
                <input type="submit" value="➤" className={style.arrows}  onClick={handlesubmit}/>
                </div>
                
                </form>
            </div>

            {fieldCheck?
            <div className={style.information}>
            <div className={style.detial}>
                <h1 className={style.temperature}>{temperature} </h1>
                <h3 className={style.description}> {description}</h3><img src={icon} alt="" />
                <h5 className={style.location}> {getCity }{country}</h5>
            </div>

        </div>
            
            
            :<div className={style.information}>
            <div className={style.detial}>
            <h1 className={style.warning}>Enter city name in input field</h1>
            </div>

        </div>}

        </div>
       
        </>
    )
}