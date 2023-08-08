const argv = require('yargs').argv;
const {hideBin} = require("yargs/helpers");
const contactOperations = require ("./contacts");

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactOperations.listContacts();
      console.table(allContacts);
      break;
      
    case 'get':
      const getContact = await contactOperations.getContactById(id);
      if(!getContact){
          throw new Error(`Product with id=${id} not found`);
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
const arr = hideBin(process.argv);

const {argv} = yargs(arr);

invokeAction(argv);

/*const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const productsOperations = require("./products");

const invokeAction = async({action, id, data})=> {
    switch(action){
        case "getAll":
            const products = await productsOperations.getAll();
            console.log(products);
            break;
        case "getById":
            const product = await productsOperations.getById(id);
            if(!product){
                throw new Error(`Product with id=${id} not found`);
            }
            console.log(product);
            break;
        case "add":
            const newProduct = await productsOperations.add(data);
            console.log(newProduct);
            break;
        case "updateById":
            const updateProduct = await productsOperations.updateById(id, data);
            if(!updateProduct){
                throw new Error(`Product with id=${id} not found`);
            }
            console.log(updateProduct);
            break;
        case "removeById":
            const removeProduct = await productsOperations.removeById(id);
            console.log(removeProduct);
            break;
        default:
            console.log("Unknown action");
    }
}

const arr = hideBin(process.argv);

const {argv} = yargs(arr);
// const {argv} = yargs(process.argv.slice(2));

invokeAction(argv);
 */