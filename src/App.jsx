
import Diary_app from "./components/diary_app";
import { Routes, Route } from 'react-router-dom'
import Login from "./components/login";


const App = () => {
    //const [loggedInUser, setLoggedInUser] = useState(null) //현재 로그인한 사용자

    return (
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dirary_app" element={<Diary_app />} />
        </Routes>
    );
}

export default App