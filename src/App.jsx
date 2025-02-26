import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import BrowseCharacters from './components/browseCharacters';
import CharacterDetails from './components/characterDetails';
import Comics from './components/comics';
import ComicPage from "./components/comicPage";
import './App.css';
import NotFound from './components/notFound';

const App = () => {
  return (
    <div>
<nav>
  <div className="nav-container">
    <Link to="/">Home</Link>
    <Link to="/characters">Characters</Link>
    <Link to="/comics">Comics</Link>
  </div>
</nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<BrowseCharacters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:id" element={<ComicPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
