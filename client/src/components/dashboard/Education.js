import React, {Fragment} from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {deleteEducation} from '../../actions/profile';

const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
                    edu.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        educations.length > 0 ? (
        <Fragment>
            <h2 className='my-2'>Education</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree/Certificate</th>
                        <th>Year</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>) : (
            <Fragment><h2 className='my-2'>Education: Nothing here yet</h2></Fragment>
        )
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)
