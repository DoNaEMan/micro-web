import React from 'react';
import { connect } from 'react-redux';
import axios from '../../../utils/axios';

import * as styles from './style.less';

class A extends React.Component {
  componentDidMount() {
    // A.preload(this.props.dispatch);
  }
  render() {
    return (
      <div className={styles['carousel-wrap']}>
        <i />
        <div className={styles.hot} />
        { this.props.todos[0] }
        <br />
        { this.props.todos[1] }
      </div>
    );
  }
}

A.loaddata = function (dispatch, cb){
  axios.post('/api/test').then((res) => {
    dispatch({
      type: 'ADD_TODO',
      payload: res.data
    });
    cb && cb();
  });
};

export default connect(state => ({
  todos: state.pagesProductA,
}))(A);
