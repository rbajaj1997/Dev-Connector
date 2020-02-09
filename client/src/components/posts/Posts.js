import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = props => {
    useEffect(() => {
        props.getPosts()
    }, [props.getPosts]);
    console.log(props.post);
    return props.post.loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead"> <i className='fas fa-user' /> Welcome to the community</p>
            <PostForm />
            {props.post.posts.map((post) => {
                return <PostItem key={post._id} post={post} />
            })}
        </Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, { getPosts })(Posts)
