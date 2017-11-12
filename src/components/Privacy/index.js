import React, { Component } from 'react';

export default class Privacy extends Component {
  constructor() {
    super();
    this.state = {
      value: 'Privacy Page'
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
