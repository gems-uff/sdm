
//Use this instead of copying Influence for the actionNode
//Num = influence modifier
//Artifact = consumed any artifact in the process? TestCases, Prototype
//Influence = A list of all influences from this actionNode

class InfluenceValues
{
	public var num : float;
	public var valid : boolean;
	//public var artifact : String;
	public var influence : InfluenceList;
	
	function InfluenceValues()
	{
		this.num = 0;
		this.valid = false;
		//this.artifact = "";
		this.influence = new InfluenceList();
	}
	
}