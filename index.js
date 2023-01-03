import { Command } from "commander";
import { nanoid } from "nanoid";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      {
        const contacts = await listContacts();
        console.log(contacts);
      }
      break;

    case "get":
      {
        const contact = await getContactById(id);
        console.log(contact);
      }
      break;

    case "add":
      {
        const contact = await addContact({ id: nanoid(), name, email, phone });
        console.log(contact);
      }
      break;

    case "remove":
      const contact = await removeContact(id);
      console.log(contact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts(process);
await invokeAction(argv);
