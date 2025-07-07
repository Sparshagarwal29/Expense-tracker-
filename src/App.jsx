import { Routes, Route , NavLink } from "react-router"
import { Home } from './pages/Home/index.jsx';
import { About } from './pages/About/index.jsx';
import { Profile } from './pages/Profile/index.jsx';
// import './App.css'


function App() {



    const getStyle = ({isActive}) =>{
        return {
            color : isActive ? 'red' : ''
        }
    }
return (
    <>
        <div className="rout">
                    <NavLink style={getStyle} to='/'>HOME</NavLink> ||  
                    <NavLink style={getStyle} to='/about'> ABOUT</NavLink> ||  
                    <NavLink style={getStyle} to='/profile'> PROFILE</NavLink>

                    <Routes>
                        <Route path='/' element= {<Home /> } />
                        <Route path='/about' element= {<About /> } />
                        <Route path='/profile' element= {<Profile /> } />
                    </Routes>
               </div>
    </>
)
}


export default App
