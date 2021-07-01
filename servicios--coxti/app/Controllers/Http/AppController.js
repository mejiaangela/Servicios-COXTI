'use strict'
const App = use('App/Models/App')
const { validate } = use('Validator')

class AppController {
  async aplicaciones ({ view }) {
    const apps = await App.all()
    return view.render('apps.aplicaciones', { apps: apps.toJSON() })
  }

  async store ({ request, response, session }) {
    // Validación para los datos de entrada
    const validation = await validate(request.all(), {
      name: 'required|min:3|max:255'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages())
              .flashAll()
      return response.redirect('back')
  }

  const app = new App()
  app.name = request.input('name')
  app.url = request.input('url')
  await app.save()

  // Guaradar mensaje de éxito
  session.flash({ notification: '¡Tarea agregada con éxito!' })

  return response.redirect('back')
}

async destroy ({ params, session, response }) {
  const app = await App.find(params.id)
  await app.delete()
  // Guardar mensaje de éxito
  session.flash({ notification: '¡App eliminada con éxito!' })
  return response.redirect('back')
  }

  async edit({params, view}){
		const app = await App.find(params.id)
    console.log(app);
		return view.render('apps.edit', {
			app
		})
	}

	async update({params, request, response }){
		const app = await App.find(params.id);
		app.name = request.input('name');
		app.url = request.input('url');

		await app.save()

		return response.redirect('/aplicaciones');
	}
}

module.exports = AppController
