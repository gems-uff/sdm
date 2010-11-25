using UnityEngine;
using System.Collections;

public class Dialog : Interactive
{
    private const string INTERACTIVE_MESSAGE = "Conversar";

    public void Awake()
    {

    }

    public override string GetInteractionMessage()
    {
        return INTERACTIVE_MESSAGE;
    }
	
	public override void Interact()
    {
		//var dialogueScript = cube.GetComponent(DialogueInstance);
		//dialogueScript.enabled = !dialogueScript.enabled;
		//GameObject.GetComponent(DialogueInstance).enabled = true;
		Debug.Log("Implementar chamada de DialogInstance");
    }
}