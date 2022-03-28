import {Promise} from 'rsvp';

export default {
  // env - ember configuration the properties that are in use at the moment:
  // serverEnv - the server's environment variables
  // mixpanel.projectToken - the mixpanel project id. use different project for different envs (prod/dev)!!!
  init: function(env, serverEnv) {
    return new Promise(function(resolve, reject) {
      const token = serverEnv.MIXPANEL_TOKEN || env.mixpanel && env.mixpanel.projectToken;
      if (_.isEmpty(token)) {
        return reject('Mixpanel will not initialize - no token configuration');
      }
      return typeof mixpanel.init === "function" && mixpanel.init(token, {
        loaded: function(mixpanel) {
          return resolve({
            // uses mixpanel api to send an event named eventName with the specified properties
            send: function(eventName, properties) {
              return typeof mixpanel.track === "function" && mixpanel.track(eventName, properties);
            },
            // removes all super properties
            clearAll: function(properties) {
              return typeof mixpanel.reset === "function" && mixpanel.reset();
            },
            registerUser: function(userId, properties) {
              mixpanel.identify(userId);
              mixpanel.people.set("$name", properties.email);
              mixpanel.people.set("$email", properties.email);
              return mixpanel.people.set(_.omit(properties, 'email'));
            },
            getUser: function() {
              return mixpanel.get_distinct_id();
            },
            timeEvent: function(eventName) {
              return mixpanel.time_event(eventName);
            }
          });
        }
      });
    });
  }
};

