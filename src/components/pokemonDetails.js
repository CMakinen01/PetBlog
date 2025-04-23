import React from 'react';

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export const hyphenRemover = (string) => {//removes hyphens from names
    return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
};

const statColor = (n) => {
    if (n < 30)
        return 'red';
    if (n < 51)
        return '#FF7F24'; //hex for a more unique orange
    if (n < 100)
        return '#FFD700'; //hex for a yellow easier on the eyes
    if (n < 150)
        return 'green';
    return 'teal';
};


const PokemonDetails = ({ pokemonData }) => {
    if (!pokemonData) return null;
  
    return (
      <div>
        <h3>{hyphenRemover(pokemonData.name)} (ID: {pokemonData.id})</h3>
        <img src={pokemonData.image} alt={pokemonData.name} />
        <p>Type: {pokemonData.type.map(capitalize).join(', ')}</p>
        <p>Abilities: {pokemonData.abilities.map(hyphenRemover).join(', ')}</p>
        <h4>Stats:</h4>
        <ul>
          {pokemonData.stats.map((stat) => (
            <li key={stat.name}>
              {hyphenRemover(stat.name)}: 
              <span style= {{ color: statColor(stat.baseStat) }}>{ ' ' + stat.baseStat}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PokemonDetails;