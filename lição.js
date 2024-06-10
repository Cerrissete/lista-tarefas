const exibeTarefas = () => {
    const tabela = document.getElementById('tabela'); //pega a tabela
    const tbody =  tabela.querySelector('tbody'); // pega o corpo da tabela

    tbody.innerHTML =
        `<tr>
    <th>Data</th>
    <th>Nome da Tarefa</th>
    <th>Status</th>
    <th>Editar</th>
    <th>Excluir</th>
    </tr>`


    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach((tarefa, index) => {

        const conteudoTarefa =
            `<tr>
                <td>${tarefa.data}</td>
                <td>${tarefa.nomeTarefa}</td>
                <td>${tarefa.status}</td>
                <td><button class="btnEditar" onclick="editaTarefa(${index})"><i class="fa fa-edit"></i></button></td>
                <td><button class="btnExcluir" onclick="deletaTarefa(${index})"><i class="fa fa-trash"></i></button></td>
            </tr>`;

        const row = tbody.insertRow();
        row.innerHTML = conteudoTarefa;
    });
}

const addTarefa = (event) => {
    event.preventDefault();
    let form = document.getElementById('form');
    let nomeTarefa = document.getElementById('taskInput').value.trim();
    let status = document.getElementById('statusInput').value.trim();
    let data = document.getElementById('dataInput').value.trim();
    let camposVazios = [];

    
    if (nomeTarefa == "") {
        camposVazios.push("Nome da Tarefa");
    }
    if (status == "") {
        camposVazios.push("Status");
    }
    if (data == "") {
        camposVazios.push("Data");
    }


    if(nomeTarefa == "" || status == "" || data == ""){
        alert("Cadê" + camposVazios);
    } else{

        const tarefa = { //Criando um objeto para armazenar os dados
        nomeTarefa: nomeTarefa,
        status: status,
        data: data
    }
    
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; 

    tarefas.push(tarefa); // adiciona um novo contato dentro da lista contatos
    localStorage.setItem('tarefas', JSON.stringify(tarefas));


    form.reset();
    exibeTarefas();
    }

}

const deletaTarefa = (index) => {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; //pega a lista de contatos 
    tarefas.splice(index, 1); //remove o item da lsta contatos pelo index, o numero 1 significa que ele deve remover apenas 1 elemento da lista

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    exibeTarefas();
}

const editaTarefa = (index) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefa = tarefas[index];

    document.getElementById('taskInput').value = tarefa.nomeTarefa;
    document.getElementById('statusInput').value = tarefa.status;
    document.getElementById('dataInput').value = tarefa.data;

    const atualizaTarefa = (event) => {
        event.preventDefault();

        tarefa.nomeTarefa = document.getElementById('taskInput').value.trim();
        tarefa.status = document.getElementById('statusInput').value.trim();
        tarefa.data = document.getElementById('dataInput').value.trim();


        const upTarefa = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', upTarefa);

        exibeTarefas();
        document.getElementById('form').reset();

        document.querySelector('.buttom').removeEventListener('click', atualizaTarefa);
        document.querySelector('.buttom').addEventListener('click', addTarefa);

    }

        document.querySelector('.buttom').removeEventListener('click', addTarefa);
        document.querySelector('.buttom').addEventListener('click', atualizaTarefa);
}

const buscaTarefa = () => {
    const tabela = document.getElementById('idTabelaTarefas');
    const linhas = tabela.getElementsByTagName('tr');
    const quantidadeLinhas = linhas.length;

    for (let i = 1; i < quantidadeLinhas; i++){
        const celulas = linhas[i].getElementsByTagName('td');
        const quantidadeCelulas = celulas.length;
        let busca = false;

        for (let j = 0; j < quantidadeCelulas; j++){
            const textoCelulas = celulas[j].textContent.toLocaleLowerCase();
            if(textoCelulas.includes(barraPesquisa)){
                busca = true;
                break;
            }
        }
        busca ? linhas [i].style.display = '' : linhas[i].style.display = 'none';
    }
}

const init = () => {
    document.querySelector('.buttom').addEventListener('click', addTarefa);

    exibeTarefas();

}

init(); 




    






