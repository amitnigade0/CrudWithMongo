const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.json(contacts).status(200);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.json(contact).status(200);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("one or more fields are missing");
  }
  const createdContact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.json(createdContact).status(201);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  // only associate user can update contact
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`You don't have permission to update other user contact`)
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if(!updateContact) {
    res.status(400);
    throw new Error("bad request for updating contact");
  }
  res.json(updatedContact).status(200);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  // only associate user can delete contact
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`You don't have permission to update other user contact`)
  }
  await Contact.deleteOne({_id: req.params.id});
  res.json(contact).status(200);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
