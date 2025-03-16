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
  const skipButton = document.createElement('button');
  skipButton.innerText = 'Pular Tutorial';
  skipButton.style.position = 'fixed';
  skipButton.style.top = '10px';
  skipButton.style.right = '10px';
  skipButton.style.padding = '10px';
  skipButton.style.backgroundColor = '#da008e';
  skipButton.style.color = 'white';
  skipButton.style.border = 'none';
  skipButton.style.borderRadius = '5px';
  skipButton.style.cursor = 'pointer';

  // Adicionando o botão à página
  document.body.appendChild(skipButton);

  // Função para pular o tutorial
  skipButton.addEventListener('click', () => {
    introJs().exit(); // Encerra o tutorial quando o botão é clicado
  });

  // Iniciando o tutorial
  introJs().setOptions({
    steps: [
      {
        element: document.querySelector('.title-lista'),
        title: "Bem-vindo!",
        intro: "Este é um tutorial rápido para ajudá-lo a entender como navegar e utilizar o site."
      },
      {
        title: "Produto Exemplo",
        intro: `
          <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; display: flex; align-items: center; margin-bottom: 5px">
            <img src="https://a-static.mlcdn.com.br/800x560/jogo-de-copos-de-vidro-transparente-simetria-370ml-6-pecas-casambiente/globaleletro/4483p/121eda1394fe9573f0969bc357548683.jpeg" class="card-img-top" alt="Produto" style="width: 130px; border-radius: 10px;">
            <div class="card-body" style="padding: 10px 0 5px 0px;">
              <h5 class="card-title" style="font-size: 1.1rem;">Jogo de Copos de Vidro</h5>
              <p class="card-text" style="font-size: 1rem;">R$ 52,71</p>
            </div>
            <p class="subtitle" style="font-size: 95%; margin:0;">Loja(s) recomendada(s):</p>
            <div class="lojas">
              <a href="#" target="_blank">
                <img src="https://raw.githubusercontent.com/GuGaTeC7/API-viagens-aula/refs/heads/main/magalu_logo.png" class="lojas-icon" alt="Magazine Luiza" title="Magazine Luiza" />
              </a>
            </div>
            <a href="#" class="btn btn-primary" style="margin-top: 15px; border: none; background-color: #da008e; color: #ffffff;">Comprei</a>
          </div>
          <p style="text-align: center;">Aqui você verá diversos <b>cards</b> com sugestões de produtos como presentes.</p>
        `
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
          <p style="text-align: center; font-size: 0.8rem; border: 3px dotted #df219d; padding: 4px; margin: 0;"><i><b>se o produto não estiver disponível na loja, sinta-se à vontade para escolhê-lo em outra.<b></i></p>
        `
      },
      {
        title: "Realizando a compra",
        intro: `
          <p style="font-size: 0.9rem;">Para facilitar sua compra, envie para o seguinte endereço:</p>
          <p style="font-size: 0.9rem; margin-top: 20px; color: black; text-align: center;">📍 <a href="https://maps.app.goo.gl/mMNLeBB664CeN13d9" target="__blank" style="text-decoration: none;">R. Cel. Amaro Sobrinho, 553 - Vila Carrão, São Paulo - SP, 03448-120</a></p>
          <p style="text-align: center; font-size: 0.9rem; ">Use esse endereço para o envio do presente.</p>
        `
      },
      {
        title: "Confirmando a Compra",
        intro: `
          <p style="text-align: center;">Depois de comprar, clique no botão "Comprei" para confirmar.</p>
          <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; display: flex; align-items: center;">
            <a href="#" class="btn btn-primary" style="border: none; background-color: #da008e; color: #ffffff;">Comprei</a>
          </div>
          <p style="text-align: center;">Depois disso, você pode comunicar a compra ao noivo/noiva através do modal que aparecerá.</p>
        `
      },
      {
        title: "Itens Comprados",
        intro: `
          <div class="card comprado" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 10px; display: flex; align-items: center; margin-bottom: 15px;">
          </div>
          <p style="text-align: center;">Os cards que possuem a tag <b>comprado</b> indicam que o produto já foi adquirido. Eles não devem ser comprados novamente.</p>
        `
      },
      {
        title: "Finalizando",
        intro: `
        <p style="text-align: center;">Parabéns!</p>
        <p style="text-align: center;">Agora você sabe como usar o site. Aproveite e faça boas compras!</p>
        `
      }
    ],
    showProgress: true,
    unsafeHtml: true, // Permite exibir HTML nos tooltips
    nextLabel: "Próximo",
    prevLabel: "Voltar",
    exitAnimation: 'fade', // Animação de saída
    enterAnimation: 'bounceIn', // Animação de entrada
    tooltipPosition: 'auto', // Posicionamento automático
    tooltipClass: 'large-tooltip', // Classe para o tooltip maior
    doneLabel: "Finalizar"
  }).start();
}


document.addEventListener("DOMContentLoaded", iniciarTutorial);

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
  }

  // Evento para abrir o modal com o nome do produto
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-comprei")) {
      const nomeProduto = event.target.getAttribute("data-nome");
      document.getElementById("produtoCompradoNome").textContent = nomeProduto;
    } else if (event.target.classList.contains("lojas-icon")) {
      const nomeProduto = event.target.getAttribute("data-nome");
      document.getElementById("produtoCompradoNome").textContent = nomeProduto;
    }
  });

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

function hideLoader() {
  const loader = document.getElementById("loading");
  loader.style.display = "none";
}

// Chama a função para obter os presentes da categoria com ID 1 (Eletrodomésticos)
getPresentes(1, 1);
// Chama a função para obter os presentes da categoria com ID 2 (Cozinha)
getPresentes(2, 2);
// Chama a função para obter os presentes da categoria com ID 3 (Casa)
getPresentes(3, 3);
// Chama a função para obter os presentes da categoria com ID 4 (Festa)
getPresentes(4, 4);
