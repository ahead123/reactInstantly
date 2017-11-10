import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      value: 'Instagram API'
    };
  }

	render() {
    const { value } = this.state
		return (
			<div>
        { value }
			</div>
		);
	}
}
