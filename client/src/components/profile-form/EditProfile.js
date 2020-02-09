import React, { useState, Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = props => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialinputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            company: props.profile.loading || !props.profile.profile.company ? '' : props.profile.profile.company,
            website: props.profile.loading || !props.profile.profile.website ? '' : props.profile.profile.website,
            location: props.profile.loading || !props.profile.profile.location ? '' : props.profile.profile.location,
            status: props.profile.loading || !props.profile.profile.status ? '' : props.profile.profile.status,
            skills: props.profile.loading || !props.profile.profile.skills ? '' : props.profile.profile.skills.join(','),
            githubusername:
                props.profile.loading || !props.profile.profile.githubusername ? '' : props.profile.profile.githubusername,
            bio: props.profile.loading || !props.profile.profile.bio ? '' : props.profile.profile.bio,
            twitter: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.twitter,
            facebook: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.facebook,
            linkedin: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.linkedin,
            youtube: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.youtube,
            instagram: props.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.instagram
        });
        // eslint-disable-next-line
    }, [props.profile, getCurrentProfile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;


    const onChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = (e) => {
        e.preventDefault();
        props.createProfile(formData, props.history, true);
    }


    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername} onChange={e => onChange(e)}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
            username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" value={bio} onChange={e => onChange(e)} name="bio"></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" onClick={() => toggleSocialinputs(!displaySocialInputs)} className="btn btn-light">
                        Add Social Network Links
          </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" value={twitter} onChange={e => onChange(e)} placeholder="Twitter URL" name="twitter" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" value={facebook} onChange={e => onChange(e)} placeholder="Facebook URL" name="facebook" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" value={youtube} onChange={e => onChange(e)} placeholder="YouTube URL" name="youtube" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" value={linkedin} onChange={e => onChange(e)} placeholder="Linkedin URL" name="linkedin" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" value={instagram} onChange={e => onChange(e)} placeholder="Instagram URL" name="instagram" />
                    </div>
                </Fragment>}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
