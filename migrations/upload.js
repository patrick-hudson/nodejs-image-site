exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('uploads', function(table) {
      table.increments('id');
      table.string('file_id');
      table.string('user_id');
      table.timestamp('uploaded_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('uploads')
  ])
};
