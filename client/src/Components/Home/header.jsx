import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const Header = ({user, input, setInput, isChecked, setIsChecked, data, setData, range, setRange}) => {

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleCheck = () => {
        setIsChecked(!isChecked);

        const newData = [{...data}];
        
            if(data !== undefined){                
                for(let i = 0; i < data.length; i++) {
                    newData.push(data.offers[i]);
                }
                newData.sort((a,b) => {
                    return !isChecked ? b.product_price - a.product_price : a.product_price - b.product_price
                })
                setData(newData)
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