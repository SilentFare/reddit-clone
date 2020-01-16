exports.up = function(knex) {
  return knex.schema.createTable('communities', table => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table.string('name').notNullable();
    table.unique('name');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('communities');
};
