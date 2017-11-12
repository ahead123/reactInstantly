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
import { store } from '../../store'

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 'Instagram API',
      store
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { store: { access_token, authorized, data } } = this.state
    if(!prevState.store.authorized && authorized){
      jsonp(API_CALL_FOR_USER_PROFILE + access_token, null, (error, data) => {
        if(error){
          console.log(error)
        }else{
          this.setState({ data: data.data })
        }
      })
    }
    if(!prevState.store.data.id && data.id){
      const { store: { profileImages } } = this.state
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
    const { store: { access_token, authorized, loading } } = this.state  
    if(window.location.href.indexOf('access_token')>-1) {
      let url = window.location.href.split('access_token=')[1].trim()
      this.setState({ 
       access_token: url, 
        authorized: true
      })
      console.log('this.state in did mount',this.state.store)
    }
    this.setState({ loading: false })
  }

  loadProfile = () => {
    if(this.state.store.data.length > 0){
      const { store: { data: { full_name, profile_picture } } } = this.state
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
    const { store: { profileImages: { data } } } = this.state
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
    const { store: { loading } } = this.state
    event.preventDefault()
    this.setState({ loading: true })
    window.location.assign(TEST_API_URL+SCOPES)
  }

  showHideAuthButton = () => {
    const { store: { authorized, loading, data: { full_name } } } = this.state

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
        loading ? 'Navigating to Instagram...' :'Instagram  AUTH' 
      } 
      </button>
    )
  }

	render() {
    const { store, value } = this.state
    console.log('store',store)
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
          this.state.store.profileImages.data ? <h4>Profile Images</h4>: ''
         }
          {this.loadProfileImages()}
        </div>
			</div>
		);
	}
}
