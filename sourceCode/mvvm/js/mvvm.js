function MVVM(options) {
  // 传入的参数
  this.$options = options || {}
  // console.log(this.$options)
  // data对象
  let data = this._data = this.$options.data
  // console.log(data)
  let me = this
  // Object.keys(data).forEach(key => {
  //   this._proxyData(key)
  // })

}

MVVM.prototype = {
  _proxyData: function(key, setter, getter) {
    let me = this
    setter = setter || 
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return me._data[key]
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal
      }
    })
  }
}