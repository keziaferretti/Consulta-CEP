document.getElementById('buscarBtn').addEventListener('click', function () {
    getCep();
});

async function getCep() {
    let cepInput = document.getElementById('cep');
    let resultadoDiv = document.getElementById('resultado');
    let cepDigitadoSpan = document.getElementById('cepDigitado');

    let cep = cepInput.value;
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao buscar CEP. Verifique se o CEP é válido.');
        }

        let endereco = await response.json();
        console.log(endereco);

        // Atualizar o CEP digitado
        cepDigitadoSpan.textContent = cep;

        // Atualizar os resultados
        document.getElementById('logradouro').textContent = endereco.logradouro || '';
        document.getElementById('bairro').textContent = endereco.bairro || '';
        document.getElementById('cidade').textContent = endereco.localidade || '';
        document.getElementById('uf').textContent = endereco.uf || '';
        document.getElementById('ddd').textContent = endereco.ddd || '';

        // Mostrar o resultado após o sucesso da busca
        resultadoDiv.style.display = 'block';

        // Limpar o input após o sucesso da busca
        cepInput.value = '';
    } catch (error) {
        console.error(error.message);
    }
}
