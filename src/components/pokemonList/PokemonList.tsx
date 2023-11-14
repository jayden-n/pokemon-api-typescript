import { type FC } from "react";
import "./pokemonList.css";

interface IPokemonListProps {
	name: string;
	id: number;
	image: string;
}

const PokemonList: FC<IPokemonListProps> = (props) => {
	const { name, id, image } = props;

	return (
		<div className=''>
			<section className='pokemon-list-container'>
				<p className='pokemon-name'>{name}</p>
				<img src={image} alt='pokemon name' />
			</section>
		</div>
	);
};

export default PokemonList;
