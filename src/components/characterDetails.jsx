import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const CharacterDetails = () => {
    const { id } = useParams(); // Get character ID from URL
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${API_KEY}`
                );
                setCharacter(response.data.data.results[0]); // Get first result
            } catch (error) {
                console.error("Error fetching character details", error);
            }
        };

        fetchCharacterDetails();

        // Add class to body to disable scroll when this component mounts
        document.body.classList.add("no-scroll");

        // Remove the class when component unmounts
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [id]);

    if (!character) {
        return <p>Loading character details...</p>;
    }
    console.log("Character ID:", id); // Debugging
    
    return (
        <div className="characterDetailsContainer">
            <h1>{character.name}</h1>
            <img 
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                alt={character.name} 
            />
            <div className="characterCard">
                <p>{character.description || "No description available."}</p>
            </div>
        </div>
    );
};

export default CharacterDetails;
