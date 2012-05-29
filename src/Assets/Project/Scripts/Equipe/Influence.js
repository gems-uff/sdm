#pragma strict
import System;

public var bonusProg : float = 1.0;
public var progArchInfluence : ActionNode = null;

function GetBonusProg () 
{					
	return bonusProg;
}
function GetProgArchInfluence()
{
 	return progArchInfluence;
}
function SetBonusProg(t: float)
{
	bonusProg = t;
}
function SetProgArchInfluence(t : ActionNode)
{
	progArchInfluence = t;
}

function GetInfluence()
{
	var inf : Influence;
	inf = Instantiate(this);
	inf.SetBonusProg(bonusProg);
	inf.SetProgArchInfluence(progArchInfluence);
	return inf;
}

function SetBonusProg(t: float, action : ActionNode){
	bonusProg = bonusProg + (t * 0.01);
	//This will round the float to .XXX
	bonusProg = System.Math.Round(bonusProg, 3);
	progArchInfluence = action;
}









function Reset()
{
	bonusProg = 1.0;
	progArchInfluence = null;
}
