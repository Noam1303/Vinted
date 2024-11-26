// importation du useState, useEffect, des router, de axios et des cookies
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie";

// on importe le css
import './assets/css/reset.css'
import './assets/css/style.css'

// on import les modules
import Home from './Components/home.jsx'
import SignUp from './Components/signup.jsx'
import LogIn from './Components/login.jsx'
import Publish from './Components/publish.jsx'
import Offer from './Components/offer.jsx'
import Payment from './Components/payment.jsx'

function App() {

  // on itinitialise les useState de user, loading qui se passe en true apres qu'on est fetch les info du backend dans data, data,
  // input qui permet de garder le texte dans searchbar, isChecked qui represente si oui ou non la checkbox est coché (sort),
  // et range qui reprensente le tableau de valeur de [priceMin, priceMax]
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
  const [input, setInput] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [range, setRange] = useState([0, 100])

  // ce useEffect s'enclenche quand on refresh la page où quand on la lance et seulement à ce moment là
  useEffect(() => {
    const fetchUser = async () => {
      try{  
          //on stocke le cookie dans une constante
          const token = Cookies.get("token");
          if(token){
            // si token existe, alors on recupere le user grace au token mis dans le cookie, 
            // et on place les valeur de l'id du user, ainsi que son nom et son token dans user
            const response = await axios.get("http://localhost:8000/user/"+token)
            const result = [response.data._id, response.data.account.username, response.data.token]
            console.log(result);
            setUser(result)
          }
          else {
            // si le token n'existe pas (user non connecté), alors on met dans le terminal "token not found"
            console.log("token not found");
          }
      }
      catch(error){
        console.log(error);
        
      }
    }
    // on appelle la fonction pour fetch (sinon ca risque pas de marcher 🤡)
    fetchUser()
  }, [])

  // on stocke tout les poste dans data, par ordre croissant celon le prix, et on met setLoading(true)
  // j'ai mis cela dans un autre useEffect qui lui aussi se lance uniquement au lancement et au refresh pour bien separer les deux
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

  // l'ensemble des routes du projets
  return (
    <Router>
      {/* si loading === true, alors on affiche les pages, sinon on affiche loading... */}
      {loading ? 
        <Routes>
          <Route path="/" element={<Home Cookies={Cookies} user={user} setUser={setUser} data={data} setData={setData} input={input} setInput={setInput} isChecked={isChecked} setIsChecked={setIsChecked} range={range} setRange={setRange} />}/>
          {/* menu principale, aussi appelé home */}
          <Route path="/signup" element={<SignUp Cookies={Cookies} user={user} setUser={setUser}  />}/>
          {/* menu pour s'inscrire */}
          <Route path="/login" element={<LogIn Cookies={Cookies} user={user} setUser={setUser} data={data} input={input} setInput={setInput}/>}/>
          {/* menu pour se connecter */}
          <Route path="/publish" element={<Publish Cookies={Cookies} user={user} setUser={setUser} />}/>
          {/* menu pour publier un post, seulement accesible au user connecté */}
          <Route path="/offer/:id" element={<Offer Cookies={Cookies} user={user} setUser={setUser}/>}/>
          {/* menu pour afficher une offre, pour apres l'acheter */}
          <Route path="/payment" element={<Payment Cookies={Cookies} user={user} setUser={setUser}/>}/>
          {/* menu pour payer */}
        </Routes>
      :
      "loading..."
      }
    </Router>
  )
}

export default App
