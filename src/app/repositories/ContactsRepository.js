// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const db = require('../../database');

// Array de dados mocadasso enquanto não coloco banco
let contacts = [
  {
    id: uuidv4(),
    name: 'Robson',
    email: 'robsonkk@mail.com',
    phone: '123123123',
    category_id: uuidv4(),
  },
  {
    id: uuidv4(),
    name: 'Jason',
    email: 'jason@mail.com',
    phone: '123124123',
    category_id: uuidv4(),
  },
];

class ContactsRepository {
  findAll() {
    // Como a busca por dados deve ser assincrona, vamos retornar uma promise aqui
    return new Promise((resolve) => {
      // Resolve -> disparar um sucesso
      // Reject -> disparar o erro
      // PORÉM, UM REPOSITORY NUNCA VAI USAR O REJECT, POIS NÃO IREMOS TRATAR ERRO NENHUM AQUI NESSA
      // CAMADA DA APLICAÇÃO
      resolve(contacts);

      // NÃO DEVEMOS retornar valores aqui nas promises, pois os valores retornados são ignorados
      // Devemos mandar valores a partir do reject ou do resolve
      // errado: return contacts ou return resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      const contact = contacts.find((c) => c.id === id);

      resolve(contact);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      const contact = contacts.find((c) => c.email === email);

      resolve(contact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      // Como não tem corpo pra resposta, podemos só usar o resolve()
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      // Retornamos os dados do usuário que se cadastrou
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));

      resolve(updatedContact);
    });
  }
}

// Singleton
module.exports = new ContactsRepository();
