import React, { Component } from 'react';
import axios from 'axios';
import jsonp from 'jsonp';
import 'whatwg-fetch';
import { 
  API_URL, 
  TEST_API_URL,
  API_CALL_FOR_USER_PROFILE,
  API_CALL_FOR_USER_COMPLETE_PROFILE,
  SCOPES
} from '../../constants';
import UserProfile from '../UserProfile'
import ProfileImage from '../ProfileImage'

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 'Instagram API',
      access_token: '',
      loading: false,
      authorized: false,
      data: [],
      profileImages: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { access_token, authorized, data } = this.state
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
    if(!prevState.data.id && data.id){
      jsonp(API_CALL_FOR_USER_COMPLETE_PROFILE + access_token, null, (error, data) => {
        if(error){
          console.log('error', error)
        }else{
          console.log('data', data)
          this.setState({ profileImages: data })
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

  loadProfileImages = () => {
    let pics = []
    const { profileImages: { data } } = this.state
    if(data){
      console.log('data', data)
     data.map((item, index) => {
        const { width, height, url } = item.images.thumbnail
        pics.push(<ProfileImage thumbnailURL={url} width={width} height={height} />)
      })
    }
    return pics
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    window.location.assign(TEST_API_URL+SCOPES)
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
        <div className="">
         {
          this.state.profileImages.data ? <h4>Profile Images</h4>: ''
         }
          {this.loadProfileImages()}
        </div>
			</div>
		);
	}
}
