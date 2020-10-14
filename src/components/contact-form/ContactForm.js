import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import { FormattedMessage, useIntl } from 'react-intl'

import Form from '../form/Form'
import Button from '../button/Button'

function ContactForm(props) {
  const { title, email, next } = props
  const intl = useIntl()
  const locale = intl?.locale

  return (
    <>
      <h1>{title}</h1>
      <Form method="POST" action={`//formspree.io/${email}`}>
        <input type="hidden" name="_format" value="plain" />
        {locale ? (
          <input type="hidden" name="_language" value={locale} />
        ) : null}
        <input
          type="hidden"
          name="_subject"
          value="New contact from camillerabatel.com"
        />
        <input type="hidden" name="_next" value={withPrefix(next)} />
        <p>
          <label htmlFor="contact-email">
            <FormattedMessage id="contact.email" />
          </label>
          <input id="contact-email" type="email" name="email" />
        </p>
        <p>
          <label htmlFor="contact-message">
            <FormattedMessage id="contact.message" />
          </label>
          <textarea id="contact-message" name="message" />
        </p>
        <footer>
          <Button type="submit" primary>
            <FormattedMessage id="contact.send" />
          </Button>
        </footer>
      </Form>
    </>
  )
}

ContactForm.propTypes = {
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
}

export default ContactForm
