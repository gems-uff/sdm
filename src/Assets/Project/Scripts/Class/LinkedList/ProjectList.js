#pragma strict

class ProjectList extends ProjectNode
{
	public var first : ProjectNode;
	public var last : ProjectNode;

	function Add(t : ProjectNode)
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

class ProjectNode
{
	//Project data
	public var project : Project;

	//Staff list
	public var slot01 : EmployeetList;
	public var slot02 : EmployeetList;
	public var slot03 : EmployeetList;
	public var slot04 : EmployeetList;
	public var slot05 : EmployeetList;
	public var slot06 : EmployeetList;
	public var slot07 : EmployeetList;
	public var slot08 : EmployeetList;
	
	//Project List
	public var next : ProjectNode;
	public var before : ProjectNode;
	
	function Add(t : ProjectNode)
	{
		this.next = t;
		t.before = this;
	}
	
	function NewNode()
	{
		this.project = null;
		
		this.slot01 = new EmployeetList();
		this.slot02 = new EmployeetList();
		this.slot03 = new EmployeetList();
		this.slot04 = new EmployeetList();
		this.slot05 = new EmployeetList();
		this.slot06 = new EmployeetList();
		this.slot07 = new EmployeetList();
		this.slot08 = new EmployeetList();
		
		this.next = new ProjectNode();
		this.before = new ProjectNode();
	}
}
