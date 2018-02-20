const TIMEOUT_ONLOAD = 500
const HAS_HISTORY = (window.history && window.history.pushState)

class Studio {
  constructor() {
    const studio = $('.Studio')

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)

    this.dom = {
      window: window,
      document: document,
      studio: studio,
      gallery: $('.Studio_gallery', studio),
      loader: $('.Studio_loader', studio),
      image: $('.Studio_image', studio),
      title: $('.Studio_title', studio),
      close: $('.Studio_close', studio),
      previous: $('.Studio_previous', studio),
      next: $('.Studio_next', studio),
    }

    this.images = $$('[href^="#"][data-trigger="studio"] img[id]')
    this.imageCache = {}
    this.currentIndex = undefined

    this.attach()

    setTimeout(() => {
      this.handle(this.dom.window.location.hash)
    }, TIMEOUT_ONLOAD)
  }

  attach() {
    this.dom.window.addEventListener('click', (event) => {
      const link = event.target.closest('[href^="#"][data-trigger="studio"]')

      if (link != null) {
        event.preventDefault()
        const hash = link.getAttribute('href')
        this.handle(hash)
      }
    })

    if (HAS_HISTORY) {
      this.dom.window.addEventListener('popstate', (event) => {
        const {hash} = this.dom.window.location
        this.handle(hash)
      })
    } else {
      this.dom.window.addEventListener('hashchange', (event) => {
        const {hash} = this.dom.window.location
        this.handle(hash)
      })
    }

    this.dom.document.addEventListener('keyup', (event) => {
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
    })

    this.dom.studio.addEventListener('click', (event) => {
      if (
        event.target === this.dom.studio
        || event.target === this.dom.image
      ) {
        this.close()
      }
    })

    this.dom.close.addEventListener('click', (event) => {
      this.close()
    })

    this.dom.previous.addEventListener('click', (event) => {
      this.previous()
    })

    this.dom.next.addEventListener('click', (event) => {
      this.next()
    })

    let nextOrPrevious = this.next
    this.dom.image.addEventListener('click', (event) => {
      if (0 === this.currentIndex) {
        nextOrPrevious = this.next
      } else if ((this.currentIndex + 1) === this.images.length) {
        nextOrPrevious = this.previous
      }

      nextOrPrevious()
    })

    const gallery = new Hammer(this.dom.gallery)
    gallery.on('panright', (event) => {
      //console.log(event)
    })

    gallery.on('panleft', (event) => {
      //console.log(event)
    })

    gallery.on('swiperight', (event) => {
      this.previous()
    })

    gallery.on('swipeleft', (event) => {
      this.next()
    })
  }

  handle(hash) {
    if (hash.length > 1) {
      const targetImage = $('[href^="#"][data-trigger="studio"] img' + hash)

      if (targetImage) {
        this.show(targetImage)
        return
      }
    }

    if (undefined !== this.currentIndex) {
      this.close()
    }
  }

  close() {
    const {window, studio} = this.dom

    studio.setAttribute('aria-hidden', 'true')

    if (HAS_HISTORY) {
      window.history.pushState('', '', window.location.pathname)
    } else {
      window.location.hash = ''
    }

    this.currentIndex = undefined
  }

  open() {
    const currentImage = this.images[this.currentIndex]

    if (currentImage) {
      const src = currentImage.getAttribute('data-src-full')
      let img = this.imageCache[src]

      if (undefined === img) {
        this.dom.loader.setAttribute('aria-hidden', 'false')

        img = new Image()
        img.src = src
        img.alt = currentImage.alt
        this.imageCache[src] = img
      }

      const setImage = () => {
        this.dom.image.innerHTML = ''
        this.dom.loader.setAttribute('aria-hidden', 'true')
        this.dom.image.appendChild(img)
        this.dom.title.textContent = img.alt
      }

      if (img.complete) {
        setImage()
      } else {
        this.dom.image.innerHTML = ''
        img.onload = setImage
      }

      // Show studio and update arrows
      this.dom.studio.setAttribute('aria-hidden', 'false')

      if (this.currentIndex <= 0) {
        this.dom.previous.setAttribute('disabled', '')
      } else {
        this.dom.previous.removeAttribute('disabled')
      }

      if (this.currentIndex >= this.images.length - 1) {
        this.dom.next.setAttribute('disabled', '')
      } else {
        this.dom.next.removeAttribute('disabled')
      }
    }
  }

  previous() {
    const previousImage = this.images[this.currentIndex - 1]

    if (previousImage) {
      this.show(previousImage)
    }
  }

  next() {
    const nextImage = this.images[this.currentIndex + 1]

    if (nextImage) {
      this.show(nextImage)
    }
  }

  show(image) {
    const {window} = this.dom
    const hash = '#' + image.id

    if (hash !== window.location.hash) {
      if (HAS_HISTORY) {
        window.history.pushState('', '', window.location.pathname + hash)
      } else {
        window.location.hash = hash
      }
    }

    this.images.forEach((_image, index) => {
      if (image.id === _image.id) {
        this.currentIndex = index
      }
    })

    this.open()
  }
}

$.ready().then(function() {
  const studio = new Studio()
})
