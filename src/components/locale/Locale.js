import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider } from 'react-intl'

import translations from '../../translations'

 function Locale(props) {
    const { children, locale } = props
    const messages = translations[locale]

    return (
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    )
}

Locale.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Locale