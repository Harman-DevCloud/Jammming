import React from 'react';
import AddIcon from '@mui/icons-material/Add';

function SearchList({ tracks, addSong }) {
  return (
    <div className='w-[50vw] bg-[#231657] p-2 rounded-md'>
      <h1 className='text-2xl font-bold'>Results</h1>
      <ul className='mt-4'>
        {tracks.map((song) => (
          <li key={song.id} className='border-b-2 p-2'>
            <h3>{song.name}</h3>
            <div className='flex gap-5 justify-between'>
              <span>{song.artists.map((a) => a.name).join(', ')} | {song.album.release_date}</span>
              <button className='cursor-pointer' onClick={() => addSong(song)}>
                <AddIcon className='hover:text-green-700' />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchList;
