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
    const fetchUser = async () => {
      try{
          const token = Cookies.get("token");
          if(token){
            const response = await axios.get("http://localhost:8000/user/"+Cookies.get("token"))
            const result = [response.data._id, response.data.account.username, response.data.token]
            console.log(result);
            setUser(result)
          }
          else {
            console.log("token not found");
          }
      }
      catch(error){
        console.log(error);
        
      }
    }
    fetchUser()
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
          <Route path="/payment" element={<Payment Cookies={Cookies} user={user} setUser={setUser}/>}/>
        </Routes>
      :
      "loading..."
      }
    </Router>
  )
}

export default App
