// 数据监听 监听data对象中属性的变化
function Observer(data) {
  this.data = data;
  console.log(this.data)
  this.walk(data);
}

Observer.prototype = {
  walk: function(data) {
      var me = this;
      Object.keys(data).forEach(function(key) {
          me.convert(key, data[key]);
      });
  },
  convert: function(key, val) {
      this.defineReactive(this.data, key, val);
  },

  defineReactive: function(data, key, val) {
      var dep = new Dep();
      var childObj = observe(val);

      Object.defineProperty(data, key, {
          enumerable: true, // 可枚举
          configurable: false, // 不能再define
          get: function() {
              if (Dep.target) {
                  dep.depend();
              }
              return val;
          },
          set: function(newVal) {
              if (newVal === val) {
                  return;
              }
              val = newVal;
              // 新的值是object的话，进行监听
              childObj = observe(newVal);
              // 通知订阅者
              dep.notify();
          }
      });
  }
};

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
      return;
  }

  return new Observer(value);
};


var uid = 0;

// 消息订阅器
function Dep() {
  this.id = uid++;
  console.log(this.id)
  // 用于收集订阅者Watcher
  this.subs = [];
}

Dep.prototype = {
  // 收集订阅者
  addSub: function(sub) {
      this.subs.push(sub);
  },

  depend: function() {
    Dep.target.addDep(this);
  },

  removeSub: function(sub) {
      var index = this.subs.indexOf(sub);
      if (index != -1) {
          this.subs.splice(index, 1);
      }
  },
  // 数据变动触发，再调用订阅者的update()
  notify: function() {
      this.subs.forEach(function(sub) {
          sub.update();
      });
  }
};

Dep.target = null;