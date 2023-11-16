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
	next?: string;
}

export interface IPokeDetail {
	id: number;
	isOpened: boolean;
}

export interface IPokemonDetail extends IPokemon {
	// optional abilities
	abilities?: {
		ability: string;
		name: string;
	}[];
}
