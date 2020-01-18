import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ( {login, isAuthenticated} ) => {
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
        login(email, password);
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign In</h1>
                        <p className="lead text-center"><i className="fas fa-user"></i> Sign In To Your Account</p>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input className="form-control" type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    minLength="6"
                                    value={password} onChange={onChange}
                                />
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" value="Log In" />
                        </form>
                        <br />
                        <h6>Don't have an account yet? <Link to="/register">Sign Up</Link></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
