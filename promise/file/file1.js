var rf=require("fs");
// js是异步的，回调
// node 异步无阻塞 性能提高 降低服务器需求
// 异步 同步
// 回调地狱

// rf.readFile('input.txt', 'utf-8', function (err, data) {
//     console.log(data.toString());
//     rf.readFile('input2.txt', 'utf-8', function (err, data){
//         console.log(data.toString());
//         rf.readFile('input3.txt', 'utf-8', function (err, data){
//             console.log(data.toString());
//         })
//     })
// });


// rf.readFile('input.txt', 'utf-8', function (err, data) {
//     if (err) {
//         // console.log(err);
//         return console.error(err);
//     } else {
//         console.log(data.toString());
//     }
// });

// rf.readFile('input2.txt', 'utf-8', function (err, data) {
//     if (err) {
//         // console.log(err);
//         return console.error(err);
//     } else {
//         console.log(data.toString());
//     }
// });

// rf.readFile('input3.txt', 'utf-8', function (err, data) {
//     if (err) {
//         // console.log(err);
//         return console.error(err);
//     } else {
//         console.log(data.toString());
//     }
// });

// new Promise((resolve, reject) => {
//     resolve()
// }).then()

// var data1 = rf.readFileSync('input.txt','utf-8');
// console.log(data1);

// var data2 = rf.readFileSync('input2.txt','utf-8');
// console.log(data2);

// var data3 = rf.readFileSync('input3.txt','utf-8');
// console.log(data3);


function readFile1(){
    return new Promise((resolve, reject) => {
        rf.readFile('input.txt', 'utf-8',(err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        })
    });
}
function readFile2(){
    return new Promise((resolve, reject) => {
        rf.readFile('input2.txt', 'utf-8',(err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        })
    });
}
function readFile3(){
    return new Promise((resolve, reject) => {
        rf.readFile('input3.txt', 'utf-8',(err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        })
    });
}

readFile1().then(data => {
    console.log(data);
    return readFile2();
})
.then(data => {
    console.log(data);
    return readFile3();
})
.then(data => {
    console.log(data);
})
console.log(22);
