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

    //User
    this.get('#/profile', controllers.profile.get.profile);

    //Catalog
    this.get('#/catalog', controllers.catalog.get.catalog);

    //Treks
    this.get('#/createTrek', controllers.treks.get.create);
    this.post('#/createTrek', controllers.treks.post.create);

    //Details
    this.get('#/detailsTrek/:id', controllers.treks.get.details);

    //Edit
    this.get('#/editTrek/:id', controllers.treks.get.edit);
    this.post('#/editTrek/:id', controllers.treks.post.edit);

    //Delete
    this.get('#/removeTrek/:id', controllers.treks.get.remove);

    //Likes
    this.get('#/likes/:id', controllers.treks.get.likes);

});

(() => {

    app.run('#/home');

})();
