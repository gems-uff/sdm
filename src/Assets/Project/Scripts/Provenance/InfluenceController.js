#pragma strict

//===================================================================================================================
// Script for storing influence edges for the entire game
// Attach this script in an Empty GameObject that is never destroyed during the game 
//(In the same GameObject for ProvenanceController)
//
// Uses ArrayList for influence edges
// ...
//===================================================================================================================
/*
//ArrayList functions
vertexList.Add(anItem);              			// add an item to the end of the array
vertexList[i] = newValue;            			// change the value stored at position i
var thisItem : TheType = vertexList[i];  		// retrieve an item from position i (note the required casting!)
vertexList.RemoveAt(i);                  		// remove an item from position i
var howBig = vertexList.Count;           		// get the length of the array
*/

//===================================================================================================================
// Declarations
//===================================================================================================================
var influenceList : List.<InfluenceEdge> = new List.<InfluenceEdge>();


//=================================================================================================================
// Create a new influence and add it to the influence list
// Function invoked at ExtractVertex to create a new influence
//=================================================================================================================
function CreateInfluence(type : String, ID : String, source : String, influenceName : String, influenceValue : String, consumable : boolean, quantity : int)
{
	var newInfluence : InfluenceEdge = new InfluenceEdge(type, ID, source, influenceName, influenceValue, consumable, quantity);
	influenceList.Add(newInfluence);
}

//=================================================================================================================
// Remove all influences with 'type' from the influence list
// Function invoked at ExtractVertex to remove an existing influence because it expired
//=================================================================================================================
function RemoveInfluenceByType(type : String)
{
	var i : int;
	var currentInf : InfluenceEdge = new InfluenceEdge();
	for (i = 0; i < influenceList.Count; i++)
	{
		currentInf = influenceList[i];
		if(currentInf.type == type)
		{
			influenceList.RemoveAt(i);
		}
	}
}

//=================================================================================================================
// Remove all influences with 'ID' from the influence list
// Function invoked at ExtractVertex to remove an existing influence because it expired
//=================================================================================================================
function RemoveInfluenceByID(ID : String)
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
// Clear the list of attributes for the next vertex
// Function invoked at ExtractVertex to check if the current action was influenced
//=================================================================================================================
function WasInfluencedByType(type : String, targetID : String)
{
	
}

function WasInfluencedByID(ID : String, targetID : String)
{
	
}