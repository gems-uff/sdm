#pragma strict

//=================================================================================================================
// Script for storing influence edges for the entire game
// Attach this script in an Empty GameObject that is never destroyed during the game 
//(In the same GameObject for ProvenanceGatherer)
// Link it to ProvenanceGatherer
//
// Uses ArrayList for influence edges
// All functions are automatically invoked and controlled by 'ExtractProvenance' script script
//
// If you desire to manually clean/erase the influence list, then invoke 'CleanInfluence' function
//=================================================================================================================

//=================================================================================================================
// *Declarations Section*
//=================================================================================================================
public var provenance : ProvenanceController;	
private var influenceList : List.<InfluenceEdge> = new List.<InfluenceEdge>();

//=================================================================================================================
// *Functions Section*
//=================================================================================================================

//=================================================================================================================
// Create a new influence and add it to the influence list
// Function invoked at 'ExtractProvenance' to create a new influence
//=================================================================================================================
public function CreateInfluence(tag : String, ID : String, source : String, influenceName : String, influenceValue : String, consumable : boolean, quantity : int)
{
	var newInfluence : InfluenceEdge = new InfluenceEdge(tag, ID, source, influenceName, influenceValue, consumable, quantity);
	influenceList.Add(newInfluence);
}

//=================================================================================================================
// Remove all influences with 'tag' from the influence list
// Function invoked at 'ExtractProvenance' to remove an existing influence because it expired
//=================================================================================================================
public function RemoveInfluenceByTag(tag : String)
{
	var i : int;
	//var currentInf : InfluenceEdge = new InfluenceEdge();
	for (i = 0; i < influenceList.Count; i++)
	{
		//currentInf = influenceList[i];
		if(influenceList[i].tag == tag)
		{
			influenceList.RemoveAt(i);
		}
	}
}

//=================================================================================================================
// Remove all influences with 'ID' from the influence list
// Function invoked at 'ExtractProvenance' to remove an existing influence because it expired
//=================================================================================================================
public function RemoveInfluenceByID(ID : String)
{
	var i : int;
	var currentInf : InfluenceEdge = new InfluenceEdge();
	for (i = 0; i < influenceList.Count; i++)
	{
		currentInf = influenceList[i];
		if(currentInf.ID == ID)
		{
			influenceList.RemoveAt(i);
		}
	}
}

//=================================================================================================================
// Remove all influences from the influence list
// Use this function to remove all influences in the influence list
//=================================================================================================================
public function CleanInfluence()
{
	influenceList = new List.<InfluenceEdge>();
}
//=================================================================================================================
// Clear the list of attributes for the next vertex
// Function invoked at 'ExtractProvenance' to check if the current action was influenced
//=================================================================================================================

// Check influence list by 'tag'
function WasInfluencedByTag(tag : String, targetID : String)
{
	var i : int;

	for (i = 0; i < influenceList.Count; i++)
	{
		if(influenceList[i].tag == tag)
		{
			if(influenceList[i].consumable)
			{
				influenceList[i].quantity--;
				provenance.CreateInfluenceEdge(influenceList[i].source, targetID, influenceList[i].name, influenceList[i].infValue);
				if(influenceList[i].quantity ==  0)
				{
					influenceList.RemoveAt(i);
				}
								
			}
			else
			{
				provenance.CreateInfluenceEdge(influenceList[i].source, targetID, influenceList[i].name, influenceList[i].infValue);
			}
		}
	}
}

// Check influence list by influence's 'ID'
function WasInfluencedByID(ID : String, targetID : String)
{
	var i : int;

	for (i = 0; i < influenceList.Count; i++)
	{
		if(influenceList[i].ID == ID)
		{
			if(influenceList[i].consumable)
			{
				influenceList[i].quantity--;
				provenance.CreateInfluenceEdge(influenceList[i].source, targetID, influenceList[i].name, influenceList[i].infValue);
				if(influenceList[i].quantity ==  0)
				{
					influenceList.RemoveAt(i);
				}
								
			}
			else
			{
				provenance.CreateInfluenceEdge(influenceList[i].source, targetID, influenceList[i].name, influenceList[i].infValue);
			}
		}
	}
}

/*
function Awake () {
	provenance = GetComponentInChildren(ProvenanceController);
}
*/