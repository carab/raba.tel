const TIMEOUT_ONLOAD = 500;
const HAS_HISTORY = (window.history && window.history.pushState);

class Studio {
  constructor() {
    const studio = $('.Studio');

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);

    this.dom = {
      window: window,
      document: document,
      studio: studio,
      gallery: $('.Studio_gallery', studio),
      loader: $('.Studio_loader', studio),
      image: $('.Studio_image', studio),
      close: $('.Studio_close', studio),
      previous: $('.Studio_previous', studio),
      next: $('.Studio_next', studio),
    };

    this.images = $$('[href^="#"][data-trigger="studio"] img[id]');
    this.currentIndex = undefined;

    this.attach();

    setTimeout(() => {
      this.handle(this.dom.window.location.hash);
    }, TIMEOUT_ONLOAD);
  }

  attach() {
    this.dom.window.addEventListener('click', (event) => {
      const link = event.target.closest('[href^="#"][data-trigger="studio"]');

      if (link != null) {
        event.preventDefault();
        const hash = link.getAttribute('href');
        this.handle(hash);
      }
    });

    if (HAS_HISTORY) {
      this.dom.window.addEventListener('popstate', (event) => {
        const {hash} = this.dom.window.location;
        this.handle(hash);
      });
    } else {
      this.dom.window.addEventListener('hashchange', (event) => {
        const {hash} = this.dom.window.location;
        this.handle(hash);
      });
    }

    this.dom.document.addEventListener('keyup', (event) => {
      // Escape
      if (event.keyCode == 27) {
        this.close();
      }

      // Left arrow
      if (event.keyCode == 37) {
        this.previous();
      }

      // Right arrow
      if (event.keyCode == 39) {
        this.next();
      }
    });

    this.dom.studio.addEventListener('click', (event) => {
      if (
        event.target == this.dom.studio
        || event.target == this.dom.image
      ) {
        this.close();
      }
    });

    this.dom.close.addEventListener('click', (event) => {
      this.close();
    });

    this.dom.previous.addEventListener('click', (event) => {
      this.previous();
    });

    this.dom.next.addEventListener('click', (event) => {
      this.next();
    });

    let nextOrPrevious = this.next;
    this.dom.image.addEventListener('click', (event) => {
      if (this.currentIndex == 0) {
        nextOrPrevious = this.next;
      } else if ((this.currentIndex + 1) == this.images.length) {
        nextOrPrevious = this.previous;
      }

      nextOrPrevious();
    });

    const gallery = new Hammer(this.dom.gallery);
    gallery.on('panright', (event) => {
      //console.log(event);
    });

    gallery.on('panleft', (event) => {
      //console.log(event);
    });

    gallery.on('swiperight', (event) => {
      this.previous();
    });

    gallery.on('swipeleft', (event) => {
      this.next();
    });
  }

  handle(hash) {
    const {window} = this.dom;

    if (hash.length > 1) {
      const targetImage = $('[href^="#"][data-trigger="studio"] img' + hash);

      if (targetImage) {
        this.show(targetImage);
        return;
      }
    }

    if (this.currentIndex != undefined) {
      this.close();
    }
  }

  close() {
    const {window, studio} = this.dom;

    studio.setAttribute('aria-hidden', 'true');

    if (HAS_HISTORY) {
      window.history.pushState('', '', window.location.pathname)
    } else {
      window.location.hash = '';
    }

    this.currentIndex = undefined;
  }

  open() {
    const currentImage = this.images[this.currentIndex];

    if (currentImage) {
      this.dom.loader.setAttribute('aria-hidden', 'false');

      var img = new Image();
      img.src = currentImage.getAttribute('data-src-full');
      img.alt = currentImage.alt;

      const setImage = () => {
        this.dom.image.innerHTML = '';
        this.dom.loader.setAttribute('aria-hidden', 'true');
        this.dom.image.appendChild(img)
      };

      if (img.complete) {
        setImage();
      } else {
        this.dom.image.innerHTML = '';
        img.onload = setImage;
      }

      // Show studio and update arrows
      this.dom.studio.setAttribute('aria-hidden', 'false');

      if (this.currentIndex <= 0) {
        this.dom.previous.setAttribute('disabled', '');
      } else {
        this.dom.previous.removeAttribute('disabled');
      }

      if (this.currentIndex >= this.images.length - 1) {
        this.dom.next.setAttribute('disabled', '');
      } else {
        this.dom.next.removeAttribute('disabled');
      }
    }
  }

  previous() {
    const previousImage = this.images[this.currentIndex - 1];

    if (previousImage) {
      this.show(previousImage);
    }
  }

  next() {
    const nextImage = this.images[this.currentIndex + 1];

    if (nextImage) {
      this.show(nextImage);
    }
  }

  show(image) {
    const {window} = this.dom;
    const hash = '#' + image.id;

    if (window.location.hash != hash) {
      if (HAS_HISTORY) {
        window.history.pushState('', '', window.location.pathname + hash);
      } else {
        window.location.hash = hash;
      }
    }

    this.images.forEach((_image, index) => {
      if (image.id == _image.id) {
        this.currentIndex = index;
      }
    });

    this.open();
  }
}

$.ready().then(function() {
  const studio = new Studio();
});
