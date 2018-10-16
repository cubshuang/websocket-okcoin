var okCoinWebSocket = {};
    okCoinWebSocket.init = function(uri, apiKey, secretKey) {
        this.wsUri = uri;
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.lastHeartBeat = new Date().getTime();
        function connect() {
            okCoinWebSocket.websocket = new WebSocket(okCoinWebSocket.wsUri);
            
            okCoinWebSocket.websocket.onopen = function(evt) {
                onOpen(evt);
            };
            okCoinWebSocket.websocket.onclose = function(evt) {
                onClose(evt);
                print('Socket is closed. Reconnect will be attempted in 1 second.', evt.reason);
                setTimeout(function() {
                connect();
                }, 3000);
            };
            okCoinWebSocket.websocket.onmessage = function(evt) {
                onMessage(evt);
            };
            okCoinWebSocket.websocket.onerror = function(evt) {
                onError(evt);
            };
        }
        connect();
    }
    function onOpen(evt) {
        print("CONNECTED");
        createOKCoinTable();
        //doSend("{'event':'addChannel','channel':'ok_sub_spot_ltc_usd_ticker'}");
        var arrCoin = JSON.parse(dataCoin);
        arrCoin.coin.forEach(element => {
            doSend("{'event':'addChannel','channel':'ok_sub_spot_"+element.name+"_ticker'}");
        });
    }

    function onClose(evt) {
        print("DISCONNECTED");
    }

    function onMessage(e) {
        var filter=' | ';
        console.log(new Date().getTime() + ": " + e.data)
        var array = JSON.parse(e.data);
        var rcv = array[0];
        if (rcv != null && rcv.channel!="addChannel"){
            putRcvData(rcv.channel.replace("ok_sub_spot_","").replace("_ticker","") ,rcv.data.high , rcv.data.low ,  rcv.data.buy , rcv.data.sell , rcv.data.vol, rcv.data.last , rcv.data.dayLow , rcv.data.dayHigh );
        }
    }

    function onError(evt) {
        print('<span style="color: red;">ERROR:</span> ' + evt.data);
    }
    function doSend(message) {
        okCoinWebSocket.websocket.send(message);
    }

    function print(message) {
        var status = document.getElementById("status");
        status.style.wordWrap = "break-word";
        status.innerHTML = message + '<br/>';
        //status.innerHTML += message + '<br/>';
        status.className = "animated bounce";
        setTimeout(function() {
            status.className = "";
            }, 2000);
    }
    function changeData(coincloname,coldata){
        var colObj = document.getElementById(coincloname);
        var oldValue = colObj.innerHTML;
        if (oldValue == ""){
            colObj.innerHTML = coldata;
        }else if (oldValue != coldata){
            colObj.innerHTML = coldata;
            colObj.className = "animated flash warning";
            setTimeout(function() {
                colObj.className = "";
                }, 2000);
        }
    }
    function putRcvData(coinname,_high,_low,_buy,_sell,_vol,_last,_dayLow,_dayHigh)
    {
        var subName = "col_" + coinname;
        changeData(subName + "_high",_high);
        changeData(subName + "_low",_low);
        changeData(subName + "_buy",_buy);
        changeData(subName + "_sell",_sell);
        changeData(subName + "_vol",_vol);
        changeData(subName + "_last",_last);
        changeData(subName + "_dayLow",_dayLow);
        changeData(subName + "_dayHigh",_dayHigh);
    }
    function loadJSON(file, callback) {   
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("text/plain");
        xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);  
    }
    function createOKCoinTable() {
        var arrCoin = JSON.parse(dataCoin);
        var str = '<div class="table-responsive">';
        //str += '<table class="table">';
        str += '<table class="table table-bordered">';
        str += '<thead>';
        str += '<tr class="table-info">';
        str += '<th>CoinName</th>';
        arrCoin.col.forEach(element => {
            str += '<th>'+element+'</th>';
        });
        str += '</tr>';
        str += '</thead>';
        str += '<tbody>';
        arrCoin.coin.forEach(element => {
            str += '<tr id="row_'+element.name+'" >';           
            str += '<td>'+element.name.toUpperCase().replace("_","/")+'</td>';
            arrCoin.col.forEach(colname => {
                str += '<td id="col_'+element.name+'_'+colname+'"></td>';
            });
            str += '</tr>';
        });
        str += '</tbody>';        
        str += '</table>';
        str += '</div>';
        document.getElementById("output").innerHTML = str;
    }
    window.onload = okCoinWebSocket.init("wss://real.okcoin.com:10440/websocket/okcoinapi","","");
