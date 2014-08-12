#pragma strict

//===================================================================================================================
// Script for creating vertices for the attached GameObject
// Attach this script in the desired game object and invoke the functions described below to gather provenance data
//
// Use these functions in order to record the provenance information using the PROV definitions:
//
//	NewActivityVertex(): Creates an Activity type vertex
//	NewAgentVertex(): Creates an Agent type vertex
//	NewEntityVertex(): Creates an Entity type vertex
//	NewVertex(): Creates an user-defined <type> vertex
//
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
	PopulateAttributes(attribute_);
	currentVertex = provenance.AddVertex(date_, "Activity", label_, attribute_, details_, currentVertex);
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
	PopulateAttributes(attribute_);
	currentVertex = provenance.AddVertex(date_, "Agent", label_, attribute_, details_, currentVertex);
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
	PopulateAttributes(attribute_);
	currentVertex = provenance.AddVertex(date_, "Entity", label_, attribute_, details_, currentVertex);
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
	PopulateAttributes(attribute_);
	currentVertex = provenance.AddVertex(date_, type_, label_, attribute_, details_, currentVertex);
}

//=================================================================================================================
// Gather GameObject specific Attributes
// Add these attributes to the attributeList for the vertex
//=================================================================================================================
function PopulateAttributes(attributeList : List.<AttributeType>)
{
	var attribute : AttributeType;
	
	if(attributeList == null)
	{
		attributeList = new List.<AttributeType>();
	}
	
	attribute = new AttributeType("Name", this.name.ToString());
	attributeList.Add(attribute);
	
	attribute = new AttributeType("Tag", this.tag.ToString());
	attributeList.Add(attribute);
	
	attribute = new AttributeType("ID", this.GetInstanceID().ToString());
	attributeList.Add(attribute);
	
	attribute = new AttributeType("Transform", this.transform.ToString());
	attributeList.Add(attribute);
}