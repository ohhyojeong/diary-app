import React ,{useState}from 'react'
import Login from "./components/login";
import Diary_app from "./components/diary_app";
import { Routes, Route } from 'react-router-dom'

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null) //현재 로그인한 사용자

    return (
        <Routes>
        <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/dirary_app" element={<Diary_app 
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}/>} />
        </Routes>
    );
}

export default App