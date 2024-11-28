import React, { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../src/LocalStorageUtils';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from local storage on component mount
    useEffect(() => {
        const storedFavorites = getFromLocalStorage('favorites');
        if (storedFavorites) {
            setFavorites(storedFavorites);
        }
    }, []);

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter((item) => item.id !== id);
        setFavorites(updatedFavorites);
        saveToLocalStorage('favorites', updatedFavorites);
    };

    return (
        <div className="favorites-page">
            <h1>Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <ul>
                    {favorites.map((favorite) => (
                        <li key={favorite.id}>
                            <p>{favorite.title}</p>
                            <button onClick={() => removeFavorite(favorite.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;