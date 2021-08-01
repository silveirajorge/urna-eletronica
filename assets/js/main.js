const seuVotoPara = document.querySelector(".d-1-1 span");
const cargo = document.querySelector(".d-1-2 span");
const numeros = document.querySelector(".d-1-3");
const descricao = document.querySelector(".d-1-4");
const aviso = document.querySelector(".d-2");
const lateral = document.querySelector(".d-1-right");

let etapaAtual = 0;
let numero;

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHTML = "";

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHTML += '<div class="numero pisca"></div>';
    } else {
      numeroHTML += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerText = etapa.titulo;
  descricao.innerText = "";
  aviso.style.display = "none";
  lateral.innerText = "";
  numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
  //
  console.log(`Atualizando`);
}

document.addEventListener("click", (e) => {
  const el = e.target;

  if (el.classList.contains("teclado-botao")) clicou(el.value);
});

function clicou(num) {
  const elNumero = document.querySelector(".numero.pisca");

  if (elNumero && num !== "branco" && num !== "corrige" && num !== "confirma") {
    elNumero.innerText = num;
    elNumero.classList.remove("pisca");
    elNumero.nextElementSibling
      ? elNumero.nextElementSibling.classList.add("pisca")
      : atualizaInterface();
  }
}

comecarEtapa();
