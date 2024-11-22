import { useEffect } from "react";
import axios from 'axios'

const Content = ({data, setData, isChecked, input, range}) => {
    
    useEffect(() => {
        const fetch = async() => {
            const query = `?title=${input}&priceMin=${range[0]}&priceMax=${range[1]}&sort=${isChecked ? "price-desc" : "price-asc"}`
            const response = await axios.get('http://localhost:8000/offers'+query)
            let newData = {...data}
            newData.offers = response.data
            setData(newData)
        }
        fetch()
        
    }, [range, input, isChecked])

    return(
        <div className="content-home-container">
            <div className="content-home-container-snd">

            {data.offers.map((result, index) => {
                            return(
                                <div className="item" key={index}>
                                    <div className="item-username">
                                        {result.owner.account.avatar ? <img  className="user-avatar" src={result.owner.account.avatar.url} alt="avatar user" /> : ""}
                                        {result.owner.account.username}
                                    </div>
                                    <div className="item-img-container">
                                        <img  className="item-img" src={result.product_image[0].secure_url} alt="image item" /> 
                                    </div>
                                    <div className="item-price">
                                        {result.product_price} €
                                    </div>
                                    <div className="item-taille">
                                        {result.product_details[0].TAILLE}
                                    </div>
                                    <div className="item-brand">
                                        {result.product_details[0].MARQUE}
                                    </div>
                                </div>
                            )
                        
                    
                
            })}
            </div>
        </div>
    )
}

export default Content;