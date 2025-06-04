import { useNavigate } from 'react-router';
import './App.css';
import { authFlow, getDataAuth } from './setup';
import { useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';

function App() {
  const [hasCode, setHasCode] = useState(false);

  const navigate=useNavigate();

  const handleRegister = () => {
    navigate('/register')
  };

  const handleLogin = () => {
    navigate('/login')
  };

 const getUsers = async() => {
  const url = "http://localhost:3000/api/users";
   const res = await spotifyAPI(url, 'GET', null);
   console.log(res);
 }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="container">
      <h1>Spotify Login</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default App;

//<button onClick={handleSetup}>START SETUP</button>
//<button onClick={handleGetToken}>GET TOKEN</button>