import {Routes, Route} from "react-router-dom"
import './styles/App.sass'
import Layout from "./components/layout/Layout"
import Login from "./pages/auth/Login"
import Registry from "./pages/auth/Registry"
import RegistrationData from "./pages/auth/RegistrationData"
import Profile from "./pages/profile/Profile"


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Login/>}/>
                <Route path="registry" element={<Registry/>}/>
                <Route path="registry-data" element={<RegistrationData/>}/>
                <Route path="profile/:id" element={<Profile/>}/>
            </Route>
        </Routes>
    )
}

export default App
