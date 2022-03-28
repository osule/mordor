import Service, {inject as service } from '@ember/service';
import provider from './mixpanel';
import ENV from 'mordor/config/environment';

const Analytics = Service.extend({
  envService: service('server-env'),
  init: function() {
    this._super(...arguments);
    return this.set('provider', this.get('envService.serverEnv').then(function(serverEnv) {
      return provider.init(ENV, serverEnv);
    }));
  },
  _callProvider: function(method, args) {
    const _callProvider = (provider) => {
      return provider[method].apply(provider, args);
    };
    const provider = this.get('provider')
    return provider != null ? provider.then(_callProvider).catch(function() {
      if (ENV.analytics && ENV.analytics.verbose) {
        return console.log(`Tried to send analytics event: ${method}(${JSON.stringify(args)})`);
      }
    }) : void 0;
  },
  _send: function(...args) {
    return this._callProvider('send', args);
  },
  _timeEvent: function(...args) {
    return this._callProvider('timeEvent', args);
  },
  _clearAll: function(...args) {
    return this._callProvider('clearAll', args);
  },
  _registerUser: function(...args) {
    return this._callProvider('registerUser', args);
  },
  timeEvent: function(eventName) {
    return this._timeEvent(eventName);
  },
  authenticated: function(name, customer) {
    if (!name) {
      return;
    }
    this._clearAll();
    this._registerUser(name, {
      email: name,
      customer: customer,
      "User type": 'External',
    });
    this._send('User authenticated');
  },
});

export default Analytics;
