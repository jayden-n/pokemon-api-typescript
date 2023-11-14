import { type FC } from "react";
import { IPokemon } from "../App";

interface IPokemonCollectionProps {
	pokemons: IPokemon[];
}

const PokemonCollection: FC<IPokemonCollectionProps> = (props) => {
	const { pokemons } = props;

	return (
		<>
			<div>pokemon</div>
		</>
	);
};

export default PokemonCollection;
