class ClientController {
    constructor() {
      this.initElements();
      this.initEventListeners();
      this.timeoutTransitions = 300;
      this.currentDate = new Date();
    }
  
    initElements() {
      this.popupContent = document.getElementById("popupContent");
      this.popupOverlay = document.getElementById("popupOverlay");
      this.sairBtn = document.getElementById("sairBtn");
      this.checkbox = document.getElementById("versenha");
      this.senhaInput = document.getElementById("senha");
      this.cpfInput = document.getElementById("cpf");
      this.cpfAlterarInput = null;
      this.alterarDados = document.getElementById("alterarDados");
      this.containerRegistro = document.querySelector(".container-registro");
      this.formRegistroHoras = document.getElementById("formRegistroHoras");
      this.btns = document.querySelectorAll(".btns button");
      this.prevMonthBtn = document.getElementById("prevMonth");
      this.nextMonthBtn = document.getElementById("nextMonth");
    }
  
    initEventListeners() {
      this.adicionarEventListenerSubmitLogin();
      this.adicionarEventListenersBotoesPrincipais();
      this.adicionarEventListenerSair();
      this.adicionarEventListenerAlterarDados();
      this.adicionarEventListenerMostrarOcultarSenha();
      this.adicionarEventListenersFormatarCPF();
    }
  
