// vm => Vue 实例 
// mvvm 虚拟DOM对象
// 真实DOM 消耗内存 vm 将很多次的
// 修改 集中成一次真实DOM修改
// vm => Vue 实例 mvvm 虚拟DOM对象
// 真实DOM 消耗内存 vm 将很多次的修改 集中成一次真实DOM修改
function Compile(el, vm){
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}
Compile.prototype = {
    init(){
        // 接管模块去编译，显示不是html，只是模板，从头开始处理模板
        this.fragment = this.nodeToFragment(this.el);
        this.compileElement(this.fragment);
        this.el.appendChild(this.fragment);
    },
    compileElement(el){
        var childNodes = el.childNodes;
        [].slice.call(childNodes).forEach((node) => {
            // console.log(node);
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            // console.log("text: ", text);
            if(this.isElementNode(node)){
                //分析节点
                this.compile(node);
            }else if(this.isTextNode(node) && reg.test(text)){// 判断是否是符合这种形式{{}}的指令
                console.log( reg.exec(text)[1]);
                this.compileText(node, reg.exec(text)[1]);
            }
            // 递归
            if(node.childNodes && node.childNodes.length){
                this.compileElement(node);
            }
        });
    },
    isDirective (attrName) {
        return attrName.indexOf("v-") === 0;
    },
    isEventDirective (dir) {
        return dir.indexOf("on:") === 0;
    },
    compileEvent (node, vm, exp, dir) {
        var eventType = dir.split(":")[1];
        var cb = vm.methods && vm.methods[exp];
        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compile(node){
        var nodeAttrs = node.attributes;
        Array.prototype.forEach.call(nodeAttrs, (attr) => {
            var attrName = attr.name;
            if (this.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (this.isEventDirective(dir)) {
                    this.compileEvent(node, this.vm, exp, dir);
                }else {
                    this.compileModel(node, this.vm, exp, dir);
                }
            }
        });
    },
    isElementNode(node){
        return node.nodeType == 1;
    },  
    isTextNode(node){
        return node.nodeType == 3;
    },
    compileText(node, exp){
        var initText = this.vm[exp];
        this.updateText(node, initText);  // 将初始化的数据初始化到视图中
        new Watcher(this.vm, exp, value => {// 生成订阅器并绑定更新函数
            this.updateText(node, value);
        });
    },
    compileModel(node, vm, exp, dir){
        var val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, value => {
            this.modelUpdater(node, value);
        });
        node.addEventListener('input', e => {
            var newValue = e.target.value;
            if(val === newValue){
                return;
            }
            this.vm[exp] = newValue;
            val = newValue;
        })
    },
    modelUpdater(node, value, oldValue){
        node.value = typeof value == 'undefined' ? '' : value;
    },
    updateText(node, value){
        node.textContent = typeof value === 'undefined' ? '' : value;
    },

    // 创建文档片段，将节点元素附加到文档片段中，在将文档片段附加到dom树中
    // 在dom树中文档片段被其所有的子元素替代，使用文档片段通常起到性能优化的作用
    nodeToFragment: function(el){
        var fragment = document.createDocumentFragment();
        // 新拷贝一份，模板进行html编译，将它替换原有el.innnerHTML
        // 文档碎片不会留下任何印记
        var child = el.firstChild;
        // console.log('child: ',child);
        while(child){
            // console.log('child: ',child);
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    }
}

  