import Mixin from '@ember/object/mixin';
import { inject as service }  from '@ember/service';
import { observer, computed } from '@ember/object';



export default Mixin.create({
  analytics: service('analytics'),
  routerService: service('router'),
  currentURL: computed.readOnly('routerService.currentURL'),
  init: function f() {
    this._super(...arguments);
    this.get('router').on('change', function t() {
      console.debug('changed');
    })
  },
  actions: {
    willTransition(transition) {
      this._super(...arguments);
      console.debug('clock', this.routeName, this.get("currentURL"));
      this.get('analytics')._send('pageview', {route_name: this.routeName});
    },
    didTransition(){
      this._super(...arguments);
      console.debug('timing: ',  this.routeName, this.get("currentURL"));
      this.get('analytics').timeEvent('pageview', {route_name: this.routeName});
    },
    loading(){
      this._super(...arguments);
      console.debug('loading timing: ',  this.routeName, this.get("currentURL"));
      // this.get('analytics').timeEvent('pageview', {route_name: this.routeName});
    }
  }
});
