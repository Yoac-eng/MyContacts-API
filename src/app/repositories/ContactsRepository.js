/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
const db = require('../../database');

class ContactsRepository {
  // Metodos assincronos automaticamente retornam promises
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1`, [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);

    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    // Chamamos de row os registros que puxamos do banco, pois as tabelas sao sempre 2d, columns e rows e puxamos as rows
    // db.query retorna um array, entao precisamos desestruturar como [row] pra pegar a primeira posicao do array
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);
    // Colocamos as keybindings $1, $2, $3, $4 pra evitar SQL Injection e fazer com que o postgres trate os dados recebidos
    // Passamos tambem um array como parametro com esses valores em ordem: $1 = name
    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    // Retornar um array vazio sempre []
    // deleteOp = deleteOperator, basicamente essa nomeclatura diferente
    // devido ao retorno peculiar de um delete, já que se pegarmos a row vamos pegar undefined
    return deleteOp;
  }
}

// Singleton
module.exports = new ContactsRepository();
