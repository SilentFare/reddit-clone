exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'test',
          email: 'test@test.com',
          password:
            '$2b$12$J.lmmbGJ1eBaa6/bLTPZseasOMtI1YdpB30Q0EvjHD4lGsxO.rZeu'
        },
        {
          name: 'Mark',
          email: 'mark@mark.com',
          password:
            '$2b$12$5ACOtrt3W2TQJ60R6WLiE.GYy8uak5nEZdXaCjombB7CAW60e2bdK'
        }
      ]);
    });
};
