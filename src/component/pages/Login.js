import React from 'react';

function Login() {
	return (
		<div className="row justify-content-center text-center">
			<div className="col-4">
				<form className="form-signin mt-4">
					<img
						className="mb-4"
						src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
						alt=""
						width="72"
						height="72"
					/>
					<h1 className="h3 mb-3 font-weight-normal">Please login</h1>
					<label for="inputEmail" className="sr-only">
						Email address
					</label>
					<input
						type="email"
						id="inputEmail"
						className="form-control"
						placeholder="Email address"
						required
						autofocus
					/>
					<label for="inputPassword" className="sr-only">
						Password
					</label>
					<input
						type="password"
						id="inputPassword"
						className="form-control"
						placeholder="Password"
						required
					/>
					<button className="mt-4 btn btn-lg btn-primary btn-block" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
