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

// Tutorial Nativo - Profissional e Responsivo
class TutorialNativo {
  constructor(steps) {
    this.steps = steps;
    this.currentStep = 0;
    this.overlay = null;
    this.tooltip = null;
    this.skipButton = null;
    this.resizeTimeout = null;
    this.boundHandleResize = this.handleResize.bind(this);
  }

  start() {
    this.injectStyles();
    this.createOverlay();
    this.createSkipButton();
    this.showStep(0);
    
    // Event listener para responsividade
    window.addEventListener('resize', this.boundHandleResize);
  }

  injectStyles() {
    if (document.getElementById('tutorial-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'tutorial-styles';
    style.textContent = `
      @keyframes tutorialFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes tutorialSlideUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes tutorialPulse {
        0%, 100% { 
          box-shadow: 0 0 0 0 rgba(218, 0, 142, 0.7);
        }
        50% { 
          box-shadow: 0 0 0 15px rgba(218, 0, 142, 0);
        }
      }
      
      .tutorial-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        z-index: 999998;
        animation: tutorialFadeIn 0.3s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .tutorial-tooltip {
        position: relative;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 16px;
        padding: 32px;
        z-index: 1000000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(0, 0, 0, 0.05);
        animation: tutorialSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-height: 85vh;
        max-width: 600px;
        width: 100%;
        overflow-y: auto;
      }
      
      .tutorial-tooltip::-webkit-scrollbar {
        width: 8px;
      }
      
      .tutorial-tooltip::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      
      .tutorial-tooltip::-webkit-scrollbar-thumb {
        background: #da008e;
        border-radius: 10px;
      }
      
      .tutorial-skip-btn {
        position: fixed;
        top: 16px;
        right: 16px;
        padding: 12px 24px;
        background-color: #da008e;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        z-index: 1000001;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(218, 0, 142, 0.4);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: tutorialFadeIn 0.5s ease-out;
      }
      
      .tutorial-skip-btn:hover {
        background-color: #b0006e;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(218, 0, 142, 0.5);
      }
      
      .tutorial-skip-btn:active {
        transform: translateY(0);
      }
      
      .tutorial-progress-bar {
        width: 100%;
        height: 6px;
        background-color: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 16px;
      }
      
      .tutorial-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #da008e 0%, #ff1aa8 100%);
        border-radius: 10px;
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 10px rgba(218, 0, 142, 0.3);
      }
      
      .tutorial-step-counter {
        text-align: center;
        font-size: 13px;
        color: #6c757d;
        margin-bottom: 16px;
        font-weight: 500;
      }
      
      .tutorial-content {
        margin-bottom: 20px;
      }
      
      .tutorial-title {
        margin: 0 0 12px 0;
        color: #da008e;
        font-size: 1.5rem;
        font-weight: 700;
      }
      
      .tutorial-body {
        color: #333;
        font-size: 15px;
        line-height: 1.6;
      }
      
      .tutorial-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-top: 24px;
      }
      
      .tutorial-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        flex: 1;
      }
      
      .tutorial-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .tutorial-btn-prev {
        background-color: #6c757d;
        color: white;
      }
      
      .tutorial-btn-prev:not(:disabled):hover {
        background-color: #5a6268;
        transform: translateX(-2px);
      }
      
      .tutorial-btn-next {
        background-color: #da008e;
        color: white;
        box-shadow: 0 4px 12px rgba(218, 0, 142, 0.3);
      }
      
      .tutorial-btn-next:hover {
        background-color: #b0006e;
        transform: translateX(2px);
        box-shadow: 0 6px 16px rgba(218, 0, 142, 0.4);
      }
      
      /* Responsividade Mobile */
      @media (max-width: 768px) {
        .tutorial-overlay {
          padding: 16px;
        }
        
        .tutorial-tooltip {
          max-width: 100%;
          padding: 24px;
          max-height: 90vh;
        }
        
        .tutorial-skip-btn {
          top: 12px;
          right: 12px;
          padding: 10px 20px;
          font-size: 13px;
        }
        
        .tutorial-title {
          font-size: 1.35rem;
        }
        
        .tutorial-body {
          font-size: 14px;
        }
        
        .tutorial-buttons {
          gap: 10px;
        }
        
        .tutorial-btn {
          padding: 12px 20px;
          font-size: 14px;
        }
      }
      
      @media (max-width: 480px) {
        .tutorial-overlay {
          padding: 12px;
        }
        
        .tutorial-tooltip {
          padding: 20px;
          border-radius: 12px;
        }
        
        .tutorial-title {
          font-size: 1.2rem;
        }
        
        .tutorial-body {
          font-size: 13px;
        }
        
        .tutorial-buttons {
          flex-direction: column;
          gap: 8px;
        }
        
        .tutorial-btn {
          width: 100%;
          padding: 14px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'tutorial-overlay';
    document.body.appendChild(this.overlay);
  }

  createSkipButton() {
    this.skipButton = document.createElement('button');
    this.skipButton.className = 'tutorial-skip-btn';
    this.skipButton.innerHTML = '<i class="fas fa-times"></i> Pular Tutorial';
    this.skipButton.onclick = () => this.exit();
    document.body.appendChild(this.skipButton);
  }

  createTooltip(step) {
    // Remover tooltip anterior
    if (this.tooltip) {
      this.tooltip.remove();
    }
    
    const isLastStep = this.currentStep === this.steps.length - 1;
    const progress = ((this.currentStep + 1) / this.steps.length) * 100;
    
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tutorial-tooltip';
    
    this.tooltip.innerHTML = `
      <div class="tutorial-progress-bar">
        <div class="tutorial-progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="tutorial-step-counter">
        Passo ${this.currentStep + 1} de ${this.steps.length}
      </div>
      <div class="tutorial-content">
        ${step.title ? `<h3 class="tutorial-title">${step.title}</h3>` : ''}
        <div class="tutorial-body">${step.intro}</div>
      </div>
      <div class="tutorial-buttons">
        <button class="tutorial-btn tutorial-btn-prev" id="tutorial-prev" ${this.currentStep === 0 ? 'disabled' : ''}>
          <i class="fas fa-chevron-left"></i> Voltar
        </button>
        <button class="tutorial-btn tutorial-btn-next" id="tutorial-next">
          ${isLastStep ? 'Finalizar <i class="fas fa-check"></i>' : 'Próximo <i class="fas fa-chevron-right"></i>'}
        </button>
      </div>
    `;
    
    // Adicionar ao overlay (que já está centralizado)
    this.overlay.appendChild(this.tooltip);
    
    // Event listeners
    const prevBtn = this.tooltip.querySelector('#tutorial-prev');
    const nextBtn = this.tooltip.querySelector('#tutorial-next');
    
    if (prevBtn) {
      prevBtn.onclick = () => this.previousStep();
    }
    
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (isLastStep) {
          this.exit();
        } else {
          this.nextStep();
        }
      };
    }
  }

  showStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) return;
    
    this.currentStep = stepIndex;
    const step = this.steps[stepIndex];
    
    // Criar tooltip centralizado
    this.createTooltip(step);
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.showStep(this.currentStep + 1);
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }

  handleResize() {
    // Não precisa fazer nada, o CSS flexbox já cuida do posicionamento
    clearTimeout(this.resizeTimeout);
  }

  exit() {
    // Remover event listener
    window.removeEventListener('resize', this.boundHandleResize);
    
    // Remover elementos com animação de saída
    [this.overlay, this.skipButton].forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => el.remove(), 300);
      }
    });
    
    // Remover estilos após um delay
    setTimeout(() => {
      const styles = document.getElementById('tutorial-styles');
      if (styles) styles.remove();
    }, 400);
  }
}

// Função que inicia o tutorial
async function iniciarTutorial() {
  // Definir os passos do tutorial (centralizados)
  const steps = [
    {
      title: "Bem-vindo! 👋",
      intro: `
        <p style="text-align: center; font-size: 1.1rem; line-height: 1.6;">
          Este é um tutorial rápido para ajudá-lo a entender como navegar e utilizar nossa <strong>Lista de Presentes</strong>.
        </p>
        <p style="text-align: center; color: #666; margin-top: 10px;">
          Vamos começar?
        </p>
      `
    },
    {
      title: "💖 PIX para Lua de Mel",
          intro: `
        <div class="card qr-pix" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 15px;">
          <button class="btn btn-collapse collapsed" type="button" style="width: 100%; background-color: #da008e; color: white; border: none; padding: 12px; border-radius: 5px; font-weight: 600;">
              MISSÃO LUA DE MEL
              <i class="fas fa-chevron-down arrow"></i>
            </button>
          </div>
        <p style="text-align: center; font-size: 1rem; margin-bottom: 10px;">
          Clique no botão <b>"MISSÃO LUA DE MEL"</b> para revelar nosso PIX!
        </p>
        <p style="text-align: center; font-size: 0.9rem; color: #666;">
          💖 Uma forma especial de contribuir para nossa viagem dos sonhos!
        </p>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-top: 15px;">
          <p style="text-align: center; font-size: 1rem; font-weight: bold; color: #da008e; margin: 0;">
            📱 PIX: +55 11 96338-0372
          </p>
          <p style="text-align: center; margin-top: 10px;">
            <button onclick="navigator.clipboard.writeText('+55 11 96338-0372').then(() => { this.innerHTML = '✓ Copiado!'; setTimeout(() => { this.innerHTML = '📋 Copiar PIX'; }, 2000); })" style="padding: 8px 16px; background-color: #da008e; color: white; border: none; border-radius: 6px; font-size: 0.9rem; cursor: pointer; font-weight: 600;">
              📋 Copiar PIX
            </button>
          </p>
        </div>
      `
    },
    {
      title: "🎁 Como funcionam os produtos",
          intro: `
        <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 15px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="https://a-static.mlcdn.com.br/800x560/jogo-de-copos-de-vidro-transparente-simetria-370ml-6-pecas-casambiente/globaleletro/4483p/121eda1394fe9573f0969bc357548683.jpeg" alt="Produto" style="width: 100px; border-radius: 8px;">
            <div>
              <h5 style="font-size: 1rem; margin: 0 0 5px 0;">Jogo de Copos de Vidro</h5>
              <p style="font-size: 1.1rem; color: #da008e; font-weight: bold; margin: 0;">R$ 52,71</p>
            </div>
            </div>
          </div>
        <p style="text-align: center; font-size: 1rem;">
          Aqui você encontra diversos <b>cards</b> com sugestões de produtos como presentes para nós!
        </p>
        <p style="text-align: center; font-size: 0.9rem; color: #666; margin-top: 10px;">
          Escolha o que mais combina com você 💝
        </p>
      `
    },
    {
      title: "🏪 Lojas Recomendadas",
          intro: `
        <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 15px; text-align: center;">
          <p style="font-size: 0.95rem; margin: 0 0 10px 0; font-weight: 600;">Loja recomendada:</p>
          <div style="display: flex; justify-content: center; gap: 10px;">
            <img src="https://raw.githubusercontent.com/GuGaTeC7/API-viagens-aula/refs/heads/main/magalu_logo.png" style="width: 50px; border-radius: 5px;" alt="Magazine Luiza" />
            </div>
          </div>
        <p style="text-align: center; font-size: 1rem; margin-bottom: 10px;">
          Clique nos ícones das lojas para acessar diretamente o site onde o produto está disponível.
        </p>
        <div style="border: 3px dotted #df219d; padding: 12px; border-radius: 8px; margin-top: 15px;">
          <p style="text-align: center; font-size: 0.9rem; margin: 0;">
            <i><b>Se o produto não estiver disponível na loja, fique à vontade para escolhê-lo em outra!</b></i>
          </p>
        </div>
      `
    },
    {
      title: "📦 Endereço de Entrega",
          intro: `
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
          <p style="font-size: 1rem; text-align: center; margin-bottom: 15px;">
            Para facilitar, envie seu presente para:
          </p>
          <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <p style="font-size: 1.1rem; text-align: center; color: #333; margin: 0; line-height: 1.6;">
              📍 <a href="https://maps.app.goo.gl/mMNLeBB664CeN13d9" target="_blank" style="color: #da008e; text-decoration: none; font-weight: 600;">
                R. Cel. Amaro Sobrinho, 553<br>
                Vila Carrão, São Paulo - SP<br>
                CEP: 03448-120
              </a>
            </p>
          </div>
        </div>
        <p style="text-align: center; font-size: 0.9rem; color: #666;">
          Clique no endereço para abrir no Google Maps
        </p>
      `
    },
    {
      title: "✅ Confirmando a Compra",
          intro: `
        <p style="text-align: center; font-size: 1rem; margin-bottom: 15px;">
          Depois de comprar, clique no botão <strong>"Comprei"</strong> no card do produto.
        </p>
        <div class="card" style="width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 20px; display: flex; justify-content: center; align-items: center; margin-bottom: 15px;">
          <button class="btn" style="border: none; background-color: #da008e; color: #ffffff; padding: 12px 24px; font-weight: 600; border-radius: 8px;">
            Comprei
          </button>
          </div>
        <p style="text-align: center; font-size: 0.95rem; color: #666;">
          Um modal aparecerá para você comunicar a compra diretamente ao noivo ou à noiva pelo WhatsApp! 💬
        </p>
      `
    },
    {
      title: "🔖 Itens já Comprados",
      intro: `
        <div style="position: relative; width: 100%; border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 15px;">
          <div style="position: absolute; top: 10px; right: 10px; background-color: red; color: white; padding: 5px 10px; font-size: 14px; font-weight: bold; border-radius: 50%; z-index: 10;">
            Comprado
          </div>
          <div style="display: flex; align-items: center; gap: 15px; opacity: 0.7; filter: grayscale(100%);">
            <img src="https://a-static.mlcdn.com.br/800x560/jogo-de-copos-de-vidro-transparente-simetria-370ml-6-pecas-casambiente/globaleletro/4483p/121eda1394fe9573f0969bc357548683.jpeg" alt="Produto Comprado" style="width: 100px; border-radius: 8px;">
            <div>
              <h5 style="font-size: 1rem; margin: 0 0 5px 0; color: #666;">Jogo de Copos de Vidro</h5>
              <p style="font-size: 1.1rem; color: #999; font-weight: bold; margin: 0;">R$ 52,71</p>
            </div>
          </div>
        </div>
        <p style="text-align: center; font-size: 1rem; margin-bottom: 10px;">
          Os cards com a tag vermelha <strong>"Comprado"</strong> no canto superior direito indicam que o produto já foi adquirido.
        </p>
        <p style="text-align: center; font-size: 0.95rem; color: #666;">
          Eles ficam em tons de cinza. Escolha outros itens disponíveis! 😊
        </p>
      `
    },
    {
      title: "🎉 Tudo Pronto!",
          intro: `
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 4rem; margin-bottom: 20px;">
            🎊
          </div>
          <p style="font-size: 1.3rem; font-weight: bold; color: #da008e; margin-bottom: 15px;">
            Parabéns!
          </p>
          <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 15px;">
            Agora você sabe como usar nossa lista de presentes!
          </p>
          <p style="font-size: 1rem; color: #666;">
            Obrigado por fazer parte desse momento especial! 💖
          </p>
          <p style="font-size: 1rem; margin-top: 20px; font-weight: 600;">
            Aproveite e escolha seu presente!
          </p>
        </div>
      `
    }
  ];
  
  // Iniciar o tutorial
  const tutorial = new TutorialNativo(steps);
  tutorial.start();
}

// Iniciar tutorial apenas na página de lista de presentes
document.addEventListener("DOMContentLoaded", () => {
  // Verificar se estamos na página lista-presentes.html
  const isListaPresentes = window.location.pathname.includes('lista-presentes.html') || 
                           document.querySelector('.title-lista');
  
  if (isListaPresentes) {
    iniciarTutorial();
  }
});

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
