// Script para fechar o dropdown e o offcanvas ao clicar
document.querySelectorAll(".dropdown-menu .dropdown-item").forEach((item) => {
  item.addEventListener("click", () => {
    const dropdownToggle = item
      .closest(".dropdown")
      .querySelector(".dropdown-toggle");
    const bootstrapDropdown = new bootstrap.Dropdown(dropdownToggle);
    bootstrapDropdown.hide(); // Fecha o menu dropdown

    // Fecha o offcanvas se estiver aberto
    const offcanvasElement = document.getElementById("offcanvasNavbar");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
  });
});

// Função que inicia o tutorial
async function iniciarTutorial() {
  // Adicionando o botão de "Pular Tutorial"
  const skipButton = document.createElement("button");
  skipButton.innerText = "Pular Tutorial";
  skipButton.style.position = "fixed";
  skipButton.style.top = "10px";
  skipButton.style.right = "10px";
  skipButton.style.padding = "10px";
  skipButton.style.backgroundColor = "#da008e";
  skipButton.style.color = "white";
  skipButton.style.border = "none";
  skipButton.style.borderRadius = "5px";
  skipButton.style.cursor = "pointer";

  // Adicionando o botão à página
  document.body.appendChild(skipButton);

  // Função para pular o tutorial
  skipButton.addEventListener("click", () => {
    introJs().exit(); // Encerra o tutorial quando o botão é clicado
  });

  // Iniciando o tutorial
  introJs()
    .setOptions({
      steps: [
        {
          element: document.querySelector(".title-lista"),
          title: "Bem-vindo!",
          intro:
            "Este é um tutorial rápido para ajudá-lo a entender como navegar e utilizar o site.",
        },
        {
          element: document.querySelector("#toggleButton"),
          title: "PIX para Lua de Mel",
          intro: `
          <div class="card qr-pix" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; margin-bottom: 10px;">
            <button class="btn btn-collapse collapsed" type="button" style="width: 100%; background-color: #da008e; color: white; border: none; padding: 10px; border-radius: 5px;">
              MISSÃO LUA DE MEL
              <i class="fas fa-chevron-down arrow"></i>
            </button>
          </div>
          <p style="text-align: center; font-size: 0.9rem;">Clique no botão <b>"MISSÃO LUA DE MEL"</b> para revelar nosso PIX!</p>
          <p style="text-align: center; font-size: 0.8rem; color: #666;">💖 Uma forma especial de contribuir para nossa viagem dos sonhos!</p>
        `,
        },
        {
          title: "Produto Exemplo",
          intro: `
          <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; display: flex; align-items: center; margin-bottom: 0">
            <img src="https://a-static.mlcdn.com.br/800x560/jogo-de-copos-de-vidro-transparente-simetria-370ml-6-pecas-casambiente/globaleletro/4483p/121eda1394fe9573f0969bc357548683.jpeg" class="card-img-top" alt="Produto" style="width: 90px; border-radius: 10px;">
            <div class="card-body" style="padding: 0 0 5px 0px;">
              <h5 class="card-title" style="font-size: 0.8rem; margin: 0;">Jogo de Copos de Vidro</h5>
              <p class="card-text" style="font-size: 0.8rem;">R$ 52,71</p>
            </div>
            <p class="subtitle" style="font-size: 80%; margin:0;">Loja(s) recomendada(s):</p>
            <div class="lojas">
              <a href="#" target="_blank">
                <img src="https://raw.githubusercontent.com/GuGaTeC7/API-viagens-aula/refs/heads/main/magalu_logo.png" class="lojas-icon" style="width: 35px;" alt="Magazine Luiza" title="Magazine Luiza" />
              </a>
            </div>
            <a href="#" class="btn" style="font-size: 9px; margin-top: 10px; border: none; background-color: #da008e !important; color: #ffffff;">Comprei</a>
          </div>
          <p style="text-align: center;">Aqui você verá diversos <b>cards</b> com sugestões de produtos como presentes.</p>
        `,
        },
        {
          title: "Loja recomendada",
          intro: `
          <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; display: flex; align-items: center; margin-bottom: 5px">
            <p class="subtitle" style="font-size: 95%; margin:0;">Loja(s) recomendada(s):</p>
            <div class="lojas">
              <a href="#" target="_blank">
                <img src="https://raw.githubusercontent.com/GuGaTeC7/API-viagens-aula/refs/heads/main/magalu_logo.png" class="lojas-icon" alt="Magazine Luiza" title="Magazine Luiza" />
              </a>
            </div>
          </div>
          <p style="text-align: center; font-size: 1rem; margin: 0 0 10px 0;">Clique nas lojas recomendadas para acessar diretamente o site da loja onde o produto está disponível.</p>
          <p style="text-align: center; font-size: 0.8rem; border: 3px dotted #df219d; padding: 4px; margin: 0;"><i><b>se o produto não estiver mais disponível na loja, sinta-se à vontade para escolhê-lo em outra.<b></i></p>
        `,
        },
        {
          title: "Realizando a compra",
          intro: `
          <p style="font-size: 0.9rem;">Para facilitar sua compra, envie para o seguinte endereço:</p>
          <p style="font-size: 0.9rem; margin-top: 20px; color: black; text-align: center;">📍 <a href="https://maps.app.goo.gl/mMNLeBB664CeN13d9" target="__blank" style="text-decoration: none;">R. Cel. Amaro Sobrinho, 553 - Vila Carrão, São Paulo - SP, 03448-120</a></p>
          <p style="text-align: center; font-size: 0.9rem; ">Use esse endereço para o envio do presente.</p>
        `,
        },
        {
          title: "Confirmando a Compra",
          intro: `
          <p style="text-align: center;">Depois de comprar, clique no botão "Comprei" para confirmar.</p>
          <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; display: flex; align-items: center;">
            <a href="#" class="btn btn-primary" style="border: none; background-color: #da008e; color: #ffffff;">Comprei</a>
          </div>
          <p style="text-align: center;">Depois disso, você pode comunicar a compra ao noivo/noiva através do modal que aparecerá.</p>
        `,
        },
        {
          title: "Itens Comprados",
          intro: `
          <div class="card comprado" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; display: flex; align-items: center; margin-bottom: 15px;">
          </div>
          <p style="text-align: center;">Os cards que possuem a tag <b>comprado</b> indicam que o produto já foi adquirido. Eles não devem ser comprados novamente.</p>
        `,
        },
        {
          title: "Finalizando",
          intro: `
        <p style="text-align: center;">Parabéns!</p>
        <p style="text-align: center;">Agora você sabe como usar o site. Aproveite e faça boas compras!</p>
        `,
        },
      ],
      showProgress: true,
      unsafeHtml: true, // Permite exibir HTML nos tooltips
      nextLabel: "Próximo",
      prevLabel: "Voltar",
      exitAnimation: "fade", // Animação de saída
      enterAnimation: "bounceIn", // Animação de entrada
      tooltipPosition: "auto", // Posicionamento automático
      tooltipClass: "large-tooltip", // Classe para o tooltip maior
      doneLabel: "Finalizar",
    })
    .start();
}

