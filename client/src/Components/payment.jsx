import Header from './Payment/header.jsx'
import Content from './Payment/content.jsx'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useLocation} from 'react-router-dom';

const Payment = ({Cookies, user, setUser}) => {

    const location = useLocation();
    
        const stripePromise = loadStripe(
            "pk_test_51QPKfxKGmNXqdkjYSgVzqnKRti84Rv9N7jlw5XnMU7lHYqk5mOjVQBvmFf0a7f2hWx1UYgro2I2RdWy3erwGJ3TZ007yj7yqRs"
        );        
        
    
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