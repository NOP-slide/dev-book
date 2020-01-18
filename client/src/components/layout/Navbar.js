import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/posts">Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item"><a className="nav-link" onClick={logout} href="#!">
                {user !== null && (
                    <img
                        className="rounded-circle"
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '25px', marginRight: '5px' }}
                        title="You must have a Gravatar connected to your email to display an image"
                    ></img>
                )}{' '}Log Out
            </a></li>
        </ul>
    );
    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Log in</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <Link className="navbar-brand" to="/"><i className="fas fa-code"></i> DevBook</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#mobile-nav"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profiles">Developers</Link>
                    </li>
                </ul>
                {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar)
