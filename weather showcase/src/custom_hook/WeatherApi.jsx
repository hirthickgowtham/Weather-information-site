import axios from "axios";



export default async function Weather_detail(city){
    const path = import.meta.env.VITE_Weather_Api


    const result = await axios.get(`${path}${city}`)

   
    return result.data
}