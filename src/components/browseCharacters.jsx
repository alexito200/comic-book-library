import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const BrowseCharacters = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters?apikey=a44c379606a95921e3f0abef512638a9`
                );
                setCharacters(response.data.data.results);
            } catch (error) {
                console.error("Error fetching data from Marvel API", error);
            }
        };

        fetchCharacters();
    }, []);

    return (
        <div>
            <h1>Marvel Characters</h1>
            <div className="grid-container">
                {characters.map((character) => (
                    <div key={character.id} className="character-card">
                        <img 
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                            alt={character.name} 
                        />
                        <h3>{character.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseCharacters;
