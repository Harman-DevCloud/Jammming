import React, {useState} from 'react'
import SearchBar from './components/SearchBar'
import SearchList from './components/SearchList'
import Playlist from './components/Playlist'
import Footer from './components/Footer'


function App() {
  const [song, setSong] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');

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

      <SearchBar song={song} setSong={setSong} tracks={tracks} setTracks={setTracks} />
      <div className='flex flex-row px-20 flex-wrap md:flex-nowrap justify-around mt-15 gap-10'>
        <SearchList tracks={tracks} addSong={addSong}/>
        <Playlist playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} removeSong={removeSong}/>
      </div>
      <Footer/>
      
    </div>
  )
}

export default App