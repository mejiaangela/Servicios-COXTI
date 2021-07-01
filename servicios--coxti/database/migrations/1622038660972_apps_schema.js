'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppsSchema extends Schema {
  up () {
    this.create('apps', (table) => {
      table.increments()
      table.string('name')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('apps')
  }
}

module.exports = AppsSchema
