import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
import Comics from './components/Comics';
import './app.css';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |  
        <Link to="/characters">Browse Characters</Link> |  
        <Link to="/comics">Comics</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<BrowseCharacters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </div>
  );
};

export default App;
