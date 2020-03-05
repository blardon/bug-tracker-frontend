import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/Auth';
import { CREATE_PROJECT } from '../../queries/Project';

function CreateProject() {
	const [ error, setError ] = useState('');
	const [ values, setValues ] = useState({
		title: '',
		desc: ''
	});
	const { user } = useContext(AuthContext);
	const [ createProject, { loading } ] = useMutation(CREATE_PROJECT);

	if (!user) {
		return <Redirect to="/login" />;
	}

	const onChange = (event) => {
		event.preventDefault();
		const newState = { ...values };
		newState[event.target.name] = event.target.value;
		setValues(newState);
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await createProject({ variables: values });
			console.log(response);
			//props.history.push('/');
		} catch (err) {
			console.log(err);
			if (err.graphQLErrors.length > 0) {
				setError(err.graphQLErrors[0].message);
				return;
			}
			setError('Server unreachable.');
		}
	};

	return (
		<div className="row justify-content-center text-center">
			<div className="col-4">
				<form onSubmit={onSubmit} className="form-signin mt-4">
					<h1 className="h3 mb-3 font-weight-normal">Create a new project</h1>
					<label htmlFor="inputTitle" className="sr-only">
						Username
					</label>
					<input
						type="text"
						name="title"
						value={values.title}
						onChange={onChange}
						id="inputTitle"
						className="form-control"
						placeholder="Title"
						required
						autoFocus
					/>
					<label htmlFor="inputDesc" className="sr-only">
						Password
					</label>
					<input
						type="text"
						name="desc"
						onChange={onChange}
						value={values.desc}
						id="inputDesc"
						className="form-control"
						placeholder="Description"
						required
					/>
					{error !== '' && (
						<div className="alert alert-danger mt-2" role="alert">
							{error}
						</div>
					)}
					<button className="mt-4 btn btn-lg btn-primary btn-block" type="submit">
						Create Project
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateProject;
