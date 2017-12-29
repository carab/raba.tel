const SCROLL_THROTTLE = 300;
const HAS_API = (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName);

class Photo {
  constructor() {
    window.addEventListener('load', () => {
      this.progressiveImages = document.getElementsByClassName('Photo Photo--waiting');
      this.timer = null;
      this.scroller = this.scroller.bind(this);
      this.inView = this.inView.bind(this);

      this.inView();

      window.addEventListener('scroll', this.scroller, false);
      window.addEventListener('resize', this.scroller, false);
    });
  }

  inView() {
    var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
    while (p < this.progressiveImages.length) {

      cRect = this.progressiveImages[p].getBoundingClientRect();
      pT = wT + cRect.top;
      pB = pT + cRect.height;

      if (wT < pB && wB > pT) {
        this.loadImage(this.progressiveImages[p]);
        this.progressiveImages[p].classList.remove('Photo--waiting');
      }
      else p++;
    }
  }

  loadImage(item) {
    // load image
    const img = new Image()
    const preview = item.querySelector('.Photo_preview')

    img.src = preview.getAttribute('data-src');
    img.alt = preview.getAttribute('alt');
    img.className = 'Photo_thumbnail';

    if (img.complete) {
      addImg()
    } else {
      img.onload = addImg
    }

          // replace image
    function addImg() {
      // add full image
      item
        .appendChild(img)
        /*.addEventListener('animationend', function(e) {
          // remove preview image
          var pImg = item.querySelector && item.querySelector('.Photo_preview');

          if (pImg) {
            e.target.alt = pImg.alt || '';
            item.removeChild(pImg);
            e.target.classList.remove('Photo_thumbnail');
          }
        });/**/
    }
  }

  scroller(e) {
    this.timer = this.timer || setTimeout(() => {
      this.timer = null;
      requestAnimationFrame(this.inView);
    }, SCROLL_THROTTLE);
  }
}

$.ready().then(function() {
  const progressiveImage = new Photo();
});
