import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import cssModule from 'react-css-modules';

import style from './style.css';

class Container extends PureComponent {
  static propTypes = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (<div styleName="container">{this.props.children}</div>);
  }
}

export default cssModule(Container, style, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
