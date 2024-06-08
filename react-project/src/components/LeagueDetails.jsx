import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function LeagueDetail() {
  const { id } = useParams();
  const [league, setLeague] = useState(null);
  const [country,setCountry] = useState(null);
  const [seasons,setSeasons] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${id}`;
    const options = {
        method: 'GET',
        headers: {
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.response && data.response.length > 0) {
          const leagueData = data.response[0];
          setLeague(leagueData.league);
          setCountry(leagueData.country);
          setSeasons(leagueData.seasons);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  if (!league) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/')}>Back to Search</button>
      <h1>{league.name}</h1>
      <img src={league.logo} alt={league.name} className="league-logo" />
      <div className="info-container">
        <p>Type: {league.type}</p>
        <p>Country: {country.name} ({country.code})</p>
        <p><img src={country.flag} alt={country.name} className="country-flag" /></p>
      </div>
      <div className="seasons-container">
        <h2>Seasons:</h2>
        <ol>
          {seasons.map(season => (
            <li key={season.year}>
              <div className="season-details">
                <p>Year: {season.year}</p>
                <p>Start: {season.start}</p>
                <p>End: {season.end}</p>
                <p>Current: {season.current ? 'Yes' : 'No'}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}