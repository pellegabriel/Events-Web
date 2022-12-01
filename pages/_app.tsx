import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Event from './event/event'
import FormUser from './formUser/FormUser';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import IniciarMap from './map/map'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
  <Component {...pageProps} />

      <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/event">Event</Link>
          </li>
          <li>
            <Link to="/formUser">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
      <Route path="/event" element={<Event/>} />
      <Route path="/formUser" element={<FormUser/>} />
      </Routes>
      
    </div>
    <div id='map'>
      <></>
      <IniciarMap/>
    </div>
  </Router>
  </>
  );
}
