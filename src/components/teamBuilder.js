import React from 'react';
import { capitalize, hyphenRemover } from './pokemonDetails';

const TeamBuilder = ({ team }) => {
  return (
    <div>
      <h3>Your Pokémon Team</h3>
      <ul>
        {team.map((pokemon) => (
          <li key={pokemon.id}>
            {hyphenRemover(pokemon.name)} (ID: {pokemon.id}) (Type: {pokemon.type.map(capitalize).join(', ')})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamBuilder;
