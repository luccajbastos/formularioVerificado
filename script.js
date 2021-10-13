const qs = (n) => document.querySelector(n);

let valGeral = {
    handleSubmit:(event) => {
        event.preventDefault();

        let send = true;
        let inputs = form.querySelectorAll('input');
        
        valGeral.clearErrors();

        for(let i=0;i<inputs.length;i++){
            let input = inputs[i];
            let check = valGeral.checkInput(input);
            
            if(check !== true) {
                send=false;
                valGeral.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetals = rules[k].split('=');
                switch(rDetals[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Os campos acima são obrigatórios.'
                        }
                    break;
                    case 'min':
                        if(input.value.length < 3) {
                            return 'Seu nome de usuário precisa ter mais de 3 caracteres.'
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.border = '1px solid #ff0000';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style.border = 'none';
        }
        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};


let form = qs('.validador');
form.addEventListener('submit', valGeral.handleSubmit);
