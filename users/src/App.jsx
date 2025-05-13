import './App.css';
import { getToken } from './getToken';
import { authFlow, getDataAuth } from './setup';
import { useEffect, useState } from 'react';

function App() {
  const [hasCode, setHasCode] = useState(false);

  const handleSetup = async () => {
    const codeChallenge = await getDataAuth();
    console.log("Code Challenge:", codeChallenge);
    authFlow(codeChallenge); // redirects to Spotify
  };

  const handleGetToken = () => {
    getToken();
  };

  return (
    <>
      <h1>Hola Mund34</h1>
      <button onClick={handleSetup}>START SETUP</button>
      <button onClick={handleGetToken}>GET TOKEN</button>
    </>
  );
}

export default App;
