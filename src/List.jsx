import React, { Component } from 'react'
import TableContact from './Components/ListContact' //nom, prénom, âge
import AddContact from './Components/AddContact' //nom, prénom, âge
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
const initDB = [
  { firstName: 'Daehli', lastName: 'Nadeau-Otis', age: '23' },
  { firstName: 'Émilie', lastName: 'Claveau', age: '22' },
  { firstName: 'Andy', lastName: 'Tremblay', age: '24' },
  { firstName: 'Mike', lastName: 'Simard', age: '26' },
  { firstName: 'Cedric', lastName: 'Ayotte', age: '20' }
]

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: []
    }

    this.onClickEvent = this.onClickEvent.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.onUpdateEvent = this.onUpdateEvent.bind(this)
  }

  componentWillMount() {
    if (localStorage.length < 2) {
      localStorage.setItem('contacts', JSON.stringify([...initDB]))
    }
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts'))
    })
  }

  onClickEvent(contact) {
    var arr = this.state.contacts
    arr.push(contact)
    localStorage.setItem('contacts', JSON.stringify([...arr]))
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts'))
    })
  }

  onUpdateEvent(newObj, oldObj) {
    const deleteOldObj = this.state.contacts.map(x => {
      if (JSON.stringify(x) == JSON.stringify(oldObj)) {
        return newObj
      }
      return x
    })

    localStorage.setItem('contacts', JSON.stringify(deleteOldObj))
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts'))
    })
  }

  deleteContact(obj) {
    const deletedObjFromArray = this.state.contacts.filter(x => {
      if (x != obj) {
        return x
      }
    })

    localStorage.setItem('contacts', JSON.stringify(deletedObjFromArray))
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts'))
    })
  }

  render() {
    return (
      <div>
        <TableContact contacts={this.state.contacts} delete={this.deleteContact} onUpdate={this.onUpdateEvent} />
        <AddContact onClickParent={this.onClickEvent} />
      </div>
    )
  }
}

export default List
