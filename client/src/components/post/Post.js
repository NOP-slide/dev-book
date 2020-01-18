import React, { Fragment, useEffect } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';


const Post = ({ getPost, post: { post, loading }, props: {match} }) => {
    useEffect(() => {
        getPost(match.params.id);
        // eslint-disable-next-line
    }, [post]);

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to="/posts" className="btn">Back to posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postid = {post._id} />
        <h2 className="text-center">Comments</h2>
        {post.comments.length > 0 ? (<div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postid={post._id} />
            ))}
        </div>) : (<h3>No comments yet</h3>)}
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post)
