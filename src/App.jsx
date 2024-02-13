import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import countryData from "../resources/countryData.json";

function App() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState(false);
  const [search, setSearch] = useState([]);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    if (inputValue.trim() === '') {
      setSuggestions(false);
    } else {
      const fiterCountry = countryData.filter(country => country.name.toLowerCase().includes(inputValue.toLowerCase()));
      setSearch(fiterCountry);
      setSuggestions(true);
    }
  }

  const handelDownKey = (e) => {
    if (e.key === 'Escape') {
      setSuggestions(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handelDownKey);

    return () => {
      document.removeEventListener('keydown', handelDownKey);
    }
  }, []);

  return (
    <>
      <div>
        <h1>Search any Country</h1>
        <input type="text" onChange={handleInput} value={input} placeholder='Search Country' />
        <button>seach</button>
        {suggestions && (
          <div>
            {search.map(({ name }, index) => (<p key={index}>{name}</p>))}
          </div>
        )}
      </div>
    </>
  )
}

export default App;
