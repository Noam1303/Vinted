import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Connection = ({Cookies, setUser}) => {

    const navigate = useNavigate()


    const handleSubmit = async() => {
        const mail = document.querySelector(".mail");
        const password = document.querySelector(".password");
        if(mail !== undefined  && password !== undefined){
            if(mail.value !== "" && password.value !== ""){                
                const response = await axios.post('http://localhost:8000/user/login', {
                    email: mail.value, password: password.value
                })
                if(response.status === 200){
                    Cookies.set("token", response.data.token, {expires: 7})
                    console.log(Cookies.get('token')+" Cookies");
                    console.log("login complete");
                    const newUser = [response.data.account.username, mail.value];
                    console.log(newUser);
                    localStorage.clear();
                    localStorage.setItem("user", newUser)
                    console.log(localStorage.getItem("user"))
                    setUser(newUser)
                    navigate('/')
                }
                else alert("l'utilisateur existe déjà")
            }
            else alert("veuillez templir tout les champs")
        }
    }

    return(
        <div className="create-container">
            <div className="create-nav">
                <h1>
                    Se connecter
                </h1>
                <input className="mail" type="text" placeholder="Email" />
                <input className="password" type="password" placeholder="Mot de passe" />
                <input type="submit" name="Se connecter" onClick={handleSubmit}/>
                <Link className="link" to='/signup'>Pas encore de compte ? Inscris-toi !</Link>
            </div>

        </div>
    )
}

export default Connection;