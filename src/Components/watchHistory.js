import React, { useState, useEffect } from 'react';
import { getFromLocalStorage } from './localStorageUtils';

const FrequentlyWatched = () => {
    const [frequentItems, setFrequentItems] = useState([]);

    useEffect(() => {
        const watchHistory = getFromLocalStorage('watchHistory');
        if (watchHistory) {
            const sortedItems = Object.entries(watchHistory)
                .sort(([, countA], [, countB]) => countB - countA)
                .slice(0, 5);
            setFrequentItems(sortedItems);
        }
    }, []);

    return (
        <div className="frequent-items">
            <h2>Frequently Watched</h2>
            {frequentItems.length === 0 ? (
                <p>No items watched frequently yet.</p>
            ) : (
                <ul>
                    {frequentItems.map(([id, count]) => (
                        <li key={id}>
                            <p>Item ID: {id}</p>
                            <p>Watched {count} times</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FrequentlyWatched;