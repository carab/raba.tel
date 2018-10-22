import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { addLocaleData, IntlProvider } from 'react-intl'
import frLocaleData from 'react-intl/locale-data/fr'

import translations from '../../translations'

addLocaleData(frLocaleData)

export default class Locale extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children, locale } = this.props
    const messages = translations[locale]

    return (
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    )
  }
}
