import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExperience = props => {
    return (
        <div>
            <h3 class="text-dark">{props.exp.company}</h3>
            <p><Moment format='YYYY/MM/DD'>{props.exp.from}</Moment> - {props.exp.to ? <Moment format='YYYY/MM/DD'>{props.exp.to}</Moment> : 'Now'} </p>
            <p><strong>Position: </strong>{props.exp.title}</p>
            <p>
                <strong>Description: </strong>{props.exp.description}
            </p>
        </div>
    )
}

export default ProfileExperience
