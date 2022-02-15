const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts')
    .where('id', id)
    .first();
}

const create = async ({ name, budget }) => {
  let [id] = await db ('accounts')
    .insert({ name, budget });

    return {
      id: id,
      name,
      budget,
    };
}

const updateById = async (id, { name, budget }) => {
  await db ('accounts')
    .where({ id: id })
    .insert({ name, budget });

    return {
      id: id,
      name,
      budget,
    };
}

const deleteById = async (id) => {
  let result = await getById(id);

  await db('accounts')
    .where('id', id)
    .del();

    return {result};
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
