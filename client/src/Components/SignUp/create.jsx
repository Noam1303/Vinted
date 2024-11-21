import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Create = ({setUser}) => {

    const navigate = useNavigate()


    const handleSubmit = async() => {
        const name = document.querySelector(".name");
        const mail = document.querySelector(".mail");
        const password = document.querySelector(".password");
        const checkbox = document.querySelector(".create-checkbox");        
        if(name !== undefined && mail !== undefined  && password !== undefined && checkbox !== undefined){
            if(name.value !== "" && mail.value !== "" && password.value !== ""){                
                const response = await axios.post('http://localhost:8000/user/signup', {
                    username: name.value, email: mail.value, password: password.value, newsletter: checkbox.checked
                })
                if(response.status === 200){
                    Cookies.set("token", response.data.token)
                    console.log(Cookies.get('token')+" Cookies");
                    console.log("signup complete");
                    const newUser = [response.data.account.username, mail.value];
                    console.log(newUser);
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
                    S'inscrire
                </h1>
                <input className="name" type="text" placeholder="Nom d'utilisateur" />
                <input className="mail" type="text" placeholder="Email" />
                <input className="password" type="password" placeholder="Mot de passe" />
                <div className="checkbox-container-create">
                    <div>
                        <input className="create-checkbox" type="checkbox" />
                        S'inscrire à notre newsletter
                    </div>
                    <p>
                        En m'inscrivant je confirme avoir lu et accepté les Termes & 
                        Conditions et Politique de Confidentialité de Vinted. 
                        Je confirme avoir au moins 18 ans.
                    </p>
                </div>
                <input type="submit" name="S'inscrire" onClick={handleSubmit}/>
                <Link className="link" to='/login'>Tu as déjà un compte ? Connecte-toi !</Link>
            </div>

        </div>
    )
}

export default Create;