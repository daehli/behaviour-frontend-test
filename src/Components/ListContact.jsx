import React, { Component } from 'react'
import { Table, Glyphicon, Button, ControlLabel, FormControl, HelpBlock, FormGroup, Modal } from 'react-bootstrap'
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

const ListContact = props => {
  const list = props.contacts.map(x => {
    return (
      <tr className="Table-cell-text-left">
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

const ListContactUpdate = props => {
  return (
    <tr>
      <td>
        <FieldGroup />
      </td>
      <td>
        <FieldGroup />
      </td>
      <td>
        <FieldGroup />
      </td>
      <td>
        <Button /> <Button />
      </td>
    </tr>
  )
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
    <Modal bsSize="large" aria-labelledby="contained-modal-title-lg">
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
      age: 0
    }

    this.updateContact = this.updateContact.bind(this)
  }

  updateContact(obj) {
    this.setState({
      isUpdating: true
    })
    console.log(obj)
    console.log('Update')
  }

  render() {
    return (
      <Table responsive hover bordered>
        <HeadRow />
        <BodyRow contacts={this.props.contacts} delete={this.props.delete} update={this.updateContact} />
      </Table>
    )
  }
}

export default TableContact
