import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        create(context) {
            extend(context).then(function () {
                this.partial('../templates/treks/createTrek.hbs')
            })
        },
        details(context) {
            const id = context.params.id;

            firebase.firestore().collection('treks').doc(id).get()
                .then((res) => {

                    const trek = docModifier(res);
                    context.trek = trek;

                    if (trek.userId === localStorage.getItem('userId')) {
                        context.isCreator = true;
                    }
                    
                    extend(context).loadPartials({
                        editTrek: '../templates/treks/editTrek.hbs'
                    }).then(function () {
                        this.partial('../templates/treks/detailsTrek.hbs');
                    })

                })
        },
        edit(context) {
            const id = context.params.id;

            firebase.firestore().collection('treks').doc(id).get()
                .then((res) => {

                    const trek = docModifier(res);
                    context.trek = trek;

                    extend(context).then(function () {
                        this.partial('../templates/treks/editTrek.hbs')
                    })
                })
        },
        remove(context) {
            const id = context.params.id;

            firebase.firestore().collection('treks').doc(id).delete()
                .then((res) => {
                    context.redirect('#/catalog');
                })
        },
        likes(context) {
            const id = context.params.id;

            firebase.firestore().collection('treks').doc(id).get()
                .then((res) => {

                    const trek = docModifier(res);
                    context.trek = trek;

                    if (!trek.likes.includes(localStorage.getItem('userEmail'))) {
                        trek.likes.push(localStorage.getItem('userEmail'));
                    } else {
                        alert("You already like the trek!")
                    }

                    return firebase.firestore().collection('treks').doc(id).update(trek)
                }).then((res) => {
                    context.redirect('#/catalog');
                })

        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                organizer: localStorage.getItem('userEmail'),
                likes: [],
                userId: localStorage.getItem('userId')
            };

            if (data.location.length > 6 && data.description.length > 10 && data.dateTime.length > 0) {

                firebase.firestore().collection('treks').add(data)
                    .then((res) => {
                        context.redirect('#/catalog');
                    })
            } else {
                alert('You must fill the gaps correct!');
            }
        },
        edit(context) {
            const { location, dateTime, description, imageURL, id } = context.params;

            firebase.firestore().collection('treks').doc(id).get()
                .then((res) => {
                    const trek = docModifier(res);
                    context.trek = trek;

                    trek.location = location;
                    trek.dateTime = dateTime;
                    trek.description = description;
                    trek.imageURL = imageURL;

                    return firebase.firestore().collection('treks').doc(id).update(trek)
                })
                .then((res) => {
                    context.redirect('#/catalog');
                }).catch((error) => {
                    console.log(error.message)
                })

        }
    }
}
