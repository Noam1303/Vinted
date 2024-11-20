import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = ({user, input, setInput}) => {

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    return (
        <header>
            <div className="header-container">
                <img src="logo.png" alt="Vinted logo" className="logo" />
                <div className="filtre-not-home">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="glass-not-home" />
                    <input
                        className="searchbar-not-home"
                        type="text"
                        value={input}
                        placeholder="Recherche des articles"
                        onChange={handleChange}
                    />  
                </div>
                {user === undefined ? (
                <div className="connection-button-container">
                    <button className="connection-button">S'inscrire</button>
                    <button className="connection-button">Se connecter</button>
                </div>
                ) : (
                <div className="connection-button-container">
                    <button className="deconnection-button">Se déconnecter</button>
                </div>
                )}
                <button className="vends">Vends tes articles</button>
            </div>
        </header>
    );
};

export default Header;
