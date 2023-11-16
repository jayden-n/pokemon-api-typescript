/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState, type FC } from "react";
import { IPokeDetail } from "../../types/interface";
import "./pokemonList.css";

interface IPokemonListProps {
	name: string;
	id: number;
	image: string;
	abilities:
		| {
				name: string;
				ability: string;
		  }[]
		| undefined;
	viewDetail: IPokeDetail;
	setViewDetail: React.Dispatch<React.SetStateAction<IPokeDetail>>;
}

const PokemonList: FC<IPokemonListProps> = (props) => {
	const { name, id, image, abilities, viewDetail, setViewDetail } = props;
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		// Check if the current Pokemon is selected => true
		setIsSelected(id === viewDetail.id);
	}, [id, viewDetail.id]);

	const handleCloseDetail = (event: React.MouseEvent<HTMLParagraphElement>) => {
		event.preventDefault();
		// only be activated in a child close detail, not the whole parent
		event.stopPropagation();

		setViewDetail({
			id: 0,
			isOpened: false,
		});
	};

	return (
		<div className=''>
			{isSelected ? (
				<section className='pokemon-list-detailed'>
					<div className='detail-container'>
						<p
							className='detail-close'
							onClick={(event) => handleCloseDetail(event)}
						>
							X
						</p>
						<div className='detail-info'>
							<img src={image} alt='pokemon pic' className='detail-img' />
							<p className='detail-name'>{name}</p>
						</div>
						<div className='detail-skill'>
							<p className='detail-ability'>Abilities: </p>
							{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
							{abilities?.map((ab: any, index) => {
								return <div key={index}>{ab.ability.name}</div>;
							})}
						</div>
					</div>
				</section>
			) : (
				<section className='pokemon-list-container'>
					<p className='pokemon-name'>{name}</p>
					<img src={image} alt='pokemon name' />
				</section>
			)}
		</div>
	);
};

export default PokemonList;
