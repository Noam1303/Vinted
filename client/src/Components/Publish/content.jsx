import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Content = ({user}) => {

    const navigate = useNavigate();

    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [marque, setMarque] = useState("");
    const [size, setSize] = useState("");
    const [condition, setCondition] = useState("");
    const [couleur, setCouleur] = useState("");
    const [emplacement, setEmplacement] = useState("");
    const [check, setCheck] = useState(false);

    const handleChangeFile = (e) => {
        const file = e.target.files[0]; // Récupérer le fichier
        if (file) {
            const reader = new FileReader(); // Créer une instance FileReader
            reader.onload = () => {
                setFile(reader.result); // Stocker la chaîne Base64 dans le state
            };
            reader.readAsDataURL(file); // Lire le fichier en Base64
            document.querySelector('.file-name').textContent = file.name
        }
    };

    const handleChangeTitle = () => {
        const title = document.querySelector(".title-publish-input").value
        setTitle(title)
    }

    const handleChangePrice = () => {
        const price = document.querySelector(".price-publish-input").value
        setPrice(price)
    }

    const handleChangeDescription = () => {
        const description = document.querySelector(".description-publish-input").value
        setDescription(description)
    }

    const handleChangeSize = () => {
        const size = document.querySelector(".size-publish-input").value
        setSize(size)
    }

    const handleChangeMarque = () => {
        const marque = document.querySelector(".marque-publish-input").value
        setMarque(marque)
    }

    const handleChangeCouleur = () => {
        const couleur = document.querySelector(".couleur-publish-input").value
        setCouleur(couleur)
    }

    const handleChangeCondition = () => {
        const condition = document.querySelector(".condition-publish-input").value
        setCondition(condition)
    }

    const handleChangeEmplacement = () => {
        const emplacement = document.querySelector(".emplacement-publish-input").value
        setEmplacement(emplacement)
    }

    const handleChangeCheck = () => {
        const check = document.querySelector(".check-publish-input").checked
        setCheck(check)
    }

    const handleSubmit = async () => {        
        if (file && title && description && price && marque && size && condition && couleur && emplacement) {
            const formData = new FormData();
            formData.append('file', file);            
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('brand', marque);
            formData.append('size', size);
            formData.append('condition', condition);
            formData.append('color', couleur);
            formData.append('city', emplacement);
            formData.append('check', check);
            
            const token = `Bearer ${user[2]}`;
            
            try {
                const response = await axios.post("http://localhost:8000/offer/publish", formData, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'multipart/form-data',  // Assure-toi que le Content-Type est multipart/form-data
                    }
                });
    
                console.log(response.data);
                
                if (response.status === 200) {
                    console.log("Publication réussie");
                    navigate('/offer/' + response.data._id);
                } else {
                    alert("Erreur: " + response.status);
                }
            } catch (error) {
                console.error("Erreur lors de la publication", error);
                alert("Erreur lors de la publication de l'offre.");
            }
        } else {
            alert("Veuillez remplir tous les champs et ajouter une image.");
        }
    };
    

    return(
        <div className="content-publish-container">
            <div className="content-publish-form">
            <h4>
                Vends ton article 
            </h4>
                    <div className="file-upload" onClick={() => {document.querySelector('.file').click()}}>
                        <div className="file-name">

                        </div>
                        <button>
                            <FontAwesomeIcon icon={faPlus} className="fa-2x"/>
                            Ajoute une photo
                            <input className="file" type="file" onChange={handleChangeFile} multiple style={{display: "none", width: "100px"}}/>
                        </button>
                    </div>
                    <div className="title-publish">
                        <div>
                            <div>
                                Titre
                            </div>
                            <div>
                                <input onChange={handleChangeTitle} className="title-publish-input" type="text" placeholder="ex: Chemise Sézane verte" />
                            </div>
                        </div>
                        <div>
                            <div>
                                Décris ton article
                            </div>
                            <div>
                                <input onChange={handleChangeDescription} className="description-publish-input" type="text"  placeholder="ex: porté quelquefois, taille correctement..."/>
                            </div>
                        </div>
                    </div>
                    <div className="detail-publish">
                        <div>
                            <div>
                                Marque
                            </div>
                            <div>
                                <input onChange={handleChangeMarque} className="marque-publish-input" type="text" placeholder="ex: Zara" />
                            </div>
                        </div>
                        <div>
                            <div>
                                Taille
                            </div>
                            <div>                            
                                <input onChange={handleChangeSize} className="size-publish-input" type="text" placeholder="ex: L / 40 / 12" />
                            </div>
                        </div>
                        <div>
                            <div>
                                Couleur
                            </div>
                            <div>                            
                                <input onChange={handleChangeCouleur} className="couleur-publish-input" type="text" placeholder="ex: Fushia" />
                            </div>
                        </div>
                        <div>
                            <div>
                                Etat
                            </div>
                            <div>                            
                                <input onChange={handleChangeCondition} className="condition-publish-input" type="text" placeholder="ex: Neuf avec étiquette" />
                            </div>                        
                        </div>
                        <div>
                            <div>
                                Lieu
                            </div>
                            <div>                            
                                <input onChange={handleChangeEmplacement} className='emplacement-publish-input' type="text" placeholder="ex: Paris" />
                            </div>
                        </div>
                    </div>
                    <div className="price-publish">
                        <div>
                            <div>
                                Prix
                            </div>
                            <div>
                                <input onChange={handleChangePrice} className="price-publish-input" type="number" placeholder="0,00 €" />
                                <div>
                                    <input onChange={handleChangeCheck} className="check-publish-input" type="checkbox" />
                                    Je suis intéressé(e) par les échanges
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} type="submit">Publier</button>
            </div>
        </div>
    )
}

export default Content;