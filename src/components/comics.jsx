import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../App.css';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://gateway.marvel.com/v1/public/comics";
const LIMIT = 40; // Load 40 comics per page
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Comics = () => {
    const [comics, setComics] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState("A");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComics = async () => {
            setLoading(true);
            setError(null);
            setComics([]); // Reset comics before fetching
    
            try {
                const response = await axios.get(BASE_URL, {
                    params: {
                        titleStartsWith: selectedLetter,
                        apikey: API_KEY,
                        limit: LIMIT,
                        offset: (currentPage - 1) * LIMIT, // Calculate offset
                    },
                });
    
                console.log("API Response:", response.data);
                const results = response.data.data.results;
                const totalResults = response.data.data.total;
                
                setComics(results);
                setTotalPages(Math.ceil(totalResults / LIMIT)); // Calculate total pages
            } catch (err) {
                console.error("Error fetching comics:", err);
                setError("Failed to load comics. Please try again.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchComics();
    }, [selectedLetter, currentPage]); // ✅ Dependency array ensures re-fetching
    
    

    // Function to change pages
    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="comicContainer">
            <h1>Marvel Comics</h1>

            {/* A-Z Navigation */}
            <div className="alphabet-nav">
    {ALPHABET.map((letter) => (
        <button 
            key={letter} 
            className={selectedLetter === letter ? "active" : ""}
            onClick={() => { 
                if (selectedLetter !== letter) {
                    setSelectedLetter(letter); 
                    setCurrentPage(1); // Reset pagination
                }
            }}
        >
            {letter}
        </button>
    ))}
</div>


            {/* Loading & Error Handling */}
            {loading && <p>Loading Comics for `{selectedLetter}`...</p>}
            {error && <p className="error">{error}</p>}

            {/* Comics Grid */}
            <div className="grid-container">
                {comics.length > 0 ? (
                    comics.map((comic) => (
                        <Link to={`/comic/${comic.id}`} key={comic.id} className="comic-card">
                            <img
                                src={comic.thumbnail?.path.includes("image_not_available") 
                                    ? "/purple-sky.jpg" 
                                    : `${comic.thumbnail.path}.${comic.thumbnail.extension}`
                                } 
                                alt={comic.title}
                            />
                            <h3>{comic.title}</h3>
                        </Link>
                    ))
                ) : (
                    !loading && <p>No comics found for `{selectedLetter}`.</p>
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

export default Comics;
