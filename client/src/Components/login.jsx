import Header from './LogIn/header.jsx'
import Connection from './LogIn/connection.jsx'

const LogIn = ({user, input, setInput}) => {
    return(
        <nav>
            <Header user={user} input={input} setInput={setInput}></Header>
            <Connection></Connection>
        </nav>
    )
}

export default LogIn;