import 'blissfuljs';

$.ready().then(function() {
  const header = $('.Header');

  document.addEventListener('scroll', function(event) {
		const distance = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (0 == distance) {
      header.classList.remove('Header-sticked');
    } else {
      header.classList.add('Header-sticked');
    }
	});
});
