/* Button Content examples */
var icon : Texture2D;

//Menu no canto superior direito
function OnGUI () {
	if (GUI.Button (Rect (Screen.width - 100,0,100,50), icon)) {
			print ("Made with Unity 3d");
	}

	if (GUI.Button (Rect (Screen.width - 100,70, 100, 20), "Quit to Menu")) {
			Application.LoadLevel ("StartMenu");
	}
}

