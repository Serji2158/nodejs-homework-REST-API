const Contacts = require('./schemas/contacts.js')

const getAllContacts = async () => {
  return Contacts.find()
}

const getContactById = (contactId) => {
  return Contacts.findById(contactId)
}

const createContact = ({ name, email, phone, favorite }) => {
  return Contacts.create({ name, email, phone, favorite })
}

const updateContact = (contactId, { name, email, phone, favorite }) => {
  return Contacts.findByIdAndUpdate(
    contactId,
    { name, email, phone, favorite },
    {
      new: true,
    }
  )
}

const updateStatusContact = (contactId, { favorite }) => {
  return Contacts.findByIdAndUpdate(contactId, { favorite }, { new: true })
}

const removeContact = (contactId) => {
  return Contacts.findByIdAndRemove(contactId)
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
}
