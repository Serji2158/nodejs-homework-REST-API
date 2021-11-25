const Contacts = require('./schemas/contacts.js')

const getAllContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 20,
    offset = 0,
  } = query

  const searchOptions = { owner: userId }
  if (favorite !== null) {
    searchOptions.favorite = favorite
  }

  const result = await Contacts.paginate(searchOptions, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'email',
    },
  })
  const { docs: contacts } = result
  delete result.docs
  return { ...result, contacts }
}

const getContactById = async (contactId, userId) => {
  const data = await Contacts.findOne({
    _id: contactId,
    owner: userId,
  })
  return data
}

const createContact = (userId, body) => {
  return Contacts.create({ owner: userId, ...body })
}

function updateContact(userId, contactId, body) {
  return Contacts.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  )
}

const updateStatusContact = (userId, contactId, { favorite }) => {
  return Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...favorite },
    { new: true }
  )
}

const removeContact = (userId, contactId) => {
  return Contacts.findOneAndRemove({ _id: contactId, owner: userId })
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
}
