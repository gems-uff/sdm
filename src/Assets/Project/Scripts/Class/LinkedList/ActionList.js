#pragma strict

class ActionList
{
	public var first : ActionNode;
	public var last : ActionNode;
	
	function Add(t : ActionNode)
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
	
	function ActionList()
	{
		this.first = null;
		this.last = null;
	}
}

class ActionNode
{
	public var date : int;
	public var who : String;
	public var task : String;
	public var role : String;
	public var influence : Influence;
	public var pressure : ActionNode;
	public var description : String;
	public var morale : int;
	public var stamina : int;
	
	//For the linked List
	public var next : ActionNode;
	public var previous : ActionNode;

	function Add(t : ActionNode)
	{
		this.next = t;
		t.previous = this;
	}
	
	function ActionNode()
	{
		this.date = 0;
		this.who = null;
		this.task = null;
		this.role = null;
		this.influence = null;
		this.pressure = null;
		this.description = null;
		
		this.next = null;
		this.previous = null;
	}
	
}

