import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './weather_main/home'
import GlobalState from './context/Global_contet'
import Path from './Route/Route'
import {BrowserRouter as Router} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <>
  <Router>
  <GlobalState>
    
    <Path/>
  </GlobalState>
  </Router>
 
  </>,
)
