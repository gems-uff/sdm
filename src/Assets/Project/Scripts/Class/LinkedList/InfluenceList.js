
class InfluenceNode
{
	public var next : InfluenceNode;
	public var previous : InfluenceNode;
	public var action : ActionNode;

	function Add(t : InfluenceNode)
	{
		this.next = t;
		t.previous = this;
	}

	function InfluenceNode()
	{
		this.action = null;
		this.next = null;
		this.previous = null;
	}
}

class InfluenceList
{
	public var first : InfluenceNode;
	public var last : InfluenceNode;
	
	function Add(t : ActionNode)
	{
		//if empty
		if(t != null)
		{
			var node : InfluenceNode = new InfluenceNode();
			node.action = t;
			if(this.first == null)
			{
				this.first = node;
				this.last = node;

			}
			else
			{
				if(this.first.action.who == "")
				{
					this.first = node;
					this.last = node;
				}
				
				else
				{
					this.last.Add(node);
					this.last = node;
				}
			}
		}
	}
	
	function RemoveFirst()
	{
		this.first = this.first.next;
	}
	
	function GetFirst()
	{
		if(this.first != null)
			return this.first;
		else
			return null;
	}
	function GetLast()
	{
		if(this.last != null)
			return this.last;
		else
			return null;
	}
	
	function InfluenceList()
	{
		this.first = null;
		this.last = null;
	}
	
	function NotEmpty()
	{
		if(this.first == null || this.first.action.who == "")
			return false;
		else
			return true;
	}
	
}