import extend from '../helper/context.js'

export default {
    get: {
        register(context) {
            extend(context).then(function () {
                this.partial(`../views/user/register.hbs`);
            })
        },
        login(context) {
            extend(context).then(function () {
                this.partial(`../views/user/login.hbs`)
            })
        },
        logout(context) {
            firebase.auth().signOut().then((response) => {
                context.redirect(`#/home`);
            })
        }
    },
    post: {
        register(context) {
            const { username, password, repeatPassword } = context.params;
            if (password === repeatPassword) {
                firebase.auth().createUserWithEmailAndPassword(username, password)
                    .then((res) => {
                        firebase.auth().signInWithEmailAndPassword(username, password)
                            .then((res) => {
                                context.redirect(`#/home`)
                            })
                    }).catch((e) => console.log(e));
            }
        },
        login(context) {
            const { username, password } = context.params;
            firebase.auth().signInWithEmailAndPassword(username, password)
                .then((response) => {
                    context.user = response;
                    context.username = response.email;
                    context.isLoggedIn = true;
                    context.redirect(`#/home`);
                })
                .catch((e) => console.log(e));
        }
    }
}
