import { useNavigate } from 'react-router';
import './App.css';
import { getToken } from './getToken';
import { authFlow, getDataAuth } from './setup';
import { useEffect, useState } from 'react';

function App() {
  const [hasCode, setHasCode] = useState(false);

  const navigate=useNavigate();
  const handleSetup = async () => {
    const codeChallenge = await getDataAuth();
    console.log("Code Challenge:", codeChallenge);
    authFlow(codeChallenge); // redirects to Spotify
  };

  const handleGetToken = () => {
    getToken();
    navigate('/dashboard')
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
      <button onClick={handleSetup}>START SETUP</button>
      <button onClick={handleGetToken}>GET TOKEN</button>
    </div>
  );
}

export default App;
