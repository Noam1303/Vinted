import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Content = ({user}) => {

    const navigate = useNavigate()

    const id = useParams().id
    // on recupere via le paramms de l'url l'id

    // je recréer un useState data avec son loading, car on va charger une seul offre, même chose sinon que dans App.jsx
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData = async() => {        
        const response = await axios.get('http://localhost:8000/offers/'+id)
        setData(response.data)
        setLoading(true)
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        // affichage de l'offre
        <div className="content-offer-container">
            {loading ?                 
                    <div className="item-single">
                        <div className="item-single-img">
                            {data.product_image.map((result, index) => {
                                if(result.secure_url !== null){
                                    return(
                                        <img key={index} className="item-single-img-item" src={result.secure_url} alt="image item" />
                                    )
                                }
                            })}
                        </div>
                        <div className="item-single-content-container">
                            <div className="details">
                                <div className="item-single-price">{data.product_price} €</div>
                                <div className="details-detail">
                                    <div className="marque">
                                        <p>
                                            MARQUE
                                        </p>
                                        <h4>
                                            {data.product_details[0].MARQUE}
                                        </h4>
                                    </div>
                                    <div className="taille">
                                        <p>
                                            TAILLE
                                        </p>
                                        <h4>
                                            {data.product_details[0].TAILLE}
                                        </h4>
                                    </div>
                                    <div className="etat">
                                        <p>
                                            ETAT
                                        </p>
                                        <h4>
                                            {data.product_details[0].ETAT}
                                        </h4>
                                    </div>
                                    <div className="couleur">
                                        <p>
                                            COULEUR
                                        </p>
                                        <h4>
                                            {data.product_details[0].COULEUR}
                                        </h4>
                                    </div>
                                    <div className="emplacement">
                                        <p>
                                            EMPLACEMENT
                                        </p>
                                        <h4>
                                            {data.product_details[0].EMPLACEMENT}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="details-description">
                                <div>
                                    <div className="item-product-name">
                                        <h4>
                                            {data.product_name}
                                        </h4>
                                    </div>
                                    <div className="item-product-description">{data.product_description}</div>
                                    <div>
                                        {data.owner.account.avatar? <img  className="user-avatar" src={data.owner.account.avatar.secure_url} alt="avatar user" /> : ""}
                                        {data.owner.account.username}
                                    </div>
                                </div>
                                {/* on passe en "params" les info de l'article et du vendeur pour aller a la page de payment, 
                                si la personne n'est pas connecté (on ne sait comment), alors elle est renvoyé vers la page login */}
                                <button className='acheter' onClick={() => {user.length !== 0 ? navigate('/payment', {
                                    state: {
                                        id: id,
                                        username: data.owner.account.username,
                                        product_name: data.product_name,
                                        product_price: Number(data.product_price),
                                        product_description: data.product_description,
                                        product_details: data.product_details,
                                        product_image: data.product_image,
                                    }})
                                    :navigate('/login')
                                }
                                }>
                                Acheter
                                </button>
                            </div>
                        </div>
                        
                    </div>
            : 
            "chargement..."}
        </div>
    )
}

export default Content;