import React, { useState } from 'react';
import { spotifyAPI } from '../spotifyAPI';

const Dashboard = () => {
  const selectTypes = [
    'album', 'artist', 'playlist', 'track',
    'show', 'episode', 'audiobook',
  ];

  const [search, setSearch] = useState({ song: '', types: '' });
  const [deviceID, setDeviceID] = useState("");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState([]);

  const getAccessToken = () => localStorage.getItem('access_token');

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();
    params.append('q', encodeURIComponent(`remaster track:${search.song}`));
    params.append('type', search.types);

    const url = `https://api.spotify.com/v1/search?${params.toString()}`;
    const token = getAccessToken();
    const response = await spotifyAPI(url, 'GET', null, token);

    if (response && response.tracks) {
      setResults(response.tracks.items);
    }
  };

  const getDeviceId = async () => {
    const token = getAccessToken();
    const url = "https://api.spotify.com/v1/me/player/devices";
    const response = await spotifyAPI(url, 'GET', null, token);

    if (response?.devices?.[0]?.id) {
      console.log(response.devices[0].id);
      setDeviceID(response.devices[0].id);
    }
  };

  const handlePlay = async (song) => {
    const token = getAccessToken();
    const data = { uris: [song] };
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
    const play = await spotifyAPI(url, 'PUT', JSON.stringify(data), token);
    console.log(play);
  };

  const handleAddFavorite = (favorite) => {
    const isAlreadyFav = favorites.some(fav => fav.id === favorite.id);
    if (isAlreadyFav) {
      console.log("Ya estaba en favs");
      setFavorites(prev => prev.filter(el => el.id !== favorite.id));
    } else {
      setFavorites(prev => [...prev, favorite]);
    }
  };

  const createFavs = async (favs) => {
    const url = "http://localhost:3000/favorites";

    const simplifiedItems = favs.map(track => ({
      id: track.id,
      name: track.name,
      uri: track.uri,
      album: track.album?.name,
      albumImage: track.album?.images?.[0]?.url || null, // ✅ Agregado
      artists: track.artists?.map(a => a.name),
      href: track.href,
      duration_ms: track.duration_ms
    }));

    const jwtToken = localStorage.getItem('jwt_token');
    if (!jwtToken) {
      console.error("No JWT token found");
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ items: simplifiedItems })
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(`HTTP ${response.status} - ${errorRes.error}`);
      }

      const result = await response.json();
      console.log("Favoritos guardados:", result);
    } catch (error) {
      console.error("Error al guardar favoritos:", error.message);
    }
  };

  const saveFavs = () => {
    createFavs(favorites);
  };

  const getSavedFavorites = async () => {
    const jwtToken = localStorage.getItem('jwt_token');
    if (!jwtToken) {
      console.error("No JWT token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/favorites", {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(`HTTP ${response.status} - ${errorRes.error}`);
      }

      const data = await response.json();
      setSavedFavorites(data);
    } catch (error) {
      console.error("Error al obtener favoritos:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <button onClick={getDeviceId}>GET DEVICE ID</button>
      <button onClick={saveFavs}>SAVE FAVS</button>
      <button onClick={getSavedFavorites}>GET FAVS</button>

      <p>Search</p>
      <input
        name="song"
        type="text"
        value={search.song}
        onChange={handleChange}
      />
      <p>Select Types:</p>
      <select name="types" value={search.types} onChange={handleChange}>
        {selectTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button onClick={handleSearch}>Search</button>

      {results.map((result, idx) => (
        <div key={idx} className="song-result">
          <img src={result.album.images[0]?.url} width={150} alt="Album cover" />
          <div style={{ marginLeft: '1rem' }}>
            <p>{result.album.name}</p>
            <button onClick={() => handlePlay(result.uri)}>Play</button>
            <button onClick={() => handleAddFavorite(result)}>Add Favorite</button>
          </div>
        </div>
      ))}

    <h2>Favoritos guardados</h2>
    {savedFavorites.length > 0 ? (
      savedFavorites.flatMap(fav => fav.items).map((result, idx) => (
        <div key={idx} className="song-result">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ marginRight: '1rem' }}>
              <img 
                src={result.albumImage || "https://storage.googleapis.com/pr-newsroom-wp/1/2023/11/Spotify_Logo_CMYK_Green.png"} 
                width={150} 
                alt="Album cover" 
              />
            </div>
            <div>
              <p><strong>{result.name}</strong></p>
              <p>{result.album}</p>
              <p>{result.artists?.join(', ')}</p>
              <button onClick={() => handlePlay(result.uri)}>Play</button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No hay favoritos guardados aún.</p>
    )}
    </div>
  );
};

export default Dashboard;