//例一
// var fs = require("fs");
// //阻塞代码执行结果
// // var data = fs.readFileSync('input.txt');
// // console.log(data.toString());
// // console.log("程序执行结束!");

// //非阻塞代码执行结果（回调）
// fs.readFile('input.txt', function (err, data) {
//     if (err) return console.error(err);
//     console.log(data.toString());
// });
// console.log("程序执行结束!");


//例二
// 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();
// // 创建事件处理程序
// var connectHandler = function connected() {
//     console.log('连接成功。');
//
//     // 触发 data_received 事件
//     eventEmitter.emit('data_received');
// };
// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
//
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//     console.log('数据接收成功。');
// });
// // 触发 connection 事件
// eventEmitter.emit('connection');
//
// console.log("程序执行完毕。");


//例三
// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();
// // 监听器 #1
// var listener1 = function listener1() {
//     console.log('监听器 listener1 执行。');
// };
//
// // 监听器 #2
// var listener2 = function listener2() {
//     console.log('监听器 listener2 执行。');
// };
//
// // 绑定 connection 事件，处理函数为 listener1
// eventEmitter.addListener('connection', listener1);
//
// // 绑定 connection 事件，处理函数为 listener2
// eventEmitter.on('connection', listener2);
//
// var eventListeners = events.EventEmitter.listenerCount(eventEmitter,'connection');
// console.log(eventListeners + " 个监听器监听连接事件。");
//
// // 处理 connection 事件
// eventEmitter.emit('connection');
//
// // 移除监绑定的 listener1 函数
// eventEmitter.removeListener('connection', listener1);
// console.log("listener1 不再受监听。");
//
// // 触发连接事件
// eventEmitter.emit('connection');
//
// eventListeners = events.EventEmitter.listenerCount(eventEmitter,'connection');
// console.log(eventListeners + " 个监听器监听连接事件。");
//
// console.log("程序执行完毕。");

//例四 Stream(流) 从流中读取数据
// var fs = require("fs");
// var data = '';
// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');
// // 设置编码为 utf8。
// readerStream.setEncoding('UTF8');
// // 处理流事件 --> data, end, and error
// readerStream.on('data', function(chunk) {
//     data += chunk;
// });
// readerStream.on('end',function(){
//     console.log(data);
// });
// readerStream.on('error', function(err){
//     console.log(err.stack);
// });
// console.log("程序执行完毕");


//例五 写入流
// var fs = require("fs");
// var data = '我要写入文字啦';
// // 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt');
// // 使用 utf8 编码写入数据
// writerStream.write(data,'UTF8');
// // 标记文件末尾
// writerStream.end();
// // 处理流事件 --> data, end, and error
// writerStream.on('finish', function() {
//     console.log("写入完成。");
// });
// writerStream.on('error', function(err){
//     console.log(err.stack);
// });
// console.log("程序执行完毕");


//例六 管道流（通过读取一个文件内容并将内容写入到另外一个文件中）
// var fs = require("fs");
// // 创建一个可读流
// var readerStream = fs.createReadStream('input.txt');
// // 创建一个可写流
// var writerStream = fs.createWriteStream('output.txt');
// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writerStream);
// console.log("程序执行完毕");


//例七 链式流（链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。接下来我们就是用管道和链式来压缩和解压文件。）
// //压缩
// var fs = require("fs");
// var zlib = require('zlib');
// // 压缩 input.txt 文件为 input.txt.gz
// fs.createReadStream('input.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('input.zip'));
// console.log("文件压缩完成。");
// //解压
// var fs = require("fs");
// var zlib = require('zlib');
//
// // 解压 input.txt.gz 文件为 input.txt
// fs.createReadStream('input.txt.gz')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('input.txt'));
//
// console.log("文件解压完成。");


