import React, { useState } from 'react';

const PokemonSearch = ({ onFetch }) => {
  const [pokemonId, setPokemonId] = useState('');

  const handleChange = (event) => {
    setPokemonId(event.target.value);
  };

  const handleFetch = () => {
    if (pokemonId) {
      onFetch(pokemonId);
    }
  };
  
  return (
    <div>
      <label htmlFor="pokemonId" style={{ marginRight: '5px' }}>
        Enter Pokémon ID:
      </label>
      <input
        type="number"
        id="pokemonId"
        name="pokemonId"
        min="1"
        max="1024"
        value={pokemonId}
        onChange={handleChange}
      />
      <button onClick={handleFetch} style={{ marginLeft: '10px' }}>
        Display Pokemon
      </button>
      
    </div>
  );
};

export default PokemonSearch;