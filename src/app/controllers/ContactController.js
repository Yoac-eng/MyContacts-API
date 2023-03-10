const ContactsRepository = require('../repositories/ContactsRepository');

// Utilizando uma convenção de nome pros métodos
class ContactController {
  // FindAll
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  // GetById
  async show(request, response) {
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

  // Create
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    // Retornamos os dados do usuário que se cadastrou
    response.json(contact);
  }

  // Update
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    // Verificar se o email já esta cadastrado por OUTRA pessoa, caso tenha sido cadastrado por quem
    // esta editando, não tem problema
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // Delete
  async delete(request, response) {
    const { id } = request.params;
    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
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
