import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({ addLike, removeLike, deletePost, auth, post: { _id, text, name, avatar, user, likes, comments, date }, showActions }) => {

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <Link to={`/profile/${user}`} >
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

                    {showActions && <Fragment>
                        <button onClick={e => addLike(_id)} type="button" className="btn btn-light mr-1">
                            <i className="fas fa-thumbs-up"></i>
                            {likes.length > 0 && (
                                <span className="badge badge-light">{likes.length}</span>
                            )}
                        </button>

                        <button onClick={e => removeLike(_id)} type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>

                        <Link to={`/posts/${_id}`} className="btn btn-info mr-1">
                            Discussion {comments.length > 0 && (
                                <span className='badge badge-light'>{comments.length}</span>
                            )}
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                            <button onClick={e => deletePost(_id)} type="button" className="btn btn-sm float-right mt-1 btn-danger">
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </Fragment>}
                </div>
            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showActions: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
