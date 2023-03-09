// Utilizando uma convenção de nome pros métodos, os quais serão callbacks chamadas pelos endpoints
class ContactController {
  index(request, response) {
    // Método pra listar todos os registros
    // FindAll
    response.send('send from Contact Controller');
  }

  show() {
    // Obter UM registro
    // GetById
  }

  store() {
    // Criar um registro
    // Create
  }

  update() {
    // Atualizar um registro
  }

  delete() {
    // Deletar um registro
  }
}

// Singleton, queremos que só uma instância seja acessível
module.exports = new ContactController();
// Poderiamos exportar a classe em si, mas aqui não é o caso, ela ja vai instanciada em memória
