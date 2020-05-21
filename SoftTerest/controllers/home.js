import extend from '../helper/context.js'

export default {
    get: {
        home(context) {
            extend(context).then(function () {
                this.partial(`../views/home/home.hbs`);
            })
        }
    }
}
