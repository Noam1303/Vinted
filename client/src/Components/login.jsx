import Header from './LogIn/header.jsx'
import Connection from './LogIn/connection.jsx'

const LogIn = ({Cookies, user, setUser, input, setInput}) => {
    return(
        <nav>
            <Header Cookies={Cookies} user={user} setUser={setUser} input={input} setInput={setInput}></Header>
            <Connection Cookies={Cookies} setUser={setUser}></Connection>
        </nav>
    )
}

export default LogIn;