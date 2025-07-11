import "./App.css";
import ActionAreaCard from "./ActionAreaCard";
import { useEffect, useState } from "react";

type PokemonType = {
  name: string;
  image: string;
  description: string;
};

function App() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  let limit = 6;
  useEffect(() => {
    const fetchAllPokemons = async () => {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      setTotalCount(data.count);

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();

          const speciesResponse = await fetch(details.species.url);
          const species = await speciesResponse.json();

          const flavor = species.flavor_text_entries.find(
            (entry: any) => entry.language.name === "en"
          );

          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            description: flavor
              ? flavor.flavor_text
              : "No description available.",
          };
        })
      );

      setPokemons(pokemonDetails);
      setLoading(false);
    };

    fetchAllPokemons();
  }, [offset]);

  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNext = () => {
    if (offset + limit < totalCount) {
      setOffset((prev) => prev + limit);
    }
  };

  return (
    <>
      <h2>Pokémon data</h2>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="pokemon-container">
          {pokemons.map((p, index) => (
            <ActionAreaCard
              key={index}
              Name={p.name}
              Description={p.description}
              src={p.image}
            />
          ))}
        </div>
      )}
      <div style={{ margin: "20px", textAlign: "center" }}>
        <div style={{ margin: "10px" }}>
          <button onClick={handlePrevious} disabled={offset === 0}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={offset + limit >= totalCount}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
