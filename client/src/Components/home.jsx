import Header from './Home/header.jsx'
import Hero from './Home/hero.jsx'
import Content from './Home/content.jsx'

const Home = ({user, data, setData, input, setInput, isChecked, setIsChecked, range, setRange}) => {
    return(
        <nav>
            <Header user={user} input={input} setInput={setInput} isChecked={isChecked} setIsChecked={setIsChecked} data={data}  setData={setData} range={range} setRange={setRange}></Header>
            <Hero></Hero>
            <Content data={data} input={input} range={range}></Content>
        </nav>
    )
}

export default Home;