import Header from './Payment/header.jsx'
import Content from './Payment/content.jsx'

const Payment = ({Cookies, user, setUser}) => {
    return(
        <nav>
            <Header Cookies={Cookies} user={user} setUser={setUser}></Header>
            <Content></Content>
        </nav>
    )
}

export default Payment;