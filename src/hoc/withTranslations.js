import React, { Component } from 'react'
import { injectIntl } from 'react-intl'

export default function withTranslationsFactory(messages) {
  return function withTranslations(WrappedComponent) {
    return injectIntl(
      class WithTranslations extends Component {
        render() {
          const { intl, ...props } = this.props
          const translations = {}

          Object.keys(messages).forEach(prop => {
            translations[prop] = values =>
              intl.formatMessage({id: messages[prop]}, values)
          })

          return <WrappedComponent {...props} translations={translations} locale={intl.locale} />
        }
      }
    )
  }
}
