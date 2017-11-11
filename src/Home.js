import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from './constants'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      value: 'Instagram API'
    };
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    axios({
      method: 'GET',
      url: API_URL,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': {
          'Content-Type': 'application/json'
        }
      }
    })
    .then(response => console.log('response',response))
    .catch(error => console.log('error',error))
  }

	render() {
    const { value } = this.state
		return (
			<div>
        <h3>{ value }</h3>
        <div>
          <button 
            className="btn btn-primary"
            onClick={this.handleInstagramAPIRequest}
          >
            Use Instagram API
          </button>
        </div>
			</div>
		);
	}
}
