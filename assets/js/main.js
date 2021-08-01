const seuVotoPara = document.querySelector(".d-1-1 span");
const cargo = document.querySelector(".d-1-2 span");
const numeros = document.querySelector(".d-1-3");
const descricao = document.querySelector(".d-1-4");
const aviso = document.querySelector(".d-2");
const lateral = document.querySelector(".d-1-right");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;
const votos = [];

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHTML = "";
  numero = "";
  votoBranco = false;

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
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });

  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    let fotosHTML = "";

    for (const i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHTML += `<div class="d-1-image small">
          <img src="./assets/images/${candidato.fotos[i].url}" alt="" />
          ${candidato.fotos[i].legenda}
          </div>`;
      } else {
        fotosHTML += `<div class="d-1-image">
          <img src="./assets/images/${candidato.fotos[i].url}" alt="" />
          ${candidato.fotos[i].legenda}
          </div>`;
      }
    }

    lateral.innerHTML = fotosHTML;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
  }
}

document.addEventListener("click", (e) => {
  const el = e.target;

  if (el.classList.contains("teclado-botao")) clicou(el.value);
});

function clicou(num) {
  const elNumero = document.querySelector(".numero.pisca");

  if (elNumero && num !== "branco" && num !== "corrige" && num !== "confirma") {
    elNumero.innerText = num;
    numero = `${numero}${num}`;

    elNumero.classList.remove("pisca");
    elNumero.nextElementSibling
      ? elNumero.nextElementSibling.classList.add("pisca")
      : atualizaInterface();
  }

  switch (num) {
    case "branco":
      branco();
      break;

    case "corrige":
      comecarEtapa();
      break;

    case "confirma":
      confirma();
      break;
  }
}

function branco() {
  if (numero === "") {
    votoBranco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
  }
}

function confirma() {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;

  if (votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: "branco",
    });
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero,
    });
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector(
        ".tela"
      ).innerHTML = `<div class="aviso-gigante pisca">FIM</div>`;
      console.log(votos);
    }
  }
}

comecarEtapa();
