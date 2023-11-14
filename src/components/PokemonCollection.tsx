import { type FC } from "react";
import { IPokemon } from "../types/interface";
import PokemonList from "./pokemonList/PokemonList";

interface IPokemonCollectionProps {
	pokemons: IPokemon[];
}

const PokemonCollection: FC<IPokemonCollectionProps> = (props) => {
	const { pokemons } = props;

	return (
		<>
			<section className='collection-container'>
				{pokemons.map((pokemon) => (
					<div key={pokemon.id}>
						<PokemonList
							name={pokemon.name}
							id={pokemon.id}
							image={pokemon.sprites.front_default}
						/>
					</div>
				))}
			</section>
		</>
	);
};

export default PokemonCollection;
