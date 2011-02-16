var dialogue : DialogueInstance;
var endOnExit : boolean = true;
//var script : MouseLook2;
private var gameobj : GameObject; 

//Por no mesmo gameobject que tem o dialoginstance

function Awake() 
{ 
   gameobj =GameObject.Find("Player"); 
   //script = gameobj.GetComponent(MouseLook2); 
} 


function OnTriggerEnter( collider1 : Collider )
{
    if ( collider1.name == "Player" )
	{
		//script.mouseLock = true;
        dialogue.enabled = true;
	}
}

function OnTriggerExit( collider1 : Collider )
{
    if ( collider1.name == "Player" && endOnExit)
	{
        dialogue.enabled = false;
		//script.mouseLock = false;
	}
}