import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: { status, company, location, website, social, user: { name, avatar } } }) => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-sm-4 m-auto">
                                <img
                                    className="rounded-circle mb-2"
                                    src={avatar}
                                    alt="avatar"
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <h1 className="display-6 text-center">{name}</h1>
                            <p className="lead text-center">{status} {company && <span> at {company}</span>}</p>
                            <p>{location && <span>{location}</span>}</p>
                            <p>
                                {
                                    website && (
                                        <a className="p-2" href={website} target="_blank" rel="noopener noreferrer">
                                            <i className="ww fas fa-globe fa-2x"></i>
                                        </a>
                                    )
                                }
                                {
                                    social && social.twitter && (
                                        <a className="p-2" href={social.twitter} target="_blank" rel="noopener noreferrer">
                                            <i className="ww fab fa-twitter fa-2x"></i>
                                        </a>
                                    )
                                }
                                {
                                    social && social.facebook && (
                                        <a className="p-2" href={social.facebook} target="_blank" rel="noopener noreferrer">
                                            <i className="ww fab fa-facebook fa-2x"></i>
                                        </a>
                                    )
                                }
                                {
                                    social && social.linkedin && (
                                        <a className="p-2" href={social.linkedin} target="_blank" rel="noopener noreferrer">
                                            <i className="ww fab fa-linkedin fa-2x"></i>
                                        </a>
                                    )
                                }
                                {
                                    social && social.youtube && (
                                        <a className="p-2" href={social.youtube} target="_blank" rel="noopener noreferrer">
                                            <i className="ww fab fa-youtube fa-2x"></i>
                                        </a>
                                    )
                                }
                                {
                                    social && social.instagram && (
                                        <a className="p-2" href={social.instagram} target="_blank" rel="noopener noreferrer">
                                            <i className="ww fab fa-instagram fa-2x"></i>
                                        </a>
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
