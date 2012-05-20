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
	public var slot01 : EmployeeList;
	public var slot02 : EmployeeList;
	public var slot03 : EmployeeList;
	public var slot04 : EmployeeList;
	public var slot05 : EmployeeList;
	public var slot06 : EmployeeList;
	public var slot07 : EmployeeList;
	public var slot08 : EmployeeList;
	
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
		
		this.slot01 = new EmployeeList();
		this.slot02 = new EmployeeList();
		this.slot03 = new EmployeeList();
		this.slot04 = new EmployeeList();
		this.slot05 = new EmployeeList();
		this.slot06 = new EmployeeList();
		this.slot07 = new EmployeeList();
		this.slot08 = new EmployeeList();
		
		this.next = new ProjectNode();
		this.before = new ProjectNode();
	}
}
