import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("User registered");
    }

    return (
        <div className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In To Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password} onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Log In" />
            </form>
            <p className="my-1">
                Don't have an account yet? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

export default Login