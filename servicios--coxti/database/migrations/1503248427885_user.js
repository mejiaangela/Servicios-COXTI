'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 254).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('email_verified', 254).defaultTo(false)
      table.string('key_password', 60).notNullable()
      table.string('urlFoto');
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
