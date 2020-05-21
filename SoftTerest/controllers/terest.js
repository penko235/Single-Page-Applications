import extend from '../helper/context.js'
import docModifier from '../helper/doc-Modifier.js'

export default {
    get: {
        dashboard(context) {
            firebase.firestore().collection(`terest`).get()
                .then((response) => {

                    const terest = response.docs.map(docModifier);
                    context.terest = terest;

                    context.canTerest = terest.uid !== localStorage.getItem(`userId`)

                    extend(context).loadPartials({
                        details: '../views/terest/details.hbs'
                    })
                        .then(function () {
                            this.partial('../views/terest/dashboard.hbs');
                        })
                })
        },
        create(context) {
            extend(context).then(function () {
                this.partial(`../views/terest/create.hbs`)
            })
        },
        details(context) {
            const id = context.params.id;
            firebase.firestore().collection(`terest`).doc(id).get()
                .then((res) => {

                    const terest = docModifier(res);
                    context.terest = terest;

                    if (terest.creator === localStorage.getItem(`userEmail`)) {
                        context.isCreator = true;
                    }

                    extend(context).then(function () {
                        this.partial(`../views/terest/details.hbs`)
                    })
                })
                .catch((e) => console.log(e));
        },
        delete(context) {
            const id = context.params.id;
            firebase.firestore().collection('terest').doc(id).delete()
                .then((res) => {
                    context.redirect(`#/terest/dashboard`);
                })
        },
        likes(context) {
            const id = context.params.id
            firebase.firestore().collection('terest').doc(id).get()
                .then((res) => {
                    const terest = docModifier(res);
                    context.terest = terest;

                    terest.likes++;
                    return firebase.firestore().collection('terest').doc(id).update(terest)
                })
                .then((res) => {
                    context.redirect(`#/terest/details/${id}`)
                })

        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                uid: localStorage.getItem(`userId`),
                likes: 0,
                creator: localStorage.getItem(`userEmail`),
                comments: []
            }
            firebase.firestore().collection(`terest`).add(data)
                .then((response) => {
                    console.log(response)
                    context.redirect(`#/terest/dashboard`);
                })
        },
        comments(context) {
            const { newComment, id } = context.params
            firebase.firestore().collection('terest').doc(id).get()
                .then((res) => {
                    const terest = docModifier(res);
                    context.terest = terest;
                    terest.comments.push(newComment);
                    
                    return firebase.firestore().collection('terest').doc(id).update(terest)
                })
                .then((res) => {
                    context.redirect(`#/terest/details/${id}`)
                })
        }
    }

}
