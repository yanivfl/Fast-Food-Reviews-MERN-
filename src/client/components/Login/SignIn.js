import React, {Component} from 'react'
import {Field ,reduxForm, formValueSelector} from 'redux-form'
import FacebookLogin from 'react-facebook-login'
import {required, maxLength10} from '../../utils/formValidation'
import {renderField} from '../../utils/formComponents'
import {connect} from 'react-redux'
import LoginActions from './actions'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import Checkbox from '@material-ui/core/Checkbox'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './Login.scss';

const renderCheckbox = ({ input, name }) => (
  <FormControlLabel
        control={ <Checkbox style={{color: 'black', width:'0px', height:'0px'}}
                        icon={<VisibilityIcon fontSize="small"/>}
                        checkedIcon={<VisibilityOffIcon fontSize="small"/>}
                        id={name}
                        color="default"
                        checked={input.value ? true : false}
                        onChange={input.onChange}
                  />}
  />
);

class SignIn extends Component {
  
  responseFacebook = response =>  {
    const details = {};
    details.email = response.email; 
    details.avatar = response.picture.data.url;
    details.user_id = response.id;
    this.props.signInFBEventHandler(details);
  };

  render () {
    const {handleSubmit,pristine,reset,submitting, invalid, hidePassword} = this.props;
    let fbconnect = (<FacebookLogin appId="596251677818146"
                                  fields="name,email,picture"
                                  callback={this.responseFacebook}
                                  cssClass="FBbtn"
                                  icon="fab fa-facebook"
                                  textButton=" "
                   />);
    return (
      <div className="inner-container">
        <Avatar className= "avatar" src="https://i.imgur.com/7SKrYwJ.jpg" style={{ width: "90px", height: "90px"}}/>
        <div className="header">Welcome</div>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <Field  name="user_name" type="text" 
                      component={renderField} label="User name"
                      validate = {[required, maxLength10]}/><span className="fa"><PersonIcon fontSize="small"/></span>
            </div>
            <div className="input-group">
              <Field  name="password" type={hidePassword ?  "text" : "password"} 
                      component= {renderField} label="Password"
                      validate = {[required]}/>
                      <span className="fa" style={{right:'3px'}}> 
                        <Field name="hidePassword" component={renderCheckbox}/>
                      </span>
        
            </div>
            <div className="center">
              <Field  name="remember_me" id="Remember me" 
                      type="checkbox" component="input"/>
              <label htmlFor="Remember me">Remember me</label>
            </div>   
            <div className="text center">
              <button className="btn" type="submit" 
                      disabled={invalid  || submitting}>
                      <i className="fa fa-paper-plane" style={{marginRight:'8px'}}/>Log in</button>
              <button className="btn" type="button" 
                      disabled={pristine || submitting} 
                      onClick={reset}>Clear Values</button> 
              <div className="text"> Or continue with your facebook account </div>
              <div>{fbconnect}</div> 
            </div>  
          </form>
        </div>
      </div>
    );
  }
}

SignIn = reduxForm ({
  form: 'LoginFormValidation',  // a unique identifier for this form
  required,                     // <--- validations function given to redux-form
  maxLength10,
}) (SignIn);

// Decorate with connect to read form values
const selector = formValueSelector('LoginFormValidation')
SignIn = connect(state => {
  // can select values individually
  const hidePassword = selector(state, 'hidePassword')

  return { hidePassword }})(SignIn) 

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInFBEventHandler: (values) => {
      dispatch(LoginActions.signInFBAction(values));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);