    adicionarEventListenerSubmitLogin() {
      const loginForm = document.getElementById("formulario");
      if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
          event.preventDefault();
          this.handleSubmitLogin();
        });
      }
    }
    
    adicionarEventListenersBotoesPrincipais() {
      this.btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.trocarConteudoPrincipal(btn.id);
        });
      });
    }
    
    adicionarEventListenerSair() {
      if (this.sairBtn && this.popupOverlay) {
        this.sairBtn.addEventListener("click", () => {
          setTimeout(() => {
            this.fadeIn(this.popupOverlay);
            this.exibirPopupSair(
              "Deseja realmente sair?",
              () => (window.location.href = "/logout")
            );
          }, this.timeoutTransitions);
        });
      }
    }
    
    adicionarEventListenerAlterarDados() {
      if (this.alterarDados) {
        this.alterarDados.addEventListener("click", () => {
          setTimeout(() => {
            this.fadeIn(this.popupOverlay);
            this.exibirPopUpAlterarDados();
          }, this.timeoutTransitions);
        });
      }
    }
    
    adicionarEventListenerMostrarOcultarSenha() {
      if (this.checkbox && this.senhaInput) {
        this.checkbox.addEventListener("change", () => {
          this.senhaInput.type = this.checkbox.checked ? "text" : "password";
        });
      }
    }
    
    adicionarEventListenersFormatarCPF() {
      if (this.cpfInput) {
        this.cpfInput.addEventListener("input", () => this.formatarCPF(this.cpfInput));
        this.cpfInput.addEventListener("keypress", (e) => {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
      }
      if (this.cpfAlterarInput) {
          this.cpfAlterarInput.addEventListener("input", () => this.formatarCPF(this.cpfAlterarInput));
          this.cpfAlterarInput.addEventListener("keypress", (e) => {
              if (!/\d/.test(e.key)) {
                  e.preventDefault();
              }
          });
      }
    }
  
    async handleSubmitLogin() {
      try {
        await this.fazerLogin();
      } catch (error) {
        console.error('Erro ao lidar com o envio do formulário de login:', error);
        alert("Erro ao lidar com o envio do formulário de login. Por favor, tente novamente mais tarde.");
      }
    }
  
    async fazerLogin() {
      const cpf = this.cpfInput.value;
      const senha = this.senhaInput.value;
    
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, senha }),
      });
    
      if (!response.ok) {
        console.error('Erro ao fazer login. Código de status:', response.status);
        alert("Erro ao fazer login. Por favor, tente novamente mais tarde.");
        return;
      }
    
      const result = await response.json();
    
      if (result.success) {
        alert("Login bem-sucedido!");
      } else {
        alert("Erro ao fazer login. Por favor, tente novamente mais tarde.");
      }
    }
  
    formatarCPF(cpfInput) {
      let cpf = cpfInput.value.replace(/\D/g, "");
      if (cpf.length > 11) {
        cpf = cpf.substring(0, 11);
      }
      if (cpf) {
        if (cpf.length > 3) cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
        if (cpf.length > 7) cpf = cpf.substring(0, 7) + "." + cpf.substring(7);
        if (cpf.length > 11) cpf = cpf.substring(0, 11) + "-" + cpf.substring(11);
        cpfInput.value = cpf;
      }
    }
  
    registrarHorasEntradaSaida() {
      const form = document.querySelector(".form-1");
      if (form) {
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
  
          const dataHoraEntrada = this.formatarDataHora(new Date());
  
          try {
            const response = await fetch("/registrar", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ dataHoraEntrada }),
            });
  
            if (!response.ok) throw new Error("Erro ao registrar ponto");
  
            const result = await response.json();
            console.log("Ponto registrado com sucesso:", result);
            alert("Ponto registrado com sucesso!");
          } catch (error) {
            console.error("Erro ao registrar ponto:", error);
            alert("Erro ao registrar ponto: " + error.message);
          }
        });
      } else {
        console.error("Formulário de registro de horas não encontrado.");
      }
    }
  
    enviarJustificativa() {
      const form = document.querySelector("#formJustificativa");
      if (form) {
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const dataJustificativa = document.getElementById("dataHoraJustificativa").value;
          const descricaoJustificativa = document.getElementById("descricaoJustificativa").value;
    
          try {
            const response = await fetch("/registrarJustificativa", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                dataJustificativa: dataJustificativa,
                descricaoJustificativa: descricaoJustificativa
              })
            });
    
            if (!response.ok) throw new Error("Erro ao registrar ponto");
    
            alert("Justificativa registrada com sucesso!");
            console.log("Justificativa registrada com sucesso!");
          } catch (error) {
            console.error("Erro ao registrar justificativa:", error);
            alert("Erro ao registrar justificativa: " + error.message);
          }
        });
      } else {
        console.error("Formulário de justificativa não encontrado.");
      }
    }
  
    atualizarRelogio() {
      const adicionarZero = (i) => (i < 10 ? "0" + i : i);
      const relogioElement = document.getElementById("relogio");
      if (relogioElement) {
        const updateClock = () => {
          const data = new Date();
          const horas = adicionarZero(data.getHours());
          const minutos = adicionarZero(data.getMinutes());
          const segundos = adicionarZero(data.getSeconds());
          const horaAtual = `${horas}:${minutos}:${segundos}`;
          relogioElement.innerHTML = horaAtual;
          setTimeout(updateClock, 1000);
        };
        updateClock();
      } else {
        console.error("Elemento com ID 'relogio' não encontrado.");
      }
    }
  
    formatarDataHora(data) {
      const adicionarZero = (i) => (i < 10 ? "0" + i : i);
      const ano = data.getFullYear();
      const mes = adicionarZero(data.getMonth() + 1);
      const dia = adicionarZero(data.getDate());
      const horas = adicionarZero(data.getHours());
      const minutos = adicionarZero(data.getMinutes());
      const segundos = adicionarZero(data.getSeconds());
      return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }
  
    alterarDadosLogin() {
      if (this.alterarDados) {
        this.alterarDados.addEventListener("click", () => {
          setTimeout(() => {
            this.fadeIn(this.popupOverlay);
            this.exibirPopUpAlterarDados();
          }, this.timeoutTransitions);
        });
      } else {
        console.error("Botão de alterar dados não encontrado.");
      }
    }
  
    adicionarEventosFormularioAlterarDados() {
      const confirmarAlteracao = document.getElementById("confirmarAlteracao");
      const cancelarAlteracao = document.getElementById("cancelarAlteracao");
      const mostrarSenhaCheckbox = document.getElementById("mostrarsenha");
    
      if (confirmarAlteracao) {
        confirmarAlteracao.addEventListener("click", () => {
          this.enviarDadosAlteracao();
        });
      }
    
      if (cancelarAlteracao) {
        cancelarAlteracao.addEventListener("click", () => {
          this.hidePopup();
        });
      }
    
      if (mostrarSenhaCheckbox) {
        mostrarSenhaCheckbox.addEventListener("change", () => {
          const senhasInputs = document.querySelectorAll("#senhaAtual, #novaSenha, #confirmarSenha");
          senhasInputs.forEach(input => {
            input.type = mostrarSenhaCheckbox.checked ? "text" : "password";
          });
        });
      }
    }
    
    enviarDadosAlteracao() {
      const cpf = document.getElementById("cpfAlterar").value;
      const senhaAtual = document.getElementById("senhaAtual").value;
      const novaSenha = document.getElementById("novaSenha").value;
      const confirmarSenha = document.getElementById("confirmarSenha").value;
    
      if (novaSenha === confirmarSenha) {
        fetch("/alterarDados", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf, senhaAtual, novaSenha }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((body) => {
                throw new Error(body.message || "Erro desconhecido");
              });
            }
          })
          .then((data) => {
            alert("Dados alterados com sucesso! Faça Login Novamente!");
            window.location.href = "/logout";
            window.history.pushState(null, null, "/");
            window.addEventListener("popstate", function (event) {
              window.history.pushState(null, null, "/");
            });
          })
          .catch((error) => {
            console.error("Erro ao fazer a requisição:", error);
            alert(`Erro ao fazer a requisição: ${error.message}`);
          });
      } else {
        alert("As senhas não coincidem");
      }
    }
  
    async criarFormularioAlterarDados() {
      if (this.popupContent) {
          try {
              const response = await fetch("/html/alterar-dados.html");
              if (!response.ok) {
                  throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
              }
              const content = await response.text();
              this.popupContent.innerHTML = content;
  
              this.cpfAlterarInput = document.getElementById("cpfAlterar");
              this.adicionarEventListenersFormatarCPF();
  
              console.log("Formulário de alteração de dados carregado e event listeners adicionados");
          } catch (error) {
              console.error("Erro ao carregar o conteúdo:", error);
          }
      } else {
          console.error("Elemento do pop-up não encontrado.");
      }
    }
  
    async exibirPopUpAlterarDados() {
      await this.criarFormularioAlterarDados();
      this.adicionarEventosFormularioAlterarDados();
  
      setTimeout(() => {
        this.showPopup("Digite seus dados para alterar", () => {
          this.hidePopup();
        });
        this.fadeIn(this.popupOverlay);
      }, this.timeoutTransitions);
    }
  
    exibirPopupSair(message, confirmCallback) {
      if (this.popupOverlay && this.popupContent) {
        this.popupContent.innerHTML = `
                  <div id="container-sair">
                    <p>${message}</p>
                    <div>
                      <button id="confirmarSair" class="confirmarBtn">Sim</button>
                      <button id="cancelarSair" class="cancelarBtn">Não</button>
                    </div>
                  </div>
              `;
        this.popupOverlay.style.display = "flex";
  
        document.getElementById("confirmarSair").addEventListener("click", () => {
          confirmCallback();
          this.hidePopup();
        });
  
        document.getElementById("cancelarSair").addEventListener("click", () => {
          this.hidePopup();
        });
      } else {
        console.error(
          "Elementos necessários para o pop-up não foram encontrados."
        );
      }
    }
  
    hidePopup() {
      if (this.popupOverlay) {
        this.popupOverlay.style.display = "none";
      }
    }
  
    fadeIn(element) {
      element.style.opacity = 0;
      element.style.display = "flex";
      (function fade() {
        let val = parseFloat(element.style.opacity);
        if (!((val += 0.1) > 1)) {
          element.style.opacity = val;
          requestAnimationFrame(fade);
        }
      })();
    }
  
    changeMonth(monthChange) {
      this.currentDate.setMonth(this.currentDate.getMonth() + monthChange);
      this.updateCalendar();
    }
  
    updateCalendar() {
      const monthYearSpan = document.getElementById("monthYear");
      const calendarBody = document.getElementById("calendarBody");
  
      if (!monthYearSpan || !calendarBody) return;
  
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
  
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
  
      monthYearSpan.textContent = `${monthNames[month]} ${year}`;
      calendarBody.innerHTML = "";
  
      let row = document.createElement("tr");
      for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        if (row.children.length === 7) {
          calendarBody.appendChild(row);
          row = document.createElement("tr");
        }
  
        const cell = document.createElement("td");
        cell.textContent = day;
        row.appendChild(cell);
      }
  
      if (row.children.length > 0) {
        while (row.children.length < 7) {
          const cell = document.createElement("td");
          row.appendChild(cell);
        }
        calendarBody.appendChild(row);
      }
    }
  
    trocarConteudoPrincipal(btnId) {
      this.containerRegistro.classList.add("hidden");
      setTimeout(async () => {
          let htmlFile;
          switch (btnId) {
              case "marcar-ponto":
                  htmlFile = "/html/marcar-ponto.html";
                  break;
              case "justificativa":
                  htmlFile = "/html/justificativa.html";
                  break;
              case "historico":
                  htmlFile = "/html/historico.html";
                  break;
              default:
                  console.error("Botão não reconhecido:", btnId);
                  return;
          }
  
          try {
              const response = await fetch(htmlFile);
              if (!response.ok) {
                  throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
              }
              const content = await response.text();
              this.containerRegistro.innerHTML = content;
              switch (btnId) {
                case "marcar-ponto":
                    this.atualizarRelogio();
                    this.registrarHorasEntradaSaida();
                    break;
                case "justificativa":
                    this.enviarJustificativa();
                    break;
                case "historico":
                    this.updateCalendar();
                    this.initCalendarNavigation();
                    break;
              }
          } catch (error) {
              console.error("Erro ao carregar o conteúdo:", error);
          }
  
          this.containerRegistro.classList.remove("hidden");
      }, this.timeoutTransitions);
    }
  
    initCalendarNavigation() {
      const prevMonthBtn = document.getElementById("prevMonth");
      const nextMonthBtn = document.getElementById("nextMonth");
  
      if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener("click", () => {
          this.changeMonth(-1);
        });
  
        nextMonthBtn.addEventListener("click", () => {
          this.changeMonth(1);
        });
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const clientController = new ClientController();
    clientController.atualizarRelogio();
    clientController.registrarHorasEntradaSaida();
    clientController.enviarJustificativa();
  });
  