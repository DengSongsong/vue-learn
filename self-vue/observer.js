function Observer(data){
    // n个{{title}} -> push到数组
    this.data = data;
    this.walk(data);
}
Observer.prototype = {
    // 监听 遍历页面中数据中的属性值是否发生变化
    walk(data){
        Object.keys(data).forEach(key => {
            // console.log("key: ", key);
            this.defineReactive(data, key, data[key]);
        });
    },
    defineReactive(data, key, val){
        var dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter(){
                if(Dep.target){
                    dep.addSub(Dep.target);
                }
                // console.log(val);
                return val;
            },
            set: function setter(newVal){
                if(newVal === val){
                    return;
                }
                val = newVal;
                // console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
                dep.notify();  // 如果数据变化，通知所有订阅者
            }
        });
    }
}
function Dep(){
    this.subs = [];
}
Dep.prototype = {
    addSub(sub){
        this.subs.push(sub);
    },
    notify(){
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}
Dep.target = null;
function observe(value, vm){
    if(!value || typeof value !== 'object'){
        return;
    }
    return new Observer(value);
}