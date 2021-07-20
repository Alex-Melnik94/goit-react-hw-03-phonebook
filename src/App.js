import React from 'react';
import ContactForm from './ContactForm-ui/ContactForm';
import Filter from './Filter-ui/filter';
import ContactList from './ContactList-ui/ContactList';
import styles from './styles.module.css';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocal = JSON.parse(localStorage.getItem('contacts'));
    if (contactsFromLocal) {
      this.setState({ contacts: contactsFromLocal });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  setContact = contact => {
    const sameContact = this.state.contacts.find(
      prevContact => prevContact.name === contact.name,
    );

    if (sameContact) {
      alert(`${sameContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  onDeleteContact = id => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const filteredContacts = contacts.filter(contact => contact.id !== id);
      return {
        contacts: filteredContacts,
      };
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
    );

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.setContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onDelete={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
