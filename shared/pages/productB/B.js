import React from 'react';
import { connect } from 'react-redux';

import * as styles from './style.css';

class B extends React.Component {
  render() {
    return (
      <div className={styles['carousel-wrap']}>
        <i />
        {this.props.counter}
      </div>
    );
  }
}

export default connect(state => ({
  counter: state.pagesProductB,
}))(B);
