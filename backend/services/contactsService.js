import Contact from "../models/contact.js";

class ContactsService {
  async getAll(userId) {
    const contacts = Contact.find({ user: userId });
    return contacts;
  }

  async update(name, phone, contactId, userId) {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, user: userId },
      { name, phone },
      { new: true }
    );
    return updatedContact;
  }

  async delete(contactId, userId) {
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      user: userId,
    });
    return deletedContact;
  }

  async create(name, phone, id) {
    const createdContact = await Contact.create({ name, phone, user: id });
    return createdContact;
  }
}

export default new ContactsService();
