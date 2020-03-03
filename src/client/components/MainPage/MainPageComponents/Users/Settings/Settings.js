import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field ,reduxForm, formValueSelector } from 'redux-form'
import SnackActions from '../../../../SnackBar/actions'
import MainActions from '../../../actions'
import LoginActions from '../../../../Login/actions'
import Avatar from '@material-ui/core/Avatar/index'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/Edit';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {isUserExist , validateImage} from '../../../../../utils/formValidation'
import './Settings.scss'


const renderTextField = ({ icon,input, label,meta, ...custom }) => (
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                {icon}
            </Grid>
            <Grid item>    
                <TextField  error={meta.error ? true : false}
                    id="standard-error-helper-text input-with-icon-grid"
                    style={{marginTop: "12px"}}
                    inputProps={{style: { textAlign: "center"}}}
                    label={meta.error ? 'Error' : label}
                    helperText={meta.touched && meta.error}
                    {...input}
                    {...custom}
                />
          </Grid>
        </Grid>
);

const renderCheckbox = ({ input, label,name }) => (
    <FormControlLabel
          control={
                <Checkbox icon={<EditIcon/>}
                          checkedIcon={<EditIcon color="primary"/>}
                          id={name}
                          label={label}
                          color= "primary"
                          checked={input.value ? true : false}
                          onChange={input.onChange}
                />}
          label={label}
          labelPlacement="end"
    />
);

//TODO: check trigger form change
const handleChange = (event, input, snack_callback) => {
    event.preventDefault();
    const types = "image/jpeg, image/png , image/jpg";
    if (!types.includes(event.target.files[0].type)) {
        snack_callback(false, "Picture type must be jpeg/png/jpg");
    }
    let imageFile = event.target.files[0];
    if (imageFile) {
        const localImageUrl = URL.createObjectURL(imageFile);
        const imageObject = new window.Image();

        imageObject.onload = () => {
            imageFile.width = imageObject.naturalWidth;
            imageFile.height = imageObject.naturalHeight;
            input.onChange(imageFile);
            URL.revokeObjectURL(imageFile);
            snack_callback(true, "Picture has been uploaded successully");
        };
        imageObject.src = localImageUrl;
    }
    console.log("file trigger form-change.");
};

const renderFileField = ({ snack_callback,input,label, type, meta: { invalid, error } }) => (
    <div>
        {invalid && error && <span className="danger-error">{error}<i className="fa fa-exclamation-triangle"></i></span>}
        <div>
            <input  className={"login-input upload-container center" + (invalid&&error ? "-error": "")}
                    accept='image/*'
                    type={type} 
                    onChange={event => handleChange(event, input ,snack_callback)} //TODO: check trigger form change
                    />
        </div>  
    </div>
);    

// TODO: change location form to auto complete
// TODO: fix image form and image preview!

class Settings extends Component {

    componentDidMount() {
        this.props.isUserExistEventHandler('');
    }
    
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.user_name !== prevProps.user_name) {
            console.log('re-update');
            this.props.isUserExistEventHandler(this.props.user_name);
        }
    }

    render() {

        const {handleSubmit,editAvatar,editLocation,editUsername,pristine,reset,submitting, invalid} = this.props;

        return (
            <div className="user-info-content">
                <div className="user-header">General Account Settings</div>
                <form onSubmit={handleSubmit((values)=>this.props.editUserProfileEventHandler(values, this.props.user_name))}>
                    <div className="user-info">
                        <label className="user-info-elm" style={{fontWeight: "600"}}>User name</label>
                        <label className="user-info-elm">{this.props.user_name}</label>
                        <div className="check-box">
                            <Field
                                name="editUsername"
                                component={renderCheckbox}
                                label="Edit"
                            />  
                        </div>
                        {editUsername && (
                            <Field  name="new_user_name" type="text"
                                    component={renderTextField} 
                                    label="New user name" icon={<AccountCircle />}
                                    validate={[isUserExist]}
                            />
                        )}
                    </div>
                    <div className="user-info">
                        <label className="user-info-elm" style={{fontWeight: "600"}}>Location</label>
                        <label className="user-info-elm">{this.props.location}</label>
                        <div className="check-box">
                            <Field
                                name="editLocation"
                                component={renderCheckbox}
                                label="Edit"
                            />
                        </div>
                        {editLocation && (
                        <div>
                            <Field  name="new_location" type="text"
                                    component={renderTextField} 
                                    label="New Location" icon={<LocationOnIcon />}
                            />
                        </div>
                        )}
                    </div>
                    <div className="user-info">
                        <label className="user-info-elm" style={{fontWeight: "600"}}>Avatar</label>
                        <div className="user-avatar">
                            <Avatar src={editAvatar ? this.props.avatar_preview : this.props.avatar} 
                                    style={{ width: "100px",height: "100px"}}
                            />
                        </div>
                        <div className="check-box">
                            <Field
                                name="editAvatar"
                                component={renderCheckbox}
                                label="Edit"/>
                        </div>
                        {editAvatar ?
                            <Field name="avatar_preview" type="file"
                                   snack_callback={(isSucc, message) => this.props.openSnackBar(isSucc, message)}
                                   component={renderFileField}
                            /> :
                            this.props.clearAvatarPreviewEventHandler()
                        }
                    </div>
                    <div className="centerBtn">
                        <button className="btn" type="submit"
                                disabled={invalid || submitting}>Save Changes
                        </button>
                        <button className="btn" type="button"
                                disabled={pristine || submitting}
                                onClick={reset}>Clear Values
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Settings = reduxForm ({
    form: 'UserProfileFormValidation',  // a unique identifier for this form
    isUserExist,                     // <--- validations function given to redux-form
    }) (Settings);

// Decorate with connect to read form values
const selector = formValueSelector('UserProfileFormValidation') // <-- same as form name
Settings = connect(state => {
  // can select values individually
  const editUsername = selector(state, 'editUsername')
  const editLocation = selector(state, 'editLocation')
  const editAvatar = selector(state, 'editAvatar')

  return { editUsername, editLocation, editAvatar }
})(Settings)    

const mapStateToProps = (state) => {
    return {
        user_name: state['login'].get('user_name'),
        user_names: state['login'].get('user_names'),
        location: state['login'].get('location'),
        avatar: state['login'].get('avatar'),
        avatar_preview: state['login'].get('avatar_preview'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editUserProfileEventHandler: (values, user_name) => {
            let new_data = values;
            new_data.user_name = user_name;
            new_data.new_avatar = values.avatar_preview;
            dispatch(MainActions.editUserProfile(new_data));
        },
        clearAvatarPreviewEventHandler: () =>{
            dispatch(MainActions.clearAvatarPreview());
        },
        isUserExistEventHandler: (name) => {
            dispatch(LoginActions.isUserExist(name));
        },
        openSnackBar: (isSucc, message) => {
            dispatch(SnackActions.openSnackBar(isSucc, message));
        },
        closeSnackBar: () => {
            dispatch(SnackActions.closeSnackBar());
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
