import { time } from 'console';
import React, { useState } from 'react';
import './App.css';

interface IAppOwnProps {
  username:string | undefined;
  userType:'admin' | 'moderator' | 'user' | 'guest';
}

const App: React.FC<IAppOwnProps> = ({userType, username}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  
  setInterval(() => {
    setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000)
  })

  return (
    <div className="App">
      <p>
        hi, {username ? username : 'Mysterious User'}, your user type is {username? userType : 'irrelevant because I do not know you'}
      </p>
      <p>
        {time.toUTCString()}
      </p>
    </div>
  );
}

export default App;