document.addEventListener("DOMContentLoaded", iniciarTutorial);

function modalNomeProduto() {
  // Evento para abrir o modal com o nome do produto
  return document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-comprei")) {
      const nomeProduto = event.target.getAttribute("data-nome");
      document.getElementById("produtoCompradoNome").textContent = nomeProduto;
    } else if (event.target.classList.contains("lojas-icon")) {
      const nomeProduto = event.target.getAttribute("data-nome");
      document.getElementById("produtoCompradoNome").textContent = nomeProduto;
    }
  });
}

// Consumir API para obter os presentes
async function getPresentes(idCategoria, idSection) {
  try {
    const response = await fetch(
      "https://back-presentes-casamento-production.up.railway.app/produtos/categoria/" +
        idCategoria
    );

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    montaGridPresentes(data, idSection);
  } catch (error) {
    console.error("Erro ao buscar presentes:", error);
  }
}

async function getPresentesGeral() {
  try {
    const response = await fetch(
      "https://back-presentes-casamento-production.up.railway.app/produtos"
    );

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar presentes:", error);
  }
}

function filtrarEOrdenarProdutos(produtos, filtro) {

  let produtosFiltrados = [...produtos]; // Cria uma cópia para evitar mutação do original

  // Aplica o filtro de compra
  if (filtro === "não comprado") {
    produtosFiltrados = produtosFiltrados.filter(produto => !produto.comprado);
  } else if (filtro === "comprado") {
    produtosFiltrados = produtosFiltrados.filter(produto => produto.comprado);
  }

  // Aplica a ordenação
  if (filtro === "crescente" || filtro === "decrescente") {

    produtosFiltrados.sort((a, b) => {
      const valorA = Number(a.valor.replace(/[.,]/g, "")) / 100;
      const valorB = Number(b.valor.replace(/[.,]/g, "")) / 100;


      return filtro === "crescente" ? valorA - valorB : valorB - valorA;
    });

  }

  return produtosFiltrados;
}

