<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#browse-characters">Browse Characters</a></li>
        <li><a href="#character-details">Character Details</a></li>
        <li><a href="#comics">Comics</a></li>
        <li><a href="#comic-page">Comic Page</a></li>
        <li><a href="#not-found">Not Found</a></li>
        <li><a href="#app">App</a></li>
        <li><a href="#main">Main</a></li>
      </ul>
    </li>
</details>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alexito200/comic-book-library
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This section will provide an explanation of the inner workings of the app

### Home
The home page for my Marvel API app features a navbar with a few links, a welcome message to the user and an awesomely posed Psylocke as the background image.

![psylocke-home](https://github.com/user-attachments/assets/7043f14d-ca4a-4472-a1f5-9611ed7bc687)


### Browse Characters
After clicking on the Characters link in the Home page navbar, the user is directed to a library of characters to choose from. Marvel API makes it easy to access their characters' names, image, and even some lore. The Characters page features an alphabetical navigation system ranging from A-Z. 

![marvel-characters](https://github.com/user-attachments/assets/657fa8ae-e181-47b6-bc24-0f11e65a3772)


### Character Details
After clicking on a Character card, the user is directed to the Character Details page. The user will be able to read some lore on the character and see an image. 

![marvel-character-details](https://github.com/user-attachments/assets/d9622cb5-fec3-4325-a43e-7edb25cb763f)


### Comics
The Comics page provides the user with an extravagantly wide range of comics to choose from. This page features an alphabetical nav system to make the experience more seamless for the user. The user is able to see the cards lined up in a grid layout and is also able to view the comic image and the comic title.

![marvel-comics](https://github.com/user-attachments/assets/2d5b751f-4717-475a-9d2e-7bfcaeed356d)


### Comic Page
The comic page is filled with details for the user to read. This page features the comic title, comic image, page count, series, creators, and some awesome lore for the user.

![marvel-comic-details](https://github.com/user-attachments/assets/185e77ac-7148-4cd1-a898-720e3a93ba22)

### Not Found
The Not Found component was created to bring the user back to the Marvel API page in case they get lost. The Not Found page is a 404 error page that includes the navbar and an additional link to the app's home page for the user to get back.

![marvel-not-found](https://github.com/user-attachments/assets/a99515f0-010d-4b0e-977a-bbeaeef5755f)


### App
With the use of React Router DOM, my app has the ability to set up navigation routes throughout itself. Here, we set up our navbar links as well as our URL links.
```
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
```

### Main
In Main, I wrapped the App with Browser Router from the React Router DOM library for navigation control.
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
