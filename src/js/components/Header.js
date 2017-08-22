
class Header {
  constructor() {
    const studio = $('.Studio');

    this.dom = {
      window: window,
      document: document,
      header: $('.Header'),
      nav: $('.Header_nav'),
      navToggle: $('.Header_navToggle'),
    };

    this.attach();
  }

  attach() {
    const { document, window, header, nav, navToggle } = this.dom;

    // Enable sticked class when scrolling
    document.addEventListener('scroll', (event) => {
  		const distance = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      if (0 == distance) {
        header.classList.remove('Header-sticked');
      } else {
        header.classList.add('Header-sticked');
      }
  	});

    // Toggle header nav when hamburger is clicked.
    navToggle.addEventListener('click', (event) => {
      const isHidden = (nav.getAttribute('aria-hidden') == 'true');

      if (isHidden) {
        nav.setAttribute('aria-hidden', false);
      } else {
        nav.setAttribute('aria-hidden', true);
      }
    });

    // Hide header nav when click anywhere else
    window.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        nav.setAttribute('aria-hidden', true);
      }
    });
  }
}

$.ready().then(function() {
  const header = new Header();
});