async function inserirProdutosFiltrados(filtro) {
  const titleFilter = document.getElementById("title-filter");
  const produtosFiltradosSection = document.getElementById("produtosFiltrados");
  const cardsPresentes = produtosFiltradosSection.querySelector(".cards-presentes");

  // Desativa todos os botões antes de iniciar o carregamento
  const todosBotoes = document.querySelectorAll(".btn-outline-primary");
  todosBotoes.forEach((botao) => {
      botao.disabled = true;
  });

  // Identifica o botão clicado e adiciona o loading
  const botaoAtivo = document.querySelector(
      `button[onclick="inserirProdutosFiltrados('${filtro}')"]`
  );
  if (botaoAtivo) {
      botaoAtivo.disabled = true;
      botaoAtivo.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Carregando...`;
  }

  // Atualiza o título do filtro
  if (botaoAtivo) {
      titleFilter.textContent = botaoAtivo.getAttribute("data-filtro");
  }

  // Esconder todas as seções e seus títulos
  document.querySelectorAll(".topico").forEach((topico) => {
      topico.querySelector(".cards-presentes").innerHTML = "";
      if (topico) topico.style.display = "none";
  });

  // Exibir apenas a seção "produtosFiltrados"
  produtosFiltradosSection.style.display = "block";
  titleFilter.style.display = "block";

  const presentesGeral = await getPresentesGeral();

  const produtosOrdenados = filtrarEOrdenarProdutos(presentesGeral, filtro);

  produtosOrdenados.forEach((produto) => {
      const imgLoja = produto.img_loja;
      const conteudoCard =
          imgLoja === "whatsapp"
              ? gerarCardAltoValor(produto)
              : gerarCardNormal(produto);
      cardsPresentes.insertAdjacentHTML("beforeend", conteudoCard);
  });

  // Remove o loading do botão e reativa todos os botões
  if (botaoAtivo) {
      botaoAtivo.disabled = false;
      botaoAtivo.innerHTML = botaoAtivo.getAttribute("data-filtro");
  }

  // Reativa todos os botões após o carregamento
  todosBotoes.forEach((botao) => {
      botao.disabled = false;
  });

  // Fecha o modal corretamente
  const modalElement = document.getElementById("filterModal");
  let modal = bootstrap.Modal.getInstance(modalElement);
  if (!modal) {
      modal = new bootstrap.Modal(modalElement);
  }
  modal.hide();
}

// Função para gerar um card normal
function gerarCardNormal(produto) {
  modalNomeProduto();

  const imgLoja = produto.img_loja;
  const linkLoja = produto.link_loja;
  const nomeProduto = produto.nome;
  const valorProduto = produto.valor;
  const fotoProduto = produto.foto;
  const observacao = produto.observacao;
  const status = produto.comprado;

  const eletrosContent = `
    <div class="${status == false ? "card" : "card comprado"}">
      <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" style="${
    status == false ? "" : "filter: grayscale(100%);"
  }" />
      <div class="card-body">
        <h5 class="card-title">${nomeProduto}</h5>
        <p class="card-text">R$${valorProduto}</p>
        <p class="subtitle" style="${
          status == false ? "" : "display: none;"
        }">Loja recomendada:</p>
        <div class="lojas fourth" style="${
          status == false ? "" : "display: none;"
        }">
          <a href="${linkLoja}" target="_blank">
            <img src="${imgLoja}" class="lojas-icon" alt="Loja" title="Loja" />
          </a>
        </div>
        <p class="subtitle observacao" style="${
          status == false ? "" : "display: none;"
        }">
            Observação:
            <span
              >${observacao}</span
            >
        </p>
        <button class="btn btn-fucsia btn-comprei" style="${
          status == false ? "" : "display: none;"
        }" type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
      </div>
    </div>`;

  return eletrosContent;
}

// Função para gerar um card de alto valor
function gerarCardAltoValor(produto) {
  const logoZap = "/imgs/logoZap.png";
  return `
    <div class="${produto.comprado ? "card comprado" : "card"}">
      <img src="${produto.foto}" class="card-img-top" alt="${
    produto.nome
  }" style="${produto.comprado ? "filter: grayscale(100%);" : ""}" />
      <div class="card-body">
        <h5 class="card-title">${produto.nome}</h5>
        <p class="card-text">R$${produto.valor}</p>
        <p class="subtitle" style="${
          produto.comprado ? "display: none;" : ""
        }">Loja recomendada:</p>
        <div class="lojas" style="${produto.comprado ? "display: none;" : ""}">
          <a href="${
            produto.link_loja
          }" target="_blank" data-bs-toggle="modal" data-bs-target="#modalComunicarNoivos">
            <img src="${logoZap}" class="lojas-icon" alt="WhatsApp" title="WhatsApp" />
          </a>
        </div>
        <p class="subtitle observacao" ${
          produto.observacao ? "" : 'style="display: none;"'
        }>
            Observação:
            <span>${produto.observacao || ""}</span>
        </p>
        <button class="btn btn-fucsia btn-comprei" style="display: none;" type="button">Comprei</button>
      </div>
    </div>
  `;
}

function montaGridPresentes(presentes, idSection) {
  if (idSection === 1) {
    const eletrodomesticosSection = document.getElementById("eletrodomesticos");
    const cardsPresentesDiv =
      eletrodomesticosSection.querySelector(".cards-presentes");

    // Limpa o conteúdo anterior da seção
    cardsPresentesDiv.innerHTML = ""; // Limpa o conteúdo anterior dentro da div de cards

    // Lista de eletrodomésticos
    presentes.forEach((presente) => {
      const imgLoja = presente.img_loja;
      const linkLoja = presente.link_loja;
      const nomeProduto = presente.nome;
      const valorProduto = presente.valor;
      const fotoProduto = presente.foto;
      const observacao = presente.observacao;
      const status = presente.comprado;

      const eletrosContent = `
        <div class="${status == false ? "card" : "card comprado"}">
          <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" style="${
        status == false ? "" : "filter: grayscale(100%);"
      }" />
          <div class="card-body">
            <h5 class="card-title">${nomeProduto}</h5>
            <p class="card-text">R$${valorProduto}</p>
            <p class="subtitle" style="${
              status == false ? "" : "display: none;"
            }">Loja recomendada:</p>
            <div class="lojas fourth" style="${
              status == false ? "" : "display: none;"
            }">
              <a href="${linkLoja}" target="_blank">
                <img src="${imgLoja}" class="lojas-icon" alt="Loja" title="Loja" />
              </a>
            </div>
            <p class="subtitle observacao" style="${
              status == false ? "" : "display: none;"
            }">
                Observação:
                <span
                  >${observacao}</span
                >
            </p>
            <button class="btn btn-fucsia btn-comprei" style="${
              status == false ? "" : "display: none;"
            }" type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
          </div>
        </div>
      `;

      cardsPresentesDiv.innerHTML += eletrosContent; // Adiciona o conteúdo do produto dentro da div de cards
    });
  } else if (idSection === 2) {
    const cozinhaSection = document.getElementById("cozinha");
    const cardsPresentesDiv = cozinhaSection.querySelector(".cards-presentes");

    // Limpa o conteúdo anterior da seção
    cardsPresentesDiv.innerHTML = ""; // Limpa o conteúdo anterior dentro da div de cards

    // Lista da cozinha
    presentes.forEach((presente) => {
      const imgLoja = presente.img_loja;
      const linkLoja = presente.link_loja;
      const nomeProduto = presente.nome;
      const valorProduto = presente.valor;
      const fotoProduto = presente.foto;
      const observacao = presente.observacao;
      const status = presente.comprado;

      const eletrosContent = `
        <div class="${status == false ? "card" : "card comprado"}">
          <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" style="${
        status == false ? "" : "filter: grayscale(100%);"
      }"/>
          <div class="card-body">
            <h5 class="card-title">${nomeProduto}</h5>
            <p class="card-text">R$${valorProduto}</p>
            <p class="subtitle" style="${
              status == false ? "" : "display: none;"
            }">Loja recomendada:</p>
            <div class="lojas" style="${
              status == false ? "" : "display: none;"
            }">
              <a href="${linkLoja}" target="_blank">
                <img src="${imgLoja}" class="lojas-icon" alt="Loja" title="Loja" />
              </a>
            </div>
            <p class="subtitle observacao" style="${
              status == false ? "" : "display: none;"
            }">
                Observação:
                <span
                  >${observacao}</span
                >
            </p>
            <button class="btn btn-fucsia btn-comprei" style="${
              status == false ? "" : "display: none;"
            }" type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
          </div>
        </div>
      `;

      cardsPresentesDiv.innerHTML += eletrosContent; // Adiciona o conteúdo do produto dentro da div de cards
    });
  } else if (idSection === 3) {
    const casaSection = document.getElementById("casa");
    const cardsPresentesDiv = casaSection.querySelector(".cards-presentes");

    // Limpa o conteúdo anterior da seção
    cardsPresentesDiv.innerHTML = ""; // Limpa o conteúdo anterior dentro da div de cards

    // Lista da casa
    presentes.forEach((presente) => {
      const imgLoja = presente.img_loja;
      const linkLoja = presente.link_loja;
      const nomeProduto = presente.nome;
      const valorProduto = presente.valor;
      const fotoProduto = presente.foto;
      const observacao = presente.observacao;
      const status = presente.comprado;

      const logoZap = "/imgs/logoZap.png";

      const eletrosContent = `
        <div class="${status == false ? "card" : "card comprado"}">
          <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" style="${
        status == false ? "" : "filter: grayscale(100%);"
      }"/>
          <div class="card-body">
            <h5 class="card-title">${nomeProduto}</h5>
            <p class="card-text">R$${valorProduto}</p>
            <p class="subtitle" style="${
              status == false ? "" : "display: none;"
            }">Loja recomendada:</p>
            <div class="lojas" style="${
              status == false ? "" : "display: none;"
            }">
              <a href="${linkLoja}" target="_blank" data-bs-toggle="modal" data-bs-target="#modalComunicarNoivos">
                <img src="${
                  imgLoja === "whatsapp" ? logoZap : imgLoja
                }" class="lojas-icon" alt="Loja" title="Loja" />
              </a>
            </div>
            <p class="subtitle observacao" style="${
              status == false ? "" : "display: none;"
            }" ${observacao === null ? 'style="display: none;"' : ""}>
                Observação:
                <span
                  >${observacao}</span
                >
            </p>
            <button class="btn btn-fucsia btn-comprei" style="${
              status == false ? "" : "display: none;"
            }" ${
        imgLoja === "whatsapp" ? 'style="display: none;"' : ""
      } type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
          </div>
        </div>
      `;

      cardsPresentesDiv.innerHTML += eletrosContent; // Adiciona o conteúdo do produto dentro da div de cards
    });
  } else if (idSection === 4) {
    const festaSection = document.getElementById("festa");
    const cardsPresentesDiv = festaSection.querySelector(".cards-presentes");

    // Limpa o conteúdo anterior da seção
    cardsPresentesDiv.innerHTML = ""; // Limpa o conteúdo anterior dentro da div de cards

    // Lista da festa
    presentes.forEach((presente) => {
      const imgLoja = presente.img_loja;
      const linkLoja = presente.link_loja;
      const nomeProduto = presente.nome;
      const valorProduto = presente.valor;
      const fotoProduto = presente.foto;
      const observacao = presente.observacao;
      const status = presente.comprado;

      const logoZap = "/imgs/logoZap.png";

      const eletrosContent = `
        <div class="${status == false ? "card" : "card comprado"}">
          <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" style="${
        status == false ? "" : "filter: grayscale(100%);"
      }"/>
          <div class="card-body">
            <h5 class="card-title">${nomeProduto}</h5>
            <p class="card-text">R$${valorProduto}</p>
            <p class="subtitle" style="${
              status == false ? "" : "display: none;"
            }">Loja recomendada:</p>
            <div class="lojas" style="${
              status == false ? "" : "display: none;"
            }">
              <a href="${linkLoja}" target="_blank" data-bs-toggle="modal" data-bs-target="#modalComunicarNoivos">
                <img src="${
                  imgLoja === "whatsapp" ? logoZap : imgLoja
                }" class="lojas-icon" alt="Loja" title="Loja" />
              </a>
            </div>
            <p class="subtitle observacao" style="${
              status == false ? "" : "display: none;"
            }" ${observacao === null ? 'style="display: none;"' : ""}>
                Observação:
                <span
                  >${observacao}</span
                >
            </p>
            <button class="btn btn-fucsia btn-comprei" style="${
              status == false ? "" : "display: none;"
            }" ${
        imgLoja === "whatsapp" ? 'style="display: none;"' : ""
      } type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
          </div>
        </div>
      `;

      cardsPresentesDiv.innerHTML += eletrosContent; // Adiciona o conteúdo do produto dentro da div de cards
    });
  } else if (idSection === 5) {
    const festaSection = document.getElementById("viagem");
    const cardsPresentesDiv = festaSection.querySelector(".cards-presentes");

    // Limpa o conteúdo anterior da seção
    cardsPresentesDiv.innerHTML = ""; // Limpa o conteúdo anterior dentro da div de cards

    // Lista da festa
    presentes.forEach((presente) => {
      const imgLoja = presente.img_loja;
      const linkLoja = presente.link_loja;
      const nomeProduto = presente.nome;
      const valorProduto = presente.valor;
      const fotoProduto = presente.foto;
      const observacao = presente.observacao;
      const status = presente.comprado;

      const logoZap = "/imgs/logoZap.png";

      const eletrosContent = `
        <div class="${status == false ? "card" : "card comprado"}">
          <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" style="${
        status == false ? "" : "filter: grayscale(100%);"
      }"/>
          <div class="card-body">
            <h5 class="card-title">${nomeProduto}</h5>
            <p class="card-text">R$${valorProduto}</p>
            <p class="subtitle" style="${
              status == false ? "" : "display: none;"
            }">Loja recomendada:</p>
            <div class="lojas" style="${
              status == false ? "" : "display: none;"
            }">
              <a href="${linkLoja}" target="_blank" data-bs-toggle="modal" data-bs-target="#modalComunicarNoivos">
                <img src="${
                  imgLoja === "whatsapp" ? logoZap : imgLoja
                }" class="lojas-icon" alt="Loja" title="Loja" />
              </a>
            </div>
            <p class="subtitle observacao" style="${
              status == false ? "" : "display: none;"
            }" ${observacao === null ? 'style="display: none;"' : ""}>
                Observação:
                <span
                  >${observacao}</span
                >
            </p>
            <button class="btn btn-fucsia btn-comprei" style="${
              status == false ? "" : "display: none;"
            }" ${
        imgLoja === "whatsapp" ? 'style="display: none;"' : ""
      } type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
          </div>
        </div>
      `;

      cardsPresentesDiv.innerHTML += eletrosContent; // Adiciona o conteúdo do produto dentro da div de cards
    });
  }

  // Evento para abrir o modal com o nome do produto
  modalNomeProduto();

  // Evento de confirmação de compra
  document.getElementById("confirmarCompra").addEventListener("click", () => {
    const nomeProduto = document.getElementById(
      "produtoCompradoNome"
    ).textContent;

    // Formatar a mensagem para o WhatsApp
    const mensagemWhatsApp = `Oi, tudo bem?%0AAcabei de comprar o item "${nomeProduto}" para vocês.%0AEspero que gostem!`;

    // Atualizar o link do botão "Noiva" no modal "Comunicar Noivos"
    const linkNoiva = document.getElementById("btnComunicarNoiva");
    const linkNoivo = document.getElementById("btnComunicarNoivo");
    linkNoiva.href = `https://wa.me/5511986222839?text=${
      nomeProduto == null ? "" : mensagemWhatsApp
    }`;
    linkNoivo.href = `https://wa.me/5511989257480?text=${mensagemWhatsApp}`;
  });

  // Evento de click direto no whatsapp
  document
    .getElementById("modalComunicarNoivos")
    .addEventListener("show.bs.modal", (event) => {
      const card = event.relatedTarget.closest(".card");
      const nomeProduto = card.querySelector(".card-img-top").alt;

      // Formatar a mensagem para o WhatsApp
      const mensagemWhatsApp = `Oi, tudo bem?%0AQuero comprar o item "${nomeProduto}" para vocês.%0AComo prosseguir?`;

      // Atualizar os links do WhatsApp no modal
      const linkNoiva = document.getElementById("btnComunicarNoiva");
      const linkNoivo = document.getElementById("btnComunicarNoivo");
      linkNoiva.href = `https://wa.me/5511986222839?text=${mensagemWhatsApp}`;
      linkNoivo.href = `https://wa.me/5511989257480?text=${mensagemWhatsApp}`;
    });
}

