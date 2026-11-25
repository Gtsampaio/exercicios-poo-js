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
      case null:
        alert("Encerrando o Sistema...");
        break;
      default:
        alert("Opção inválida");
    }
  } while (opcao !== "0" && opcao !== null);
}
// Descomente (remova o //) para testar o Exercício 1:
// iniciarAtividadeUm()

//=============================================================================

// Exercício 2 — Sistema de Locadora de Veículos (Nível Difícil)
// Crie um sistema de locadora de veículos.

class Veiculo {
  #diaria;
  constructor(marca, modelo, diaria) {
    this.marca = marca;
    this.modelo = modelo;
    this.#diaria = diaria;
  }

  descricao() {
    return `O veículo é um ${this.marca} ${this.modelo}, ${formatarMoeda(this.#diaria)} por dia`;
  }

  calcularAluguel(dias) {
    return this.#diaria * dias;
  }

  get diaria() {
    return this.#diaria;
  }
}

class Carro extends Veiculo {
  constructor(marca, modelo, diaria, portas) {
    super(marca, modelo, diaria);
    this.portas = portas;
  }

  descricao() {
    return `Carro: ${this.marca} ${this.modelo}\nDiária: ${formatarMoeda(this.diaria)}\nPortas: ${this.portas}`;
  }

  calcularAluguel(dias) {
    return super.calcularAluguel(dias) + 30;
  }
}

class Moto extends Veiculo {
  constructor(marca, modelo, diaria, cilindradas) {
    super(marca, modelo, diaria);
    this.cilindradas = cilindradas;
  }

  descricao() {
    return `Moto: ${this.marca} ${this.modelo}\nDiária: ${formatarMoeda(this.diaria)}\nCilindradas: ${this.cilindradas}cc`;
  }

  calcularAluguel(dias) {
    return super.calcularAluguel(dias) + 10;
  }
}

class Locadora {
  veiculos = [];

  adicionarVeiculo(veiculo) {
    this.veiculos.push(veiculo);
  }

  listarVeiculos() {
    this.veiculos.forEach((veiculo) => {
      console.log(veiculo.descricao());
    });
    console.log("-------------------");
  }

  calcularTotal(dias) {
    let total = 0;
    this.veiculos.forEach((veiculo) => {
      total += veiculo.calcularAluguel(dias);
    });
    return total;
  }
}

const locadora = new Locadora();

function cadastrarCarro() {
  const marca = prompt("Digite a marca do veículo:");
  const modelo = prompt("Digite o modelo do veículo:");
  const diariaInput = prompt("Digite a diária do veículo:");
  const portas = Number(prompt("Digite a quantidade de portas do veículo:"));
  if (!marca?.trim() || !modelo?.trim() || !diariaInput) {
    alert("Cadastro cancelado ou campos obrigatórios vazios!");
    return;
  }
  const diaria = Number(diariaInput.replace(",", "."));
  if (isNaN(diaria) || diaria <= 0 || isNaN(portas) || portas <= 0) {
    alert("Valor da diária ou quantidade de portas inválido!");
    return;
  }
  const carro = new Carro(marca.trim(), modelo.trim(), diaria, portas);
  locadora.adicionarVeiculo(carro);
  alert("Carro cadastrado com sucesso!");
}

function cadastrarMoto() {
  const marca = prompt("Digite a marca do veículo:");
  const modelo = prompt("Digite o modelo do veículo:");
  const diariaInput = prompt("Digite a diária do veículo:");
  const cilindradas = Number(
    prompt("Digite a quantidade de cilindradas do veículo:"),
  );
  if (!marca?.trim() || !modelo?.trim() || !diariaInput) {
    alert("Cadastro cancelado ou campos obrigatórios vazios!");
    return;
  }
  const diaria = Number(diariaInput.replace(",", "."));
  if (isNaN(diaria) || diaria <= 0 || isNaN(cilindradas) || cilindradas <= 0) {
    alert("Valor da diária ou cilindradas inválido!");
    return;
  }
  const moto = new Moto(marca.trim(), modelo.trim(), diaria, cilindradas);
  locadora.adicionarVeiculo(moto);
  alert("Moto cadastrada com sucesso!");
}

function listarVeiculos() {
  if (locadora.veiculos.length === 0) {
    alert("Nenhum veículo cadastrado!");
    return;
  }
  alert("Confira a lista completa no console (F12).");
  locadora.listarVeiculos();
}

function simularAluguelIndividual() {
  if (locadora.veiculos.length === 0) {
    alert("Nenhum veículo cadastrado na locadora ainda!");
    return;
  }
  let listaTexto = "Escolha o número do veículo:\n\n";
  locadora.veiculos.forEach((veiculo, index) => {
    listaTexto += `${index + 1} - ${veiculo.marca} ${veiculo.modelo}\n`;
  });
  const escolha = Number(prompt(listaTexto)) - 1;
  if (isNaN(escolha) || escolha < 0 || escolha >= locadora.veiculos.length) {
    alert("Veículo inválido!");
    return;
  }
  const dias = Number(prompt("Por quantos dias deseja alugar?"));
  if (isNaN(dias) || dias <= 0) {
    alert("Quantidade de dias inválida!");
    return;
  }
  const veiculoSelecionado = locadora.veiculos[escolha];
  const valorTotal = veiculoSelecionado.calcularAluguel(dias);
  alert(
    `Simulação de Aluguel:\n\n` +
      `${veiculoSelecionado.descricao()}\n\n` +
      `Período: ${dias} dia(s)\n` +
      `Valor total: ${formatarMoeda(valorTotal)}`,
  );
}

function calcularTotalLocadora() {
  if (locadora.veiculos.length === 0) {
    alert("Nenhum veículo cadastrado na locadora!");
    return;
  }
  const dias = Number(
    prompt("Calcular o aluguel de toda a frota por quantos dias?"),
  );
  if (isNaN(dias) || dias <= 0) {
    alert("Quantidade de dias inválida!");
    return;
  }
  const totalGeral = locadora.calcularTotal(dias);
  alert(
    `Faturamento total da frota (${locadora.veiculos.length} veículos) por ${dias} dia(s):\n\n` +
      `${formatarMoeda(totalGeral)}`,
  );
}

function iniciarAtividadeDois() {
  let opcao;

  do {
    opcao = prompt(`Locadora | Menu Principal
    
    1 - Cadastrar carro
    2 - Cadastrar moto
    3 - Listar veículos
    4 - Simular aluguel individual
    5 - Calcular total da locadora
    0 - Sair`);

    switch (opcao) {
      case "1":
        cadastrarCarro();
        break;
      case "2":
        cadastrarMoto();
        break;
      case "3":
        listarVeiculos();
        break;
      case "4":
        simularAluguelIndividual();
        break;
      case "5":
        calcularTotalLocadora();
        break;
      case "0":
      case null:
        alert("Encerrando o sistema...");
        break;
      default:
        alert("Opção inválida!");
    }
  } while (opcao !== "0" && opcao !== null);
}
// Descomente (remova o //) para testar o Exercício 1:
// iniciarAtividadeDois();
