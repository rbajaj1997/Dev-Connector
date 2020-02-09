import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: action.payload
                },
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter((comment) => {
                        return comment._id !== action.payload
                    })
                },
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
                laoding: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                laoding: false,
                posts: state.posts.map((post) => {
                    return post._id === action.payload.postId ?
                        { ...post, likes: action.payload.likes } : post;
                })
            }
        case DELETE_POST:
            return {
                ...state,
                laoding: false,
                posts: state.posts.filter((post) => {
                    return post._id !== action.payload;
                })
            }
        default:
            return state;
    }
}

export default postsReducer;