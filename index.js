const { Command } = require("commander");
const contactsOperations = require('./contacts');

const program = new Command();
program
.option("-a, --action <type>", "choose action")
.option("-i, --id <type>", "user id")
.option("-n, --name <type>", "user name")
.option("-e, --email <type>", "user email")
.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone} ) {
  switch (action) {
    case "list":
      const data = await contactsOperations.listContacts();
			console.table(data);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
			if(!contact) throw new Error(`Contact with id=${id} not found`)
			console.table(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact( name, email, phone);
			console.table(newContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
			console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
// invokeAction({action: 'list'});
// invokeAction({action: 'get', id: '3'});
// invokeAction({action: 'remove', id: '3'});
// invokeAction({action: 'add', name: 'anna', email: '123@i.ua', phone: '288812'});


