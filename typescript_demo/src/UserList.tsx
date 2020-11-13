
import React from 'react';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IAppState } from './store/RootReducer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IUser } from './store/user/UserTypes';

const CenterContent = styled.div`
    text-align: center;
`;

interface IUserListOwnProps {

}

interface IUserListStateToProps {
    user: IUser
}

const UserListUnconnected: React.FC<IUserListStateToProps & IUserListOwnProps> = 
({
    user
}): JSX.Element => {
    return (
        <CenterContent>
            <p>
                Retrieved Username: {user.username ? user.username : 'No username found'}
            </p>
            <p>
                Retrieved User Message: {user.userMessage ? user.userMessage : 'No message found'}
            </p>
            <p>
                UserList
            </p>
            <Link
                to='/'
            >
                Home
            </Link>
        </CenterContent>
    );
}

const mapStateToProps: MapStateToProps<
    IUserListStateToProps,
    IUserListOwnProps,
    IAppState
> = (state: IAppState, ownProps: IUserListOwnProps): IUserListStateToProps => ({
    user: state.user,
    ...ownProps
});

export const UserList = connect<
    IUserListStateToProps,
    {},
    IUserListOwnProps,
    IAppState
>(mapStateToProps)(UserListUnconnected);