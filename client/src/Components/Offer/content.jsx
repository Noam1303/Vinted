import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Content = () => {

    const id = useParams().id

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async() => {        
        const response = await axios.get('http://localhost:8000/offers/'+id)
        console.log(response.data);
        setData(response.data)
        setLoading(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="content-offer-container">
            {loading ?                 
                    <div className="item-single">
                        <div className="item-single-img">
                            {data.product_image.map((result, index) => {
                                return(
                                    <img key={index} className="item-single-img" src={result.secure_url} alt="image item" />
                                )
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
                                        {data.owner.account.avatar? <img  className="user-avatar" src={data.owner.account.avatar.url} alt="avatar user" /> : ""}
                                        {data.owner.account.username}
                                    </div>
                                </div>
                                <button className='acheter' onClick={console.log("click")}>Acheter</button>
                            </div>
                        </div>
                        
                    </div>
            : 
            "chargement..."}
        </div>
    )
}

export default Content;