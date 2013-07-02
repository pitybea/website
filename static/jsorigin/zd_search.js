function addquote(str)
{
    return '\"'+str+'\"';
}


function simDivWithID(id)
{
     return '<div id='+addquote(id) +'>'+'</div>';
}
function simDivWithIDContent(id,content)
{
    return '<div id='+addquote(id) +'>'+content+'</div>';
}
function simDivWithIDContentColor(id,content,color, op)
{
    console.log('<div id='+addquote(id) + 'style=\"background-color:rgba('+color + op +');\"'+ '>'+content+'</div>');
    return '<div id='+addquote(id) + 'style=\"background-color:rgba('+color + op +');\"'+ '>'+content+'</div>';
}

var largestcolorvalue=255;

var smallestcolorvalue=130;

function zeroOneValueTocolor(val)
{
    val=1-val;
    d=Math.ceil(smallestcolorvalue + val*(largestcolorvalue-smallestcolorvalue));
    return d.toString(16);
}
function explainserchresult(obj)
{
    //console.log(3%2,4%2);

    rlt="";
    for(var tt in obj)
    {

        _back_style=tt%2==0?'evencolumn':'oddcolumn';
        rlt+= '<div id='+ addquote(_back_style) + '>';

        _userName=obj[tt][0];
        _date=obj[tt][1];
        _flg=obj[tt][2];

        _flg_style=_flg>0?'posflag':'negflag';
        rlt+=simDivWithID(_flg_style);
        rlt+=simDivWithIDContent('username',_userName);

        rlt+=simDivWithIDContent('date',_date);
	rlt+='<br>';
//        console.log(_userName,_date,_flg);

        _words=obj[tt][3];
        setence='';
        for(var td in _words)
        {


            _str=_words[td][0];
            _val=_words[td][1];
            _bol=_words[td][2];



            if(_bol==true)
            {
                 setence+=simDivWithIDContent('hilightword',_str);
            }
            else
            {
                if(_val>0)
                {
                    color=_val.toString();
                    setence+=simDivWithIDContentColor('posword',_str,'255,0,0,',color);
                }
                else if(_val<0)
                {
                    color=Math.abs(_val).toString();
                    setence+=simDivWithIDContentColor('negword',_str,'0,0,255,',color);
                }
                else
                {

                    setence+=simDivWithIDContent('normalword',_str);
                }
            }



            console.log(_str,_val,_bol);
        }
        rlt+=simDivWithIDContent('sentence',setence);
        rlt+='</div>';
        rlt+='<br>';

    }
//    console.log(rlt);
    return rlt;
}
jQuery(document).ready(function()
{
    var dragSrcEl = null;

    function handleDragStart(e)
    {
        console.log('drag start');
        // Target (this) element is the source node.
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
    }

    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }

    function handleDrop(e) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }

        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');

        }
        this.classList.remove('over');
        return false;
    }

    function handleDragEnd(e) {

        this.style.opacity = '1.0';

    }

    var cols = document.querySelectorAll('#columns .column');

    [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false)
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });

    jQuery(".btn1").click(function() {
        var input_string = jQuery(".word").val();

        jQuery.ajax(
            {
                type: "POST",
                data: {keyword: input_string},
                
		success: function(myg)
                {
		             console.log('result back');

                    var obj = JSON.parse(myg);
		            console.log(myg);
		            console.log(obj);
                  //  console.log(obj);
                  //  explainserchresult(obj);
                    jQuery(".lst").html(explainserchresult(obj));
                 //   jQuery(".lst").html(genli(obj));


                },
		timeout: 2000000
            });
        return false;
    });




    (function() {

        // Override the SocketIO constructor to provide a default
        // value for the port, which is added to os.environ in the
        // runserver_socketio management command.
        var prototype = io.Socket.prototype;
        io.Socket = function(host, options) {
            options = options || {};
            options.port = options.port;
            return prototype.constructor.call(this, host, options);
        };

        // We need to reassign all members for the above to work.
        for (var name in prototype) {
            io.Socket.prototype[name] = prototype[name];
        }

        // Arrays are transferred as individual messages in Socket.IO,
        // so we put them into an object and check for the __array__
        // message on the server to handle them consistently.
        var send = io.Socket.prototype.send;
        io.Socket.prototype.send = function(data) {
            if (data.constructor == Array) {
                channel =  data[0] == '__subscribe__' || data[0] == '__unsubscribe__';
                if (!channel) {
                    data = ['__array__', data];
                }
            }
            return send.call(this, data);
        };

        // Set up the subscription methods.
        io.Socket.prototype.subscribe = function(channel) {
            this.send(['__subscribe__', channel]);
            return this;
        };
        io.Socket.prototype.unsubscribe = function(channel) {
            this.send(['__unsubscribe__', channel]);
            return this;
        };

    })();

    var socket;


    var disconnected = function() {
        console.log('socket disconnected');
        //setTimeout(start, 1000);
    };

    var messaged = function(data) {

        console.log(data);
        var obj = JSON.parse(data);

        jQuery(".lst").append(explainserchresult(obj));

    };

    socket = new io.Socket(null,{port:8000,transports:['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']});



    socket.on('message', messaged);


    var start = function(){
        socket.connect();
    };


    socket.on ('disconnect',  function() {
        console.log('socket disconnected');
     //   setTimeout(start, 1000);
    });

    start();
    var mychnl='good';
    socket.on('connect', function(){
        console.log('socket connected');
        socket.subscribe(mychnl);
    });

    jQuery(".btns").click(function() {






        jQuery(".lst").html("");


        var input_string = jQuery(".word").val();
        jQuery.ajax(
            {
                type: "POST",
                data: {chanel: mychnl,
                        keyword: input_string},

                success: function(myg)
                {
                    console.log('result back');


                },
                timeout: 2000000
            });
        return false;
    });



});




//jQuery(".btn2").click(function(){
//    jQuery("#boxC").css("background-color","red");
//});


