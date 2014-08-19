#pragma strict

//===================================================================================================================
// Script for creating vertices for the attached GameObject
// Attach this script in the desired game object and invoke the functions described below to gather provenance data
//
// Use these functions in order to record the provenance information using the PROV definitions:
//
//	NewActivityVertex(): Creates an Activity type vertex.
//	NewAgentVertex(): Creates an Agent type vertex.
//	NewEntityVertex(): Creates an Entity type vertex.
//	NewVertex(): Creates an user-defined <type> vertex.
//  AddAttribute(): Adds a new attribute to the attribute list. 
//                  The attribute's name and value are informed by the user and before invoking NewVertex or any of its variants.
//  PopulateAttributes(): Add unity-related attributes to the attribute list. Invoked from NewVertex or any of its variants.
//  ClearList(): Clean the attribute list for the next vertex. Invoked from NewVertex or any of its variants.
//===================================================================================================================


//===================================================================================================================
// Declarations
//===================================================================================================================
// Influence Controller Object pointer
public var influenceContainer : InfluenceController;	

// Provenance Export Object pointer	
public var provenance : ProvenanceGatherer;	

// Last created vertex of this GameObject. It is used by Provenance Controller to link vertices
private var currentVertex : Vertex = null;	
// A list containing all attributes for the current vertex
private var attributeList : List.<AttributeType> = new List.<AttributeType>();

//=================================================================================================================
// New Activity Vertex
// Creates a new vertex from the Activity Type
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
function NewActivityVertex(label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	NewActivityVertex((Time.time).ToString(), label_, attribute_, details_);
}

// User defines the Vertex.date field
function NewActivityVertex(date_ : String, label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, "Activity", label_, attribute_, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// New Agent Vertex
// Creates a new vertex from the Agent Type
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
function NewAgentVertex(label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	NewAgentVertex((Time.time).ToString(), label_, attribute_, details_);
}

// User defines the Vertex.date field
function NewAgentVertex(date_ : String, label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, "Agent", label_, attribute_, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// New Entity Vertex
// Creates a new vertex from the Entity Type
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
function NewEntityVertex(label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	NewEntityVertex((Time.time).ToString(), label_, attribute_, details_);
}

// User defines the Vertex.date field
function NewEntityVertex(date_ : String, label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, "Entity", label_, attribute_, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// New <Type> Vertex
// Creates a new vertex of the <Type> defined by user
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
function NewVertex(type_ : String, label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	NewVertex((Time.time).ToString(), type_, label_, attribute_, details_);
}

// User defines the Vertex.date field
function NewVertex(date_ : String, type_ : String, label_ : String, attribute_ : List.<AttributeType>, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, type_, label_, attribute_, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// Create a new attribute for the vertex
// Attribute defined by the user
//=================================================================================================================
function AddAttribute(name : String, att_value : String)
{
	var attribute : AttributeType;
	
	attribute = new AttributeType(name, att_value);
	
	this.attributeList.Add(attribute);
}

//=================================================================================================================
// Gather GameObject specific Attributes
// Add these attributes to the attributeList for the vertex
//=================================================================================================================
function PopulateAttributes()
{
	var attribute : AttributeType;
	
	attribute = new AttributeType("Name", this.name.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new AttributeType("Tag", this.tag.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new AttributeType("ID", this.GetInstanceID().ToString());
	this.attributeList.Add(attribute);
	
	attribute = new AttributeType("Position_X", this.transform.position.x.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new AttributeType("Position_Y", this.transform.position.y.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new AttributeType("Position_Z", this.transform.position.z.ToString());
	this.attributeList.Add(attribute);
}

//=================================================================================================================
// Clear the list of attributes for the next vertex
// Function invoked after current vertex is added to the vertex list
//=================================================================================================================
function ClearList()
{
	this.attributeList = new List.<AttributeType>();
}

//===================================================================================================================
// Influence
//  TODO
//===================================================================================================================


//=================================================================================================================
// Generate an influence for this vertex
//=================================================================================================================
/*
function GenerateInfluence(type : String, duration : float, influenceName : String, influenceValue : String, consumable : boolean, uses : int)
{

}
*/
// Creates one influence of 'type' that can be used for X times and then expires
function GenerateInfluence(type : String, ID : String, influenceName : String, influenceValue : String, consumable : boolean, quantity : int)
{
	influenceContainer.CreateInfluence(type, ID, currentVertex.ID, influenceName, influenceValue, consumable, quantity);
}

// Creates one influence of 'type' that never expires with usages
function GenerateInfluence(type : String, ID : String, influenceName : String, influenceValue : String)
{
	influenceContainer.CreateInfluence(type, ID, currentVertex.ID, influenceName, influenceValue, false, 1);
}
//=================================================================================================================
// Checks if current vertex was influenced by any other vertex
// If so, consume the influence and generate the appropriate edge connecting both vertices
// Need to check all influences, since it can have more than one at the same time
//=================================================================================================================
// By 'type'
function HasInfluence(type : String)
{
	influenceContainer.WasInfluencedByType(type, currentVertex.ID);
}

// By 'ID'
function HasInfluence_ID(ID : String)
{
	influenceContainer.WasInfluencedByID(ID, currentVertex.ID);
}