import Header from './Publish/header.jsx'
import Content from './Publish/content.jsx'

const Publish = ({Cookies, user, setUser}) => {
    return(
        <nav>
            <Header Cookies={Cookies} user={user} setUser={setUser}></Header>
            <Content user={user}></Content>
        </nav>
    )
}

export default Publish;