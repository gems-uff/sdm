
//Not Working....Using Collision Trigger instead

var clickTarget: String;
var dialogue : DialogueInstance;

function OnMouseOver () {
	Debug.Log("Pressed left click.");
	if (Input.GetButtonDown ("Fire1")) 
	//if(Input.GetMouseButtonDown(0))
	{
		dialogue.enabled = true;
		//GameObject.GetComponent(DialogueInstance).enabled = true;
		//var npc = GameObject.Find(clickTarget);
		//var dialogueScript = npc.GetComponent(DialogueInstance);
		//if (dialogueScript != null)
//			dialogueScript.enabled = !dialogueScript.enabled;
	}
}