/* Example level loader */

var backdrop : Texture2D;

function OnGUI () {
	// Make a background box
	
	var backgroundStyle : GUIStyle = new GUIStyle();
	backgroundStyle.normal.background = backdrop;
	
	GUI.Label ( Rect( ( Screen.width - (Screen.height * 2)) * 0.75, 0, Screen.height * 2, 	Screen.height), "", backgroundStyle);
	
	GUI.Box (Rect (10,10,100,90), "Main Menu");

	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (20,40,80,20), "Play")) {
		Application.LoadLevel ("Prototype");
	}

	// Make the second button.
	if (GUI.Button (Rect (20,70,80,20), "Quit")) {
		Application.Quit();
	}
}