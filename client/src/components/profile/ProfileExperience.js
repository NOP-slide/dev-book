import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';


const ProfileExperience = ({experience: {company, title, location, current, to, from, description}}) => {
    return (
        <li className="list-group-item">
            <h3>{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p className="posttext">
                <strong>Description: </strong>{description ? description : <em>None provided</em>}
            </p>
        </li>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience
