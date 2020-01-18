import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
        // eslint-disable-next-line
    }, [posts]);

    return (
        loading ? <Spinner /> : (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-info">Posts</h1>
                            <p className="lead"><i className="fas fa-user"></i> Welcome to the community</p>

                            <PostForm />

                            {posts.map(post => (
                                <PostItem key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts)
