function ajax(method, url, callback, data, flag){
    var xml = null;
    if(window.XMLHttpRequest){
        xml = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        xml = new ActiveXObject('Microsoft.XMLHTTP');
    }

    method = method.toUpperCase();
    if(method == 'GET'){
        xml.open(method, url+'?'+data, flag);
        xml.send();
    }else if(method == 'POST'){
        xml.open(method, url, flag);
        xml.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xml.send(data);
    }

    xml.onreadystatechange = function(){
        if(xml.readyState == 4){
            if(xml.status == 200){
                callback(xml.responseText);
            }
        }
    }
}