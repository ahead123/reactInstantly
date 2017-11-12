import React, { Component } from 'react';
import axios from 'axios';
import 'whatwg-fetch';
import { API_URL, TEST_API_URL } from './constants';

export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 'Instagram API'
    };
  }

  handleInstagramAPIRequest = (event) => {
    event.preventDefault()
    window.location.assign(TEST_API_URL)
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
