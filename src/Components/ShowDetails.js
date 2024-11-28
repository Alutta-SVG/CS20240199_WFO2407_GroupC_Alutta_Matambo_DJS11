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

    if (!show) return <div>Loading...</div>;

    return (
        <div className="show-details">
            <h1>{show.title}</h1>
            <p>Last updated: {format(new Date(show.updated_at), 'MMMM dd, yyyy')}</p>

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