import React, { useState } from 'react'; 
import Layout from '../components/layout';
import Seo from '../components/seo';
import PokemonSearch from '../components/pokemonSearch';
import PokemonDetails from '../components/pokemonDetails';
import TeamBuilder from '../components/teamBuilder';
import RateTeam from '../components/rateTeam';

const TeamPage = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [team, setTeam] = useState([]);
  const [showTeam, setShowTeam] = useState(false);
  const [showRating, setShowRating] = useState(false);

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

  const addToTeam = () => {
    if (team.length < 6 && pokemonData) {
      setTeam([...team, { id: pokemonData.id, name: pokemonData.name, type: pokemonData.type }]);
    } else if (team.length >= 6) {
      alert("Your Team is full!");
    }
  };
  const clickShowTeam = () => {
    setShowTeam(!showTeam);//adds the ability to conditionally render the visibility of team
  };

  return (
    <Layout pageTitle="Build a Pokemon Team!">
      <p>Enter a Pokemon's ID to add them to your team!</p>
      <p>Press the "Rate Team" button to see your team's type matchups!</p>
      <PokemonSearch onFetch={getDataPokemon} />
      <p></p>
      
      
      
      

      
      {pokemonData && (//shows when a Pokemon is rendered
        <div>
          <PokemonDetails pokemonData={pokemonData} />
          <button onClick={addToTeam}>Add To Team!</button>
          
          <button style={{ marginLeft: '10px' }} onClick={() => { 
            setTeam([]); 
            setShowRating(false); 
            }}>
          Clear Team!
          </button>

          <button style={{ marginLeft: '10px' }}onClick={clickShowTeam}>Show Your Team!</button>

          <button style={{ marginLeft: '10px' }} onClick={() => setShowRating(true)}>Rate Your Team!</button>
          {showRating && <RateTeam team={team} />}

          
        </div>
      )}
      {showTeam && <TeamBuilder team={team} />}
      </Layout>
  );
};

export const Head = () => <Seo title="Team Page" />;
export default TeamPage;
