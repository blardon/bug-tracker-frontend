import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER } from '../../queries/User';
function Register(props) {
	const [ error, setError ] = useState('');
	const [ values, setValues ] = useState({
		email: '',
		username: '',
		password: ''
	});

	const [ createUser, { loading } ] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			props.history.push('/');
		},
		onError(err) {
			setError(err.graphQLErrors[0].message);
		},
		variables: values
	});

	const onChange = (event) => {
		event.preventDefault();
		const newState = { ...values };
		newState[event.target.name] = event.target.value;
		setValues(newState);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		createUser();
	};

	if (loading) {
		return 'LOADING';
	} else {
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
						<h1 className="h3 mb-3 font-weight-normal">Please register</h1>
						<label for="inputUsername" className="sr-only">
							Username
						</label>
						<input
							value={values.username}
							onChange={onChange}
							type="username"
							name="username"
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
							value={values.password}
							onChange={onChange}
							type="password"
							name="password"
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
							Register
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
