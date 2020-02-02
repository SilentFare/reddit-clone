exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('communities')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('communities').insert([
        { user_id: 1, name: 'Jokes' },
        { user_id: 1, name: 'Askreddit' },
        { user_id: 2, name: 'React' },
        { user_id: 2, name: 'Javascript' }
      ]);
    });
};
