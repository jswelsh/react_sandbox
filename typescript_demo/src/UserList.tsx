import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const CenterContent = styled.div`
	text-align: center;
	`;

interface IUserListOwnProps {

}

export const UserList: React.FC<IUserListOwnProps> = (): JSX.Element => {
	return (
    <CenterContent>
      <p>
        UserList
      </p>
      <Link
        to='/'>
          Home
        </Link>
    </CenterContent>
	)
}