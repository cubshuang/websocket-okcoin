# websocket-okcoin

**websocket-okcoin** 為Html+JavaScript+CSS寫的網頁，用來練習的websockt api網頁

**ＷebSocket** 
建立一個ＷebSocket物件
```js 
var ws = new WebSocket('ws://url');
```
**readyState** 
WebSocket物件目前狀態，共四種：
>CONNECTING：值為0，表示正在連線中。
>
>OPEN：值為1，表示連線成功，可以進行通訊作業。
>
>CLOSING：值為2，表示連線正在關閉。
>
>CLOSED：值為3，表示連線已關閉，或連線失敗。


**onopen** 
連線成功
```js
ws.onmessage = function(event) {
  console.log('websocket is opened');
};
```
**send** 
傳資料給伺服器
```js
ws.send(‘my message');
``

**onmessage** 
從伺服器收到回傳的訊息
```js
ws.onmessage = function(event) {
  console.log('recive message');
};
```
**onclose** 
關閉連線
```js
ws.onmessage = function(event) {
  console.log('websocket is closed');
};
```
**onerror** 
發生錯誤
```js
ws.onerror = function(event) {
  console.log('websocket error');
};
```


## Demo
* [websocket-okcoin](https://cubshuang.github.io/websocket-okcoin/)

## Reference
* Wiki [WebSocket](https://zh.wikipedia.org/wiki/WebSocket)
* spec.whatwg.org [Web sockets](https://html.spec.whatwg.org/multipage/web-sockets.html#network)
* websocket.org [HTML5 WebSocket: A Quantum Leap in Scalability for the Web](http://www.websocket.org/quantum.html)
* tools.ietf.org [WebSocket protocol](https://tools.ietf.org/html/draft-abarth-thewebsocketprotocol-01)
* okcoin webapi [WebSocket API Reference](https://support.okcoin.com/hc/en-us/articles/360000754131-WebSocket-API-Reference)
* OKCoin WebSocket Api客户端示例 [OKCoin WebSocket@github](https://github.com/OKCoin/websocket)

