#pragma strict

//===================================================================================================================
// Script for storing vertices and edges
// Attach this script in an Empty GameObject that is never destroyed during the game
//(In the same GameObject for InfluenceController)
//
// Uses one ArrayList for vertices and another for edges
// ...
//===================================================================================================================


//===================================================================================================================
// Declarations
//===================================================================================================================
public var vertexList = new ArrayList();    			
public var edgeList = new ArrayList();    				

//=================================================================================================================
// Add Vertex to the vertexList
// Create a new Edge connecting the new vertex with the last one
// Add edge to edgeList
// Return new vertex in order to update the caller
//=================================================================================================================
function AddVertex(date_ : String, type_ : String, label_ : String, attribute_ : List.<AttributeType>, details_ : String, target : Vertex) : Vertex
{
	var source : Vertex = new Vertex(NewVertexID(), date_, type_, label_, attribute_, details_);

	vertexList.Add(source);
	
	// If target is not null, then create an edge connecting both vertices
	if(target != null)
	{
		CreateProvenanceEdge(source, target);	// Create an edge using PROV definitions
	}
	
	return source;
}

//=================================================================================================================
// Add Edge to the edgeList
//=================================================================================================================
function AddEdge(t : Edge)
{
	edgeList.Add(t);
}

//=================================================================================================================
// Generate a new ID for Edge
//=================================================================================================================
function NewEdgeID() : String
{
	return "edge_" + edgeList.Count;
}

//=================================================================================================================
// Generate a new ID for vertex
//=================================================================================================================
function NewVertexID() : String
{
	return "vertex_" + vertexList.Count;
}

//=================================================================================================================
// Create a new edge connecting Source to Target
// Defines the edge provenance label according to Source and Target types
// Uses PROV edge definitions for label
// Add the edge to the edgeList
//=================================================================================================================
function CreateProvenanceEdge(source: Vertex, target : Vertex)
{
	// Default edge label
	var newEdge : Edge = new Edge(NewEdgeID(), "Neutral", "WasAssociatedTo", "", source.ID, target.ID);
	
	// Try to classify using PROV definitions
	if(source.type == "Activity")
	{
		if(target.type == "Activity")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "WasInformedBy", "", source.ID, target.ID);
		}
		else if(target.type == "Agent")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "WasAssociatedTo", "", source.ID, target.ID);
		}
		else if(target.type == "Entity")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "Used", "", source.ID, target.ID);
		}
	}
	else if(source.type == "Agent")
	{
		if(target.type == "Activity")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "WasInfluencedBy", "", source.ID, target.ID);
		}
		else if(target.type == "Agent")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "ActedOnBehalfOf", "", source.ID, target.ID);
		}
		else if(target.type == "Entity")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "WasInfluencedBy", "", source.ID, target.ID);
		}
	}
	else if(source.type == "Entity")
	{
		if(target.type == "Activity")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "WasGeneratedBy", "", source.ID, target.ID);
		}
		else if(target.type == "Agent")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "WasAttributedTo", "", source.ID, target.ID);
		}
		else if(target.type == "Entity")
		{
			newEdge = new Edge(NewEdgeID(), "Neutral", "WasDerivedFrom", "", source.ID, target.ID);
		}
	}

	// Add the edge to the edgeList
	AddEdge(newEdge);	
}

//=================================================================================================================
//DRAFT
//=================================================================================================================
/*
//ArrayList functions
vertexList.Add(anItem);              			// add an item to the end of the array
vertexList[i] = newValue;            			// change the value stored at position i
var thisItem : TheType = vertexList[i];  		// retrieve an item from position i (note the required casting!)
vertexList.RemoveAt(i);                  		// remove an item from position i
var howBig = vertexList.Count;           		// get the length of the array
*/

/*
function GetVertex(id_ : String)
{
	for (var i = 0; i < vertexList.Count; i++)
	{
		var currentVertex : Vertex = vertexList[i];
		if(currentVertex.ID == id_)
		{
			return currentVertex;
		}
	}
}
*/