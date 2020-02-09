import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEducation = props => {
    return (
        <div>
            <h3>{props.edu.school}</h3>
            <p><Moment format='YYYY/MM/DD'>{props.edu.from}</Moment> - {props.edu.to ? <Moment format='YYYY/MM/DD'>{props.edu.to}</Moment> : 'Now'} </p>
            <p><strong>Degree: </strong>{props.edu.degree}</p>
            <p><strong>Field Of Study: </strong>{props.edu.fieldofstudy}</p>
            <p>
                <strong>Description: </strong>{props.edu.description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {

}

export default ProfileEducation
