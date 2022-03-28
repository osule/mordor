import Route from '@ember/routing/route';
import Analytics from '../mixins/analytics';

export default Route.extend(Analytics, {
  init() {
    this._super(...arguments);
  },
  afterModel() {
    this._super(...arguments);
    this.get('analytics').authenticated('frodo.baggins@lotr.com', 'default');
    console.debug('after application model');
  }
});
