import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const StoreContext = React.createContext()

export default class Store extends Component {
  state = {
    store: {
      studio: {
        opened: undefined,
        images: [],
      },
    },
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props
    const { store } = this.state

    return (
      <StoreContext.Provider
        value={{
          ...store,
          setStore: this.setStore,
          addStudioImage: this.addStudioImage,
          removeStudioImage: this.removeStudioImage,
          setStudioOpened: this.setStudioOpened,
        }}
      >
        {children}
      </StoreContext.Provider>
    )
  }

  setStore = store => {
    this.setState({
      store: {
        ...this.state.store,
        ...store,
      },
    })
  }

  setStudioOpened = src => {
    const { store } = this.state

    this.setState({
      store: {
        ...store,
        studio: { ...store.studio, opened: src },
      },
    })
  }

  addStudioImage = image => {
    const { store } = this.state

    if (!this.images) {
      // We need to debounce otherwise the state is never updated
      this.images = [...store.studio.images, image]
      // eslint-disable-next-line
      setTimeout(() => {
        this.setState({
          store: {
            ...store,
            studio: { ...store.studio, images: this.images },
          },
        })
        this.images = undefined
      }, 50)
    } else {
      this.images.push(image)
    }
  }

  removeStudioImage = src => {
    const { store } = this.state

    if (!this.images) {
      // We need to debounce otherwise the state is never updated
      this.images = store.studio.images.filter(image => image.src !== src)
      // eslint-disable-next-line
      setTimeout(() => {
        this.setState({
          store: {
            ...store,
            studio: { ...store.studio, images: this.images },
          },
        })
        this.images = undefined
      }, 50)
    } else {
      this.images = this.images.filter(image => image.src !== src)
    }
  }
}
