import React from 'react';

import * as styles from './style.css';

export default class TestA extends React.Component {
  render() {
    if (process.env.NODE_ENV === 'development') {
      console.log('qweqweqweqwe');
    }
    return (
      <div className={styles['carousel-wrap']}>
        <i />
        AAA
      </div>
    );
  }
}
