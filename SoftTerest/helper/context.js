export default function (context) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            context.isLoggedIn = true;
            context.userId = user.uid;
            context.username = user.email;

            localStorage.setItem(`userId`, user.uid);
            localStorage.setItem(`userEmail`, user.email);
        } else {
            // User is signed out.
            context.isLoggedIn = false;
            context.username = null; 
            context.userId = null;
            
            localStorage.removeItem(`userEmail`);
            localStorage.removeItem(`userId`);
        }
    });

    return  context.loadPartials({
        headers: `../views/common/headers.hbs`,
        footer: `../views/common/footer.hbs`
    })
}
