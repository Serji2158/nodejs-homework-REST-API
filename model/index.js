// const fs = require('fs').promises
// const path = require('path')
// // const contacts = require("./contacts.json");
// const { nanoid } = require('nanoid')

// const contactsPath = path.join(__dirname, './contacts.json')

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath, 'utf-8')
//     const result = JSON.parse(data)
//     return result
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts()
//     const result = await contacts.find((contact) => {
//       return contact.id.toString() === contactId.toString()
//     })
//     return result
//   } catch (error) {
//     console.log(error)
//   }
// }

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await listContacts()
//     const changedListContacts = await contacts.filter(
//       (contact) => contact.id.toString() !== contactId.toString()
//     )
//     await fs.writeFile(contactsPath, JSON.stringify(changedListContacts))
//     return changedListContacts
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts()
//   const newContact = { id: nanoid(), name, email, phone }
//   contacts.push(newContact)
//   await fs.writeFile(contactsPath, JSON.stringify(contacts))
//   return newContact
// }

// async function updateContact(contactId, name, email, phone) {
//   try {
//     const contacts = await listContacts()
//     const updateContact = contacts.filter((contact) => {
//       if (contact.id.toString() === contactId.toString()) {
//         contact.name = name
//         contact.email = email
//         contact.phone = phone
//       }
//     })
//     console.log(updateContact)
//     // contacts.push(updateContact);
//     // await fs.writeFile(contactsPath, JSON.stringify(contacts));
//     const updateContactList = JSON.stringify([...contacts])
//     await fs.writeFile(contactsPath, updateContactList)
//     return updateContact
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
