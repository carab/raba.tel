import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import EventListener from 'react-event-listener'

import withStore from '../../hoc/withStore'
import withTranslations from '../../hoc/withTranslations'
import Icon from '../icon/Icon'

import './Studio.css'

export default withTranslations({
  close: 'studio.close',
  previous: 'studio.previous',
  next: 'studio.next',
})(
  withStore(store => {
    const {
      studio: { opened, images },
      setStudioOpened,
    } = store

    const index = images.findIndex(image => image.src === opened)
    const image = images[index]
    const isFirst = index === 0
    const isLast = index === images.length - 1

    return {
      image,
      index,
      isFirst,
      isLast,
      images,
      setStudioOpened,
    }
  })(
    class Studio extends Component {
      state = {
        cache: {},
      }

      static propTypes = {
        image: PropTypes.object,
        images: PropTypes.array,
        ready: PropTypes.bool,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
        index: PropTypes.number,
        setStudioOpened: PropTypes.func.isRequired,
        translations: PropTypes.object.isRequired,
      }

      componentDidMount() {
        this.preload()
      }

      componentDidUpdate() {
        this.preload()
      }

      preload() {
        const { image } = this.props
        const { cache } = this.state

        if (image && !cache[image.src]) {
          // eslint-disable-next-line
          const img = new Image()
          img.src = image.src

          const cacheImage = () => {
            this.setState({
              cache: {
                ...cache,
                [image.src]: true,
              },
            })
          }

          if (img.complete) {
            cacheImage()
          } else {
            img.onload = cacheImage
          }
        }
      }

      render() {
        const { image, isFirst, isLast, translations } = this.props
        const { cache } = this.state
        const ready = image && cache[image.src]

        return (
          <section
            className="Studio"
            aria-hidden={undefined === image}
            onClick={this.handleClose}
          >
            <EventListener target="document" onKeyup={this.handleKeyUp} />
            <button
              className="Studio_close"
              type="button"
              title={translations.close()}
              onClick={() => {
                /* Nothing here, handled by the click on Studio */
              }}
            >
              <Icon name="close" />
            </button>
            <button
              className="Studio_previous"
              type="button"
              title={translations.previous()}
              disabled={isFirst}
              onClick={this.handlePrevious}
              ref={previousRef => (this.previousRef = previousRef)}
            >
              <Icon name="previous-thin" />
            </button>
            <button
              className="Studio_next"
              type="button"
              title={translations.next()}
              disabled={isLast}
              onClick={this.handleNext}
              ref={nextRef => (this.nextRef = nextRef)}
            >
              <Icon name="next-thin" />
            </button>
            <div
              className="Studio_title"
              ref={titleRef => (this.titleRef = titleRef)}
            >
              {image && image.alt}
            </div>
            <Hammer
              onSwipeLeft={this.handleSwipeLeft}
              onSwipeRight={this.handleSwipeRight}
            >
              <div className="Studio_gallery">
                <div className="Studio_loader" aria-hidden={!image || ready}>
                  <Icon name="loader" />
                </div>
                <div className="Studio_image">
                  {ready ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      ref={imgRef => (this.imgRef = imgRef)}
                    />
                  ) : null}
                </div>
              </div>
            </Hammer>
          </section>
        )
      }

      close() {
        this.props.setStudioOpened(undefined)
      }

      navigate(offset) {
        const { index, images } = this.props
        const image = images[index + offset]

        if (image) {
          this.props.setStudioOpened(image.src)
        }
      }

      previous() {
        this.navigate(-1)
      }

      next() {
        this.navigate(1)
      }

      handleClose = event => {
        if (
          !this.previousRef.contains(event.target) &&
          !this.nextRef.contains(event.target) &&
          !this.titleRef.contains(event.target) &&
          !this.imgRef.contains(event.target)
        ) {
          this.close()
        }
      }

      handlePrevious = () => {
        this.previous()
      }

      handleNext = () => {
        this.next()
      }

      handleKeyUp = event => {
        // Escape
        if (27 === event.keyCode) {
          this.close()
        }

        // Left arrow
        if (37 === event.keyCode) {
          this.previous()
        }

        // Right arrow
        if (39 === event.keyCode) {
          this.next()
        }
      }

      handleSwipeRight = () => {
        this.previous()
      }

      handleSwipeLeft = () => {
        this.next()
      }
    }
  )
)
