import React, { Fragment } from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
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
                <h3 className='mb-4'>Education</h3>
                <div className="table-responsive">
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>School</th>
                                <th>Degree/Certificate</th>
                                <th>Year</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{educations}</tbody>
                    </table>
                </div>
            </Fragment>) : (
                <Fragment><h4 className='mb-2'>Education:</h4><h6>Nothing here yet</h6></Fragment>
            )
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
