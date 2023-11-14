import { useEffect, useState, type FC } from "react";
import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import { IPokemon, IPokemonListResponse, IPokemons } from "./types/interface";

const baseUrl = "https://pokeapi.co/api/v2";

const App: FC = () => {
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);
	const [nextUrl, setNextUrl] = useState<string>();

	useEffect(() => {
		// get all pokemons
		async function fetchPokemons() {
			const res = await fetch(`${baseUrl}/pokemon?limit=20&offset=20`);
			const data: IPokemonListResponse = await res.json();

			// load more function
			setNextUrl(data.next);

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

	const handleLoadMore = async () => {
		// fix: make an "if" check
		// due to the fact that nextUrl is declared as string | undefined, and the fetch function expects a URL (a string or a Request object), not undefined
		if (nextUrl) {
			const res = await fetch(nextUrl);
			const data: IPokemonListResponse = await res.json();

			// next after next data...
			setNextUrl(data.next);

			data.results.forEach(async (pokemon: IPokemons) => {
				const pokeNext = await fetch(`${baseUrl}/pokemon/${pokemon.name}`);
				const pokeNextData: IPokemon = await pokeNext.json();

				setPokemons((prevPokemons) => [...prevPokemons, pokeNextData]);
			});
		}
	};

	return (
		<>
			<div className='container'>
				<header className='pokemon-header'>Pokemon</header>
				<PokemonCollection pokemons={pokemons} />
				<div className='btn'>
					<button onClick={handleLoadMore}>Load more</button>
				</div>
			</div>
		</>
	);
};

export default App;
