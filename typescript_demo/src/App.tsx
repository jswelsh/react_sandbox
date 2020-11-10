import { time } from 'console';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
  saveUsername as saveUsernameAction,
  saveUserMessage as saveUserMessageAction,
} from './store/user/UserActions';
import { IUser } from './store/user/UserTypes';
import { IAppState } from './store/RootReducer';
import './App.css';

interface IAppOwnProps {
  username:string | undefined;
  userType:'admin' | 'moderator' | 'user' | 'guest';
}

const App: React.FC<IAppOwnProps> = ({userType, username}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>('')

  
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [username]);

  return (
    <div className="App">
      <p>
        hi, {username ? username : 'Mysterious User'}, your user type is {username? userType : 'irrelevant because I do not know you'}
      </p>
      <p>
        {time.toUTCString()}
      </p>
      <input
        type='text'
        placeholder='Enter your message here'
        value={message}
        onChange={handleTextChange}
      />
      <p>
        Your message: {message || ''}
      </p>
      <Link
        to='/userList'>
          User List 
      </Link>
    </div>
  );
}

export default App;
