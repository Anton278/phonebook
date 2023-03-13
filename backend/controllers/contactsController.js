import ContactsService from "../services/contactsService.js";
import jwt from "jsonwebtoken";
import ApiError from "../exceptions/api-error.js";
import { ContactDto } from "../dtos/contact.js";

class ContactsController {
  async getAll(req, res, next) {
    const { refreshToken } = req.cookies;
    const { id } = jwt.decode(refreshToken);

    try {
      const contacts = await ContactsService.getAll(id);
      const dtoContacts = contacts.map((contact) => new ContactDto(contact));
      return res.json(dtoContacts);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { id } = jwt.decode(refreshToken);

      const { name, phone, contactId } = req.body;
      if (!name || !phone || !contactId) {
        throw ApiError.BadRequest("Incorrect body params");
      }

      const updatedContact = await ContactsService.update(
        name,
        phone,
        contactId,
        id
      );
      const updatedContactDto = new ContactDto(updatedContact);
      return res.json(updatedContactDto);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { id } = jwt.decode(refreshToken);

      const { contactId } = req.body;
      if (!contactId) {
        throw ApiError.BadRequest("Incorrect body params");
      }

      const deletedContact = await ContactsService.delete(contactId, id);
      const deletedContactDto = new ContactDto(deletedContact);
      return res.json(deletedContactDto);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { id } = jwt.decode(refreshToken);

      const { name, phone } = req.body;
      if (!name || !phone) {
        throw ApiError.BadRequest("Incorrect body params");
      }

      const createdContact = await ContactsService.create(name, phone, id);
      const createdContactDto = new ContactDto(createdContact);
      return res.json(createdContactDto);
    } catch (e) {
      next(e);
    }
  }
}

export default new ContactsController();
