import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// Pull setAlert from props
const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords don't match", "danger", 4000);
        } else {
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center"><i className="fas fa-user"></i> Create Your Account</p>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
                                <small className="form-text text-muted">This site uses Gravatar. If you'd like to have a profile image, use a Gravatar email</small>
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
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    minLength="6"
                                    value={password2} onChange={onChange}
                                />
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" value="Register" />
                        </form>
                        <br />
                        <h6>Already have an account? <Link to="/login">Sign In</Link></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, register })(Register);
