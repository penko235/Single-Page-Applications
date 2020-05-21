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
            const { username, password } = context.params;
              
            firebase.auth().signInWithEmailAndPassword(username, password)
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
