import Service from "@ember/service";

export default Service.extend({
  init(...args) {
    this._super(...args);
    this.serverEnv = Promise.resolve({});
  },
});
