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

// Consumir API para obter os presentes
async function getPresentes(idCategoria, idSection) {
  try {
    const response = await fetch(
      "https://back-presentes-casamento-production.up.railway.app/produtos/categoria/" +
        idCategoria
    );

    // Verifica se a resposta da requisição é válida
    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    // console.log(data); // Imprime os presentes no console do navegador com data

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

      const eletrosContent = `
        <div class="card">
          <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" />
          <div class="card-body">
            <h5 class="card-title">${nomeProduto}</h5>
            <p class="card-text">R$${valorProduto}</p>
            <p class="subtitle">Loja recomendada:</p>
            <div class="lojas">
              <a href="${linkLoja}" target="_blank">
                <img src="${imgLoja}" class="lojas-icon" alt="Loja" title="Loja" />
              </a>
            </div>
            <p class="subtitle observacao">
                Observação:
                <span
                  >${observacao}</span
                >
            </p>
            <button class="btn btn-fucsia btn-comprei" type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
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

      const eletrosContent = `
        <div class="card">
          <img src="${fotoProduto}" class="card-img-top" alt="${nomeProduto}" />
          <div class="card-body">
            <h5 class="card-title">${nomeProduto}</h5>
            <p class="card-text">R$${valorProduto}</p>
            <p class="subtitle">Loja recomendada:</p>
            <div class="lojas">
              <a href="${linkLoja}" target="_blank">
                <img src="${imgLoja}" class="lojas-icon" alt="Loja" title="Loja" />
              </a>
            </div>
            <p class="subtitle observacao">
                Observação:
                <span
                  >${observacao}</span
                >
            </p>
            <button class="btn btn-fucsia btn-comprei" type="button" data-bs-toggle="modal" data-bs-target="#modalComprei" data-nome="${nomeProduto}">Comprei</button>
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
    linkNoiva.href = `https://wa.me/5511986222839?text=${mensagemWhatsApp}`;
    linkNoivo.href = `https://wa.me/5511989257480?text=${mensagemWhatsApp}`;
  });
}

// Chama a função para obter os presentes da categoria com ID 1
getPresentes(1, 1);
// Chama a função para obter os presentes da categoria com ID 2
getPresentes(2, 2);
