const express = require('express')
const router = express.Router()
const authorization = require('../../middlewares/authorization')

const ctrlContact = require('../../controller')
const {
  contactValidation,
} = require('../../middlewares/validationMiddleware.js')

router.get('/', authorization, ctrlContact.get)

router.get('/:contactId', authorization, ctrlContact.getById)

router.post('/', authorization, contactValidation, ctrlContact.post)

router.put('/:contactId', authorization, contactValidation, ctrlContact.put)

router.patch(
  '/:contactId/favorite',
  authorization,
  contactValidation,
  ctrlContact.updateStatus
)

router.delete('/:contactId', authorization, ctrlContact.remove)

module.exports = { contactsRouter: router }

// router.get("/", async (req, res, next) => {
//   try {
//     const contactsData = await listContacts();
//     res.status(200).json(contactsData);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const contactIdInfo = await getContactById(contactId);
//     if (!contactIdInfo) {
//       return res.status(404).json({ message: "Sorry, no such contact found!" });
//     }
//     res.status(200).json(contactIdInfo);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", contactValidation, async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   try {
//     const newContact = await addContact(name, email, phone);
//     res.status(201).json(newContact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", contactValidation, async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   const { contactId } = req.params;
//   try {
//     const updatedContact = await updateContact(contactId, name, email, phone);
//     if (!updatedContact) {
//       return res.status(404).json({ message: "Sorry, no such contact found!" });
//     }
//     res.status(200).json({ message: "Contact is updated" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const deletedContact = await removeContact(contactId);
//     if (!deletedContact) {
//       res.status(404).json({ message: "Sorry, no such contact found!" });
//     }
//     res.status(200).json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });
