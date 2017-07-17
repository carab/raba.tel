import 'blissfuljs';

class Studio {
  constructor() {
    const studio = $('.Studio');

    this.dom = {
      studio: studio,
      image: $('.Studio_image', studio),
      close: $('.Studio_close', studio),
      previous: $('.Studio_previous', studio),
      next: $('.Studio_next', studio),
    },

    this.images = $$('img[id]');
    this.currentIndex = undefined;

    this.attach();
  }

  attach() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;

      if (hash.length > 1) {
        const targetImage = $('img' + hash);

        if (targetImage) {
          this.images.forEach((image, index) => {
            if (targetImage.id == image.id) {
              this.currentIndex = index;
            }
          });

          this.open();
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.keyCode == 27) {
        this.close();
      }

      if (event.keyCode == 37) {
        this.previous();
      }

      if (event.keyCode == 39) {
        this.next();
      }
    });

    this.dom.studio.addEventListener('click', (event) => {
      if (event.target == this.dom.studio) {
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
  }

  close() {
    this.dom.studio.setAttribute('aria-hidden', 'true');
    window.location.hash = '';
    this.currentIndex = undefined;
  }

  open() {
    const currentImage = this.images[this.currentIndex];

    if (currentImage) {
      this.dom.image.src = currentImage.src;
      this.dom.image.alt = currentImage.alt;
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
    window.location.hash = '#' + image.id;
  }
}

$.ready().then(function() {
  const studio = new Studio();
});
