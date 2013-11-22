#pragma strict

class PlayerAction
{
	public var ID : String;
	public var empID : String;
	public var date : int;
	public var order : String;
	public var codeStatus : String;
	public var reqStatus : String;
	public var valStatus : String;
	public var delayed : String;
	public var finances : String;
	public var playerID : String;
	
	function PlayerAction(i: String, e : String, d : String, o : String, c : String, r : String, v : String, de : String, f : String)
	{
		var arrayOfStrings = d.Split(":"[0]);
		//var fullOrder = o.Split("_"[0]);
		this.ID = i;
		this.empID = e;
		this.date = parseInt(arrayOfStrings[0]);
		/*
		if(fullOrder[0] == "Balanced" || fullOrder[0] == "Aid")
		{
			this.order = fullOrder[0] + "_" + fullOrder[1];
		}
		else
		{
			this.order = fullOrder[0];
		}
		*/
		this.order = o;
		this.codeStatus = c;
		this.reqStatus = r;
		this.valStatus = v;
		this.delayed = de;
		this.finances = f;
		this.playerID = "Player_01";
	}
	
	function GetAction()
	{
		return this.playerID + ", " + this.ID + ", " + this.empID + ", " + this.date + ", " + this.order +	", " + this.codeStatus + ", " + 
		this.reqStatus + ", " + this.valStatus + ", " + this.delayed + ", " + this.finances;
	}
}