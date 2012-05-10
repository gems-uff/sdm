#pragma strict


var ptsPrefab: Transform; // drag the prefab to this variable in Inspector
var v : Vector3;
function spawnPts(points: String, x: float, y: float){
    x = Mathf.Clamp(x,0.05,0.95); // clamp position to screen to ensure
    y = Mathf.Clamp(y,0.05,0.9);  // the string will be visible
    var gui: Transform = Instantiate(ptsPrefab,Vector3(x,y,0),Quaternion.identity);
    gui.guiText.text = points;
}
function Start () {

	v = Camera.main.WorldToViewportPoint(transform.position);

}

function Update () {

}

/* Use this to fire the text on the position of the objetc
var v:Vector3 = Camera.main.WorldToViewportPoint(transform.position);
spawnPts(100, v.x, v.y); // 100 points picked
*/