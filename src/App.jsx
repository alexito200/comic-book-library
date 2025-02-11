import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import BrowseCharacters from './components/browseCharacters';
import CharacterDetails from './components/characterDetails';
import Comics from './components/comics';
import ComicPage from "./components/comicPage";
import './App.css';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |  
        <Link to="/characters">Characters</Link> |  
        <Link to="/comics">Comics</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<BrowseCharacters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:id" element={<ComicPage />} />
      </Routes>
    </div>
  );
};

export default App;
