import style from "./home.module.css";
import { useRef,useEffect } from "react";
import Typed from 'typed.js';
import { useNavigate } from "react-router-dom";



export default function Home(){

   const navigate = useNavigate()

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Welcome to weather info!', 'Get Weather for perfered location. 🌧️'],
            typeSpeed: 50,
            backSpeed: 25,
            loop: false,
            showCursor: false
        });

        return () => {
            typed.destroy();
        };
    }, []);

    


    return (
        <>
        <div className={style.main}>
            <div className={style.nav_bar}>
                <div></div>
               <div className={style.option}>
                   <li className={style.sign} onClick={()=>navigate("/login")}>Sign in</li>
                   <li className={style.sign}  onClick={()=>navigate("/register")}>Sign up</li>

               </div>
            </div>
            <div className={style.text_main}>
                <h1><span ref={el}></span></h1>
            </div>

        </div>
        </>
    )

}