import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../App.css';

const API_KEY = import.meta.env.VITE_MARVEL_API_KEY; // Securely access API key
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Comics = () => {
    const [comics, setComics] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState("A"); // Default: Show comics starting with 'A'

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${selectedLetter}&apikey=${API_KEY}`
                );
                setComics(response.data.data.results);
            } catch (error) {
                console.error("Error fetching comics from Marvel API", error);
            }
        };

        fetchComics();
    }, [selectedLetter]); // Fetch data whenever the letter changes

    return (
        <div>
            <h2>Marvel Comics</h2>

            {/* A-Z Navigation */}
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

            {/* Comics Grid */}
            <div className="grid-container">
                {comics.length > 0 ? (
                    comics.map((comic) => (
                        <Link to={`/comic/${comic.id}`} key={comic.id} className="comic-card">
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                            />
                            <h3>{comic.title}</h3>
                        </Link>
                    ))
                ) : (
                    <p>Loading Comics for `{selectedLetter}`.</p>
                )}
            </div>
        </div>
    );
};

export default Comics;
