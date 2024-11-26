import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// importation des icones
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
// on importe les dual-slider
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


const Header = ({Cookies, user, setUser, input, setInput, isChecked, setIsChecked, range, setRange}) => {

    const navigate = useNavigate();

    // modifie input selon la valeur de searchbar
    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    const handleCheck = () => {
        // modifie ischecked slon la valeur du checkbox
        setIsChecked(!isChecked);
    };

    const handleRange = (e) => {
        // modifie range selon la valeur du dual-slider
        const value1 = e[0]
        const value2 = e[1]        
        setRange([value1, value2]);
    };

    // appeler a chaque changement de range
    useEffect(() => {
        // modifie l'affichage de la tranche de prix selon le dual-slider
        document.querySelector('.range').textContent = `prix entre: ${range[0]} € et ${range[1]} €`
    }, [range]);

    return (
        <header>
            <div className="header-container">
                <img src="logo.png" alt="Vinted logo" className="logo" onClick={() => {navigate('/')}}/>
                <div className="filtre">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="glass" />
                    <input
                        className="searchbar"
                        type="text"
                        value={input}
                        placeholder="Recherche des articles"
                        onChange={handleChange}
                    />
                    <div className="filtre-prix">
                        <div className="checkbox-container">
                            Trier par prix: 
                            <input className="handleCheck" onChange={handleCheck} type="checkbox" />
                            <label className="check"></label>
                        </div>
                        <div className="range-container">
                            <div className="range"/>
                            {/* dual-slider */}
                            <RangeSlider defaultValue={[0, 100]} min={0} max={500} className="range-input" onInput={handleRange}/>
                        </div>
                    </div>
                </div>
                {user.length === 0 ? (
                <div className="connection-button-container">
                    <button className="connection-button" onClick={() => {navigate('/signup')}}>S'inscrire</button>
                    <button className="connection-button" onClick={() => {navigate('/login')}}>Se connecter</button>
                </div>
                ) : (
                <div className="connection-button-container">
                    <button className="deconnection-button" onClick={() => {Cookies.remove('token'); setUser([])}}>Se déconnecter</button>
                </div>
                )}
                {/* si l'utilisateur est connecter, alors il sera rediriger vers publish, sinon vers login */}
                <button className="vends" onClick={() => {user.length !== 0 ? navigate('/publish') : navigate('/login')}}>Vends tes articles</button>
            </div>
        </header>
    );
};

export default Header;
