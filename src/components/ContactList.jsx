import React, { useEffect, useState } from 'react';
import { Search, Plus, MoreVertical, Check } from 'lucide-react';
import io from 'socket.io-client';

const ContactList = ({ onSelectContact, selectedContactId }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [socketRef, setSocketRef] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocketRef(socket);

    // Fetch initial contacts
    socket.emit('get-contacts', {});

    // Subscribe to contacts updates
    socket.on('contacts-list', (data) => {
      setContacts(data);
    });

    socket.on('new-contact', (contact) => {
      setContacts(prev => [contact, ...prev]);
    });

    socket.on('contact-updated', (updatedContact) => {
      setContacts(prev =>
        prev.map(c => c.id === updatedContact.id ? updatedContact : c)
      );
    });

    return () => socket.disconnect();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const handleAddContact = () => {
    // TODO: Implement add contact modal
    console.log('Add new contact');
  };

  return (
    <div className="flex flex-col h-full bg-white border-r w-96">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contatos</h2>
        <button
          onClick={handleAddContact}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 mb-4"
        >
          <Plus className="w-5 h-5" />
          Novo Contato
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar contatos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Nenhum contato encontrado</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={`p-4 border-b cursor-pointer transition hover:bg-gray-50 ${
                selectedContactId === contact.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage || contact.phone}</p>
                  {contact.unreadCount > 0 && (
                    <p className="text-xs text-gray-400 mt-1">{contact.unreadCount} não lida</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {contact.online && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                  {selectedContactId === contact.id && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;
