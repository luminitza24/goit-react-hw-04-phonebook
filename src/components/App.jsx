import { Component } from 'react';
import { Form } from './form/Form';
import { ContactList } from './list/List';
import { Search } from './search/Search';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Dobby Potter', number: '327-61-55' },
    ],
    filter: '',
  };
  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse('storedContacts') });
    }
  }
  componentDidUpdate() {
    const contacts = this.setState;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  handleSubmit = newContact => {
    const { contacts } = this.state;
    const duplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      const contact = {
        id: nanoid(),
        name: newContact.name,
        number: newContact.number,
      };
      this.setState({ contacts: [...contacts, contact] });
    }
  };
  handleFilter = term => {
    this.setState({ filter: term });
  };
  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
    return (
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <Form onSubmit={this.handleSubmit} />
        <h2 className="subtitle">Contacts</h2>
        <Search onFilter={this.handleFilter} />
        <ContactList
          contacts={filteredContacts}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
