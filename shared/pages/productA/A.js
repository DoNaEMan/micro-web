import React from 'react';
import { connect } from 'react-redux';

import * as styles from './style.css';

class A extends React.Component {
  render() {
    return (
      <div className={styles['carousel-wrap']}>
        <i />
        {this.props.todos}
      </div>
    );
  }
}

export default connect(state => ({
  todos: state.todos,
}))(A);
