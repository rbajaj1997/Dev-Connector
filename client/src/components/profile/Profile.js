import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = props => {
    useEffect(() => {
        props.getProfileById(props.match.params.id);
    }, [props.getProfileById])
    return (
        <Fragment>
            {props.profile.profile === null || props.profile.loading ? <Spinner /> :
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back To Profiles
                    </Link>
                    {/* {console.log(props.profile.profile)} */}
                    {props.auth.isAuthenticated && props.auth.loading === false && props.auth.user._id === props.profile.profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                    <div class="profile-grid my-1">
                        <ProfileTop profile={props.profile.profile} />
                        <ProfileAbout profile={props.profile.profile} />
                        <div class="profile-exp bg-white p-2">
                            <h2 class="text-primary">Experience</h2>
                            {props.profile.profile.experience.length > 0 ? (<Fragment>
                                {props.profile.profile.experience.map((exp) => {
                                    return <ProfileExperience key={exp._id} exp={exp} />
                                })}
                            </Fragment>) : (<h4>No Experience</h4>)}
                        </div>
                        <div class="profile-edu bg-white p-2">
                            <h2 class="text-primary">Education</h2>
                            {props.profile.profile.education.length > 0 ? (<Fragment>
                                {props.profile.profile.education.map((edu) => {
                                    return <ProfileEducation key={edu._id} edu={edu} />
                                })}
                            </Fragment>) : (<h4>No Experience</h4>)}
                        </div>
                        {props.profile.profile.githubusername && <ProfileGithub username={props.profile.profile.githubusername} />}
                    </div>
                </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { getProfileById })(Profile)
