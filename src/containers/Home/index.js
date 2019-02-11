import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import cssModule from 'react-css-modules';

import * as postActionCreator from '$redux/actions/post';

import style from './style.css';

class Home extends Component {
  static propTypes = {
    postAction: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { postAction } = this.props;
    postAction.fetch();
  }

  render() {
    return (<div styleName="container">Home</div>);
  }
}

export default connect(null, dispatch => ({ postAction: bindActionCreators(postActionCreator, dispatch) }))(cssModule(Home, style, { allowMultiple: true }));
