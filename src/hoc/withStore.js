import React, { Component } from 'react'

import { StoreContext } from '../components/store/Store'

export default function withStoreFactory(selector) {
  return function withStore(WrappedComponent) {
    return class WithStore extends Component {
      render() {
        return (
          <StoreContext.Consumer>
            {store => <WrappedComponent {...this.props} {...selector(store)} />}
          </StoreContext.Consumer>
        )
      }
    }
  }
}
