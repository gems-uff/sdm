
private var showWindow : boolean = false;
public var timer : GameTime;

function ActiveShowWindow()
{
	showWindow = true;
}

function NoPayment()
{
	GUI.BeginGroup(Rect (150,Screen.height - 190,1000,1000));
	if(showWindow)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,25,600,50), "Boss, our client didn't pay us this month because we are too behind the schedule.");
		if (GUI.Button (Rect (600,25, 130, 50), "End")) 
		{
			showWindow = false;
		}
	}
	GUI.EndGroup ();
}

function OnGUI (){
	NoPayment();
}


function Update () {
}