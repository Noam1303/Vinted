import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const Header = ({user, input, setInput, isChecked, setIsChecked, data, setData, range, setRange}) => {

        data.offers.sort((a,b) => {
            if(a.product_price>b.product_pictures) return 1;
            if(a.product_price<b.product_price) return -1;
            return 0;
        })

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleCheck = () => {
        setIsChecked(!isChecked);

        const newData = {...data};
        newData.offers = [];
        

        if(!isChecked) {
            console.log("false");
            if(data !== undefined){                
                for(let i = 0; i < data.offers.length; i++) {
                    newData.offers.push(data.offers[i]);
                }
                
                newData.offers.sort((a,b) => {
                    if(a.product_price>b.product_pictures) return -1;
                    else if(a.product_price<b.product_price) return 1;
                    else return 0;
                })
                console.log(newData.offers[0].owner.account.username);

                console.log(data);
                console.log(newData);
                
                
                setData(newData)
            }
        }
        else {
            console.log("true");
            if(data !== undefined){                
                for(let i = 0; i < data.offers.length; i++) {
                    newData.offers.push(data.offers[i]);
                }
                
                
                newData.offers.sort((a,b) => {
                    if(a.product_price>b.product_pictures) return 1;
                    else if(a.product_price<b.product_price) return -1;
                    else return 0;
                })
                console.log(newData.offers[0].owner.account.username);
                console.log(data);
                console.log(newData);
                setData(newData)
            }
        }
    }

    const handleRange = (e) => {
        e.preventDefault();
        setRange([0, e.target.value])
    }
    return(
        <header>
            <div className="header-container">
                <img src="logo.png" alt="Vinted logo" className="logo"/>
                <div className="filtre">
                    <FontAwesomeIcon icon={faMagnifyingGlass}  className='glass'/>
                    <input className="searchbar" type="text" value={input} placeholder="Recherche des articles" onChange={handleChange}/>
                    <div className="filtre-prix">
                        <p className='checkbox-container'>Trier par prix: <input onChange={handleCheck} type="checkbox"/><label className='check'></label></p>
                        <p className='range'>Prix entre: <input  className='range-input' type="range" value={range[1]} onChange={handleRange} max='500'/></p>
                        <p className='range-result'>{range} €</p>
                    </div>
                </div>
                {user === undefined ?
                <div className="connection-button-container">
                    <button className="connection-button">S'inscrire</button>
                    <button className="connection-button">Se connecter</button>
                </div>
                :
                <div className="connection-button-container">
                    <button className="deconnection-button">Se déconnecter</button>
                </div>
                }
                <button className="vends" >Vends tes articles</button>
            </div>
        </header>
    )
}

export default Header;