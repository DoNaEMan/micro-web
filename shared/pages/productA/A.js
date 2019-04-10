import React from 'react';
import { connect } from 'react-redux';

import * as styles from './style.less';

class A extends React.Component {
  render() {
    return (
      <div className={styles['carousel-wrap']}>
        <i />
        <div className={styles.hot} />
        { this.props.todos }
      </div>
    );
  }
}

export default connect(state => ({
  todos: state.pagesProductA,
}))(A);
