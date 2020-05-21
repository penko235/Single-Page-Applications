
import controllers from '../controllers/index.js';

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home);

    //Register
    this.get('#/register', controllers.register.get.register);
    this.post('#/register', controllers.register.post.register);

    //Login
    this.get('#/login', controllers.login.get.login);
    this.post('#/login', controllers.login.post.login);

    //Logout
    this.get('#/logout', controllers.logout.get.logout);

    //Create
    this.get('#/create', controllers.create.get.create);
    this.post('#/create', controllers.create.post.create);

    //Dashboard
    this.get('#/dashboard', controllers.dashboard.get.dashboard);
    //Details
    this.get('#/details/:id', controllers.dashboard.get.details);
    //Delete
    this.get('#/delete/:id', controllers.dashboard.get.delete);
    //Like
    this.get('#/like/:id', controllers.dashboard.get.like);
    //MakeDonation
    this.post('#/details/:id', controllers.dashboard.post.donate);

    //Profile
    this.get('#/profile', controllers.profile.get.profile);


});

(() => {

    app.run('#/home');

})();
