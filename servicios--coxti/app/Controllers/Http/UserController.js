'use strict'

const User = use('App/Models/User')

class UserController {
  async usuarios({ view }) {
    const users = await User.all()
    return view.render('users.usuarios', { users: users.toJSON() })
  }

  async destroy ({ params, session, response }) {
    const user = await User.find(params.id)
    await user.delete()
    // Guardar mensaje de éxito
    session.flash({ notification: '¡Usuario eliminado con éxito!' })
    return response.redirect('back')
    }

    async edit({params, view}){
      const user = await User.find(params.id)
      console.log(user);
      return view.render('users.edit_user', {
        user
      })
    }
  
    async update({params, request, response }){
      const user = await User.find(params.id)
      user.name = request.input('name')
      user.email = request.input('email')
      user.key_password = request.input('key_password')
  
      await user.save()
  
      return response.redirect('/apps')
    }

  /*async cargarFoto({ params, request, response }) {
    const avatar = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })

    const nombreArchivo = params.id + "." + avatar.extname;
    await avatar.move('./public/fotografias', {
      name: nombreArchivo,
      overwrite: true
    })

    if (!avatar.move()) {
      return response.status(422).send({
        res: false,
        message: avatar.error()
      })
    }
    const user = await User.findOrFail(params.id);
    user.urlFoto = nombreArchivo;
    await user.save();
    return response.json({
      res: true,
      message: "foto registrada correctamente"
    })

  }*/
}

module.exports = UserController
