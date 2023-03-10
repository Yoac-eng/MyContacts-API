const ContactsRepository = require('../repositories/ContactsRepository');

// Utilizando uma convenção de nome pros métodos, os quais serão callbacks chamadas pelos endpoints
class ContactController {
  async index(request, response) {
    // Método pra listar todos os registros
    // FindAll
    const contacts = await ContactsRepository.findAll();

    // Valor injetado pelo middleware acessivel aqui agora
    console.log(request.appId);
    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM registro
    // GetById
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    // Pro caso de nenhum contrato ter sido encontrado, mensagem de erro e codigo
    if (!contact) {
      // 404: Not found
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
    // request tem o método params para pegar os parametros da req(o que estiver dps do endpoint)
    // request.params;
  }

  store() {
    // Criar um registro
    // Create
  }

  update() {
    // Atualizar um registro
  }

  async delete(request, response) {
    // Deletar um registro

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
