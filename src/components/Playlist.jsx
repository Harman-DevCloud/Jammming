import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';

function Playlist({ playlist, setPlaylist, playlistName, setPlaylistName, removeSong }) {

    const savePlaylistToSpotify = async () => {
        alert("Spotify authentication required to save playlist!");
    };

    return (
        <div className='w-[50vw] bg-[#231657] p-2 rounded-md'>
            <input
                className='text-3xl pt-3 placeholder:text-2xl placeholder:text-white p-2 focus:outline-none text-white font-bold'
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <hr />
            <ul className='mt-4'>
                {playlist.map((track) => (
                    <li key={track.id} className='border-b-2'>
                        <h3>{track.name}</h3>
                        <div className='flex gap-5 justify-between'>
                            <span>{track.artists.map((a) => a.name).join(', ')}</span>
                            <button className='cursor-pointer ' onClick={() => removeSong(track.id)}>
                                <RemoveIcon className='hover:text-red-700' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='flex justify-center'>
                <button
                    className="rounded-full block justify-center p-2 w-fit px-8 mt-4 bg-green-500 hover:bg-green-700 cursor-pointer"
                    onClick={savePlaylistToSpotify}>
                    Save to Spotify
                </button>

            </div>

        </div>
    );
}

export default Playlist;
