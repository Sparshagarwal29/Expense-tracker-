import { Routes, Route , NavLink } from "react-router"
import { Home } from './pages/Home/index.jsx';
import { About } from './pages/About/index.jsx';
import { Profile } from './pages/Profile/index.jsx';
import { Login } from "./pages/Login/login.jsx";
import { PrivateRouter } from "./component/PrivateRouter.jsx";
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
                    <NavLink style={getStyle} to='/profile'> PROFILE</NavLink> ||
                    <NavLink style={getStyle} to='/login'>LOGIN</NavLink>

                    <Routes>
                        <Route path='/' element= {<Home /> } />
                        <Route path='/about' element= {<About /> } />
                        <Route path='/profile' element= {
                            <PrivateRouter>
                                <Profile />
                            </PrivateRouter>

                             } />
                        <Route path='/login' element= {<Login /> } />
                    </Routes>
               </div>
    </>
)
}


export default App
