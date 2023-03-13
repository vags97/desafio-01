import './App.css';

import {
  BrowserRouter,
  Link
} from "react-router-dom";

import Router from './router'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/file">File</Link>
            </li>
            <li>
              <Link to="/credits">Credits</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Router/>
      </div>
    </BrowserRouter>
  );
}



export default App;
