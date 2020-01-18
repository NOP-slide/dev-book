import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({ deleteComment, postid, comment: { _id, text, name, avatar, user, date }, auth }) => {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <Link to={`/profile/${user}`}>
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={avatar}
                            alt="avatar"
                        />
                        <h5 className="text-center text-info">{name}</h5>
                    </Link>
                </div>
                <div className="col-md-10">
                    <p className="posttext">{text}</p>
                    <p>
                        <small>Posted on <Moment format="YYYY/MM/DD">{date}</Moment></small>
                    </p>
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={e => deleteComment(postid, _id)} type="button" className="btn btn-danger mr-1">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    postid: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem)
