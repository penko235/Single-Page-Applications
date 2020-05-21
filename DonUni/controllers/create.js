import extend from '../utils/context.js';

export default {
    get: {
        create(context) {
            extend(context).then(function () {
                this.partial('../templates/dashboard/create.hbs')
            })
        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                collectedFunds: 0,
                donors: [],
                creator: localStorage.getItem('userEmail')
            }

            if (data.cause.length > 0 && data.pictureUrl.length > 0 && data.neededFunds.length > 0 && data.description.length > 0) {

                firebase.firestore().collection('causes').add(data)
                    .then((res) => {
                        context.redirect('#/dashboard');
                    })

            } else {
                alert('The input fields must be non-empty strings!');
            }

        }
    }
}
