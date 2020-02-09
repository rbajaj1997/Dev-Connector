import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = props => {
    console.log(props);
    return (
        <div class="profile-top bg-primary p-2">
            <img
                class="round-img my-1"
                src={props.profile.user.avatar}
                alt=""
            />
            <h1 class="large">{props.profile.user.name}</h1>
            <p class="lead">{props.profile.status} {props.profile.company && <span> at {props.profile.company}</span>}</p>
            <p>{props.profile.location && <span> {props.profile.location}</span>}</p>
            <div class="icons my-1">
                {
                    props.profile.website && (
                        <a href={props.profile.wesite} target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-globe fa-2x"></i>
                        </a>
                    )
                }

                {
                    props.profile.social && props.profile.social.twitter && (
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-twitter fa-2x"></i>
                        </a>
                    )
                }

                {
                    props.profile.social && props.profile.social.facebook && (
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-facebook fa-2x"></i>
                        </a>
                    )
                }

                {
                    props.profile.social && props.profile.social.linkedin && (
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-linkedin fa-2x"></i>
                        </a>
                    )
                }

                {
                    props.profile.social && props.profile.social.youtube && (
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-youtube fa-2x"></i>
                        </a>
                    )
                }

                {
                    props.profile.social && props.profile.social.instagram && (
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-instagram fa-2x"></i>
                        </a>
                    )
                }
            </div>
        </div>
    )
}


export default ProfileTop;
