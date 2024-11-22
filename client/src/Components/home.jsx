import Header from './Home/header.jsx'
import Hero from './Home/hero.jsx'
import Content from './Home/content.jsx'

const Home = ({Cookies, user, setUser, data, setData, input, setInput, isChecked, setIsChecked, range, setRange}) => {
    return(
        <nav>
            <Header Cookies={Cookies} user={user} setUser={setUser} input={input} setInput={setInput} isChecked={isChecked} setIsChecked={setIsChecked} range={range} setRange={setRange}></Header>
            <Hero user={user}></Hero>
            <Content data={data} setData={setData} isChecked={isChecked} input={input} range={range}></Content>
        </nav>
    )
}

export default Home;