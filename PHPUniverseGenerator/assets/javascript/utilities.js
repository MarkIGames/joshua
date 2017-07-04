function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function distanceVector( v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

function sortNumber(a,b) {
    return a - b;
}