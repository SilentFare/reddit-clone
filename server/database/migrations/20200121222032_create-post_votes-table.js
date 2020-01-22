exports.up = function(knex) {
  return knex.schema.createTable('post_votes', table => {
    table
      .integer('post_id')
      .references('id')
      .inTable('posts')
      .notNullable();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable();
    table.index(['post_id', 'user_id']);
    table.boolean('vote').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('post_votes');
};
