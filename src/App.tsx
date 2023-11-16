import { useEffect, useState, type FC } from "react";
import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import {
	IPokeDetail,
	IPokemon,
	IPokemonListResponse,
	IPokemons,
} from "./types/interface";

const baseUrl = "https://pokeapi.co/api/v2";

const App: FC = () => {
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);
	const [nextUrl, setNextUrl] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [viewDetail, setViewDetail] = useState<IPokeDetail>({
		// store the id for when user choose 1 pokemon
		id: 0,
		isOpened: false,
	});

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
				setIsLoading(false);
			});
		}

		fetchPokemons();
	}, []);

	const handleLoadMore = async () => {
		setIsLoading(true);
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
		setIsLoading(false);
	};

	return (
		<>
			<div className='container'>
				<header className='pokemon-header'>Pokemon</header>
				<PokemonCollection
					pokemons={pokemons}
					viewDetail={viewDetail}
					setViewDetail={setViewDetail}
				/>
				{!viewDetail.isOpened && (
					<div className='btn'>
						<button onClick={handleLoadMore}>
							{isLoading ? "Loading..." : "Load more!"}
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default App;
