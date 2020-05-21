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
            const { username, password, rePassword } = context.params;
            
            if (username.length > 0 && password.length > 0) {
                if(password === rePassword){
                firebase.auth().createUserWithEmailAndPassword(username, password)
                    .then((res) => {
                        firebase.auth().signInWithEmailAndPassword(username, password)
                            .then((res) => {
                                context.redirect('#/home');
                            })
                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                    });
                } else {
                    alert('Password and re-password must be equal!');
                }
            } else {
                alert('The username and password must be non-empty string!');
            }

        }
    }
}
