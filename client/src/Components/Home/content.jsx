import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
// useSearchParams permet de recuper le query de l'url
const Content = ({data, setData, isChecked, input, range}) => {

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page")
    // on recupere le query page pour le mettre dans une constante

    const navigate = useNavigate()
    // permet de naviguer entre les pages

    localStorage.setItem('page', Number(page-1))
    // on stocke le query page dans un localStorage

    const [pageLength, setPageLength] = useState([])
    // on stockera plus tard le nombre de page que le content devra afficher
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("page"))
    // on stocke le localStorage dans un useState

    
    
    // se useEffect se relancera à chaque fois que range, input, ischecked ou currentPage change
    useEffect(() => {
        const fetch = async() => {
            // on recupere le nombre de page qu'on devra avoir celon les filtres et on le stocke sous forme de tableau dans pageLength 
            const querylength = `?title=${input}&priceMin=${range[0]}&priceMax=${range[1]}&sort=${isChecked ? "price-desc" : "price-asc"}`
            const numberOfPages = await axios.get('http://localhost:8000/offerNumber'+querylength);
            const result = numberOfPages.data;
            const resultFinal = []            
            for(let i = 0; i < result; i++) {
                resultFinal.push(i+1)
            }
            setPageLength(resultFinal)   
            // on recupere les resultat selon les filtres et la page acutels
            const query = `?title=${input}&priceMin=${range[0]}&priceMax=${range[1]}&sort=${isChecked ? "price-desc" : "price-asc"}&page="${currentPage}"`
            const response = await axios.get('http://localhost:8000/offers'+query)
            let newData = {...data}
            newData.offers = response.data          
            setData(newData)
        }
        fetch()
        
    }, [range, input, isChecked, currentPage])

    // permet d'afficher le post de facon a pouvoir acheter le produit
    const handleClick = (id) => {
        navigate(`/offer/${id}`)
    }

    // permet de ,aviguer entre les pages
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
                            //  on affiche les result du data
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

                {pageLength.length > 0 ? 
                // on affiche le nombre de bouton de pages on doit afficher dynamiquement, selon les filtres
                pageLength.map((result, index) => {
                    return(
                        <button className ="page" key={index} onClick={() => {handlePage(index+1)}}>{index+1}</button>
                    )
                })
                :
                'No post found'}
            </div>
        </div>
    )
}

export default Content;