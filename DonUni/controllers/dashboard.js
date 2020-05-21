import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        dashboard(context) {
            firebase.firestore().collection('causes').get()
                .then((res) => {

                    const cause = res.docs.map(docModifier);
                    context.cause = cause;

                    extend(context).loadPartials({
                        details: '../templates/dashboard/details.hbs'
                    })
                        .then(function () {
                            this.partial('../templates/dashboard/dashboard.hbs')
                        })
                })
        },
        details(context) {
            const id = context.params.id;

            firebase.firestore().collection('causes').doc(id).get()
                .then((res) => {

                    const cause = docModifier(res);
                    context.cause = cause;

                    if (cause.creator === localStorage.getItem('userEmail')) {
                        context.isCreator = true;
                    }

                    extend(context).then(function () {
                        this.partial('../templates/dashboard/details.hbs');
                    })

                })
        },
        delete(context) {
            const id = context.params.id;

            firebase.firestore().collection('causes').doc(id).delete()
                .then((res) => {
                    context.redirect('#/dashboard');
                })
        },
        like(context) {
            const id = context.params.id;

            firebase.firestore().collection('ideas').doc(id).get()
                .then((res) => {

                    const idea = docModifier(res);
                    context.idea = idea;

                    idea.likes++

                    return firebase.firestore().collection('ideas').doc(id).update(idea)
                }).then((res) => {
                    context.redirect(`#/details/${id}`);
                })
        }
    },
    post: {
        donate(context) {
            const { currentDonation, id } = context.params;

            firebase.firestore().collection('causes').doc(id).get()
                .then((res) => {

                    const cause = docModifier(res);
                    context.cause = cause;

                    if (cause.collectedFunds < cause.neededFunds) {
                        cause.collectedFunds += Number(currentDonation);
                    } else {
                        alert('We collect it. Thank you! :)')
                    }

                    if (!cause.donors.includes(localStorage.getItem('userEmail'))) {
                        cause.donors.push(localStorage.getItem('userEmail'));
                    }

                    return firebase.firestore().collection('causes').doc(id).update(cause)
                })
                .then((res) => {
                    context.redirect(`#/details/${id}`);
                })
        }
    }
}
