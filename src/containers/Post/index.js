import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cssModule from 'react-css-modules';

import style from './style.css';

class Post extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (<div>Post</div>);
  }
}

export default cssModule(Post, style, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
