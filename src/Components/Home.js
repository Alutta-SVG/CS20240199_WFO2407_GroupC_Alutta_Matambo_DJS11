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
    