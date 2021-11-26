const service = require('../service')

const get = async (req, res, next) => {
  try {
    const userId = req.user._id
    const contactsData = await service.getAllContacts(userId, req.query)
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: { ...contactsData },
      },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const userId = req.user._id
    const contactIdInfo = await service.getContactById(contactId, userId)
    if (contactIdInfo) {
      res.json({
        status: 'success',
        code: 200,
        data: { result: contactIdInfo },
      })
      // console.log(contactIdInfo);
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
  // const { name, email, phone, favorite } = req.body
  const userId = req.user._id
  try {
    const newContact = await service.createContact(userId, req.body)
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
  try {
    // const { name, email, phone, favorite } = req.body;
    const { contactId } = req.params
    const userId = req.user._id
    const updatedContact = await service.updateContact(
      userId,
      contactId,
      req.body
    )
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
  try {
    const { contactId } = req.params
    const { favorite = false } = req.body
    const userId = req.user._id
    const newStatus = await service.updateContact(userId, contactId, {
      favorite,
    })
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
  try {
    const { contactId } = req.params
    const userId = req.user._id
    const deletedContact = await service.removeContact(userId, contactId)
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
