import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Content = ({options}) => {

    const result = () => {
        alert("Payment done")
        navigate('/')
    }

    const navigate = useNavigate()
    
    // Permet de faire une requête à Stripe pour confirmer le paiement
    const stripe = useStripe();
    // Permet de récupérer le contenu des inputs
    const elements = useElements();

    // State qui gère les messages d'erreurs
    const [errorMessage, setErrorMessage] = useState(null);
    // State qui gère le fait que le paiement a été effectué
    const [completed, setCompleted] = useState(false);
    // State qui gère le fait qu'on est en train de payer
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        console.log(1);
        
    event.preventDefault();
    // On commence à charger
    setIsLoading(true);

    if (elements == null) {
        return;
    }
    console.log(2);
    
    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
        // Affiche l'erreur en question
        setErrorMessage(submitError.message);
        return;
    }
    console.log(3);

    console.log(options.amount);
    
    

    // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
    const response = await axios.post("https://site--test-backend--7g4fljlbl5js.code.run/payment", {
        username: options.username,
        id: options.id,
        amount: options.amount,
        currency: options.currency,
        description: options.description,
    });
    console.log(4);
    

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements,
        clientSecret,
        // Éventuelle redirection
        confirmParams: {
        return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
    });
    console.log(5);
    

    // Si une erreur a lieu pendant la confirmation
    if (stripeResponse.error) {
        // On la montre au client
        setErrorMessage(stripeResponse.error.message);
    }
    console.log(6);
    

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
    }
    // On a fini de charger
    setIsLoading(false);
    };

    return completed ? (
    result()
    ) : (
        <div className="payment-container">
            <form className="payment-form" onSubmit={handleSubmit}>
                <h4>
                    Résumé de la commande
                </h4>
                <div><p>Commande</p><p>{options.amount/100} €</p></div>
                <div><p>Frais de protection acheteurs</p><p>1.00 €</p></div>
                <div><p>Frais de port</p><p>2.00 €</p></div>
                <section></section>
                <div><h3>Total</h3><h3>{options.amount/100 + 3} €</h3></div>

                <div>Il ne vous reste plus qu'un étape pour vous offrir {options.name}. Vous allez payer {options.amount/100 + 3} (frais de protection et frais de port inclus).
                </div>
                <nav>
                    
                <PaymentElement />
                <button className="green" type="submit" disabled={!stripe || !elements || isLoading}>
                Pay
                </button>
                {/* Éventuel message d'erreur */}
                {errorMessage && <div>{errorMessage}</div>}
                </nav>
            </form>
        </div>
    );
};

export default Content;