import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Content = ({data, setData, isChecked, input, range}) => {

    const navigate = useNavigate()

    localStorage.setItem('page', Number(window.location.href.substring(28)-1))

    const [pageLength, setPageLength] = useState([])
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("page"))

    
    

    useEffect(() => {
        const fetch = async() => {
            const numberOfPages = await axios.get('http://localhost:8000/offerNumber');
            const result = numberOfPages.data.count-1;
            const resultFinal = []            
            for(let i = 0; i < result; i++) {
                resultFinal.push(i+1)
            }
            setPageLength(resultFinal)   
            const query = `?title=${input}&priceMin=${range[0]}&priceMax=${range[1]}&sort=${isChecked ? "price-desc" : "price-asc"}&page="${currentPage}"`
            const response = await axios.get('http://localhost:8000/offers'+query)
            let newData = {...data}
            newData.offers = response.data            
            setData(newData)
        }
        fetch()
        
    }, [range, input, isChecked, currentPage])

    const handleClick = (id) => {
        navigate(`/offer/${id}`)
    }

    const handlePage = (page) => {
        if(page){
            navigate(`/?page=${page}`)
            setCurrentPage(Number(page-1))
            localStorage.setItem("page", page-1)
        }
    }
    

    return(
        <div className="content-home-container">
            <div className="content-home-container-snd">

            {data.offers.map((result, index) => {                
                            return(
                                <div className="item" key={index}>
                                    <div className="item-username">
                                        {result.owner.account.avatar ? <img  className="user-avatar" src={result.owner.account.avatar.secure_url} alt="avatar user" /> : ""}
                                        {result.owner.account.username}
                                    </div>
                                    <div className="item-img-container">
                                        <img  className="item-img" src={result.product_image[0].secure_url} alt="image item" onClick={() => {handleClick(result._id)}} /> 
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
            <div className="page-container">

                {pageLength.length > 1 ? 
                pageLength.map((result, index) => {
                    return(
                        <button className ="page" key={index} onClick={() => {handlePage(index+1)}}>{index+1}</button>
                    )
                })
                :
                ''}
            </div>
        </div>
    )
}

export default Content;