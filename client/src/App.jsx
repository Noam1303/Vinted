import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie";


import './assets/css/reset.css'
import './assets/css/style.css'

import Home from './Components/home.jsx'
import SignUp from './Components/signup.jsx'
import LogIn from './Components/login.jsx'
import Publish from './Components/publish.jsx'
import Offer from './Components/offer.jsx'
import Payment from './Components/payment.jsx'

function App() {

  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
  const [input, setInput] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [range, setRange] = useState([0, 100])

  useEffect(() => {
    if(localStorage.getItem("user") !== "" && localStorage.getItem("user") !== null) {
      setUser(localStorage.getItem("user"))
      console.log(localStorage.getItem("user"));
    }
    else console.log("no user found");
    
  }, [])

  const fetchData = async() => {
    const response = await axios.get('http://localhost:8000/offers')
    const sortedData = {
      ...response.data,
      offers: response.data.sort((a, b) => a.product_price - b.product_price),
    };
    setData(sortedData)    
    setLoading(true)
  }

  useEffect(() => {
    fetchData()  
  }, [])

  return (
    <Router>
      {loading ? 
        <Routes>
          <Route path="/" element={<Home Cookies={Cookies} user={user} setUser={setUser} data={data} setData={setData} input={input} setInput={setInput} isChecked={isChecked} setIsChecked={setIsChecked} range={range} setRange={setRange} />}/>
          <Route path="/signup" element={<SignUp Cookies={Cookies} user={user} setUser={setUser}  />}/>
          <Route path="/login" element={<LogIn Cookies={Cookies} user={user} setUser={setUser} data={data} input={input} setInput={setInput}/>}/>
          <Route path="/publish" element={<Publish Cookies={Cookies} user={user} setUser={setUser} />}/>
          <Route path="/offer/:id" element={<Offer Cookies={Cookies} user={user} setUser={setUser}/>}/>
          <Route path="/payement" element={<Payment Cookies={Cookies} user={user} setUser={setUser}/>}/>
        </Routes>
      :
      "loading..."
      }
    </Router>
  )
}

export default App
