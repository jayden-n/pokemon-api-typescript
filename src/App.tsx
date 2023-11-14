import { useEffect, useState, type FC } from "react";
import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import { IPokemon, IPokemonListResponse, IPokemons } from "./types/interface";

const baseUrl = "https://pokeapi.co/api/v2";

const App: FC = () => {
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);

	useEffect(() => {
		// get all pokemons
		async function fetchPokemons() {
			const res = await fetch(`${baseUrl}/pokemon?limit=20&offset=20`);
			const data: IPokemonListResponse = await res.json();

			// get each of the pokemon detail
			data.results.forEach(async (pokemon: IPokemons) => {
				const poke = await fetch(`${baseUrl}/pokemon/${pokemon.name}`);
				const pokeData: IPokemon = await poke.json();

				// have to make it an "array"
				setPokemons((prevPokemons) => [...prevPokemons, pokeData]);
			});
		}
		fetchPokemons();
	}, []);

	return (
		<>
			<div className='container'>
				<header className='pokemon-header'>Pokemon</header>
				<PokemonCollection pokemons={pokemons} />
			</div>
		</>
	);
};

export default App;
