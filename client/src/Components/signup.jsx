import Header from './SignUp/header.jsx'
import Create from './SignUp/create.jsx'

const SignUp = ({user, setUser}) => {
    return(
        <nav>
            <Header user={user}></Header>
            <Create setUser={setUser}></Create>
        </nav>
    )
}

export default SignUp;