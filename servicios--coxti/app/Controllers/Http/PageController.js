'use strict'

class PageController {
  showHome({view}){
    return view.render('home');
  }

  showSignup({view}){
    return view.render('signup');
  }

  showLogin({view}){
    return view.render('login');
  }

  showDashboard({view}){
    return view.render('dashboard.dashboard');
  }
}


module.exports = PageController
