function MVVM(options) {
  // 传入的参数选项
  this.$options = options || {};
  // data对象
  var data = this._data = this.$options.data;
  var me = this;

  // 数据代理
  // 实现 vm.xxx -> vm._data.xxx
  Object.keys(data).forEach(function(key) {
      me._proxyData(key);
  });

  this._initComputed();

  // 观测数据
  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  $watch: function(key, cb, options) {
      new Watcher(this, key, cb);
  },

  // 数据代理
  // 实现 vm.xxx -> vm._data.xxx
  _proxyData: function(key, setter, getter) {
      var me = this;
      setter = setter || 
      Object.defineProperty(me, key, {
          configurable: false,
          enumerable: true,
          get: function proxyGetter() {
              return me._data[key];
          },
          set: function proxySetter(newVal) {
              me._data[key] = newVal;
          }
      });
  },

  _initComputed: function() {
      var me = this;
      var computed = this.$options.computed;
      console.log(Object.keys(computed))
      if (typeof computed === 'object') {
          Object.keys(computed).forEach(function(key) {
            console.log(computed[key].get)
              Object.defineProperty(me, key, {
                  get: typeof computed[key] === 'function' 
                          ? computed[key] 
                          : computed[key].get,
                  set: function() {}
              });
          });
      }
  }
};