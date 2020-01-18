import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
        // eslint-disable-next-line
    }, [profiles]);

    return loading ? <Spinner /> : <Fragment>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Developers</h1>
                    <p className="lead text-center"><i className="fab fa-connectdevelop"></i> Browse and connect with developers</p>
                    {profiles.length > 0 && (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    )}
                </div>
            </div>
        </div>
    </Fragment>

}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles)
