import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = props => {
    return (
        <div class="profile-about bg-light p-2">
            {
                props.profile.bio && (
                    <Fragment>
                        <h2 class="text-primary">{props.profile.user.name}'s Bio</h2>
                        <p>
                            {props.profile.bio}
                        </p>
                        <div class="line"></div>
                    </Fragment>
                )
            }
            <h2 class="text-primary">Skill Set</h2>
            <div class="skills">
                {
                    props.profile.skills.map((skill, index) => {
                        return (
                            <div key={index} class="p-1"><i class="fa fa-check"></i>{skill}</div>
                        );
                    })
                }
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
