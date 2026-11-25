/* ============================================================================
 * ATIVIDADE COMPLEMENTAR – JAVASCRIPT: Programação Orientada a Objetos (POO)
 * ============================================================================
 * Instruções de execução:
 * 1. Localize a função do exercício que deseja testar.
 * 2. Descomente (remova o //) a chamada da função logo abaixo dela.
 * 3. Execute o programa para visualizar o resultado no console.
 * ============================================================================ */

// Exercício 1 — Sistema de Funcionários (Nível Médio)
// Crie um sistema para cadastrar funcionários de uma empresa.

class Funcionario {
  #salario;
  constructor(nome, cargo, salario) {
    this.nome = nome;
    this.cargo = cargo;
    this.#salario = salario;
  }

  apresentar() {
    return `Olá, me chamo ${this.nome} e eu sou ${this.cargo}`;
  }

  verSalario() {
    return `O seu salário é: R$${this.#salario}`;
  }

  aumentarSalario(valor) {
    if (valor <= 0) {
      return "O valor do aumento deve ser positivo";
    }
    this.#salario += valor;
    return `Seu novo salário é: R$${this.#salario}`;
  }

  get salario() {
    return this.#salario;
  }

  get bonus() {
    return this.#salario * 0.1;
  }
}

class Desenvolvedor extends Funcionario {
  constructor(nome, cargo, salario, linguagem) {
    super(nome, cargo, salario);
    this.linguagem = linguagem;
  }

  get bonus() {
    return this.salario * 0.15;
  }
}

class Designer extends Funcionario {
  constructor(nome, cargo, salario, ferramenta) {
    super(nome, cargo, salario);
    this.ferramenta = ferramenta;
  }

  get bonus() {
    return this.salario * 0.13;
  }
}

const funcionarios = [];

function cadastrarFuncionario() {
  const nome = prompt("Digite o nome do funcionario");
  let salario = Number(prompt("Digite o salário do funcionario"));
  while (salario <= 0 || isNaN(salario)) {
    salario = Number(prompt("Digite um salário válido"));
  }
  const cargo = prompt("Digite a cargo");
  const cargoLimpo = cargo.trim().toLowerCase();
  if (cargoLimpo === "desenvolvedor") {
    cadastrarDesenvolvedor(nome, "desenvolvedor", salario);
  } else if (cargoLimpo === "designer") {
    cadastrarDesigner(nome, "designer", salario);
  } else {
    const funcionario = new Funcionario(nome, cargo, salario);
    funcionarios.push(funcionario);
  }
}

function cadastrarDesenvolvedor(nome, cargo, salario) {
  const linguagem = prompt("Digite a linguagem de desenvolvimento");
  const desenvolvedor = new Desenvolvedor(nome, cargo, salario, linguagem);
  funcionarios.push(desenvolvedor);
}

function cadastrarDesigner(nome, cargo, salario) {
  const ferramenta = prompt("Digite a ferramenta de designer");
  const designer = new Designer(nome, cargo, salario, ferramenta);
  funcionarios.push(designer);
}

function listarFuncionarios() {
  if (funcionarios.length === 0) {
    alert("Nenhum funcionário cadastrado");
    return;
  }
  for (let i = 0; i < funcionarios.length; i++) {
    console.log(funcionarios[i].apresentar());
  }
}

function exibirSalarios() {
  for (let i = 0; i < funcionarios.length; i++) {
    console.log(
      `${funcionarios[i].nome}: ${funcionarios[i].cargo}. | Salário: ${formatarMoeda(funcionarios[i].salario)}.`,
    );
  }
}

function exibirBonus() {
  for (let i = 0; i < funcionarios.length; i++) {
    console.log(
      `${funcionarios[i].nome}: ${funcionarios[i].cargo}. | Bônus: ${formatarMoeda(funcionarios[i].bonus)}.`,
    );
  }
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function iniciarAtividadeUm() {
  let opcao;

  do {
    opcao = prompt(`Empresa | Menu Principal
    
    1 - Cadastrar funcionário
    2 - Exibir funcionários
    3 - Exibir salários
    4 - Exibir bônus
    0 - Sair`);
    switch (opcao) {
      case "1":
        cadastrarFuncionario();
        break;
      case "2":
        listarFuncionarios();
        break;
      case "3":
        exibirSalarios();
        break;
      case "4":
        exibirBonus();
        break;
      case "0":
        alert("Encerrando o Sistema...");
        break;
      default:
        alert("Opção inválida");
    }
  } while (opcao != 0);
}

// Descomente (remova o //) para testar o Exercício 1:
// iniciarAtividadeUm()
