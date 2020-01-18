import React, { Fragment } from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        experiences.length > 0 ? (
            <Fragment>
                <h3 className='mb-4'>Experience</h3>
                <div className="table-responsive">
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Title</th>
                                <th>Year</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{experiences}</tbody>
                    </table>
                </div>
            </Fragment>) : (
                <Fragment><h4 className='mb-2'>Experience:</h4><h6>Nothing here yet</h6><hr/></Fragment>)
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
