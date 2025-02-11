import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const API_KEY = import.meta.env.VITE_MARVEL_API_KEY; // Securely access API key


const BrowseCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState("A");

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${selectedLetter}&apikey=${API_KEY}`
                );
                setCharacters(response.data.data.results);
            } catch (error) {
                console.error("Error fetching data from Marvel API", error);
            }
        };

        fetchCharacters();
    }, [selectedLetter]);

    return (
        <div>
            <h1>Marvel Characters</h1>

            <div className="alphabet-nav">
                {ALPHABET.map((letter) => (
                    <button 
                        key={letter} 
                        className={selectedLetter === letter ? "active" : ""}
                        onClick={() => setSelectedLetter(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            <div className="grid-container">
                {characters.length > 0 ? (
                    characters.map((character) => (
                        <Link 
                            key={character.id} 
                            to={`/characters/${character.id}`}
                            className="character-card"
                        >
                            <img 
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                                alt={character.name} 
                            />
                            <h3>{character.name}</h3>
                        </Link>
                    ))
                ) : (
                    <p>Loading Characters for `{selectedLetter}`</p>
                )}
            </div>
        </div>
    );
};

export default BrowseCharacters;
