import React, { useReducer, createContext } from 'react';

const AuthContext = createContext({
	user: null,
	setUser: (userData) => {},
	logout: () => {}
});

function authReducer(state, action) {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.payload.user
			};
		case 'LOGOUT':
			return {
				...state,
				user: null
			};
		default:
			return state;
	}
}

function AuthProvider(props) {
	const [ state, dispatch ] = useReducer(authReducer, { user: null });

	const setUser = (userData) => {
		dispatch({
			type: 'SET_USER',
			payload: userData
		});
	};

	const logout = () => {
		dispatch({
			type: 'LOGOUT'
		});
	};

	return <AuthContext.Provider value={{ user: state.user, setUser, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
