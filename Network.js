'use strict';
function getConnection() {
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;
}

function updateNetworkInfo(info) {
    document.getElementById('networkType').innerHTML = info.type;
    document.getElementById('effectiveNetworkType').innerHTML = info.effectiveType;
    document.getElementById('downlinkMax').innerHTML = info.downlinkMax;
}

var info = getConnection();
if (info) {
    info.addEventListener('change', updateNetworkInfo);
    updateNetworkInfo(info);
}