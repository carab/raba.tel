import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withStore from '../../hoc/withStore'
import Img from '../img/Img'

import './Photo.css'

export const MIN_WIDTH = 300
export const MAX_WIDTH = 400

export default withStore(store => ({
  addStudioImage: store.addStudioImage,
  removeStudioImage: store.removeStudioImage,
  setStudioOpened: store.setStudioOpened,
}))(
  class Photo extends Component {
    static defaultProps = {
      original: {},
    }

    static propTypes = {
      addStudioImage: PropTypes.func.isRequired,
      removeStudioImage: PropTypes.func.isRequired,
      setStudioOpened: PropTypes.func.isRequired,
      ratio: PropTypes.number,
      original: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        src: PropTypes.string,
      }),
    }

    componentDidMount() {
      const {
        alt,
        original: { src },
        addStudioImage,
      } = this.props

      if (src) {
        addStudioImage({
          src,
          alt,
        })
      }
    }

    componentWillUnmount() {
      const {
        original: { src },
        removeStudioImage,
      } = this.props

      if (src) {
        removeStudioImage(src)
      }
    }

    render() {
      const {
        // eslint-disable-next-line
        addStudioImage,
        // eslint-disable-next-line
        removeStudioImage,
        // eslint-disable-next-line
        setStudioOpened,
        original: { width, height, src },
        ratio,
        ...props
      } = this.props

      const style = {}
      const computedRatio = width && height ? width / height : ratio

      if (computedRatio) {
        //style.width = computedRatio * MIN_WIDTH
        style.maxWidth = computedRatio * MAX_WIDTH
        style.flexGrow = computedRatio * MIN_WIDTH
        //style.flexShrink = 1
        style.flexBasis = computedRatio * MIN_WIDTH
      }

      const photo = {
        component: 'div',
        props: {
          className: 'Photo',
          style,
        },
      }

      if (src) {
        photo.props.role = 'button'
        photo.props.tabIndex = 0
        photo.props.onClick = this.handleClick
      }

      return <Img {...props} {...photo.props} />
    }

    handleClick = () => {
      const {
        original: { src },
        setStudioOpened,
      } = this.props

      setStudioOpened(src)
    }
  }
)
