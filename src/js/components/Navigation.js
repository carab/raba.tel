$.ready().then(function() {
  $$('.Navigation li').forEach(function(li) {
    const button = $('[aria-haspopup="true"]', li)
    const popup = $('[aria-hidden]', li)

    if (button && popup) {
      li.addEventListener('mouseenter', function() {
        popup.setAttribute('aria-hidden', 'false')
      })

      li.addEventListener('mouseleave', function() {
        popup.setAttribute('aria-hidden', 'true')
      })

      button.addEventListener('touchstart', (event) => {
        event.preventDefault()
        const isHidden = ('true' === popup.getAttribute('aria-hidden'))

        if (isHidden) {
          popup.setAttribute('aria-hidden', 'false')
        } else {
          popup.setAttribute('aria-hidden', 'true')
        }
      })
    }
  })
})
