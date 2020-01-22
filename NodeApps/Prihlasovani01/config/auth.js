/*
    author Kubík Augustýn, kubik.augustyn@post.cz
*/

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Prosím přihlašte se pro přístupu k Vašim datům na Vašem účtu');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  }
};
