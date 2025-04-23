import React, { useEffect, useState } from 'react';
import { capitalize } from './pokemonDetails';
import { hyphenRemover } from './pokemonDetails';

const getTypes = async (type) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  return await response.json();
};

const RateTeam = ({ team }) => {
  const [ineffective, setIneffective] = useState([]);
  const [effective, setEffective] = useState([]);

  useEffect(() => {
    const calculateMatchups = async () => {
      let allEffectiveTypes = new Map();
      let allIneffectiveTypes = new Map();

      for (const pokemon of team) {
        const pokemonTypes = pokemon.type;
        const pokemonEffective = new Set(); //These 2 Sets will look at a specific Pokemon's typing, to better handle dual-type cases
        const pokemonIneffective = new Set();
        const pokemonImmune = new Set();

        for (const type of pokemonTypes) {
          const typeData = await getTypes(type);

          if (typeData && typeData.damage_relations) {
            // Add weak types to the Pokemon specific array
            typeData.damage_relations.double_damage_from.forEach((weakTo) => {
              pokemonEffective.add(weakTo.name);
            });

            // Add resisted types to the Pokemon specific array
            typeData.damage_relations.half_damage_from.forEach((resist) => {
              pokemonIneffective.add(resist.name);
            });
            //Adds immunities for edge cases like Charizard being weak to Ground because of Fire but immune overall because of FLying
            typeData.damage_relations.no_damage_from.forEach((immune) => {
                pokemonIneffective.add(immune.name);
              });

            //Adds immunities for Pokemon that arent weak to the type they are also immune against
            typeData.damage_relations.no_damage_from.forEach((immune) => {
            pokemonImmune.add(immune.name);
            });
          }
        }

        // Logic to check if dual typed Pokemon's typings cancel out each other
        pokemonEffective.forEach((type) => {
            if (pokemonIneffective.has(type)) {
                pokemonEffective.delete(type);
                pokemonIneffective.delete(type);
            }
        });

        // I chose to not include immunities in this list, may add on later
        pokemonIneffective.forEach((type) => {
            if (pokemonImmune.has(type)) {
                pokemonIneffective.delete(type); 
            }
        });

        // Add to array after dual type considered
        if (pokemonEffective.size > 0) {
          allEffectiveTypes.set(pokemon.name, [...pokemonEffective]);
        }
        if (pokemonIneffective.size > 0) {
          allIneffectiveTypes.set(pokemon.name, [...pokemonIneffective]);
        }
      }

      setEffective(Array.from(allEffectiveTypes));
      setIneffective(Array.from(allIneffectiveTypes));
    };

    if (team.length > 0) {
      calculateMatchups();
    }
  }, [team]);

  return (
    <div>
      <h3>Team Type Matchups</h3>

      <h4>Types Ineffective Against Your Team:</h4>
      {ineffective.length > 0 ? (
        <ul>
          {ineffective.map(([name, types]) => (
            <li key={name}>
              {hyphenRemover(name)}: {types.map(capitalize).join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your team resists no types</p>
      )}

      <h4>Types Super Effective Against Your Team:</h4>
      {effective.length > 0 ? (
        <ul>
          {effective.map(([name, types]) => (
            <li key={name}>
              {hyphenRemover(name)}: {types.map(capitalize).join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No types are super effective against your team</p>
      )}
    </div>
  );
};

export default RateTeam;
