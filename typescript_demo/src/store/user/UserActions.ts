import {UserActions,
	IUser,
	IUserActions,
	IUserActionTypes
} from './UserTypes'

export function saveUsername(user: IUser): IUserActionTypes {
	return {
		type: UserActions.SAVE_USERNAME,
		payload: user
	};
}

export function saveUserMessage(user: IUser): IUserActionTypes {
	return {
		type: UserActions.SAVE_USER_MESSAGE,
		payload:user
	};
}