// Collapse Lua de Mel
const titleText = "MISSÃO LUA DE MEL";
const titleElement = document.getElementById("title");
let index = 0;

function type() {
  if (index < titleText.length) {
    titleElement.textContent += titleText.charAt(index);
    index++;
    setTimeout(type, 100); // Tempo entre cada letra (100ms)
  }
}

// Inicia a animação de digitação ao clicar no botão
document.getElementById("toggleButton").addEventListener("click", function () {
  titleElement.textContent = ""; // Limpa o texto antes de iniciar a animação
  index = 0; // Reinicia o índice
  type(); // Inicia a animação de digitação
});

document.getElementById("copyButton").addEventListener("click", function () {
  const pixNumber = document.getElementById("pixNumber").textContent;
  navigator.clipboard.writeText(pixNumber).then(() => {
    const copyIcon = document.getElementById("copyIcon");
    copyIcon.classList.remove("fa-copy");
    copyIcon.classList.add("fa-check");
    const copyMessage = document.getElementById("copyMessage");
    copyMessage.style.display = "inline";
    setTimeout(() => {
      copyMessage.style.display = "none";
      copyIcon.classList.remove("fa-check");
      copyIcon.classList.add("fa-copy");
    }, 2000);
  });
});

// Lógica para mostrar/ocultar as informações de pagamento
document.getElementById("infoIcon").addEventListener("click", function () {
  const paymentInfo = document.getElementById("paymentInfo");
  if (
    paymentInfo.style.display === "none" ||
    paymentInfo.style.display === ""
  ) {
    paymentInfo.style.display = "block"; // Mostra as informações
  } else {
    paymentInfo.style.display = "none"; // Esconde as informações
  }
});

function hideLoader() {
  const loader = document.getElementById("loading");
  loader.style.display = "none";
}

// Função de busca
function buscarProdutos() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const cards = document.querySelectorAll(".card"); // Seleciona todos os cards

  cards.forEach((card) => {
    const nomeProduto = card
      .querySelector(".card-title")
      .textContent.toLowerCase(); // Obtém o nome do produto
    if (nomeProduto.includes(input)) {
      card.style.display = ""; // Mostra o card se o nome corresponder
    } else {
      card.style.display = "none"; // Oculta o card se não corresponder
    }
  });
}

// Evento de escuta para o campo de busca
document
  .getElementById("search-input")
  .addEventListener("input", buscarProdutos);

// Chama a função para obter os presentes da categoria com ID 1 (Eletrodomésticos)
getPresentes(1, 1);
// Chama a função para obter os presentes da categoria com ID 2 (Cozinha)
getPresentes(2, 2);
// Chama a função para obter os presentes da categoria com ID 3 (Casa)
getPresentes(3, 3);
// Chama a função para obter os presentes da categoria com ID 4 (Festa)
getPresentes(4, 4);
// Chama a função para obter os presentes da categoria com ID 5 (Viagem)
getPresentes(5, 5);
