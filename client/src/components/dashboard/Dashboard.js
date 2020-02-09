import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experiences';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile, deleteAccount }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    if (profile.profile === null && profile.loading) {
        return <Spinner />
    }
    return (
        <div>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome {auth.user && auth.user.name}
            </p>
            {
                profile.profile !== null ?
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.profile.experience} />
                        <Education education={profile.profile.education} />

                        <div className='my-2'>
                            <button className='btn btn-danger' onClick={() => deleteAccount()}>
                                <i className='fas fa-user-minus' /> Delete My Account
                            </button>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>
                            Create Profile
                    </Link>
                    </Fragment>
            }
        </div>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile
    };
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
