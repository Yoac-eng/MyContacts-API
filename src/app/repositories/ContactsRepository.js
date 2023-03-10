// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');

// Array de dados mocadasso enquanto não coloco banco
const contacts = [
  {
    // Vamos utilizar um padrão de ID gerado com Hash por questão de "segurança"
    // Se tivermos ids sequenciais, se uma pessoa souber que seu ID é 3, a das antes dela são 2 e 1
    // UUID -> Universal Unique ID
    id: uuidv4(),
    name: 'Robson',
    email: 'robsonkk@mail.com',
    phone: '123123123',
    // Contatos terão categorias, que é de onde os numeros vieram
    // Não é tão util agora mas vai servir de chave estrangeira pra fazer o relacionamento no banco
    // Tabela de contatos relacionada com a de categorias
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
}

// Singleton
module.exports = new ContactsRepository();
