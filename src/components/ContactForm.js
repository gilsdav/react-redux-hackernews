import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import MyCustomInput from './MyCustomInput';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

const initData = {
  firstName: '',
  lastName: '',
  age: 0,
  email: ''
};


class ContactForm extends Component {
  componentDidMount() {
    // this.handleInitialize();
  }

  // handleInitialize() {
  //   this.props.initialize(initData);
  // }

  renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} id={label} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="firstName" label="First Name" component={this.renderField} type="text" required={true} />
        <Field name="lastName" label="Last Name" component={this.renderField} type="text" />
        <Field name="age" label="Age" component={MyCustomInput} />
        <Field name="email" label="Email" component={this.renderField} type="email" />
        <button type="submit">Submit</button>
      </form>
    );
  }

}

// Blocking rules
const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

// Not blocking rules
const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const createReduxForm = reduxForm({
  form: 'contact',
  validate,
  warn,
  destroyOnUnmount: false // Do not lose data on page change
});
ContactForm = createReduxForm(ContactForm);

// Initialize values
const selector = formValueSelector('contact');
ContactForm = connect(state => {
  const {firstName, lastName, age, email} = selector(state, 'firstName', 'lastName', 'age', 'email');
  if (!firstName && !lastName && !age && !email) {
    return {
      initialValues: initData
    };
  }
})(ContactForm);

export default ContactForm;