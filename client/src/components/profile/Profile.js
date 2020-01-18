import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id);
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            {/* Back and edit buttons */}
                            <div className="row">
                                <div className="col-md-6">
                                    <Link to="/profiles" className="btn btn-light mb-3 float-left">Back to Profiles</Link>
                                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                                        <Link to="/edit-profile" className="btn btn-info ml-2">Edit Profile</Link>)}
                                </div>
                                <div className="col-md-6" />
                            </div>

                            <ProfileTop profile={profile} />

                            <ProfileAbout profile={profile} />

                            <div className="row">
                                <div className="col-md-6">
                                    <h2 className="text-center text-info mb-2">Experience</h2>
                                    {profile.experience.length > 0 ? (<ul className="list-group">
                                        {profile.experience.map(exp => (
                                            <ProfileExperience key={exp._id} experience={exp} />
                                        ))}
                                    </ul>) : (<h5 className="text-center">No experience on file</h5>)}
                                    <div className="mb-2"></div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <h2 className="text-center text-info mb-2">Education</h2>
                                    {profile.education.length > 0 ? (<ul className="list-group">
                                        {profile.education.map(edu => (
                                            <ProfileEducation key={edu._id} education={edu} />
                                        ))}
                                    </ul>
                                    ) : (<h5 className="text-center">No education on file</h5>)}
                                    <div className="mb-2"></div>
                                </div>

                            </div>

                            {profile.githubusername && (
                                <ProfileGithub username={profile.githubusername} />
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile)
