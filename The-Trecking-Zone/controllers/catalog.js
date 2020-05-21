import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        catalog(context) {  
            firebase.firestore().collection('treks').get()
                .then((res) => {

                    const trek = res.docs.map(docModifier);
                    context.trek = trek;
                    
                    extend(context).loadPartials({
                        details: '../templates/treks/detailsTrek.hbs'
                    })
                    .then(function () {
                        this.partial('../templates/treks/catalogTrek.hbs')
                    })
                })
        }
    }
}
