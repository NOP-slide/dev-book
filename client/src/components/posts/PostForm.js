import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');

    return (
        <div className="mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">Say Something...</div>
                <div className="card-body">
                    <form onSubmit={e => {
                        e.preventDefault();
                        addPost({ text });
                        setText('');
                    }}>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="text"
                                cols="30"
                                rows="5"
                                placeholder="Create a post"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
