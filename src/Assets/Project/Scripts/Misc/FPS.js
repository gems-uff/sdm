#pragma strict



var frameCount = 0;
var nextUpdate = 0.0;
var fps = 0.0;
var updateRate = 4.0;  // 4 updates per sec.

function Update()
{
    frameCount++;
    if (Time.time > nextUpdate)
    {
        nextUpdate = Time.time + 1.0/updateRate;
        fps = frameCount * updateRate;
        frameCount = 0;
        guiText.text = fps + " fps";
    }

}
/*
var fps : float;

function Start () {

}

function Update () {
	var fps = 1.0/Time.deltaTime;
	guiText.text = fps + " fps";
}
*/