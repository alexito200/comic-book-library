import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetails = () => {
const { id } = useParams();
const [character, setCharacter] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchCharacterDetails = async () => {
    const apiKey = 'a44c379606a95921e3f0abef512638a9';
    const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${apiKey}`
    );
    const data = await response.json();
    setCharacter(data.data.results[0]);
    setLoading(false);
    };

    fetchCharacterDetails();
}, [id]);

if (loading) return <p>Loading...</p>;

return (
    <div>
    <h2>{character.name}</h2>
    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
    <p>{character.description || 'No description available.'}</p>
    </div>
);
};

export default CharacterDetails;
