
private var func : Funcionario;
public var HIRE_PRICE : int = 1000;
public var playerStats : PlayerStats;
public var stringNames : StringNames;
public var managerSlot : Funcionario;
public var marketingSlot : Funcionario;
private var staminaBar : StaminaBar;
private var moraleBar : MoraleBar;

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
			if( managerSlot == Func_Slot)
				Func_Slot.SetPapel(stringNames.papelGerente);
			if( marketingSlot == Func_Slot)
				Func_Slot.SetPapel(stringNames.papelMarketing);
			Func_Slot.SetMorale(100);
			Func_Slot.SetAtributos(func.GetAtributos());
			Func_Slot.SetWorkingHours(40);
			Func_Slot.SetEspecializacoes(func.GetEspecializacao());
			Func_Slot.SetNome(func.GetNome());
			Func_Slot.ResetLevel();
			playerStats.ChangeSaldo(- contratado.GetSalario() - HIRE_PRICE);
			aux = func.GetComponentInChildren(NewFuncionario);
			aux.ClearFuncionario(func);
			
			staminaBar = Func_Slot.GetComponentInChildren(StaminaBar);
			moraleBar = Func_Slot.GetComponentInChildren(MoraleBar);
			staminaBar.Stamina_Bar();
			moraleBar.Morale_Bar();
			
			Func_Slot.GetComponentInChildren(MeshRenderer).enabled = true;
		}
	}
}