exports.up = function(knex) {
  return knex.schema.createTable('comments', table => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable();
    table
      .integer('post_id')
      .references('id')
      .inTable('posts')
      .notNullable();
    table
      .integer('parent_comment_id')
      .references('id')
      .inTable('comments');
    table.string('text', 10000).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
