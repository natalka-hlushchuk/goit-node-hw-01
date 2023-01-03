import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.resolve("db/contacts.json");

export async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const listParsed = JSON.parse(list);
    return listParsed;
  } catch (err) {
    console.log(err);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (contact) => contact.id === String(contactId)
    );
    if (!contactById) {
      return "contact by id not found";
    }
    return contactById;
  } catch (err) {
    console.log(err);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === String(contactId)
    );
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return true;
  } catch (err) {
    console.log(err);
  }
}

export async function addContact(contact) {
  try {
    const contacts = await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (err) {
    console.log(err);
  }
}
