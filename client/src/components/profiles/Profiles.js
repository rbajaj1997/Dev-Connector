import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';


const Profiles = props => {
    useEffect(() => {
        props.getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {props.profile.loading ? <Spinner />
                :
                <Fragment>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop' /> Browse and connect with
                        developers
                        </p>
                    <div className='profiles'>
                        {props.profile.profiles.length > 0 ? (
                            props.profile.profiles.map(profile => (<ProfileItem key={profile._id} profile={profile} />))
                        ) : (
                                <h4>No profiles found...</h4>
                            )}
                    </div>
                </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}


export default connect(mapStateToProps, { getProfiles })(Profiles)
