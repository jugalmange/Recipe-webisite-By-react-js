import react, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {
  const APP_ID = 'c36aae79'
  const APP_KEY = 'e4df734875423d81220cafbb24eff510';

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('paneer')

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=15&calories=591-722&health=alcohol-free`)
    const data = await response.json();
    setRecipes(data.hits);

  };
  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">Submit</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients ={recipe.recipe.ingredients}

        />
        
      ))}
      </div>
    </div>
  );
}

export default App;
