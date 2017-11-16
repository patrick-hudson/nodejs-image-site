exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('uploads', function(table) {
      table.string('file_ext');

    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('uploads')
  ])
};
