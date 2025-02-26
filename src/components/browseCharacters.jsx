import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://gateway.marvel.com/v1/public/characters";
const LIMIT = 40; // Set limit to 40 per page

const BrowseCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState("A");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            setError(null);
            setCharacters([]); // Reset characters before new fetch

            try {
                const response = await axios.get(BASE_URL, {
                    params: {
                        nameStartsWith: selectedLetter,
                        apikey: API_KEY,
                        limit: LIMIT,
                        offset: (currentPage - 1) * LIMIT, // Paginate results
                    },
                });

                console.log("API Response:", response.data);
                const results = response.data.data.results;
                const totalResults = response.data.data.total;

                setCharacters(results);
                setTotalPages(Math.ceil(totalResults / LIMIT)); // Calculate total pages
            } catch (err) {
                console.error("Error fetching characters:", err);
                setError("Failed to load characters. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [selectedLetter, currentPage]); // ✅ Re-fetch on letter or page change

    // Function to change pages
    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="charactersContainer">
            <h1>Marvel Characters</h1>

            {/* A-Z Navigation */}
            <div className="alphabet-nav">
                {ALPHABET.map((letter) => (
                    <button 
                        key={letter} 
                        className={selectedLetter === letter ? "active" : ""}
                        onClick={() => { 
                            if (selectedLetter !== letter) {
                                setSelectedLetter(letter); 
                                setCurrentPage(1); // Reset pagination when letter changes
                            }
                        }}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Loading & Error Handling */}
            {loading && <p>Loading Characters for `{selectedLetter}`...</p>}
            {error && <p className="error">{error}</p>}

            {/* Characters Grid */}
            <div className="grid-container">
                {characters.length > 0 ? (
                    characters.map((character) => (
                        <Link 
                            key={character.id} 
                            to={`/characters/${character.id}`}
                            className="character-card"
                        >
                            <img 
                                src={character.thumbnail.path.includes("image_not_available") 
                                    ? "/purple-sky.jpg" 
                                    : `${character.thumbnail.path}.${character.thumbnail.extension}`
                                } 
                                alt={character.name} 
                            />
                            <h3>{character.name}</h3>
                        </Link>
                    ))
                ) : (
                    !loading && <p>No characters found for `{selectedLetter}`.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => changePage(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        ◀ Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index + 1} 
                            className={currentPage === index + 1 ? "active" : ""}
                            onClick={() => changePage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button 
                        onClick={() => changePage(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Next ▶
                    </button>
                </div>
            )}
        </div>
    );
};

export default BrowseCharacters;
