
public var func : Funcionario;
public var stringNames : StringNames;
public var analyst : Texture2D;
public var architect : Texture2D;
public var manager : Texture2D;
public var marketing : Texture2D;
public var programmer : Texture2D;
public var tester : Texture2D;
public var training : Texture2D;
public var idle : Texture2D;

function Update () {
	switch(func.GetPapel())
	{
	   case stringNames.papelAnalista:
			renderer.material.mainTexture = analyst;
			GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   case stringNames.papelArquiteto:
			renderer.material.mainTexture = architect;
			GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   case stringNames.papelGerente:
			renderer.material.mainTexture = manager;
			GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   case stringNames.papelMarketing:
			renderer.material.mainTexture = marketing;
			GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   case stringNames.papelProg:
			renderer.material.mainTexture = programmer;
			GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   case stringNames.papelTester:
			renderer.material.mainTexture = tester;
			GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   case stringNames.papelTreinando:
			renderer.material.mainTexture = training;
			GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   case stringNames.papelNenhum:
			renderer.material.mainTexture = idle;
			if (func.GetNome() == stringNames.fired)
				GetComponentInChildren(MeshRenderer).enabled = false;
			else
				GetComponentInChildren(MeshRenderer).enabled = true;
	   break;
	   default:
			break;
	}
	
}