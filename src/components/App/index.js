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
      const checkDataCacheBeforeAPICall = sessionStorage.getItem(access_token+'data');
      if (checkDataCacheBeforeAPICall) {
        this.setState({ 
          data: JSON.parse(checkDataCacheBeforeAPICall)
        });
        console.log('hit data session cache')
        return
      }
      jsonp(API_CALL_FOR_USER_PROFILE + access_token, null, (error, data) => {
        if(error){
          console.log('error', error)
        }else{
          this.setState({ data: data.data })
          sessionStorage.setItem(access_token+'data', JSON.stringify(data.data))
           console.log('made data api call')
        }
      })
    }
    if(!prevState.data.id && data.id){
      const checkProfileCacheBeforeAPICall = sessionStorage.getItem(access_token+'profile');
      if (checkProfileCacheBeforeAPICall) {
        this.setState({ 
          profileImages: JSON.parse(checkProfileCacheBeforeAPICall),
          showAjaxLoader: true
        });
        console.log('hit profile session cache')
        return
      }
      jsonp(API_CALL_FOR_USER_COMPLETE_PROFILE + access_token, null, (error, data) => {
        if(error){
          console.log('error', error)
        }else{
          this.setState({ profileImages: data, showAjaxLoader: true })
          sessionStorage.setItem(access_token+'profile', JSON.stringify(data))
          console.log('made profile api call')
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
      const { data: { full_name, profile_picture, counts, username } } = this.state
      const link = `https://www.instagram.com/${username}`
      return (
        <UserProfile
          userName={username} 
          text={full_name} 
          profile_picture={profile_picture}
          followers={counts.followed_by}
          following={counts.follows}
          posts={counts.media}
          link={link}
        />
      )
    }   
  }

  loadProfileImages = () => {
    let pics = []
    const { profileImages: { data } } = this.state
    if(data){
     data.map((item, index) => {

        const { 
          caption: { text },  
          images: { thumbnail: { width, height, url } },
          comments: { count },
          likes,
          link 
        } = item

        pics.push(
          <ProfileImage
            key={index} 
            thumbnailURL={url} 
            width={width} 
            height={height} 
            count={count} 
            likes={likes.count}
            caption={text}
            link={link} 
          />
        )
      })
    }
    return <div className="row">{pics}</div>
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    window.location.assign(API_URL+SCOPES)
  }

  showHideAuthButton = () => {
    const { authorized, loading, data: { full_name }, showAjaxLoader } = this.state
    if(authorized){
      return (
        <div>
          <h5>
            {
              full_name ? 'Welcome back! '+full_name : ''
            }
          </h5>
        </div>
      )
    }
    const reloadText = sessionStorage.length > 0 && !loading ? 'Reload Profile' : 'Instagram AUTH'
    const loadingText = sessionStorage.length > 0 && loading ? 'Reloading...' : 'Navigating to Instagram...'
    return (
      <button 
        className="btn btn-outline-primary"
        onClick={this.handleInstagramAPIRequest}
      >
      {
        loading ? loadingText : reloadText 
      }
      </button>
    )  
  }

	render() {
    const { value, profileImages: { data } } = this.state
    console.log('this.state',this.state)
    console.log('sessionStorage', sessionStorage)
		return (
			<div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>{ value }</h3>
            <div>
              {this.showHideAuthButton()}
            </div>
            <div>
              {this.loadProfile()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="text-center">           
            { data ? <h4>Profile Images</h4> : '' } 
            <div>
              {this.loadProfileImages()}
            </div>
          </div>
        </div>
      </div>
		);
	}
}
