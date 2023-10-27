import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsConfig from './aws-exports';
import Navbar from './components/ui/nav/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';

Amplify.configure(awsConfig);

function App({signOut, user}) {
  return (
    <Router>
    <div className="App text-lime-700">
      <Navbar signOut={signOut} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile user={user} signOut={signOut} />} />
      </Routes>
    </div>
    </Router>
  );
}

export default withAuthenticator(App);

