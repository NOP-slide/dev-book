import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: { user: { _id, name, avatar }, status, company, location, skills } }) => {
    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-3">
                    <img alt="avatar" className="rounded-circle" src={avatar} />
                </div>
                <div className="col-md-5 col-sm-8">
                    <h2>{name}</h2>
                    <p>{status} {company && <span> at {company}</span>}</p>
                    <p className="mt-1">{location && <span>{location}</span>}</p>
                    <Link to={`/profile/${_id}`} className="btn btn-info">View Profile</Link>
                </div>
                <div className="col-md-4 d-none d-md-block">
                    <ul className="list-group">
                        {skills.slice(0, 4).map((skill, index) => (
                            <li key={index} className="list-group-item">
                                <i className="fas fa-check pr-1"></i> {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
