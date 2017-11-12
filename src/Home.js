import React, { Component } from 'react';
import axios from 'axios';
import 'whatwg-fetch';
import { 
  API_URL, 
  TEST_API_URL,
  TEST_API_URL_WITH_PUBLIC_CONTENT,
  API_CALL_FOR_USER_PROFILE,
  API_URL_WITH_PUBLIC_CONTENT 
} from './constants';


export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 'Instagram API',
      access_token: '',
      loading: false,
      authorized: false,
      userData: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { access_token, authorized } = this.state
    if(!prevState.authorized && authorized){
      console.log('prevProps',prevProps)
      console.log('prevState',prevState)
      console.log('state inside update', this.state)
      axios(API_CALL_FOR_USER_PROFILE + access_token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
    }
  }

  componentDidMount() {
    let access_token, authorized=false;

    if(window.location.href.indexOf('access_token')>-1) {
       access_token = window.location.href.split('access_token=')[1].trim()
       authorized = true
      this.setState({ access_token, authorized })
    }
    this.setState({ loading: false })
  }

  checkAuthState() {
    if(this.state.authorized) {
      return(
        <button
          className="btn btn-success"
        >
          Get images from Instagram
        </button>
      )
    }
    return false
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    window.location.assign(API_URL_WITH_PUBLIC_CONTENT)
  }

  showHideAuthButton = () => {
    if(this.state.authorized){
      return (
        <div>
          <h5>
            Thanks! You've Been Authorized. 
            Now Let's have some fun with the API!
          </h5>
        </div>
      )
    }
    return (
      <button 
        className="btn btn-primary"
        onClick={this.handleInstagramAPIRequest}
      >
      {
        this.state.loading ? 'Navigating to Instagram...' :'Authorize with Instagram' 
      } 
      </button>
    )
  }

	render() {
    const { value } = this.state
    console.log('this.state',this.state)
		return (
			<div>
        <h3>{ value }</h3>
        <div>
          {this.showHideAuthButton()}
        </div>
        <div>
          {this.checkAuthState()}
        </div>
			</div>
		);
	}
}
