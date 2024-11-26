import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone'

const Content = ({user}) => {

    const navigate = useNavigate();

    // si l'user se deconnecte pendant qu'il est sur la page publish, alors sa quitte la page actuelle pour aller vers la page login
    useEffect(() => {
        if(user.length === 0){
            navigate('/login')
        }
    }, [user])

    const [file, setFile] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [marque, setMarque] = useState("");
    const [size, setSize] = useState("");
    const [condition, setCondition] = useState("");
    const [couleur, setCouleur] = useState("");
    const [emplacement, setEmplacement] = useState("");
    const [check, setCheck] = useState(false);
    // on initialise les useState suivant:
    // file, qui permettera de stocker le/les file(s) donnée par le (futur) vendeur
    // title, qui permettera de stocker le titre de l'article
    // price, qui permettera de stocker le prix de l'article
    // description, qui permettera de stocker la description de l'article
    // marque, qui permettera de stocker la marque de l'article
    // size, qui permettera de stocker la taille de l'article
    // condition, qui permettera de stocker l'état de l'article
    // couleur, qui permettera de stocker la couleur de l'article
    // emplacement, qui permettera de stocker l'emplacement (ville...) de l'article
    // check, qui permettera de stocker si la checkbox est cochée ou non

    const handleChangeFile = (File) => {
        if (File) {
            if (File.type !== "image/jpeg" && File.type !== "image/png") {
                // si le file n'est pas de type jpeg ou png, alors on met une alert (😠)
                alert("File Type is not an image");
                return
            } 
            if(file.length >= 3){
                // seulement 3 images pour un post (choisi arbitrairement 🖐️)
                alert("Vous ne pouvez pas ajouter plus de 3 images");
                return
            }            
            const reader = new FileReader(); // Créer une instance FileReader
            reader.onload = () => {
                console.log("image stocked" + reader.result);
                const result = [...file];
                result.push(reader.result);                              
                setFile(result); // Stocker la chaîne Base64 dans le state
            };
            reader.readAsDataURL(File); // Lire le fichier en Base64
        }
    };

    // tout les handlChange permette de mofidier les useState respectif selon les value des inputs respectifs
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

    // permet de gerer quand on clique sur publier, verifie si tout les inputs sont vides ou non, si oui alors ca renvoie une alert (😠)
    // si non alors on incremente (ou non) le tableau file, puis on envoie une requete, si le status renvoyer par le backend est 200, alors 
    // l'utilisateur est renvoyé vers la page de l'offre, sinon alert (😠)
    const handleSubmit = async () => {                
        if (file.length !== 0 && title && description && price && marque && size && condition && couleur && emplacement) {
            const formData = new FormData();
            if(file.length === 1) {
                file.push([null, null, null, null])
                file.push([null, null, null, null])
            }
            else if (file.length === 2) {
                file.push([null, null, null, null])
            }
            formData.append('file1', file[0]);    
            formData.append('file2', file[1]);  
            formData.append('file3', file[2]);          
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
                        'Content-Type': 'multipart/form-data',
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
                    <div className="file-upload">
                    {/* dropzone permet à l'utilisateur de donner son fichier en glissant le fichier ou en cliquant sur le dropzone et en selectionnant */}
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
                                        <img key={index} src={path} style={{width: "200px"}} />
                                    )
                                :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                                }
                            </div>
                            </section>
                        )}
                    </Dropzone>
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
            <div className="publier-button">
                    <button onClick={handleSubmit} className="publier" type="submit">Publier</button>
            </div>
            </div>
        </div>
    )
}

export default Content;