'use strict';
//----------------- Motion Sensors -------------- //
var rotV = new Array();

function accelerationHandler(acceleration, targetId) {
  var info, xyz = "[X, Y, Z]";
  info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
  info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
  info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
  document.getElementById(targetId).innerHTML = info;
}

function test(){
    console.log("I'm executed");
}

function rotationHandler(rotation) {
  var info, xyz = "[X, Y, Z]";

  info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
  info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
  info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
  document.getElementById("moRotation").innerHTML = info;
  rotV.push(info);
}

console.log('Rotation Vevctor'+rotV);





function intervalHandler(interval) {
  document.getElementById("moInterval").innerHTML = interval;
}

var TimeStamp = new Array();
var AccVec = new Array();
var xyz = new Array(3);

if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
    document.getElementById('moApi').innerHTML = 'Motion Sensor detected';
    let lastReadingTimestamp;
    let accelerometer = new LinearAccelerationSensor({frequency: 30});
    
    accelerometer.addEventListener('reading', e => {
    if (lastReadingTimestamp) {
        intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
    }
    lastReadingTimestamp = accelerometer.timestamp;
    accelerationHandler(accelerometer, 'moAccel');
    xyz[0] = accelerometer.x.toFixed(3);
    xyz[1] = accelerometer.y.toFixed(3);
    xyz[2] = accelerometer.z.toFixed(3);
    AccVec.concat(xyz);
    TimeStamp.concat(accelerometer.timestamp);
    console.log("Acceleration along the X-axis " + accelerometer.x);
    console.log("Acceleration along the Y-axis " + accelerometer.y);
    console.log("Acceleration along the Z-axis " + accelerometer.z);
    
    console.log("here we are: " + TimeStamp + " >> "+ AccVec);
    test();
    });
    //test();
    /*if (lastReadingTimestamp) {
        intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
    }
    else{
        lastReadingTimestamp = accelerometer.timestamp;
    }
    accelerationHandler(accelerometer, 'moAccel');*/
    
    accelerometer.start();

    if ('GravitySensor' in window) {
        let gravity = new GravitySensor();
        gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
        //accelerationHandler(gravity, 'moAccelGrav');
        gravity.start();
    }

    let gyroscope = new Gyroscope();
    gyroscope.addEventListener('reading', e => rotationHandler({
    alpha: gyroscope.x,
    beta: gyroscope.y,
    gamma: gyroscope.z
    }));
    /*rotationHandler({
          alpha: gyroscope.x,
          beta: gyroscope.y,
          gamma: gyroscope.z
    });*/
    gyroscope.start();
}

else if ('DeviceMotionEvent' in window) {
    document.getElementById('moApi').innerHTML = 'Device Motion Event';

    var onDeviceMotion = function(eventData) {
        accelerationHandler(eventData.acceleration, 'moAccel');
        accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
        rotationHandler(eventData.rotationRate);
        intervalHandler(eventData.interval);
    }

    window.addEventListener('devicemotion', onDeviceMotion, false);
}

else {
    document.getElementById('moApi').innerHTML = 'No Sensors API available';
}