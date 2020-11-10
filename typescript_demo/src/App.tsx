
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
  saveUsername as saveUsernameAction,
  saveUserMessage as saveUserMessageAction,
} from './store/user/UserActions';
import { Link } from 'react-router-dom';
import './App.css';
import { IUser } from './store/user/UserTypes';
import { IAppState } from './store/RootReducer';

interface IAppOwnProps {
  username: string | undefined;
  userType: 'admin' | 'moderator' | 'user' | 'guest';
}

interface IAppDispatchToProps {
  saveUsername: (user: IUser) => void;
  saveUserMessage: (user: IUser) => void;
}

const AppUnconnected: React.FC<IAppOwnProps> = ({ userType, username }): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

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
        Hi, {username ? username : 'Mysterious Entity'}, your user type is {username ? userType : 'irrelevant because I do not know you'}.
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
        to='/userlist'
      >
        User List
      </Link>
    </div>
  );
}

const mapDispatchToProps: MapDispatchToProps<
  IAppDispatchToProps,
  IAppOwnProps
> = (dispatch: Dispatch, ownProps: IAppOwnProps): IAppDispatchToProps => ({
  saveUsername: (user: IUser) => {
    dispatch(saveUsernameAction(user));
  },

  saveUserMessage: (user: IUser) => {
    dispatch(saveUserMessageAction(user));
  },
});

export const App = connect<
  {},
  IAppDispatchToProps,
  IAppOwnProps,
  IAppState
>(null, mapDispatchToProps)(AppUnconnected);