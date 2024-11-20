const Hero = () => {
    return(
        <div className="hero-container">
            <img className="hero" src="hero.jpg" alt="Vinted hero" />
            <img className="dechirure" src="hero.svg" alt="dechirure" />
            <div className="tri">
                <h1>
                    Prêts à faire du tri dans vos placards ?
                </h1>
                <button className="start-sell">Commencer à vendre</button>
            </div>
        </div>
    )
}

export default Hero;