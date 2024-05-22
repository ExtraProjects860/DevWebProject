class ClientController {
  constructor() {
    this.initElements();
    this.initEventListeners();
    this.timetOutTransitions = 300;
  }

  
  initElements() {
    this.popupContent = document.getElementById("popupContent");
    this.popupOverlay = document.getElementById("popupOverlay");
    this.sairBtn = document.getElementById("sairBtn");
    this.checkbox = document.getElementById("versenha");
    this.senhaInput = document.getElementById("senha");
    this.cpfInput = document.getElementById("cpf");
    this.alterarDados = document.getElementById("alterarDados");
    this.containerRegistro = document.querySelector(".container-registro");
    this.formRegistroHoras = document.getElementById("formRegistroHoras");
    this.btns = document.querySelectorAll(".btns button");
  }


  initEventListeners() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.trocarConteudoPrincipal(btn.id);
      });
    });

    if (this.sairBtn && this.popupOverlay) {
      this.sairBtn.addEventListener("click", () => {
        setTimeout(() => {
          this.fadeIn(this.popupOverlay);
          this.exibirPopupSair(
            "Deseja realmente sair?",
            () => (window.location.href = "/logout")
          );
        }, this.timetOutTransitions);
      });
    }

    if (this.alterarDados) {
      this.alterarDados.addEventListener("click", () => {
        setTimeout(() => {
          this.fadeIn(this.popupOverlay);
          this.exibirPopUpAlterarDados();
        }, this.timetOutTransitions);
      });
    }

    if (this.checkbox && this.senhaInput) {
      this.checkbox.addEventListener("change", () => {
        this.senhaInput.type = this.checkbox.checked ? "text" : "password";
      });
    }

    if (this.cpfInput) {
      this.cpfInput.addEventListener("input", () => this.formatarCPF());
      this.cpfInput.addEventListener("keypress", (e) => {
        if (!/\d/.test(e.key)) {
          e.preventDefault();
        }
      });
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

          if (!response.ok) {
            throw new Error("Erro ao registrar ponto");
          }

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


  verificarSenha() {
    if (this.checkbox && this.senhaInput) {
      this.checkbox.addEventListener("change", () => {
        this.senhaInput.type = this.checkbox.checked ? "text" : "password";
      });
    } else {
      console.error("Elemento com ID 'versenha' ou 'senha' não encontrado.");
    }
  }


  formatarCPF() {
    let cpf = this.cpfInput.value.replace(/\D/g, "");

    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11);
    }

    if (cpf) {
      if (cpf.length > 3) {
        cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
      }
      if (cpf.length > 7) {
        cpf = cpf.substring(0, 7) + "." + cpf.substring(7);
      }
      if (cpf.length > 11) {
        cpf = cpf.substring(0, 11) + "-" + cpf.substring(11);
      }

      this.cpfInput.value = cpf;
    }
  }


  iniciarFormatacaoCPF() {
    if (this.cpfInput) {
      this.cpfInput.addEventListener("input", () => {
        this.formatarCPF();
      });
      this.cpfInput.addEventListener("keypress", (e) => {
        if (!/\d/.test(e.key)) {
          e.preventDefault();
        }
      });
    } else {
      console.error("Elemento com ID 'cpf' não encontrado.");
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


  sairLogin() {
    if (this.sairBtn && this.popupOverlay) {
      this.sairBtn.addEventListener("click", () => {
        setTimeout(() => {
          this.fadeIn(this.popupOverlay);
          this.exibirPopupSair(
            "Deseja realmente sair?",
            () => (window.location.href = "/logout")
          );
        }, this.timetOutTransitions);
      });
    } else {
      console.error(
        "Elementos necessários para a funcionalidade de sair não foram encontrados."
      );
    }
  }


  alterarDadosLogin() {
    if (this.alterarDados) {
      this.alterarDados.addEventListener("click", () => {
        setTimeout(() => {
          this.fadeIn(this.popupOverlay);
          this.exibirPopUpAlterarDados();
        }, this.timetOutTransitions);
      });
    } else {
      console.error("Botão de alterar dados não encontrado.");
    }
  }


  adicionarEventosFormularioAlterarDados() {
    const confirmarAlteracao = document.getElementById("confirmarAlteracao");
    const cancelarAlteracao = document.getElementById("cancelarAlteracao");

    if (confirmarAlteracao) {
      confirmarAlteracao.addEventListener("click", () => {
        const cpf = document.getElementById("cpf").value;
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
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return response.json().then((body) => {
                  throw new Error(body.message || "Erro desconhecido");
                });
              }
            })
            .then(data => {
              alert("Dados alterados com sucesso! Faça Login Novamente!");
              window.location.href = "/logout";
              window.history.pushState(null, null, '/');
              window.addEventListener('popstate', function(event) {
                window.history.pushState(null, null, '/');
              });
            })
            .catch(error => {
              console.error("Erro ao fazer a requisição:", error);
              alert(`Erro ao fazer a requisição: ${error.message}`);
            });
        } else {
          alert("As senhas não coincidem");
        }
      });
    }

    if (cancelarAlteracao) {
      cancelarAlteracao.addEventListener("click", () => {
        this.hidePopup();
      });
    }
  }


  criarFormularioAlterarDados() {
    if (this.popupContent) {
      this.popupContent.innerHTML = `
                <p>Digite seus dados para alterar</p>
                <label for="cpf">CPF</label>
                <input type="text" name="cpf" id="cpf">
                <label for="senhaAtual">Senha atual</label>
                <input type="password" name="senhaAtual" id="senhaAtual">
                <label for="novaSenha">Nova senha</label>
                <input type="password" name="novaSenha" id="novaSenha">
                <label for="confirmarSenha">Confirme a nova senha</label>
                <input type="password" name="confirmarSenha" id="confirmarSenha">
                <button id="confirmarAlteracao" type="submit">Confirmar</button>
                <button id="cancelarAlteracao">Cancelar</button>
            `;
    } else {
      console.error("Elemento do pop-up não encontrado.");
    }
  }


  exibirPopUpAlterarDados() {
    this.criarFormularioAlterarDados();
    this.adicionarEventosFormularioAlterarDados();

    setTimeout(() => {
      this.showPopup("Digite seus dados para alterar", () => {
        this.hidePopup();
      });
      this.fadeIn(this.popupOverlay);
    }, this.timetOutTransitions);
  }


  exibirPopupSair(message, confirmCallback) {
    if (this.popupOverlay && this.popupContent) {
      this.popupContent.innerHTML = `
                <p>${message}</p>
                <button id="confirmarSair">Sim</button>
                <button id="cancelarSair">Não</button>
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


  trocarConteudoPrincipal(btnId) {
    switch (btnId) {
      case "marcar-ponto":
        this.containerRegistro.classList.add("hidden");
        setTimeout(() => {
          this.containerRegistro.innerHTML = `
                        <div id="corpo-formulario-registro">
                            <form class="form-1" >
                                <h1 id="relogio"></h1>
                                <h2>Seja bem vindo!</h2>
                                <img src="/img/Clock.png" alt="">
                                <button class="btn">
                                    Registrar
                                </button>
                            </form>
                        </div>
                    `;
          this.containerRegistro.classList.remove("hidden");
          this.atualizarRelogio();
        }, this.timetOutTransitions);
        break;
      case "justificativa":
        this.containerRegistro.classList.add("hidden");
        setTimeout(() => {
          this.containerRegistro.innerHTML = `
                        <div id="container-justificativa">
                            <form class="blocos-justificativa" action="/registrar-justificava" method="post">
                                <h3>Faça aqui sua justificativa em caso de imprevistos</h3>
                                <input type="date" name="" id="" class="inputs-justificativa">
                                <input type="time" name="" id="" class="inputs-justificativa">
                                <textarea name="" id="" class="textarea-justificativa"></textarea>
                                <div class="alinhamento-btns-jus">
                                    <p><img src="" alt="">Anexar documento</p>
                                    <button type="submit" class="btn">Justificar</button>
                                </div>
                            </form>
                            <form class="blocos-justificativa">
                                <h3>Veja aqui seu histórico de justificativas</h3>
                                <table></table>
                                <div class="alinhamento-btns-jus">
                                    <button class="btn" >Anterior</button>
                                    <button class="btn" >Próximo</button>
                                </div>
                            </form>
                        </div>
                      `;
          this.containerRegistro.classList.remove("hidden");
        }, this.timetOutTransitions);
        break;
      case "historico":
        this.containerRegistro.classList.add("hidden");
        setTimeout(() => {
          this.containerRegistro.innerHTML = `<p>Tela Histórico</p>`;
          this.containerRegistro.classList.remove("hidden");
        }, this.timetOutTransitions);
        break;
      default:
        console.error("Botão não reconhecido:", btnId);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const clientController = new ClientController();
  clientController.iniciarFormatacaoCPF();
  clientController.verificarSenha();
  clientController.atualizarRelogio();
  clientController.sairLogin();
  clientController.alterarDadosLogin();
  clientController.registrarHorasEntradaSaida();
});
