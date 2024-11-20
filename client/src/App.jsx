import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios'

import './assets/css/reset.css'
import './assets/css/style.css'

import Home from './Components/home.jsx'
import SignUp from './Components/signup.jsx'
import LogIn from './Components/login.jsx'
import Publish from './Components/publish.jsx'
import Offer from './Components/offer.jsx'
import Payment from './Components/payment.jsx'

function App() {

  const [user, setUser] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
  const [input, setInput] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [range, setRange] = useState([0, 100])


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
          <Route path="/" element={<Home user={user} data={data} setData={setData} input={input} setInput={setInput} isChecked={isChecked} setIsChecked={setIsChecked} range={range} setRange={setRange} />}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" elemnt={<LogIn/>}/>
          <Route path="/publish" element={<Publish/>}/>
          <Route path="/offer/:id" element={<Offer/>}/>
          <Route path="/payement" element={<Payment/>}/>
        </Routes>
      :
      "loading..."
      }
    </Router>
  )
}

export default App
