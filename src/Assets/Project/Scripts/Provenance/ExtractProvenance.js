#pragma strict

//=================================================================================================================
// Script for creating vertices for the attached GameObject
// Attach this script in the desired game object and invoke the functions described below to gather provenance data
//
// Link it to InfluenceController
// Link it to ProvenanceGatherer
//----------------------------------------------------------------------------------------------------------------
// Brief explanations of each function used to record provenance information:
//
//	NewActivityVertex(label, details): Creates an Activity type vertex. Custom game attributes must be inserted by 'AddAttribute' function first
//	NewAgentVertex(label, details): Creates an Agent type vertex. Custom game attributes must be inserted by 'AddAttribute' function first
//	NewEntityVertex(label, details): Creates an Entity type vertex. Custom game attributes must be inserted by 'AddAttribute' function first
//	NewVertex(): Creates an user-defined <type> vertex.
//  AddAttribute(name, value): Adds a new attribute to the attribute list. 
//                  The attribute's name and value are informed by the user and before invoking NewVertex or any of its variants.
//  PopulateAttributes(): Add unity-related attributes to the attribute list. Invoked from NewVertex or any of its variants.
//  ClearList(): Clean the attribute list for the next vertex. Invoked from NewVertex or any of its variants.
//  GenerateInfluence(tag, ID, name, value): Stores information about the current vertex that is used to influenciate other vertices
//  HasInfluence(tag): Checks if there is any influence instance of 'tag' for the current vertex and generates their appropriate edges
//  HasInfluence_ID(ID): Checks if there is any influence instance of 'ID' for the current vertex and generates their appropriate edges
//  RemoveInfluenceTag(tag): Removes all influences that belongs to the group 'tag' defined by the user
//  RemoveInfluenceTag(ID): Removes all influences of 'ID' defined by the user
//
//----------------------------------------------------------------------------------------------------------------
// How to use:
//
// 1) Invoke 'AddAttribute' to add any custom or game specific attributes that is desired to be stored
// 2) Invoke the any of the 'NewVertex' typed functions when an action is executed to store provenance information about the action
// 3) Then invoke 'HasInfluence' function for each desired 'tag' or 'ID' to check if there is anything stored that influenced the current action
// 4) If the current action can influence another action, then invoke 'GenerateInfluence' by defining its 'tag' and influence 'ID'
// 5) If any influence effect expired, then invoke 'RemoveInfluenceTag' or 'RemoveInfluenceID' to remove that influence
//=================================================================================================================


//=================================================================================================================
// *Declarations*
//=================================================================================================================
// Influence Controller Object pointer
public var influenceContainer : InfluenceController;	

// Provenance Export Object pointer	
public var provenance : ProvenanceController;	

// Last created vertex of this GameObject. It is used by Provenance Controller to link vertices
private var currentVertex : Vertex = null;	
// A list containing all attributes for the current vertex
private var attributeList : List.<Attribute> = new List.<Attribute>();

//=================================================================================================================
// *Functions Section*
//=================================================================================================================

//=================================================================================================================
// New Activity Vertex
// Creates a new vertex from the Activity Type
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
public function NewActivityVertex(label_ : String, details_ : String)
{
	NewActivityVertex((Time.time).ToString(), label_, details_);
}

