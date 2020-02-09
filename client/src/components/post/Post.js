import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = props => {
    useEffect(() => {
        props.getPost(props.match.params.id)
    }, [props.getPost])
    return (
        props.post.loading || props.post.post === null ? <Spinner /> : <Fragment>
            <Link to='/posts' className='btn'>
                Back to Posts
            </Link>
            <PostItem showActions={false} post={props.post.post} />
            <CommentForm postId={props.post.post._id} />
            <div className="comments">
                {props.post.post.comments.map((comment) => {
                    return <CommentItem key={comment._id} comment={comment} postId={props.post.post._id} />
                })}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, { getPost })(Post)
