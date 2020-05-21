import extend from '../utils/context.js';

export default {
    get: {
        register(context) {
            extend(context).then(function () {
                this.partial('../templates/register/register.hbs')
            })
        }
    },
    post: {
        register(context) {
            const { email, password, rePassword } = context.params;

            if (password === rePassword) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                        firebase.auth().signInWithEmailAndPassword(email, password)
                            .then((res) => {
                                context.redirect('#/home');
                            })
                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                    });
            }
        }
    }

}
