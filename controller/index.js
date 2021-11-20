const service = require('../service')

const get = async (req, res, next) => {
  try {
    const contactsData = await service.getAllContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contactsData,
      },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contactIdInfo = await service.getContactById(contactId)
    if (contactIdInfo) {
      res.json({
        status: 'success',
        code: 200,
        data: { result: contactIdInfo },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const post = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  try {
    const newContact = await service.createContact({
      name,
      email,
      phone,
      favorite,
    })
    res.json({
      status: 'success',
      code: 201,
      data: {
        result: newContact,
      },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const put = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  const { contactId } = req.params
  try {
    const updatedContact = await service.updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    })
    if (updatedContact) {
      res.json({
        status: 'success',
        code: 200,
        data: { result: updatedContact },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite = false } = req.body
  try {
    const newStatus = await service.updateContact(contactId, { favorite })
    if (newStatus) {
      res.json({
        status: 'success',
        code: 200,
        data: { result: newStatus },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const remove = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const deletedContact = await service.removeContact(contactId)
    if (deletedContact) {
      res.json({
        status: 'success',
        code: 200,
        data: { result: deletedContact },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {
  get,
  getById,
  post,
  put,
  updateStatus,
  remove,
}
