import { useState, useEffect } from 'react';
import { Form } from './form/Form';
import { ContactList } from './list/List';
import { Search } from './search/Search';
import { nanoid } from 'nanoid';

const startContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  { id: 'id-5', name: 'Dobby Potter', number: '327-61-55' },
];
export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    console.log(storedContacts);
    return storedContacts ? JSON.parse(storedContacts) : startContacts;
  });
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = newContact => {
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
      setContacts([...contacts, contact]);
    }
  };
  const handleFilter = term => {
    setFilter(term);
  };
  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.contacts.filter(contact => contact.id !== contactId)
    );
  };
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );
  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <Form onSubmit={handleSubmit} />
      <h2 className="subtitle">Contacts</h2>
      <Search onFilter={handleFilter} />
      <ContactList contacts={filteredContacts} removeContact={removeContact} />
    </div>
  );
};
