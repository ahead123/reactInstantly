import React, { Component } from 'react';
import axios from 'axios';
import jsonp from 'jsonp';
import 'whatwg-fetch';
import { 
  API_URL, 
  TEST_API_URL,
  API_CALL_FOR_USER_PROFILE,
  SCOPES
} from './constants';
import UserProfile from './components/UserProfile'

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 'Instagram API',
      access_token: '',
      loading: false,
      authorized: false,
      data: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { access_token, authorized } = this.state
    if(!prevState.authorized && authorized){
      console.log('prevProps',prevProps)
      console.log('prevState',prevState)
      console.log('state inside update', this.state)
      jsonp(API_CALL_FOR_USER_PROFILE + access_token, null, (error, data) => {
        if(error){
          console.log('error', error)
        }else{
          console.log('data', data)
          this.setState({ data: data.data })
        }
      })
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

  loadProfile = () => {
    if(this.state.data.id){
      const { data: { full_name, profile_picture } } = this.state
      return (
        <UserProfile 
          text={full_name} 
          title="Front end developer" 
          profile_picture={profile_picture}
        />
      )
    }
     
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    window.location.assign(API_URL+SCOPES)
  }

  showHideAuthButton = () => {
    const { authorized, data: { full_name } } = this.state

    if(authorized){
      return (
        <div>
          <h5>
            {
              full_name ? 'Welcome Back '+full_name : ''
            }
          </h5>
        </div>
      )
    }
    return (
      <button 
        className="btn btn-outline-primary"
        onClick={this.handleInstagramAPIRequest}
      >
      {
        this.state.loading ? 'Navigating to Instagram...' :'Instagram  AUTH' 
      } 
      </button>
    )
  }

	render() {
    const { value } = this.state
    console.log('this.state',this.state)
    console.log('this.props',this.props)
		return (
			<div className="text-center">
        <h3>{ value }</h3>
        <div>
          {this.showHideAuthButton()}
        </div>
        <div>
          {this.loadProfile()}
        </div>
			</div>
		);
	}
}
