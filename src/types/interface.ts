export interface IPokemons {
	name: string;
	url: string;
}

export interface IPokemon {
	id: number;
	name: string;
	sprites: {
		front_default: string;
	};
}

export interface IPokemonListResponse {
	results: IPokemons[];
}
