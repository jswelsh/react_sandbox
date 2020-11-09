import React from 'react';
import './App.css';

interface IAppOwnProps {
  username:string | undefined;
  userType:'admin' | 'moderator' | 'user' | 'guest';
}

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      fubar
    </div>
  );
}

export default App;
