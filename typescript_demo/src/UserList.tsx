
import React from 'react';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IAppState } from './store/RootReducer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IUser } from './store/user/UserTypes';
import { getFriendList as getFriendListAction } from './store/user/UserActions';


const CenterContent = styled.div`
    text-align: center;
`;

interface IUserListOwnProps {

}

interface IUserListStateToProps {
    user: IUser
}

interface IUserListDispatchToProps {
	getFriendList: (url: string) => void;
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

const mapDispatchToProps: MapDispatchToProps<
    IUserListDispatchToProps,
    IUserListOwnProps
> = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: IUserListOwnProps) => ({
    getFriendList: async (url: string) => {
        dispatch(getFriendListAction(url));
    }
});

export const UserList = connect<
    IUserListStateToProps,
    IUserListDispatchToProps,
    IUserListOwnProps,
    IAppState
>(mapStateToProps, mapDispatchToProps)(UserListUnconnected);