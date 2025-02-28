import React, {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import SearchList from './components/SearchList'
import Playlist from './components/Playlist'
import Footer from './components/Footer'

const client_id = '560f96c49d4c4cbaa8fbfe37594fc0c2';
const client_secret = '307efd60ef4c4a978071607e5239f387';

function App() {
  const [song, setSong] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessToken();
        setToken(accessToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  const getAccessToken = async () => {
    const authResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!authResponse.ok) {
      throw new Error('Failed to retrieve Spotify token');
    }

    const authData = await authResponse.json();
    return authData.access_token;
  };

  const addSong = (song) => {
    if (!playlist.some((track) => track.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const removeSong = (songId) => {
    setPlaylist(playlist.filter((track) => track.id !== songId));
  };


  return (
    <div className="absolute -z-0 bg-cover bg-center bg-no-repeat h-full w-full bg-[url(./assets/cover.jpg)] text-white">
      <div className='bg-[#030d3f] p-4 text-center text-3xl font-semibold'>
        <h1>Ja<span className='text-[#6c41ec]'>mmm</span>ing</h1>
      </div>

      <SearchBar song={song} setSong={setSong} tracks={tracks} setTracks={setTracks} token={token}/>
      <div className='flex flex-row px-20 flex-wrap md:flex-nowrap justify-around mt-15 gap-10'>
        <SearchList tracks={tracks} addSong={addSong}/>
        <Playlist playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} removeSong={removeSong} token={token}/>
      </div>
      <Footer/>
      
    </div>
  )
}

export default App