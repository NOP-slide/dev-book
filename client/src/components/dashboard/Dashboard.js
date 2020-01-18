import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
        // eslint-disable-next-line
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className='display-4'>Dashboard</h1>
                    <p className='lead text-muted'><i className='fas fa-user' /> Welcome {user && user.name}</p>
                    {profile !== null ? (
                        <Fragment>
                            <DashboardActions />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />
                            <br />
                            <button onClick={() => deleteAccount()} className='btn btn-danger mb-4'><i className='fas fa-user-minus' /> Delete My Account</button>
                        </Fragment>) : (
                            <Fragment>
                                <h6>It looks like you don't have a profile yet!  Why not create one now?</h6>
                                <Link to='/create-profile' className='btn btn-lg btn-info'>Create Profile</Link>
                            </Fragment>)}
                </div>
            </div>
        </div>
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
