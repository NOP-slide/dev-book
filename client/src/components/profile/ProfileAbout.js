import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: { name }
} }) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    {bio && (<Fragment>
                        <h2 className="text-center text-info">{name.trim().split(' ')[0]}'s Bio</h2>
                        <p className="text-center mt-2 posttext">{bio}</p>
                        {/* <div className="line"></div> */}
                    </Fragment>
                    )}
                    <hr />
                    <h2 className="text-center text-info">Skill Set</h2>
                    <div className="row">
                        <div className="d-flex flex-wrap m-auto justify-content-center align-items-center">
                            {skills.map((skill, index) => (
                                <div key={index} className="p-3">
                                    <i className="fas fa-check"></i> {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
