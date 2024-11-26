import Header from './Offer/header.jsx'
import Content from './Offer/content.jsx'

const Offer = ({Cookies, user, setUser}) => {
    return(
        <nav>
            <Header Cookies={Cookies} user={user} setUser={setUser}></Header>
            <Content user={user}></Content>
        </nav>
    )
}

export default Offer;