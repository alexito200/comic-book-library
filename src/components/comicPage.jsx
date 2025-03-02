import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const ComicPage = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);

    useEffect(() => {
        const fetchComicDetails = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/comics/${id}?apikey=${API_KEY}`
                );
                setComic(response.data.data.results[0]);
            } catch (error) {
                console.error("Error fetching comic details", error);
            }
        };

        fetchComicDetails();
    }, [id]);

    if (!comic) {
        return <h2>Loading comic details...</h2>;
    }

    return (
<div className="comicPageContainer">
    <h1>{comic.title}</h1> {/* Header stays above */}

    <div className="comicPageContent"> 
        <img 
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
            alt={comic.title} 
        />

        <div className="comicPageCard">
            <p>{comic.description ? comic.description : "No description available."}</p>
            <p><strong>Page Count:</strong> {comic.pageCount}</p>
            <p><strong>Series:</strong> {comic.series.name}</p>
            <p><strong>Creators:</strong> {comic.creators.items.map(creator => creator.name).join(", ")}</p>
        </div>
    </div>
</div>

    );
};

export default ComicPage;
