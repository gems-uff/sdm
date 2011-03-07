
private var func : Funcionario;
public var HIRE_PRICE : int = 1000;
public var playerStats : PlayerStats;
public var stringNames : StringNames;

function GetHire_Price(){
	return HIRE_PRICE;
}

//--------------------------------------------Add Funcionario Gerado Na Posicao De Outro Funcionario-----------------------------------------------------------
//Esta funcao serve para "copiar" o funcionario contratado para o slot indicado
function ContratarFuncionario(contratado : Funcionario, Func_Slot : Funcionario){
	var aux : NewFuncionario;
	if(contratado.GetNome() != stringNames.vazio)
	{
		if(playerStats.GetSaldo() > (contratado.GetSalario() + HIRE_PRICE))
		{
			func = contratado;
			Func_Slot.SetPapel(stringNames.papelNenhum);
			Func_Slot.SetMorale(100);
			Func_Slot.SetAtributos(func.GetAtributos());
			Func_Slot.SetWorkingHours(40);
			Func_Slot.SetEspecializacoes(func.GetEspecializacao());
			Func_Slot.SetNome(func.GetNome());
			playerStats.ChangeSaldo(- contratado.GetSalario() - HIRE_PRICE);
			aux = func.GetComponentInChildren(NewFuncionario);
			aux.ClearFuncionario(func);
			
			Func_Slot.GetComponentInChildren(MeshRenderer).enabled = true;
		}
	}
}
