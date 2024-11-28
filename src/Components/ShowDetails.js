import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setShow(data);
                if (data.seasons.length > 0) setSelectedSeason(data.seasons[0]);
            })
            .catch((error) => console.error('Error fetching show details:', error));
    }, [id]);
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setShow(data);
                if (data.seasons.length > 0) setSelectedSeason(data.seasons[0]);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching show details:', error);
            }
        };
        fetchShowDetails();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!show) {
        return <div>Loading...</div>;
    }

    return (
        // render show details
    );
};