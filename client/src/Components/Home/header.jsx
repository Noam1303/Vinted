import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Header = ({user, input, setInput, isChecked, setIsChecked, data, setData, range, setRange}) => {

    const navigate = useNavigate();

    const rangeRef = useRef(null);
    const labelRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    const handleCheck = () => {
        setIsChecked(!isChecked);
        const newData = { ...data };
        if (data !== undefined) {
            // newData.offers = [...data.offers]; // Copie immuable des offres
            newData.offers.sort((a, b) =>
                !isChecked ? b.product_price - a.product_price : a.product_price - b.product_price
            );
            setData(newData);
        }
    };

    const handleRange = (e) => {
        e.preventDefault();
        setRange([0, e.target.value]);
    };

    const updateLabelPosition = () => {
        const range = rangeRef.current;
        const label = labelRef.current;

        if (!range || !label) return;

        const rangeWidth = range.offsetWidth; // Largeur totale de l'input
        const thumbWidth = 16; // Largeur approximative du curseur (peut varier selon le style ou le navigateur)
        const min = range.min;
        const max = range.max;
        const value = range.value;

        // Calcul de la position relative du curseur
        const percent = (value - min) / (max - min); // Position en pourcentage (entre 0 et 1)
        const offset = percent * (rangeWidth - thumbWidth) + thumbWidth / 2;

        // Mise à jour de la position du label
        label.style.top = '40px'
        label.style.left = `${offset + 15}px`;
        label.textContent = `${value} €`; // Affiche la valeur actuelle
    };

    // Mettre à jour la position lors du rendu initial et à chaque interaction
    useEffect(() => {
        updateLabelPosition(); // Initialisation
        const range = rangeRef.current;

        if (range) {
        range.addEventListener("input", updateLabelPosition);
        }

        return () => {
        // Nettoyer l'événement pour éviter les fuites mémoire
        if (range) {
            range.removeEventListener("input", updateLabelPosition);
        }
        };
    }, [range]); // Réexécute l'effet si `range` change

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
                            <input onChange={handleCheck} type="checkbox" />
                            <label className="check"></label>
                        </div>
                        <div className="range-container">
                            <div className="range">Prix entre:
                            <input
                                ref={rangeRef}
                                className="range-input"
                                type="range"
                                value={range[1]}
                                onChange={handleRange}
                                max="500"
                            />
                            </div>
                            <p ref={labelRef} className="range-result">
                                {range[1]} €
                            </p>
                        </div>
                    </div>
                </div>
                {user === undefined ? (
                <div className="connection-button-container">
                    <button className="connection-button" onClick={() => {navigate('/signup')}}>S'inscrire</button>
                    <button className="connection-button" onClick={() => {navigate('/login')}}>Se connecter</button>
                </div>
                ) : (
                <div className="connection-button-container">
                    <button className="deconnection-button">Se déconnecter</button>
                </div>
                )}
                <button className="vends" onClick={() => {user ? navigate('/publish') : navigate('/login')}}>Vends tes articles</button>
            </div>
        </header>
    );
};

export default Header;
