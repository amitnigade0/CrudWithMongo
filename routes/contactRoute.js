
const express = require('express');
const router = express.Router();
const { getContact, getContacts, createContact, updateContact, deleteContact } = require('../controllers/contactController')
const validateTokenHandler = require("../middleware/validateTokenHandler")

router.use(validateTokenHandler);

router.get('/', getContacts)

router.get('/:id' , getContact)

router.post('/', createContact)

router.delete('/:id', deleteContact)

router.put('/:id', updateContact)

module.exports = router;