// var a = {};
// // 精细化的操作对象的属性访问
// // 三个参数: 目标对象  需要定义的属性或方法的名字 目标属性所拥有的特性descriptor
// Object.defineProperty(a, "b", {
//     value: 123,
//     writable: true,
//     configurable: false
// });
// a.b = 3;
// // console.log(a.b);

// Object.defineProperty(a, "b", {
//     value: 22,
//     writable: true,
//     configurable:true
// })
// console.log(a.b);

// var a = {
//     b: 99
// };//被代理或被劫持
// Object.defineProperty(a, "b", {
//     set: function(newValue){        
//         console.log('你要赋值给我，我的新值是: ' + newValue);
//         console.log(`以前的值是${this.value}`);
//         this.value = newValue;
//         console.log(`新的值是${this.value}`);
//     },
//     get: function(){
//         // console.log('你取我的值');
//         return this.value;
//     }

// });
// a.b = 22;
// console.log(a.b);


var Book = {}
var name = '';
Object.defineProperty(Book, 'name', {
  set: function (value) {
    name = value;
    console.log('你取了一个书名叫做' + value);
  },
  get: function () {
    return '《' + name + '》'
  }
})
 
Book.name = 'vue权威指南';  // 你取了一个书名叫做vue权威指南
console.log(Book.name);  // 《vue权威指南》