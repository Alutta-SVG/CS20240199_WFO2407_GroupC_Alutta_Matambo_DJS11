import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, isValid } from 'date-fns';
import { saveToLocalStorage, getFromLocalStorage } from '../LocalStorageUtils';

const ShowDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data);
                setShow(data);
                if (data.seasons.length > 0) setSelectedSeason(data.seasons[0]);
            })
            .catch((error) => console.error('Error fetching show details:', error));
    }, [id]);

    const addFavorite = (item) => {
        const storedFavorites = getFromLocalStorage('favorites') || [];
        const updatedFavorites = [...storedFavorites, item];
        saveToLocalStorage('favorites', updatedFavorites);
        alert(`${item.title} added to favorites!`);
    };

    if (!show) return <div>Loading...</div>;

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return isValid(date) ? format(date, 'MMMM dd, yyyy') : 'Date not available';
    };

    return (
        <div className="show-details">
            <h1>{show.title}</h1>
            <p>Last updated: {formattedDate(show.updated_at)}</p>

            <div className="seasons">
                <h2>Seasons</h2>
                <ul>
                    {show.seasons.map((season) => (
                        <li key={season.id} onClick={() => setSelectedSeason(season)}>
                            {season.title}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedSeason && (
                <div className="episodes">
                    <h3>{selectedSeason.title}</h3>
                    <ul>
                        {selectedSeason.episodes.map((episode) => (
                            <li key={episode.id}>
                                <p>{episode.title}</p>
                                <button onClick={() => addFavorite(episode)}>Add to Favorites</button>
                                <button>Remove from Favorites</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowDetails;