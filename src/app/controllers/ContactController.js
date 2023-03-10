const ContactsRepository = require('../repositories/ContactsRepository');

// Utilizando uma convenção de nome pros métodos
class ContactController {
  async index(request, response) {
    // FindAll
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    // GetById
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not found
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
    // request tem o método params para pegar os parametros da req(o que estiver dps do endpoint)
    // request.params;
  }

  async store(request, response) {
    // Create
    // Pegar os dados que vamos tratar/cadastrar do body
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // Validar se existe algum email ja cadastrado
    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already been taken' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    // Retornamos os dados do usuário que se cadastrou
    response.json(contact);
  }

  update() {
    // Update
  }

  async delete(request, response) {
    // Delete
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);

    // 204: Requisição foi um sucesso mas ela nao tem corpo, nesse caso como só deletamos algo
    // não tem porque ter um corpo
    response.sendStatus(204);
  }
}

// Singleton, queremos que só uma instância seja acessível
module.exports = new ContactController();
// Poderiamos exportar a classe em si, mas aqui não é o caso, ela ja vai instanciada em memória
