function validaForm(){
    
    if(document.formUser.cpfUser.value==""||!validarCPF($('.cpfuser').val())){        
        $('.cpfUser').append(M.toast({html: 'Favor preencher seu CPF corretamente. Use somente números.', classes: 'rounded', displayLength: 2000}));
        $('.cpfUser > .input#titulo.form-control.tooltiped').css('border-bottom','1px solid red');
        document.formUser.cpfUser.focus();        
        return false;
    }    
    if(document.formUser.nomeUser.value==""){        
        $('.nomeUser').append(M.toast({html: 'Favor selecionar o seu macroprocesso.', classes: 'rounded',displayLength: 2000}));
        $('nomeUser > .select-wrapper input.select-dropdown').css('border-bottom','1px solid red');
        document.formUser.nomeUser.focus();        
        return false;
    }
    if(document.formUser.mailUser.value==""){        
        $('.mailUser').append(M.toast({html: 'Favor selecionar o macroprocesso de origem.', classes: 'rounded',displayLength: 2000}));
        $('.mailUser > .select-wrapper input.select-dropdown').css('border-bottom','1px solid red');       
        document.formUser.mailUser.focus();        
        return false;
    }
    if(document.formUser.unidadeLotacao.value==""){        
        $('.unidadeLotacao').append(M.toast({html: 'Favor selecionar a unidade onde ocorreu a não conformidade.', classes: 'rounded',displayLength: 2000}));
        $('.unidadeLotacao > .select-wrapper input.select-dropdown').css('border-bottom','1px solid red');        
        document.formUser.unidadeLotacao.focus();
        return false;
    }
    if(document.formUser.cargoUser.value==""){        
        $('.cargoUser').append(M.toast({html: 'Favor selecionar a não conformidade.', classes: 'rounded',displayLength: 2000}));
        $('.cargoUser > .select-wrapper input.select-dropdown').css('border-bottom','1px solid red');
        document.formUser.cargoUser.focus();        
        return false;
    }
    if(document.formUser.perfilUser.value==""){        
        $('.perfilUser').append(M.toast({html: 'Favor selecionar a data de ocorrência da não conformidade.', classes: 'rounded',displayLength: 2000}));
        $('.perfilUser > .select-wrapper input.select-dropdown').css('border-bottom','1px solid red');
        document.formUser.perfilUser.focus();              
        return false;
    }    
    return true;
}

function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}