import { withAuthenticator } from 'aws-amplify-react';
import './App.css';

// import Amplify from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

function App() {
  return (
    <div className="">
      <h1>My Dropbox</h1>
    </div>
  )
}

export default withAuthenticator(App);
