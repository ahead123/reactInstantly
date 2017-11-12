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
      loading: false
    };
  }

  componentDidMount() {
    let access_token;
    if(window.location.href.indexOf('access_token')>-1) {
       access_token = window.location.href.split('access_token=')[1].trim()
      this.setState({
        access_token
      })
    }
    this.setState({ loading: false })
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    window.location.assign(TEST_API_URL)
  }

	render() {
    const { value } = this.state
    console.log(this.state)
		return (
			<div>
        <h3>{ value }</h3>
        <div>
          <button 
            className="btn btn-primary"
            onClick={this.handleInstagramAPIRequest}
          >
            {this.state.loading ? 'Navigating to Instagram...' :'Authorize with Instagram' } 
          </button>
        </div>
			</div>
		);
	}
}
