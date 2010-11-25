using UnityEngine;
using System.Collections;

public class mousePointer : MonoBehaviour 
{
    public Texture2D cursorImageOff;
    public Texture2D cursorImageOver;
    public Texture2D leftMouseClickTexture;

    private Texture2D cursorImage;
    private Interactive currInteractiveObject;
    private InteractiveMessageGUI interactiveMessageScript;
    //private int cursorWidth = 32;
    //private int cursorHeight = 32;

	
	public void Awake()
    {
        //Screen.showCursor = false;
        interactiveMessageScript = this.transform.FindChild("InteractiveMessage").GetComponent<InteractiveMessageGUI>();
       
        interactiveMessageScript.visible = false;
        interactiveMessageScript.gameObject.transform.position = new Vector3(0.05f, 0.85f, 0); //position GUI in correct position, so it can be hidden at start
    }
    void Start()
    {
        Screen.showCursor = false;
		cursorImage = cursorImageOff;
    }
	
	public void Update()
    {
        Ray cursorRayCenter = Camera.main.ScreenPointToRay(new Vector3(Screen.width/2,Screen.height/2));
        RaycastHit hit;
        Transform currentTransformObj;
        currInteractiveObject = null;
        if (Physics.Raycast(cursorRayCenter, out hit, Mathf.Infinity)) //find first object lined up with the cursor
        {
            currentTransformObj = hit.transform;

            //this loops through to see if this gameobject or the parent of this gameobject is interactive
            do
            {
                currInteractiveObject = currentTransformObj.GetComponent<Interactive>();//if it is interactive set to to the current interactive object
                currentTransformObj = currentTransformObj.parent;
            } while (currInteractiveObject==null && currentTransformObj!=null);
        }
		
        Interact();
    }

	private void Interact()
    {
        if (currInteractiveObject != null && Input.GetMouseButtonDown(0)) //if interactive object available and left mouse button down
        {
            currInteractiveObject.Interact();
        }
    }
	

    void OnGUI()
    {
		
		if (currInteractiveObject != null)
        {
            cursorImage = cursorImageOver;
            interactiveMessageScript.message = currInteractiveObject.GetInteractionMessage();
            interactiveMessageScript.visible = true;
            
        }
        else
        {
            cursorImage = cursorImageOff;
            interactiveMessageScript.visible = false;
        }
		
		GUILayout.BeginArea(new Rect((Screen.width - cursorImage.width) / 2, (Screen.height - cursorImage.height) / 2, cursorImage.width, cursorImage.height));
        GUILayout.Label(cursorImage);
        GUILayout.EndArea();
        //GUI.DrawTexture(new Rect(Input.mousePosition.x, Screen.height - Input.mousePosition.y, cursorWidth, cursorHeight), cursorImage);
    }
}