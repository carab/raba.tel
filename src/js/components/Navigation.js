$.ready().then(function() {
  $$('.Navigation li').forEach(function(li) {
    const ul = $('[aria-hidden]', li);

    if (ul) {
      li.addEventListener('mouseenter', function() {
        ul.setAttribute('aria-hidden', 'false');
    	});

      li.addEventListener('mouseleave', function() {
        ul.setAttribute('aria-hidden', 'true');
    	});
    }
  });
});
