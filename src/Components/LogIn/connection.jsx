import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Connection = ({Cookies, setUser}) => {

    const navigate = useNavigate()

    // on verifie si les inputs sont non vides, si c'est le cas alors on lance la requete vers le backend pour login, si le serveur renvoie le status 200 alors 
    // on stocke dans le cookies le token , et on stocke des infos du user dans le user
    const handleSubmit = async() => {
        const mail = document.querySelector(".mail");
        const password = document.querySelector(".password");
        if(mail !== undefined  && password !== undefined){
            if(mail.value !== "" && password.value !== ""){                
                const response = await axios.post('https://site--test-backend--7g4fljlbl5js.code.run/user/login', {
                    email: mail.value, password: password.value
                })
                if(response.status === 200){
                    Cookies.set("token", response.data.token, {expires: 7})
                    const token = Cookies.get("token");
                    if(token){
                        const response = await axios.get("https://site--test-backend--7g4fljlbl5js.code.run/user/"+Cookies.get("token"))
                        const result = [response.data._id, response.data.account.username, response.data.token]
                        console.log(result);
                        setUser(result)
                    }
                    else {
                        console.log("token not found");
                    }
                    navigate('/publish')
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