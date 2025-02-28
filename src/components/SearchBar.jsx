import React, { useState } from 'react';

function SearchBar({song,setSong,setTracks}) {

  const client_id = '560f96c49d4c4cbaa8fbfe37594fc0c2';
  const client_secret = '307efd60ef4c4a978071607e5239f387';

  const getSongs = async () => {
    try {
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
      const accessToken = authData.access_token;

      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(song)}&type=track&limit=8`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
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
