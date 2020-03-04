import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../queries/User';

function Login(props) {
	const [ error, setError ] = useState('');
	const [ values, setValues ] = useState({
		username: '',
		password: ''
	});
	const [ login, { loading } ] = useMutation(LOGIN_USER);

	const onChange = (event) => {
		event.preventDefault();
		const newState = { ...values };
		newState[event.target.name] = event.target.value;
		setValues(newState);
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			const reponse = await login({ variables: values });
			console.log(reponse);
			props.history.push('/');
		} catch (err) {
			console.log(err);
			if (err.graphQLErrors.length > 0) {
				setError(err.graphQLErrors[0].message);
				return;
			}
			setError('Server unreachable.');
		}
	};

	if (loading) {
		return 'LOADING';
	}

	return (
		<div className="row justify-content-center text-center">
			<div className="col-4">
				<form onSubmit={onSubmit} className="form-signin mt-4">
					<img
						className="mb-4"
						src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
						alt=""
						width="72"
						height="72"
					/>
					<h1 className="h3 mb-3 font-weight-normal">Please login</h1>
					<label for="inputUsername" className="sr-only">
						Username
					</label>
					<input
						type="username"
						name="username"
						value={values.username}
						onChange={onChange}
						id="inputUsername"
						className="form-control"
						placeholder="Username"
						required
						autofocus
					/>
					<label for="inputPassword" className="sr-only">
						Password
					</label>
					<input
						type="password"
						name="password"
						onChange={onChange}
						value={values.password}
						id="inputPassword"
						className="form-control"
						placeholder="Password"
						required
					/>
					{error !== '' && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
					<button className="mt-4 btn btn-lg btn-primary btn-block" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
