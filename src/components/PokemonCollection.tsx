import React, { type FC } from "react";
import { IPokeDetail, IPokemonDetail } from "../types/interface";
import PokemonList from "./pokemonList/PokemonList";

interface IPokemonCollectionProps {
	pokemons: IPokemonDetail[];
	viewDetail: IPokeDetail;
	setViewDetail: React.Dispatch<React.SetStateAction<IPokeDetail>>;
}

const PokemonCollection: FC<IPokemonCollectionProps> = (props) => {
	const { pokemons, viewDetail, setViewDetail } = props;

	const handleSelectPokemon = (id: number) => {
		setViewDetail({
			id: id,
			isOpened: true,
		});
	};

	return (
		<>
			{/* handle close detail */}
			<section
				className={
					viewDetail.isOpened
						? "collection-container-active"
						: "collection-container"
				}
			>
				{viewDetail.isOpened ? <div className='overlay'></div> : <div></div>}
				{pokemons.map((pokemon, index) => (
					<div key={index} onClick={() => handleSelectPokemon(pokemon.id)}>
						<PokemonList
							viewDetail={viewDetail}
							setViewDetail={setViewDetail}
							name={pokemon.name}
							id={pokemon.id}
							abilities={pokemon.abilities}
							image={pokemon.sprites.front_default}
						/>
					</div>
				))}
			</section>
		</>
	);
};

export default PokemonCollection;
