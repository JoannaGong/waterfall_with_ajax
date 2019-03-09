var oLi = document.getElementsByTagName('li'),
    num = 1,
    flag = false;

function sendAjax(){
    if(!flag){
        ajax('GET', 'http://localhost/test/getPics.php', picsData, 'cpage='+num, true);
        flag = true;
        num++;
    }
}
sendAjax();

function picsData(data){
    var data = JSON.parse(data);
    if(data.length > 0){
        data.forEach(function(ele, index){
            var oItem = document.createElement('div');
            oItem.className = 'item';

            var oImg = new Image();
            oImg.src = ele.image;
            oImg.height = 230 * ele.height/ele.width;

            oItem.appendChild(oImg);
            oLi[shortestItem(oLi)].appendChild(oItem);
        })
        flag = false;
    }else {
        alert('照片加载完毕！');
    }
}

function shortestItem(list){
    var min = list[0].offsetHeight;
        index = 0,
        len = list.length;

    for(var i=0; i<len; i++){
        var h = list[i].offsetHeight;
        if(h < min){
            min = list[i];
            index = i;
        }
    }
    return index;
}

window.onscroll = function(){
    var index = shortestItem(oLi);
    var h = oLi[index].offsetHeight;

    var scrollheight = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if(scrollheight + clientHeight > h){
        sendAjax();
    }
}
