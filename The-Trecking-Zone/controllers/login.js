import extend from '../utils/context.js';

export default {
    get: {
        login(context) {
            extend(context).then(function () {
                this.partial('../templates/login/login.hbs')
            })
        }
    },
    post: {
        login(context) {
            const { email, password } = context.params;
              
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    context.redirect('#/home');
                    
                }).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    }
}
