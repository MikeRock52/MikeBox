import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsConfig from './aws-exports';
import Navbar from './components/ui/nav/Navbar';

Amplify.configure(awsConfig);

function App({signOut, user}) {
  return (
    <div className="App text-lime-700">
      <Navbar />
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App);

