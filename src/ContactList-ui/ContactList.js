import React from 'react';
import PropTypes from 'prop-types';
import styles from './contact-list.module.css';

const ContactList = ({ filteredContacts, onDelete }) => {
  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => {
        return (
          <li className={styles.item} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={styles.button}
              type="button"
              onClick={() => {
                onDelete(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
