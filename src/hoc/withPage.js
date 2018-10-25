import React, { Component } from 'react'

import { PageContext } from '../components/layout/Layout'

export default function withPage(WrappedComponent) {
  return class WithPage extends Component {
    render() {
      return (
        <PageContext.Consumer>
          {page => <WrappedComponent {...this.props} page={page} />}
        </PageContext.Consumer>
      )
    }
  }
}
