import React, { Component } from 'react'
import { Table, Glyphicon, Button, ControlLabel, FormControl, HelpBlock, FormGroup, Modal, Form } from 'react-bootstrap'
import '../App.css'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

const ListContact = props => {
  const list = props.contacts.map(x => {
    return (
      <tr key={x.firstName + x.lastName + x.age} className="Table-cell-text-left">
        <td>{x.firstName}</td>
        <td>{x.lastName}</td>
        <td>{x.age}</td>
        <td>
          <Button bsSize="small" onClick={() => props.update(x)}>
            <Glyphicon glyph="pencil" />
          </Button>{' '}
          <Button
            bsSize="small"
            onClick={() => {
              props.delete(x)
            }}
          >
            <Glyphicon glyph="trash" />
          </Button>
        </td>
      </tr>
    )
  })
  return list
}

const HeadRow = props => {
  return (
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
    </thead>
  )
}

const ModalUpdate = props => {
  return (
    <Modal
      show={this.state.isUpdating}
      onHide={() => props.onClose}
      bsSize="large"
      aria-labelledby="contained-modal-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.firstName} {props.lastName} {props.age}{' '}
      </Modal.Body>
    </Modal>
  )
}

const BodyRow = props => {
  return (
    <tbody>
      <ListContact contacts={props.contacts} delete={props.delete} update={props.update} />
    </tbody>
  )
}

class TableContact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isUpdating: false,
      firstName: '',
      lastName: '',
      age: 0,
      onUpdateObj: ''
    }

    this.updateContact = this.updateContact.bind(this)
    this.onChangeEvent = this.onChangeEvent.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onClickEvent = this.onClickEvent.bind(this)
  }

  validateObj(obj) {
    var isReString = /[a-zA-Z]/i
    var isReinteger = /\d/i

    if (isReString.test(obj.firstName) && isReString.test(obj.lastName) && isReinteger.test(obj.age)) {
      return Object.assign({}, { firstName: obj.firstName, lastName: obj.lastName, age: obj.age })
    }

    return {}
  }
  onClickEvent(e) {
    e.preventDefault()
    const obj = Object.assign({}, this.validateObj(this.state))
    if (Object.keys(obj).length !== 0) {
      this.props.onUpdate(obj, this.state.onUpdateObj)
      this.clearState()
    }
  }

  clearState() {
    this.setState({
      firstName: '',
      lastName: '',
      age: 0,
      isUpdating: !this.state.isUpdating
    })
  }

  onChangeEvent(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateContact(obj) {
    this.setState({
      isUpdating: true,
      firstName: obj.firstName,
      lastName: obj.lastName,
      age: obj.age,
      onUpdateObj: Object.assign({}, { firstName: obj.firstName, lastName: obj.lastName, age: obj.age })
    })
  }

  onClose() {
    this.setState({
      isUpdating: !this.state.isUpdating
    })
  }

  render() {
    const modal = (
      <Modal
        show={this.state.isUpdating}
        onHide={this.onClose}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FieldGroup
              id="formControlsFirstName"
              type="text"
              label="FirstName"
              placeholder="First Name"
              onChange={this.onChangeEvent}
              value={this.state.firstName}
              name="firstName"
            />{' '}
            <FieldGroup
              id="formControlsLastName"
              type="text"
              label="LastName"
              placeholder="Last Name"
              onChange={this.onChangeEvent}
              value={this.state.lastName}
              name="lastName"
            />{' '}
            <FieldGroup
              id="formControlsAge"
              type="text"
              label="Age"
              placeholder="Age"
              onChange={this.onChangeEvent}
              value={this.state.age}
              name="age"
            />{' '}
            <Button type="submit" onClick={this.onClickEvent}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
    return (
      <Table responsive hover bordered>
        <HeadRow />
        <BodyRow
          contacts={this.props.contacts}
          delete={this.props.delete}
          update={this.updateContact}
          onClose={this.onClose}
        />
        {modal}
      </Table>
    )
  }
}

export default TableContact
