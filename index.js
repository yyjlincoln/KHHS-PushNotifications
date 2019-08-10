onlaunch()

var serverAddress = "http://localhost:80/"
app = new Vue({
    el: '#app',
    data: {
        notifications: {
            'type':'system',
            'text':'Initializing...'
        },
        // time:String(time.getDate())+"/"+String(time.getMonth())+"/"+String(time.getFullYear())+' '+String(time.getHours())+':'+String(time.getMinutes())+':'+String(time.getSeconds())+'.'+String(time.getMilliseconds())
        time: new Date().format('dd/MM/yyyy hh:mm:ss')
    }
})

function updateImmediately() {
    $.get(serverAddress + "fetchNow", (d) => {
        app.notifications = d.notifications
        if (d.code == 0) {
            if (d.notifications) {
                // if(d.type=="advancedhtml"){
                //     $("#ahtml").html(d.html)
                //     v=new Vue({
                //         el:"#ahtml",
                //         data:{

                //         }
                //     })
                // }

                if(d.type=='order'){
                    eval(d.command)
                }
                
                setTimeout(() => {
                    updateImmediately()
                }, d.notifications.duration * 1000)
            } else {
                app.notifications=''
                setTimeout(()=>{
                    console.log('update')
                    updateImmediately()
                },5000)
            }
        } else {
            // console.log('err', d)
            app.notifications = {
                'type': 'error',
                'text': 'Sorry, we ran into a problem.'
            }
            setTimeout(()=>{
                console.log('update')
                updateImmediately()
            },5000)
        }
    }).fail(()=>{
        app.notifications={
            'text':'Internet Connection Failed',
            'type':'error'
        }
        setTimeout(()=>{
            console.log('update')
            updateImmediately()
        },5000)
    })
}

function onlaunch() {
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份 
            "d+": this.getDate(),                    //日 
            "h+": this.getHours(),                   //小时 
            "m+": this.getMinutes(),                 //分 
            "s+": this.getSeconds(),                 //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds()             //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}

function load() {
    updateImmediately()
    setInterval(() => {
        app.time = new Date().format('dd/MM/yyyy hh:mm:ss')
    }, 1000)
}

load()