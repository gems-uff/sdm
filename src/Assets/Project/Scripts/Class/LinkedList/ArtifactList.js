#pragma strict

class ArtifactList
{
	public var first : ArtifactNode;
	public var last : ArtifactNode;
	
	function Add(t : ArtifactNode)
	{
		//if empty
		if(this.first == null)
		{
			this.first = t;
			this.last = t;
		}
		else
		{
			//Put it after the last one
			this.last.Add(t);
			//Update the last one
			this.last = t;
		}
	}
	
	function RemoveLast()
	{
		this.last.before = null;
		this.last = this.last.before;
	}
}

class ArtifactNode
{
	//Artifact data
	public var ID : String;
	public var date : String;
	public var type : String;

	
	//Artifact List
	public var next : ArtifactNode;
	public var before : ArtifactNode;
	
	function Add(t : ArtifactNode)
	{
		this.next = t;
		t.before = this;
	}
	
	function ArtifactNode(id_ : String, date_ : String, type_ : String)
	{
		this.ID = id_;
		this.date = date_;
		this.type = type_;
	}
	
	function ArtifactNode()
	{
		this.ID = "";
		this.date = "";
		this.type = "";
	}
}