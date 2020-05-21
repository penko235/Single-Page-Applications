import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        profile(context) {
            firebase.firestore().collection('treks').get()
                .then((res) => {

                    const trek = res.docs.map(docModifier);
                    context.trek = trek;
                    trek.num = 0;
                    
                    trek.forEach((obj) => {
                        if (obj.organizer === localStorage.getItem('userEmail')) {
                            trek.num++
                        }
                    })

                    extend(context).then(function () {
                        this.partial('../templates/profile/profile.hbs')
                    })
                })
        }
    }
}
