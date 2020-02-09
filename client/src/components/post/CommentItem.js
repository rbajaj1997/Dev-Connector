import React from 'react'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/post';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = props => {
    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${props.comment.user}`}>
                    <img
                        class="round-img"
                        src={props.comment.avatar}
                        alt=""
                    />
                    <h4>{props.comment.name}</h4>
                </Link>
            </div>
            <div>
                <p class="my-1">
                    {props.comment.text}
                </p>
                <p class="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{props.comment.date}</Moment>
                </p>
                {!props.auth.loading && props.comment.user === props.auth.user._id && <button onClick={e => props.deleteComment(props.postId, props.comment._id)} type='button' className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { deleteComment })(CommentItem)
