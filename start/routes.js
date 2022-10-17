'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello Api scp all items' }
})

Route.group(() => {
  Route.post('login', 'AuthController.login');
  Route.post('register', 'AuthController.register');
  Route.put('profile', 'AuthController.profile').middleware(['auth:jwt']);

  Route.get('categorias', 'CategoryController.index');
  Route.post('categorias', 'CategoryController.store').middleware(['auth:jwt']);
  Route.post('categorias', 'CategoryController.update').middleware(['auth:jwt']);
  Route.post('categorias', 'CategoryController.destroy').middleware(['auth:jwt']);

  Route.get('scp-items', 'ItemScpController.index');
  Route.post('scp-items', 'CategoryController.store').middleware(['auth:jwt']);
  Route.post('scp-items', 'CategoryController.update').middleware(['auth:jwt']);
  Route.post('scp-items', 'CategoryController.destroy').middleware(['auth:jwt']);
}).prefix('api/v1');