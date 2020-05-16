import { withRouter } from 'react-router-dom'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import SignInPage from '../../components/SignInPage'
import { getAccessToken } from '../../utils/StorageUtils.js'

@inject("authStore")
@observer
class SignInPageRoute extends React.Component {
  @observable username = ''
  @observable password = ''
  @observable errorMessage = ''


  @action.bound
  onChangeUsername(e) {
    this.username = e.target.value;
  }

  @action.bound
  onChangePassword(e) {
    this.password = e.target.value;
  }


  onSubmitForm = async(e) => {
    e.preventDefault();
    if (this.username === "" || this.username === undefined) {
      this.errorMessage = "Please enter username";
    }
    else if (this.password === "" || this.password === undefined) {
      this.errorMessage = "Please enter password";
    }
    else {
      this.errorMessage = "";
      await this.props.authStore.userSignIn();
      this.props.history.push('/ecommerce-store/products')
    }
  };


  render() {
    return ( < SignInPage
      // apiStatus={getUserSignInAPIStatus}
      username = { this.username } password = { this.password } errorMessage = { this.errorMessage } onChangeUsername = { this.onChangeUsername } onChangePassword = { this.onChangePassword } onSubmitForm = { this.onSubmitForm } onEnterKeyPress = { this.onEnterKeyPress }
      />
    );
  }
}

export default withRouter(SignInPageRoute);
