import React, { useState } from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import PokemonSearch from '../components/pokemonSearch';
import PokemonDetails from '../components/pokemonDetails';

const LookupPage = () => {
  const [pokemonData, setPokemonData] = useState(null);

  const getDataPokemon = async (pokemonId) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();

      const chosen = {
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        type: data.types.map((type) => type.type.name),
        abilities: data.abilities.map((ability) => ability.ability.name),
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          baseStat: stat.base_stat,
        })),
      };
      setPokemonData(chosen);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <Layout pageTitle="Lookup any Pokemon!">
      <p>Enter a Pokemon's ID to see their information!</p>
      <PokemonSearch onFetch={getDataPokemon} />
      {pokemonData && (
        <div>
          <PokemonDetails pokemonData={pokemonData}></PokemonDetails>
        </div>
      )}
    </Layout>
  );
};

export const Head = () => <Seo title="Team Page" />;
export default LookupPage;
