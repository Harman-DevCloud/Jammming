import React, { useState } from 'react';

function SearchBar({song,setSong,setTracks,token}) {
  const getSongs = async () => {
    try {
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(song)}&type=track&limit=6`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!searchResponse.ok) {
        throw new Error('Failed to fetch tracks');
      }

      const searchData = await searchResponse.json();
      setTracks(searchData.tracks.items); 

    } catch (error) {
      console.error('Error fetching data from Spotify:', error);
    }
  };

  const handleChange = (e) => {
    setSong(e.target.value);
  };

  return (
    <div className="mt-15 flex flex-col justify-center items-center gap-10">
      <div>
        <input
          className="p-2 focus:outline-none text-black w-[16rem] md:w-[25rem] bg-white placeholder-black rounded-md"
          type="text"
          value={song}
          placeholder="Search Song"
          onChange={handleChange}
        />
      </div>

      <div>
        <button
          className="w-fit rounded-full p-2 px-8 bg-[#030d3f] hover:bg-[#6c41ec] cursor-pointer"
          onClick={getSongs}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
