import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <section className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">DevBook</h1>
                            <p className="lead">
                                The new social network for web developers and computer programmers.
                            </p>
                            <hr />
                            <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                            <Link to="/login" className="btn btn-lg btn-light">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing)
