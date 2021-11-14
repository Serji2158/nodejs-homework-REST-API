const fs = require('fs').promises
const path = require('path')
// const contacts = require("./contacts.json");
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const result = JSON.parse(data)
    return result
  } catch (error) {
    console.log(error.message)
  }
}
console.log(listContacts)

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const result = await contacts.find(
      (contact) => contact.id.toString() === contactId.toString()
    )
    return result
  } catch (error) {
    console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    // console.log(contacts);
    const changedListContacts = await contacts.filter(
      (contact) => contact.id.toString() !== contactId.toString()
    )
    await fs.writeFile(contactsPath, JSON.stringify(changedListContacts))
    return changedListContacts
  } catch (error) {
    console.log(error.message)
  }
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = { id: nanoid(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

async function updateContact(contactId, name, email, phone) {
  try {
    const contacts = await listContacts()
    const updateContact = contacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name
        contact.email = email
        contact.phone = phone
      }
    })
    contacts.push(updateContact)
    // const updateContactList = JSON.stringify([...contacts, updateContact]);
    await fs.writeFile(contactsPath, JSON.stringify(updateContact))
    return updateContact
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