// User defines the Vertex.date field
public function NewActivityVertex(date_ : String, label_ : String, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, "Activity", label_, attributeList, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// New Agent Vertex
// Creates a new vertex from the Agent Type
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
public function NewAgentVertex(label_ : String, details_ : String)
{
	NewAgentVertex((Time.time).ToString(), label_, details_);
}

// User defines the Vertex.date field
public function NewAgentVertex(date_ : String, label_ : String, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, "Agent", label_, attributeList, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// New Entity Vertex
// Creates a new vertex from the Entity Type
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
public function NewEntityVertex(label_ : String, details_ : String)
{
	NewEntityVertex((Time.time).ToString(), label_, details_);
}

// User defines the Vertex.date field
public function NewEntityVertex(date_ : String, label_ : String, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, "Entity", label_, attributeList, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// New <Type> Vertex
// Creates a new vertex of the <Type> defined by user
// Add the new vertex to the vertexList in the Provenance Controller
//=================================================================================================================

// Uses Time.time for the Vertex.date field
public function NewVertex(type_ : String, label_ : String, details_ : String)
{
	NewVertex((Time.time).ToString(), type_, label_, details_);
}

// User defines the Vertex.date field
public function NewVertex(date_ : String, type_ : String, label_ : String, details_ : String)
{
	PopulateAttributes();
	currentVertex = provenance.AddVertex(date_, type_, label_, attributeList, details_, currentVertex);
	ClearList();
}

//=================================================================================================================
// Create a new attribute for the vertex
// Attribute defined by the user
//=================================================================================================================
public function AddAttribute(name : String, att_value : String)
{
	var attribute : Attribute;
	
	attribute = new Attribute(name, att_value);
	
	this.attributeList.Add(attribute);
}

//=================================================================================================================
// Gather GameObject specific Attributes
// Add these attributes to the attributeList for the vertex
//=================================================================================================================
private function PopulateAttributes()
{
	var attribute : Attribute;
	
	attribute = new Attribute("ObjectName", this.name.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new Attribute("ObjectTag", this.tag.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new Attribute("ObjectID", this.GetInstanceID().ToString());
	this.attributeList.Add(attribute);
	
	attribute = new Attribute("ObjectPosition_X", this.transform.position.x.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new Attribute("ObjectPosition_Y", this.transform.position.y.ToString());
	this.attributeList.Add(attribute);
	
	attribute = new Attribute("ObjectPosition_Z", this.transform.position.z.ToString());
	this.attributeList.Add(attribute);
}

//=================================================================================================================
// Clear the list of attributes for the next vertex
// Function invoked after current vertex is added to the vertex list
//=================================================================================================================
private function ClearList()
{
	this.attributeList = new List.<Attribute>();
}

//=================================================================================================================
// *Influence-Related Section*
//=================================================================================================================

//=================================================================================================================
// Generate an influence for this vertex
//=================================================================================================================
// Creates one influence of 'tag' that can be used for X times and then expires
public function GenerateInfluence(tag : String, ID : String, influenceName : String, influenceValue : String, quantity : int)
{
	influenceContainer.CreateInfluence(tag, ID, currentVertex.ID, influenceName, influenceValue, true, quantity);
}

// Creates one influence of 'tag' that never expires with usages
public function GenerateInfluence(tag : String, ID : String, influenceName : String, influenceValue : String)
{
	influenceContainer.CreateInfluence(tag, ID, currentVertex.ID, influenceName, influenceValue, false, 1);
}

//=================================================================================================================
// Checks if current vertex was influenced by any other vertex
// If so, consume the influence and generate the appropriate edge connecting both vertices
// Need to check all influences, since it can have more than one at the same time
//=================================================================================================================
// By 'tag'
public function HasInfluence(tag : String)
{
	influenceContainer.WasInfluencedByTag(tag, currentVertex.ID);
}

// By 'ID'
public function HasInfluence_ID(ID : String)
{
	influenceContainer.WasInfluencedByID(ID, currentVertex.ID);
}

//=================================================================================================================
// Remove all influences from 'tag'
//=================================================================================================================
public function RemoveInfluenceTag(tag : String)
{
	influenceContainer.RemoveInfluenceByTag(tag);
}

//=================================================================================================================
// Remove all influences with 'ID'
//=================================================================================================================
public function RemoveInfluenceID(ID : String)
{
	influenceContainer.RemoveInfluenceByID(ID);
}

public function GetCurrentVertex()
{
	return currentVertex;
}

public function SetCurrentVertex(vertex : Vertex)
{
	currentVertex = vertex;
}