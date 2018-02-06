import React, { Component } from 'react'

import { FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button } from 'react-bootstrap'
import '../App.css'

function FieldGroup({ id, label, help, validation, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validation(props.name)}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}
class AddContact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      age: 0
    }

    this.onChangeEvent = this.onChangeEvent.bind(this)
    this.getValidationStateString = this.getValidationStateString.bind(this)
    this.getValidationStateInt = this.getValidationStateInt.bind(this)
    this.onClickEvent = this.onClickEvent.bind(this)
  }

  getValidationStateString(e) {
    const re = /[a-zA-Z]/gi
    if (re.test(this.state[e])) {
      return 'success'
    }
    return 'error'
  }

  getValidationStateInt(e) {
    const re = /\d/gi
    if (re.test(this.state[e])) {
      if (this.state[e] === 0) {
        return 'error'
      }
      return 'success'
    }
    return 'error'
  }

  onChangeEvent(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  clearState() {
    this.setState({
      firstName: '',
      lastName: '',
      age: 0
    })
  }

  validateObj(obj) {
    var isReString = /[a-zA-Z]/i
    var isReinteger = /\d/i

    if (isReString.test(obj.firstName) && isReString.test(obj.lastName) && isReinteger.test(obj.age)) {
      return obj
    }

    return {}
  }

  onClickEvent(e) {
    e.preventDefault()
    const obj = Object.assign({}, this.validateObj(this.state))
    if (Object.keys(obj).length !== 0) {
      this.props.onClickParent(obj)
      this.clearState()
    }
  }

  render() {
    return (
      <Form inline className="Form-center">
        <FieldGroup
          id="formControlsFirstName"
          type="text"
          label="FirstName"
          placeholder="First Name"
          onChange={this.onChangeEvent}
          value={this.state.firstName}
          name="firstName"
          validation={this.getValidationStateString}
        />{' '}
        <FieldGroup
          id="formControlsLastName"
          type="text"
          label="LastName"
          placeholder="Last Name"
          onChange={this.onChangeEvent}
          value={this.state.lastName}
          name="lastName"
          validation={this.getValidationStateString}
        />{' '}
        <FieldGroup
          id="formControlsAge"
          type="text"
          label="Age"
          placeholder="Age"
          onChange={this.onChangeEvent}
          value={this.state.age}
          name="age"
          validation={this.getValidationStateInt}
        />{' '}
        <Button
          type="submit"
          onClick={this.onClickEvent}
          style={{
            'margin-top': '1.8em'
          }}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

export default AddContact
