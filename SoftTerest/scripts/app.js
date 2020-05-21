import controllers from '../controllers/index.js'

const app = Sammy(`#root`, function () {
    this.use(`Handlebars`, `hbs`);

    //HOME
    this.get(`#/home`, controllers.home.get.home);

    //USER
    this.get(`#/user/register`, controllers.user.get.register);
    this.get(`#/user/login`, controllers.user.get.login);
    this.get(`#/user/logout`, controllers.user.get.logout);

    this.post(`#/user/register`, controllers.user.post.register);
    this.post(`#/user/login`, controllers.user.post.login);

    //TEREST
    this.get(`#/terest/dashboard`, controllers.terest.get.dashboard);
    this.get(`#/terest/create`, controllers.terest.get.create);
    this.get(`#/terest/details/:id`, controllers.terest.get.details);

    this.post(`#/terest/create`, controllers.terest.post.create);

    //DELETE
    this.get(`#/delete/:id`,controllers.terest.get.delete);

    //LIKE
    this.get(`#/likes/:id`, controllers.terest.get.likes);

    //COMMENTS
    this.post(`#/terest/details/:id`,controllers.terest.post.comments)
    

});

(() => {
    app.run(`#/home`);
})();
