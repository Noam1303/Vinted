import Header from './SignUp/header.jsx'
import Create from './SignUp/create.jsx'

const SignUp = ({Cookies, user, setUser}) => {
    return(
        <nav>
            <Header Cookies={Cookies} user={user} setUser={setUser}></Header>
            <Create Cookies={Cookies} setUser={setUser}></Create>
        </nav>
    )
}

export default SignUp;