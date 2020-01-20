exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable();
    table
      .integer('community_id')
      .references('id')
      .inTable('communities')
      .notNullable();
    table.string('title').notNullable();
    table.string('text', 40000);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
