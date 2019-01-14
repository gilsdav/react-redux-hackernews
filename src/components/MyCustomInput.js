import React, { Component } from 'react'

class MyCustomInput extends Component {

    increase(value) {
        return value + 1;
    }

    decrease(value) {
        return value > 1 ? value - 1 : 0;
    }

  render() {
    const {
      input: { value, onChange },
        label,
        meta: { touched, error, warning }
    } = this.props
    return (
      <div>
        <label>{label}</label>
        <div>
            <span>The current value is {value}.</span>
            <button type="button" onClick={() => onChange(this.increase(value))}>
            Inc
            </button>
            <button type="button" onClick={() => onChange(this.decrease(value))}>
            Dec
            </button>
            {touched &&
                ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
      </div>
    )
  }
}

export default MyCustomInput;
