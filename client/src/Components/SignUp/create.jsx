import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone'

const Create = ({Cookies, setUser}) => {

    const navigate = useNavigate()

    const [file, setFile] = useState([]);

    const handleChangeFile = (File) => {
        
        if (File) {
            if (File.type !== "image/jpeg" && File.type !== "image/png") {
                alert("File Type is not an image");
                return
            }           
            const reader = new FileReader(); // Créer une instance FileReader
            reader.onload = () => {
                console.log("image stocked" + reader.result);
                const result = []
                result.push(reader.result);                              
                setFile(result); // Stocker la chaîne Base64 dans le state
            };
            reader.readAsDataURL(File); // Lire le fichier en Base64
        }
    };

    const handleSubmit = async() => {
        const name = document.querySelector(".name").value;
        const mail = document.querySelector(".mail").value;
        const password = document.querySelector(".password").value;
        const checkbox = document.querySelector(".create-checkbox").value;    
        console.log(checkbox);
            
        if(name !== undefined && mail !== undefined  && password !== undefined && checkbox !== undefined){
            if(name.value !== "" && mail.value !== "" && password.value !== ""){     
                const formData = new FormData();                
                formData.append('username', name);    
                formData.append('email', mail);  
                formData.append('password', password);          
                formData.append('newsletter', checkbox);
                formData.append('file', file);
                const response = await axios.post('http://localhost:8000/user/signup',formData)
                if(response.status === 200){
                    Cookies.set("token", response.data.token, {expires: 7})
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
                    S'inscrire
                </h1>
                <input className="name" type="text" placeholder="Nom d'utilisateur" />
                <input className="mail" type="text" placeholder="Email" />
                <input className="password" type="password" placeholder="Mot de passe" />
                <Dropzone id="dropzone" type="image/jpeg" onDrop={
                        (acceptedFiles) => {
                            acceptedFiles.forEach((file) => {
                                    handleChangeFile(file)
                                }
                            )
                        }
                    }>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {file.length !== 0 ?                                 
                                    file.map((path, index) => 
                                        <img  style={{width: "200px"}} key={index} src={path} />
                                    )
                                :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                                }
                            </div>
                            </section>
                        )}
                    </Dropzone>
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