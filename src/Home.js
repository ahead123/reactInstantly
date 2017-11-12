import React, { Component } from 'react';
import axios from 'axios';
import 'whatwg-fetch';
import { API_URL, TEST_API_URL } from './constants';

export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 'Instagram API',
      access_token: '',
      loading: false,
      authorized: false
    };
  }

  componentDidMount() {
    let access_token, authorized=false;

    if(window.location.href.indexOf('access_token')>-1) {
       access_token = window.location.href.split('access_token=')[1].trim()
       authorized = true
      this.setState({
        access_token,
        authorized
      })
    }
    this.setState({ loading: false })
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    window.location.assign(API_URL)
  }

  showHideButton = () => {
    if(this.state.authorized){
      return (
        <div>
          <h5>Thanks! You've Been Authorized. Now Let's have some fun with the API!</h5>
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
    console.log(this.state)
		return (
			<div>
        <h3>{ value }</h3>
        <div>
          {this.showHideButton()}
        </div>
			</div>
		);
	}
}
