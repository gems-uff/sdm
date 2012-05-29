#pragma strict

class ActiontList extends ActionNode
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
	
	//For the linked List
	public var next : ActionNode;
	public var before : ActionNode;

	function Add(t : ActionNode)
	{
		this.next = t;
		t.before = this;
	}
	
	function NewNode()
	{
		this.date = 0;
		this.who = "";
		this.task = "";
		this.role = "";
		this.influence = null;
		this.pressure = null;
		this.description = "";
		
		this.next = null;
		this.before = null;
	}
}

