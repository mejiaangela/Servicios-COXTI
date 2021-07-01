'use strict'

const { flashAndRedirect } = require("../../Helpers");

const {validate} = use('Validator');
const {flashExcept} = use('App/Helpers');
const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env');
const Hash = use('Hash');
const jwt = require('jsonwebtoken');

class AuthController {

  async logout({auth, response}){
    await auth.logout();

    return response.redirect('/');
  }

  async login({session, request, response, auth}){
    const validation = await validate(request.all(), {
      email: 'required',
      key_password: 'required',
    });

    if(validation.fails()){
      session.withErrors(validation.messages()).flashExcept(['key_password']);
      return response.redirect('back');
    }

    const user = await User.findBy('email', request.input('email'));
    if(!user){
      return flashAndRedirect(
        'danger',
        'No existe un usuario con esta cuenta de email',
        'back',
        {
          session,
          response,
        }
      );
    }

    // const isSame = await Hash.verify(request.input('key_password'), user.key_password);
    const isSame = (request.input('key_password') === user.key_password);
    if(!isSame){
      return flashAndRedirect(
        'danger',
        'Credenciales Incorrectas',
        'back',
        {
          session,
          response,
        }
      );
    }

    await auth.login(user);
     return response.redirect('/aplicaciones');
  }

  async signup({session, request, response}){
    const validation = await validate(request.all(),{
      email: 'required|email',
      name: 'required',
      key_password: 'required|min:4',
    });

    if(validation.fails()){
      session.withErrors(validation.messages()).flashExcept(['key_password']);
      return response.redirect('back');
    }

    const userFound = await User.findBy('email', request.input('email'));
    if(userFound){
      return flashAndRedirect(
        'danger',
        'esta cuenta ya existe',
        'back',
        {
          session,
          response,
        }
      );
    }

    const user = await User.create({
      name: request.input('name'),
      email: request.input('email'),
      key_password: request.input('key_password'),
      // key_password: Hash.create(request.input('key_password')),
      email_verified: false,
      urlFoto: request.input('avatar'),
    });
  }
}

module.exports = AuthController
