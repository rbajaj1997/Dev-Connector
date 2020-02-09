import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = props => {
    const educations = props.education.map((edu) => {
        return (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
                    {edu.to === null ? (
                        ' Now'
                    ) : (
                            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                        )}
                </td>
                <td>
                    <button
                        onClick={() => props.deleteEducation(edu._id)}
                        className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        );
    })
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}


export default connect(null, { deleteEducation })(Education)
