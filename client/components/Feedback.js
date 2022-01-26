import React, { Component } from 'react';

export default class Feedback extends Component {
  render() {
    return <div className='landing'>
      <iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSfCl8sD5WUsnelCvglJuYq8jpScvil7VmGtN5QLylHnoesuAQ/viewform?embedded=true"
				width="800"
				frameborder="1"
				marginheight="0"
				marginwidth="0"
			>
				Loading…
			</iframe>
    </div>
  }
}

