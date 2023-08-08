const contactOperations = require ("./contacts");
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactOperations.listContacts();
      console.table(allContacts);
      break;
      
    case 'get':
      const getContact = await contactOperations.getContactById(id);
      if(!getContact){
          throw new Error(`Contact with id=${id} not found`);
      }
      console.log(getContact);
      break;

    case 'add':
      const addContact = await contactOperations.addContact({name, email, phone});
            console.log(addContact);
      break;

    case 'remove':
      const removeContact = await contactOperations.removeContact(id);
            console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);