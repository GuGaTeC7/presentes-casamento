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
  // Espera o carregamento da página e garante que os elementos estão prontos
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mostra o card do tutorial
  document.getElementById('cardTutorial').style.display = 'block';

  // Inicia o tutorial com intro.js
  introJs().setOptions({
    steps: [
      {
        element: document.querySelector('.title-lista'),
        title: "Olá!",
        intro: "Agora faremos um breve tutorial para esclarecer como deve ser feita a utilização do site."
      },
      {
        element: document.querySelector('.first'),
        intro: 'Os produtos estão separados por tópico e podem ser acessados rapidamente pelo menu lateral para faciliar a navegação.'
      },
      {
        element: document.querySelector('#cardTutorial'),
        intro: 'Aqui está o card do produto. Você pode visualizar informações e clicar em "Comprei".'
      },
      {
        element: document.querySelector('.third'),
        intro: 'Nos cards você pode ver os detalhes dos presentes.'
      }
    ],
    showProgress: true,
    // Evento que será chamado quando o tutorial for finalizado
    oncomplete: function () {
      // Esconde o cardTutorial após o fim do tutorial
      document.getElementById('cardTutorial').style.display = 'none';
    }
  }).start();
}



// document.addEventListener("DOMContentLoaded", iniciarTutorial);

// Consumir API para obter os presentes
async function getPresentes(idCategoria, idSection) {
  try {
    const response = await fetch(
      "https://back-presentes-casamento-production.up.railway.app/produtos/categoria/" +
        idCategoria
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
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
iniciarTutorial();

// Chama a função para obter os presentes da categoria com ID 2 (Cozinha)
getPresentes(2, 2);
// Chama a função para obter os presentes da categoria com ID 3 (Casa)
getPresentes(3, 3);
// Chama a função para obter os presentes da categoria com ID 4 (Festa)
getPresentes(4, 4);
