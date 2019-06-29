'use strict';
var TimeStamp = new Array();
var AccVec = [];
var rotVec = [];
var VecSeq = [];

//----------------- Motion Sensors -------------- //

/*function Handler(acceleration, rotation, VS, t) {
    var info, vec = "[t, X, Y, Z, a, b, g]";
    info = vec.replace("t", t);
    info = info.replace("X", acceleration.x && acceleration.x.toFixed(3));
    info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
    info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
    info = info.replace("a", rotation.alpha && rotation.alpha.toFixed(3));
    info = info.replace("b", rotation.beta && rotation.beta.toFixed(3));
    info = info.replace("g", rotation.gamma && rotation.gamma.toFixed(3));
    document.getElementById("timeStamp").innerHTML = t;
    document.getElementById('moAccel').innerHTML = info;
    document.getElementById("moRotation").innerHTML = info;
    VS.push(info);
    document.getElementById('RotSequence').innerHTML = VS;
}*/

function accelerationHandler(acceleration, AV, t) {
    var info, xyz = "[t, X, Y, Z]";
    info = xyz.replace("t", t);
    info = info.replace("X", acceleration.x && acceleration.x.toFixed(3));
    info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
    info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
    document.getElementById('moAccel').innerHTML = info;
    AV.push(info);
    document.getElementById('AccSequence').innerHTML = AV;
}

function rotationHandler(rotation, RV, t) {
    var info, xyz = "[t, X, Y, Z]";
    info = xyz.replace("t", t);
    info = info.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
    info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
    info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
    document.getElementById("moRotation").innerHTML = info;
    document.getElementById("timeStamp").innerHTML = t;
    RV.push(info);
    document.getElementById('RotSequence').innerHTML = RV;
}

function intervalHandler() {
    document.getElementById("moInterval").innerHTML = interval;
}

if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
    document.getElementById('moApi').innerHTML = 'Motion Sensor detected';
    let lastReadingTimestamp;
    let accelerometer = new LinearAccelerationSensor({
        frequency: 30
    });
    let gyroscope = new Gyroscope({
        frequency: 30
    });
    
    document.addEventListener('load', e => {var TimeStamp = Date.now() / 1000});
    
    accelerometer.addEventListener('reading', e => {
        if (lastReadingTimestamp) {
            intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
        }
        lastReadingTimestamp = accelerometer.timestamp;
        accelerationHandler(accelerometer, AccVec, TimeStamp);
    });

    gyroscope.addEventListener('reading', e => rotationHandler({
        alpha: gyroscope.x, beta: gyroscope.y, gamma: gyroscope.z
    }, rotVec, TimeStamp));
    
    accelerometer.start();
    gyroscope.start();  
} 

else if ('DeviceMotionEvent' in window) {
    document.getElementById('moApi').innerHTML = 'Device Motion Event';

    var onDeviceMotion = function (eventData) {
        accelerationHandler(eventData.acceleration, 'moAccel');
        accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
        rotationHandler(eventData.rotationRate);
        intervalHandler(eventData.interval);
    }

    window.addEventListener('devicemotion', onDeviceMotion, false);
} else {
    document.getElementById('moApi').innerHTML = 'No Sensors API available';
    document.getElementById("moRotation").innerHTML = '[x,y,z]';
}
