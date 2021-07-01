'use strict'

const UserController = require("../app/Controllers/Http/UserController");

const Route = use('Route')

//APLICACIONES
Route.get('/aplicaciones', 'AppController.aplicaciones').middleware(['auth']).as('aplicaciones');
Route.post('apps', 'AppController.store')
Route.delete('apps/:id', 'AppController.destroy')
Route.get('apps/edit/:id', 'AppController.edit')
Route.put('apps/:id', 'AppController.update')

Route.get('/reportes', 'ReportController.reportes').middleware(['auth']).as('reportes');

//USUARIOS
Route.get('/usuarios', 'UserController.usuarios')
Route.get('users/edit/:id', 'UserController.edit')
Route.delete('users/:id', 'UserController.destroy')

//DASHBOARD
Route.get('/dashboard', 'PageController.showDashboard')

Route.group(() => {
  Route.get('/', 'PageController.showHome');
  Route.get('/signup', 'PageController.showSignup');
  Route.get('/login', 'PageController.showLogin');
}).middleware(['authenticated']);

Route.group(() => {
  Route.post('signup', 'AuthController.signup');
  Route.post('login', 'AuthController.login');
  Route.post('logout', 'AuthController.logout');

}).prefix('api/');

