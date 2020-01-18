import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom'; // withRouter is required to use history parameter in createProfile()

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile(false);

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        });
        // eslint-disable-next-line
    }, [loading]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit Your Profile</h1>
                        <p className="lead text-center">
                            <i className="fas fa-user"></i> Keep us updated with your latest information
                        </p>
                        <small className="d-block pb-3">* = required field</small>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <select name="status" className="form-control" value={status} onChange={e => onChange(e)}>
                                    <option value="0">* Select professional status</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Junior Developer">Junior Developer</option>
                                    <option value="Senior Developer">Senior Developer</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Student or Learning">Student</option>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Other">Other</option>
                                </select>
                                <small className="form-text text-muted">What do you do?</small>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                                <small className="form-text text-muted">Where do you work?</small>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                                <small className="form-text text-muted">Where can we find out more?</small>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                                <small className="form-text text-muted">City & state recommended (eg. Boston, MA)</small>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                                <small className="form-text text-muted">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="GitHub Username"
                                    name="githubusername"
                                    value={githubusername} onChange={e => onChange(e)}
                                />
                                <small className="form-text text-muted">If you want to display your latest repos and GitHub link, include your GitHub username</small>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" placeholder="A short bio" name="bio" value={bio} onChange={e => onChange(e)} ></textarea>
                                <small className="form-text text-muted">Tell us a little bit more about yourself</small>
                            </div>

                            <div className="mt-2">
                                <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">Add social media links (optional)</button>
                            </div>

                            {displaySocialInputs && <Fragment>
                                <div className="form-group mt-3">
                                    <i className="fab fa-twitter fa-2x"></i>
                                    <input className="form-control" type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} /> 
                                </div>

                                <div className="form-group">
                                    <i className="fab fa-facebook fa-2x"></i>
                                    <input className="form-control" type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                                </div>

                                <div className="form-group">
                                    <i className="fab fa-youtube fa-2x"></i>
                                    <input className="form-control" type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                                </div>

                                <div className="form-group">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                    <input className="form-control" type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                                </div>

                                <div className="form-group">
                                    <i className="fab fa-instagram fa-2x"></i>
                                    <input className="form-control" type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                                </div>
                            </Fragment>}

                            <input type="submit" className="btn btn-info btn-block mt-4" />
                            <Link to="/dashboard" className="btn btn-light btn-block mt-1 mb-2">Go Back</Link>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))
