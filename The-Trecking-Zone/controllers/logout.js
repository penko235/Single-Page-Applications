export default {
    get: {
        logout(context) {
            firebase.auth().signOut().then((res) => {
                context.redirect('#/home');
            })
        }
    }
}
