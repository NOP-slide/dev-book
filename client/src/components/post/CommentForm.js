import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postid, addComment }) => {
    const [text, setText] = useState('');

    return (
        <div className="mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Leave a Comment
                </div>
                <div className="card-body">
                    <form className="form my-1" onSubmit={e => {
                        e.preventDefault();
                        addComment(postid, { text });
                        setText('');
                    }}>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="text"
                                cols="30"
                                rows="5"
                                placeholder="Add a comment"
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm)
