import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [shows, setShows] = useState([]);
    const [filteredShows, setFilteredShows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('A-Z');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://podcast-api.netlify.app')
            .then((response) => response.json())
            .then((data) => setShows(data))
            .catch((error) => console.error('Error fetching shows:', error));
    }, []);
    useEffect(() => {
        let sortedShows = [...shows];
        if (sortOrder === 'A-Z') {
            sortedShows.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'Z-A') {
            sortedShows.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOrder === 'Recently Updated') {
            sortedShows.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        }

        if (selectedGenre !== 'All') {
            sortedShows = sortedShows.filter((show) => show.genre === selectedGenre);
        }

        setFilteredShows(sortedShows);
    }, [sortOrder, selectedGenre, shows]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredShows(
            shows.filter((show) => show.title.toLowerCase().includes(query))
        );
    };
    return (
        <div className="home">
            <header className="header">
                <h1>Podcast App</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for a podcast..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />

<select onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Recently Updated">Recently Updated</option>
                    </select>
                    <select onChange={(e) => setSelectedGenre(e.target.value)}>
                        <option value="All">All Genres</option>
                        {/* Dynamically populate genres */}
                        {Array.from(new Set(shows.map((show) => show.genre))).map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
            </header>
            <div className="shows-grid">
                {filteredShows.map((show) => (
                    <div key={show.id} className="show-card">
                        <img src={show.image} alt={show.title} />
                        <h3>{show.title}</h3>
                        <button onClick={() => navigate(`/show/${show.id}`)}>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;