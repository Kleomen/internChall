import {useState,useEffect} from "react";
import { FaSearch } from "react-icons/fa";  

export default  function SearchBar(){
    const [input,setInput] = useState("")
    const [filteredLeagues, setFilteredLeagues] = useState([])
    const [apiLeagues, setApiLeagues] = useState([])

    
    useEffect(() => {
      const url = 'https://api-football-v1.p.rapidapi.com/v3/leagues';
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
          //console.log("Fetched data:", data);
          const leagues = data.response.map(item => item.league);
          setApiLeagues(leagues);
          setFilteredLeagues(leagues);
        })
        .catch(err => console.log(err))
    }, [])
      
    const handleInputChange = (e) => { 
      const input = e.target.value;
      setInput(input);

      const filteredLeagues = apiLeagues.filter((league) =>
        league.name && league.name.toLowerCase().includes(input.toLowerCase()));

      //console.log(filteredLeagues)
      setFilteredLeagues(filteredLeagues);
    }
    //console.log(process.env);
    
    return (
      <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input
            placeholder="Type to search..."
            value={input}
            onChange={handleInputChange}
          />
          
        <div className="grid-container">
        {filteredLeagues.map(league => (
          <a href={`/leagues/${league.id}`} className="grid-item" key={league.id}>
            <img src={league.logo} alt={league.name} className="league-logo" />
            <div className="league-name">{league.name}</div>
          </a>
        ))}
        </div>
      </div>
    );
}
        