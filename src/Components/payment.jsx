import Header from './Payment/header.jsx'
import Content from './Payment/content.jsx'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useLocation} from 'react-router-dom';

const Payment = ({Cookies, user, setUser}) => {

    const location = useLocation();

        // chargement de la clée publique stripe
        
        const stripePromise = loadStripe(
            "pk_test_51QPKfxKGmNXqdkjYSgVzqnKRti84Rv9N7jlw5XnMU7lHYqk5mOjVQBvmFf0a7f2hWx1UYgro2I2RdWy3erwGJ3TZ007yj7yqRs"
        );        

        // si un client malicieux va sur la page payment sans passer par une offre (direcment dans l'url), alors elle se prenda une vilaine alert 😠
        if(location.state === null){
            alert("Offer not found")
        }   

        // on implemente les valeurs de prix, du nom du vendeur, de la description du produit, du  nom de l'article et de l'id de la'rticle dans les options 
        // qui seront données dans le backend qui gera la transaction
    
        const options = {
            // Type de transaction
            mode: "payment",
            // Montant de la transaction
            amount: Number(location.state.product_price * 100),
            // Devise de la transaction
            currency: "usd",
            name: location.state.product_name,
            description: location.state.product_description,
            username: location.state.username,
            id: location.state.id,
            // On peut customiser l'apparence ici
            appearance: {
            /*...*/
            },
        };
    return(
            <nav>
                <Header Cookies={Cookies} user={user} setUser={setUser}></Header>
                <div className="payment-container">
                    <Elements stripe={stripePromise} options={options}>
                        <Content options={options}/>
                    </Elements>
                </div>
            </nav>
    )
}

export default Payment;