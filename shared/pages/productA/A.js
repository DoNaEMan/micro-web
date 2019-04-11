import React from 'react';
import { connect } from 'react-redux';
import axios from '../../../utils/axios';

import * as styles from './style.less';

class A extends React.Component {
  static loaddata(domain){
    return {
      request: () => axios.post(`${domain}/api/test`),
      callback: (dispatch, res) => (dispatch({
        type: 'ADD_TODO',
        payload: res.data
      }))
    };
  }
  componentDidMount() {
    // A.loaddata(this.props.dispatch);
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

export default connect(state => ({
  todos: state.pagesProductA,
}))(A);
