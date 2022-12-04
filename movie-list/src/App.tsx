import Movies from './Movies/Movies';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              Home
            </li>
            <li>
              menu1
            </li>
            <li>
              menu2
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className='container'>
          <Movies />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
