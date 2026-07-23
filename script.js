/* ==========================================================================
  1) CONFIGURAÇÕES GLOBAIS E ESTADO
========================================================================== */
const urlAPI = 'https://script.google.com/macros/s/AKfycbz2aY79S22w5D_ZsxSLc9DVFNTfVwG79T-hez7FYEfwSO8y7MTkJoOstPBQm7QHvL8feg/exec';

let dadosPlanilha = [];
let quantidadeHasteBackup = null;

// Roteador: Modulo ativo atualmente baseado no cilindro selecionado
let moduloAtivo = null;

// Famílias Ativas
const familiaCpme = ["CPME32", "CPME40", "CPME50", "CPME63", "CPME80", "CPME100", "CPME125"];
const familiaCp2m = ["CP2M32", "CP2M40", "CP2M50", "CP2M63", "CP2M80", "CP2M100", "CP2M125"];
const familiaCpn = ["CPN32", "CPN40", "CPN50", "CPN63", "CPN80", "CPN100", "CPN125"];
const familiaCpb = ["CPB32", "CPB40", "CPB50", "CPB63", "CPB80", "CPB100"];
const familiaCp = [...familiaCpme, ...familiaCpn, ...familiaCpb, ...familiaCp2m];

const familiaCte = ["CTE32", "CTE40", "CTE50", "CTE63", "CTE80", "CTE100", "CTE125", "CTE160", "CTE200"];
const familiaCtn = ["CTN32", "CTN40", "CTN50", "CTN63", "CTN80", "CTN100", "CTN125"];
const familiaCtb = ["CTB32", "CTB40", "CTB50", "CTB63", "CTB80", "CTB100", "CTB125", "CPB125"];
const familiaCt2m = ["CT2M32", "CT2M40", "CT2M50", "CT2M63", "CT2M80", "CT2M100", "CT2M125"];

const familiaCt = [...familiaCte, ...familiaCtn, ...familiaCtb, ...familiaCt2m];

const familiaCsmPadrao = ["CSM10", "CSM12", "CSM16", "CSM20", "CSM25"];
const familiaCsmC = ["CSM16-C", "CSM20-C", "CSM25-C"];
const familiaCsmA = ["CSM10-A", "CSM12-A", "CSM16-A", "CSM20-A", "CSM25-A"];
const familiaCsmR = ["CSM10-R", "CSM12-R", "CSM16-R", "CSM20-R", "CSM25-R"];
const familiaCsmF = ["CSM10-F", "CSM12-F", "CSM16-F", "CSM20-F", "CSM25-F"];
const familiaCsmFC = ["CSM16F-C", "CSM20F-C", "CSM25F-C"];
const familiaCsm2b = ["CSM2B20", "CSM2B25", "CSM2B32", "CSM2B40"];
const familiaCsm2bF = ["CSM2B20F", "CSM2B25F", "CSM2B32F", "CSM2B40F"];
const familiaCsm2bA = ["CSM2B20A", "CSM2B25A", "CSM2B32A", "CSM2B40A"];
const familiaCsm2bR = ["CSM2B20R", "CSM2B25R", "CSM2B32R", "CSM2B40R"];
const familiaCsm3bC = ["CSM3B32-C", "CSM3B40-C", "CSM3B50-C", "CSM3B63-C"];
const familiaCsm3fC = ["CSM3F32-C", "CSM3F40-C", "CSM3F50-C", "CSM3F63-C"];

const familiaCsm = [...familiaCsmPadrao, ...familiaCsmC, ...familiaCsmA, ...familiaCsmR, ...familiaCsmF, ...familiaCsmFC, ...familiaCsm2b, ...familiaCsm2bF, ...familiaCsm2bA, ...familiaCsm2bR, ...familiaCsm3bC, ...familiaCsm3fC];

const familiaSai = ["BSAI32SG", "BSAI40SG", "BSAI50SG", "BSAI63SG", "BSAI80SG", "BSAI100SG", "BSAI125SG", "SAI32SNG", "SAI40SNG", "SAI50SNG", "SAI63SNG", "SAI80SNG", "SAI100SNG", "SAI125SNG", "SAI160SNG", "SAI200SNG", "SGC160SNG", "SGC200SNG", "SGC250SNG"];

const familiaG = ["GB16", "GB20", "GB25", "GB32", "GB40", "GB50", "GB63", "GB80", "GB100", "GR16", "GR20", "GR25", "GR32", "GR40", "GR50", "GR63", "GR80", "GR100"];

const familiaCcn = ["CCN12-F", "CCN16-F", "CCN20-F", "CCN25-F", "CCN32-F", "CCN40-F", "CCN50-F", "CCN63-F", "CCN80-F", "CCN100-F", "CCN125-F", "CCN12-M", "CCN16-M", "CCN20-M", "CCN25-M", "CCN32-M", "CCN40-M", "CCN50-M", "CCN63-M", "CCN80-M", "CCN100-M", "CCN125-M", "CCN12F-A", "CCN16F-A", "CCN20F-A", "CCN25F-A", "CCN32F-A", "CCN40F-A", "CCN50F-A", "CCN63F-A", "CCN80F-A", "CCN100F-A", "CCN125F-A", "CCN12F-R", "CCN16F-R", "CCN20F-R", "CCN25F-R", "CCN32F-R", "CCN40F-R", "CCN50F-R", "CCN63F-R", "CCN80F-R", "CCN100F-R", "CCN125F-R", "CCN12M-A", "CCN16M-A", "CCN20M-A", "CCN25M-A", "CCN32M-A", "CCN40M-A", "CCN50M-A", "CCN63M-A", "CCN80M-A", "CCN100M-A", "CCN125M-A", "CCN12M-R", "CCN16M-R", "CCN20M-R", "CCN25M-R", "CCN32M-R", "CCN40M-R", "CCN50M-R", "CCN63M-R", "CCN80M-R", "CCN100M-R", "CCN125M-R", "CCNG12", "CCNG16", "CCNG20", "CCNG25", "CCNG32", "CCNG40", "CCNG50", "CCNG63", "CCNG80", "CCNG100"
];

const familiaMi = ["MI12SCA", "MI12SU", "MI16SCA", "MI16SU", "MI20SCAG", "MI20SUG", "MI25SCAG", "MI25SUG", "MIC16SCA", "MIC16SU", "MIC20SCAG", "MIC20SUG", "MIC25SCAG", "MIC25SUG", "MSI12SCA", "MSI12SU", "MSI16SCA", "MSI16SU", "MSI20SCAG", "MSI20SUG", "MSI25SCAG", "MSI25SUG", "MTI12SCA", "MTI12SU", "MTI16SCA", "MTI16SU", "MTI20SCAG", "MTI20SUG", "MTI25SCAG", "MTI25SUG"];

const familiaCdvu = ["CDVU12-F", "CDVU16-F", "CDVU20-F", "CDVU25-F", "CDVU32-F", "CDVU40-F", "CDVU50-F", "CDVU63-F", "CDVU80-F", "CDVU100-F", "CDVU125-F", "CDVU12-M", "CDVU16-M", "CDVU20-M", "CDVU25-M", "CDVU32-M", "CDVU40-M", "CDVU50-M", "CDVU63-M", "CDVU80-M", "CDVU100-M", "CDVU125-M", "CDVUL12", "CDVUL16", "CDVUL20", "CDVUL25", "CDVUL32", "CDVUL40", "CDVUL50", "CDVUL63", "CDVUL80", "CDVUL100"];

const familiaAce = ["ACE12S", "ACE16S", "ACE20S", "ACE25S", "ACE32SG", "ACE40SG", "ACE50SG", "ACE63SG", "ACE80SG", "ACE100SG", "ACE125SG", "ACE12SB", "ACE16SB", "ACE20SB", "ACE25SB", "ACE32SBG", "ACE40SBG", "ACE50SBG", "ACE63SBG", "ACE80SBG", "ACE100SBG", "ACE125SBG", "ASE12", "ASE16", "ASE20", "ASE25", "ASE32SG", "ASE40SG", "ASE50SG", "ASE63SG", "ASE80SG", "ASE100SG", "ASE125SG", "ASE12SB", "ASE16SB", "ASE20SB", "ASE25SB", "ASE32SBG", "ASE40SBG", "ASE50SBG", "ASE63SBG", "ASE80SBG", "ASE100SBG", "ASE125SBG", "ATE12S", "ATE16S", "ATE20S", "ATE25S", "ATE32SG", "ATE40SG", "ATE50SG", "ATE63SG", "ATE80SG", "ATE100SG", "ATE125SG", "ATE12SB", "ATE16SB", "ATE20SB", "ATE25SB", "ATE32SBG", "ATE40SBG", "ATE50SBG", "ATE63SBG", "ATE80SBG", "ATE100SBG", "ATE125SBG",];

const familiaCcb = ["CCB12-F", "CCB16-F", "CCB20-F", "CCB25-F", "CCB32-F", "CCB40-F", "CCB50-F", "CCB63-F", "CCB80-F", "CCB100-F", "CCB12-M", "CCB16-M", "CCB20-M", "CCB25-M", "CCB32-M", "CCB40-M", "CCB50-M", "CCB63-M", "CCB80-M", "CCB100-M", "CCB16L-M", "CCMB12-F", "CCMB16-F", "CCMB20-F", "CCMB25-F", "CCMB32-F", "CCMB40-F", "CCMB50-F", "CCMB63-F", "CCMB80-F", "CCMB100-F", "CCMB16L-F", "CCMB20L-F", "CCMB25L-F", "CCMB12-M", "CCMB16-M", "CCMB20-M", "CCMB25-M", "CCMB32-M", "CCMB40-M", "CCMB50-M", "CCMB63-M", "CCMB80-M", "CCMB100-M", "CCMB16L-M", "CCMB20L-M", "CCMB25L-M"];

/* ==========================================================================
  2) DOCUMENT READY E INICIALIZAÇÃO
========================================================================== */
$(document).ready(function () {
  initSelects();
  initEventosGlobais();
  carregarCilindros();
});

function initSelects() {
  $('#select-cilindro').select2({
    placeholder: 'Selecione um cilindro',
    allowClear: true,
    width: '220px'
  });
  $('select').not('#select-cilindro').select2({ width: 'resolve' });
}

function carregarCilindros() {
  const sel = $('#select-cilindro');

  // Feedback visual de carregamento
  sel.empty().append('<option value="">Carregando dados da API...</option>');
  sel.prop('disabled', true).trigger('change');

  fetch(urlAPI)
    .then(r => r.json())
    .then(data => {
      if (!Array.isArray(data)) throw new Error('Resposta inválida da API');
      dadosPlanilha = data;
      const cilindros = [...new Set(data.map(i => i.cilindro).filter(Boolean))];

      sel.empty().append('<option></option>');
      cilindros.forEach(c => sel.append(new Option(c, c)));
      sel.prop('disabled', false).trigger('change');
    })
    .catch(err => {
      console.error('Erro ao carregar dados:', err);
      sel.empty().append('<option value="">(Erro ao carregar dados)</option>');
      sel.trigger('change');
    });
}

/* ==========================================================================
  3) ROTEADOR E EVENTOS GLOBAIS
========================================================================== */
function initEventosGlobais() {
  // Imprimir
  $('#btnImprimir').on('click', validarAntesDeImprimir);

  // Sincronização de Cabeçalho
  $('#select-nome').on('change', function () {
    const nomeUpper = $(this).val() ? $(this).val().toString().toUpperCase() : '';
    $('.campo-nome').val(nomeUpper);
  });
  $('#datahaste').on('input change', () => $('.campo-data').val($('#datahaste').val()));
  $('#horahaste').on('input change', () => $('.campo-hora').val($('#horahaste').val()));

  $('input[type="radio"].grupo-prioridade').on('change', function () {
    if (!this.value) return;
    $('input[type="radio"].grupo-prioridade').filter(`[value="${this.value}"]`).prop('checked', true);
  });

  $('#quantidadeHaste').on('input change', function () {
    const val = $(this).val();
    $('.campo-quantidade').val(val);
    quantidadeHasteBackup = parseInt(val, 10) || null;
    if (moduloAtivo) moduloAtivo.recalcular();
  });
  $('#codigo-haste').on('input change', () => $('.campo-codigo').val($('#codigo-haste').val()));

  // Mudança do cilindro principal (ROTEAMENTO)
  $('#select-cilindro').on('change', () => {
    const cilindro = $('#select-cilindro').val() || "";

    // Define o módulo ativo
    if (ModuloCP.verificar(cilindro)) {
      moduloAtivo = ModuloCP;
    } else if (typeof ModuloCDVU !== 'undefined' && ModuloCDVU.verificar(cilindro)) {
      moduloAtivo = ModuloCDVU;
    } else if (familiaCcn.includes(cilindro)) {
      moduloAtivo = ModuloCCN;
    } else if (familiaMi.includes(cilindro) || cilindro.startsWith("MI")) {
      moduloAtivo = ModuloMI;
    } else if (ModuloSAI && ModuloSAI.verificar(cilindro)) {
      moduloAtivo = ModuloSAI;
    } else if (typeof ModuloCT !== 'undefined' && ModuloCT.verificar(cilindro)) {
      moduloAtivo = ModuloCT;
    } else if (typeof ModuloCSM !== 'undefined' && ModuloCSM.verificar(cilindro)) {
      moduloAtivo = ModuloCSM;
    } else if (typeof ModuloG !== 'undefined' && ModuloG.verificar(cilindro)) {
      moduloAtivo = ModuloG;
    } else if (typeof ModuloCCB !== 'undefined' && ModuloCCB.verificar(cilindro)) {
      moduloAtivo = ModuloCCB;
    } else if (typeof ModuloCCN !== 'undefined' && ModuloCCN.verificar(cilindro)) {
      moduloAtivo = ModuloCCN;
    } else if (typeof ModuloACE !== 'undefined' && ModuloACE.verificar(cilindro)) {
      moduloAtivo = ModuloACE;
    } else {
      moduloAtivo = null;
    }

    resetarCamposCursoQtd();
    resetarCheckBoxesGlobais();

    // Reset visual de todas as folhas antes de aplicar o módulo
    OcultarTodasFolhas();

    if (moduloAtivo) {
      const item = dadosPlanilha.find(d => d.cilindro === cilindro);
      if (item) {
        moduloAtivo.preencher(item);
        moduloAtivo.aplicarUI();
        moduloAtivo.recalcular();
        moduloAtivo.atualizarCodigo();
      }
    }
  });

  // Alterações genéricas que disparam o recalculo do módulo ativo
  $('#curso').on('input', () => {
    if (moduloAtivo) {
      moduloAtivo.recalcular();
      moduloAtivo.atualizarCodigo();
    }
  });

  $('#chkInox, #chkViton').on('change', () => {
    if (moduloAtivo) moduloAtivo.atualizarCodigo();
  });

  $('#chkPassante').on('change', function () {
    const valQtd = parseInt($('#quantidadeHaste').val(), 10) || 0;
    if (this.checked && valQtd <= 0) {
      this.checked = false;
      return mostrarErro('#quantidadeHaste', "⚠️ Insira a QUANTIDADE antes de marcar Passante!");
    }

    if (moduloAtivo) {
      moduloAtivo.aplicarUI();
      moduloAtivo.recalcular();
      moduloAtivo.atualizarCodigo();
    }
    togglePhPrPassanteVisibility(this.checked);
  });

  // Botões de Prolongamento que delegam para o módulo ativo
  $('#botaoAdicionaPr').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.adicionaPR) moduloAtivo.adicionaPR(safeParseFloat($('#inputAdicionaPr').val()), $('#inputAdicionaPr'));
  });
  $('#botaoRemovePr').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.removePR) moduloAtivo.removePR($('#inputAdicionaPr'));
  });

  $('#botaoAdicionaPh').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.adicionaPH) moduloAtivo.adicionaPH(safeParseFloat($('#inputAdicionaPh').val()), $('#inputAdicionaPh'));
  });
  $('#botaoRemovePh').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.removePH) moduloAtivo.removePH($('#inputAdicionaPh'));
  });

  $('#btnAddPhPassante').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.adicionaPHpassante) moduloAtivo.adicionaPHpassante(safeParseFloat($('#inputPhPassante').val()), $('#inputPhPassante'));
  });
  $('#btnDelPhPassante').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.removePHpassante) moduloAtivo.removePHpassante($('#inputPhPassante'));
  });

  $('#btnAddPrPassante').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.adicionaPRpassante) moduloAtivo.adicionaPRpassante(safeParseFloat($('#inputPrPassante').val()), $('#inputPrPassante'));
  });
  $('#btnDelPrPassante').on('click', (e) => {
    if (e) e.preventDefault();
    if (moduloAtivo && moduloAtivo.removePRpassante) moduloAtivo.removePRpassante($('#inputPrPassante'));
  });
}

function feedbackInput($input, valido) {
  if (valido) {
    $input.css({ 'border': '2px solid green', 'background-color': '#e6ffe6' });
  } else {
    $input.css({ 'border': '2px solid red', 'background-color': '#ffe6e6' });
  }
}

function mostrarErro(selector, mensagem) {
  $('.erro-validacao').removeClass('erro-validacao');
  const $campo = $(selector);

  if ($campo.length) {
    $campo.addClass('erro-validacao');
    $('html, body').animate({ scrollTop: $campo.offset().top - 100 }, 200);
    $campo.focus();
  }

  let $banner = $('#alerta-erro');
  if ($banner.length === 0) {
    $banner = $('<div id="alerta-erro"></div>').appendTo('body');
    $banner.css({
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: '#f44336', color: 'white', padding: '15px 30px',
      borderRadius: '5px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
      zIndex: '9999', fontSize: '18px', fontWeight: 'bold', display: 'none',
      textAlign: 'center'
    });
  }
  $banner.text(mensagem).stop(true, true).fadeIn().delay(3500).fadeOut();
}

function validarAntesDeImprimir(e) {
  if (e && e.preventDefault) e.preventDefault();

  const cilindro = $('#select-cilindro').val();
  const quantidade = $('#quantidadeHaste').val() ? $('#quantidadeHaste').val().toString().trim() : "";
  const curso = $('#curso').val() ? $('#curso').val().toString().trim() : "";

  if (!cilindro) return mostrarErro('#select-cilindro', "⚠️ Selecione o CILINDRO!");
  if (!curso || curso === "0") return mostrarErro('#curso', "⚠️ O campo CURSO é obrigatório!");
  if (!quantidade || quantidade === "0") return mostrarErro('#quantidadeHaste', "⚠️ O campo QUANTIDADE é obrigatório!");

  const prioridade = $('input[name="prioridade"]:checked').val();
  const data = $('#datahaste').val() ? $('#datahaste').val().toString().trim() : "";
  const nome = $('#select-nome').val() ? $('#select-nome').val().toString().trim() : '';

  if (!prioridade) return mostrarErro('.grupo-prioridade', "⚠️ Selecione a PRIORIDADE!");
  if (!data) return mostrarErro('#datahaste', "⚠️ O campo DATA é obrigatório!");
  if (!nome) return mostrarErro('#select-nome', "⚠️ O campo NOME é obrigatório!");

  if (moduloAtivo && moduloAtivo.validarImpresso) {
    if (!moduloAtivo.validarImpresso()) return;
  }

  window.print();
}

$(document).on('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
    e.preventDefault();
    validarAntesDeImprimir(e);
  }
});

/* ==========================================================================
  4) FUNÇÕES UTILITÁRIAS
========================================================================== */
function safeParseFloat(value) {
  if (value === null || value === undefined) return 0;
  const cleaned = String(value).replace(/[^0-9,.-]+/g, '').trim();
  if (cleaned === '') return 0;
  return parseFloat(cleaned.replace(',', '.')) || 0;
}

function feedbackInput($input, ok = false) {
  $input.removeClass("input-erro input-ok");
  if (ok) $input.addClass("input-ok");
  else {
    $input.addClass("input-erro");
    setTimeout(() => $input.removeClass("input-erro"), 1200);
  }
}

function resetarCamposCursoQtd() {
  $('#curso').val('');
  $('#quantidadeHaste').val('');
  quantidadeHasteBackup = null;
  $('.campo-quantidade').val('');
  $('#input-qtd-haste').val('');
  $('.val-input-qtd-haste-passante').val('');

  // Limpa campos visuais dependentes do curso
  $('.val-medidaHaste').val('');
  $('.val-medidaHaste-passante').val('');
  $('#medidaTubo').val('');

  // Limpa e oculta as imagens por padrão
  $('#imagemHaste').attr('src', '');
  $('.val-imagemHaste-passante').attr('src', '');
  $('#imagemTubo').attr('src', '');
}

function resetarCheckBoxesGlobais() {
  $('#chkPassante').prop('checked', false);
  $('#chkInox').prop('checked', false);
  $('#chkViton').prop('checked', false);
  togglePhPrPassanteVisibility(false);
}

function OcultarTodasFolhas() {
  $('#cabecalho-global').addClass('hidden');
  $('#prioridade-global').addClass('hidden');
  $('#dados-haste-global').addClass('hidden');
  $('.imghaste').first().addClass('hidden');
  $('#hasteCp').addClass('hidden');
  $('#hastePassanteCp').addClass('hidden');
  $('#folha-tubo-cp').addClass('hidden');
  $('#hasteSai').addClass('hidden');
  $('#folha-tubo-sai').addClass('hidden');
  $('#folha-tirantes-sai').addClass('hidden');
  $('#hasteCt').addClass('hidden');
  $('#hastePassanteCt').addClass('hidden');
  $('#folha-tubo-ct').addClass('hidden');
  $('#folha-tirantes-ct').addClass('hidden');
  $('#hasteCsm').addClass('hidden');
  $('#hasteCsmExtra').addClass('hidden');
  $('#hastePassanteCsm').addClass('hidden');
  $('#folha-tubo-csm').addClass('hidden');
  $('#paginaGuiasG').addClass('hidden');

  // Novas famílias (CCN, MI, CDVU, etc)
  $('#hasteCdvu').addClass('hidden');
  $('#hasteCdvuExtra').addClass('hidden');
  $('#hastePassanteCdvu').addClass('hidden');
  $('#folha-tubo-cdvu').addClass('hidden');
  $('#hasteCcn').addClass('hidden');
  $('#folha-tubo-ccn').addClass('hidden');
  $('#paginaGuiasCcn').addClass('hidden');
  $('#hasteMi').addClass('hidden');
  $('#hasteMiExtra').addClass('hidden');
  $('#hastePassanteMi').addClass('hidden');
  $('#folha-tubo-mi').addClass('hidden');
  $('#hasteAce').addClass('hidden');
  $('#hasteAceExtra').addClass('hidden');
  $('#hastePassanteAce').addClass('hidden');
  $('#folha-tubo-ace').addClass('hidden');
  $('#paginaCcb').addClass('hidden');
  $('#hasteCcb').addClass('hidden');
  $('#hasteCcbPassante').addClass('hidden');
  $('#hasteCcbExtra').addClass('hidden');
  $('#folha-tubo-ccb').addClass('hidden');
  $('#folha-tubo-ccb-extra').addClass('hidden');
  $('#info-ccb').addClass('hidden');
  $('#info-ccb-extra').addClass('hidden');
}

function togglePhPrPassanteVisibility(show) {
  $('#grupo-ph-passante').toggleClass('hidden', !show);
}

/* ==========================================================================
  5) MÓDULO: FAMÍLIA CP
========================================================================== */
const ModuloCP = {
  estado: {
    medidaHasteBase: 0,
    medidaHasteBasePassante: 0,
    medidaTuboBase: 0,
    rdBase: "",
    crdBase: 0,
    materiaPrimaBase: "",

    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  verificar: function (cilindro) {
    return familiaCp.includes(cilindro);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;
    $('#inputAdicionaPh, #inputAdicionaPr, #inputPhPassante, #inputPrPassante').removeClass('input-ok input-erro').val('');

    // HASTE
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('.val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    $('.val-diametroHaste').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);

    $('.val-medidaRoscaTraseira').val(item.medidaRT || "");

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidardacedb || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRDacedb || '0');
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('.val-ebc').val(item.medidarebaixo || "");
    $('.val-cbc').val(item.medidacomprimento || "");

    // PASSANTE
    this.estado.medidaHasteBasePassante = safeParseFloat(item.cortepassante);
    $('.val-medidaHaste-passante').val(`${this.estado.medidaHasteBasePassante}mm`);
    $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase);
    $('.val-diametroHaste-passante').val(item.diametrohaste || "");
    if (item.imgpassante) $('.val-imagemHaste-passante').attr("src", item.imgpassante);
    $('.val-medidaRoscaTraseira-passante').val(item.medidaRTpassante || "");
    $('.val-ebc-passante').val(item.medidarebaixo || "");
    $('.val-cbc-passante').val(item.medidacomprimento || "");

    $('.val-diamR').val(item.diamrebbocadechave || "");
    $('.val-compR').val(item.rebaixobocadechave || "");
    $('.val-diamRPassante').val(item.diamrebbocadechave || "");
    $('.val-CRPassante').val(item.rebaixobocadechave || "");
    $('.val-diamR-passante').val(item.diamrebbocadechave || "");
    $('.val-compR-passante').val(item.rebaixobocadechave || "");

    // TUBO CP
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#materiaPrimaTubo').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo').attr("src", item.imagemdotubo);
    $('#roscaTubo').val(item.rosca || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('.val-medidaHaste').val(`${totalHaste}mm`);



    // Haste Passante
    const totalPass = this.estado.medidaHasteBasePassante + curso + this.estado.prolongamentoHastePassante + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaHaste-passante').val(`${totalPass}mm`);

    // Tubo
    $('#medidaTubo').val(`${this.estado.medidaTuboBase + curso}mm`);

    // Rosca Dianteira
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Rosca Passante
    const totalRdPass = this.estado.crdBase + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${totalRdPass}mm`);
  },

  atualizarCodigo: function () {
    const cilindro = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    let codigo = curso ? `${cilindro} - ${curso}` : cilindro;

    if ($('#chkViton').is(':checked')) codigo += " - V";
    if ($('#chkPassante').is(':checked')) codigo += " - P";
    if ($('#chkInox').is(':checked')) codigo += " - I";

    if (this.estado.prolongamentoHaste > 0) codigo += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigo += ` - PR${this.estado.prolongamentoRosca}`;

    if ($('#chkPassante').is(':checked')) {
      if (this.estado.prolongamentoHastePassante > 0) codigo += ` - PH${this.estado.prolongamentoHastePassante}`;
      if (this.estado.prolongamentoRoscaPassante > 0) codigo += ` - PR${this.estado.prolongamentoRoscaPassante}`;
    }

    // inox matéria prima update
    if ($('#chkInox').is(':checked')) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase || '');
    }

    $('.campo-codigo').val(codigo);
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');
    $('#hasteCp').removeClass('hidden');
    $('#folha-tubo-cp').removeClass('hidden');

    const passante = $('#chkPassante').is(':checked');
    if (passante) {
      $('#hastePassanteCp').removeClass('hidden');
    } else {
      $('#hastePassanteCp').addClass('hidden');
    }
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  validarImpresso: function () {
    const phDigitado = safeParseFloat($('#inputAdicionaPh').val());
    if (!isNaN(phDigitado) && phDigitado > 0 && phDigitado !== this.estado.prolongamentoHaste) {
      alert("⚠️ Você digitou um valor para PH mas não clicou em ADICIONAR.");
      return false;
    }
    const prDigitado = safeParseFloat($('#inputAdicionaPr').val());
    if (!isNaN(prDigitado) && prDigitado > 0 && prDigitado !== this.estado.prolongamentoRosca) {
      alert("⚠️ Você digitou um valor para PR mas não clicou em ADICIONAR.");
      return false;
    }
    const phPDigitado = safeParseFloat($('#inputPhPassante').val());
    if (!isNaN(phPDigitado) && phPDigitado > 0 && phPDigitado !== this.estado.prolongamentoHastePassante) {
      alert("⚠️ Você digitou um valor para PH-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    const prPDigitado = safeParseFloat($('#inputPrPassante').val());
    if (!isNaN(prPDigitado) && prPDigitado > 0 && prPDigitado !== this.estado.prolongamentoRoscaPassante) {
      alert("⚠️ Você digitou um valor para PR-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    return true;
  }
};

/* ==========================================================================
  MÓDULO: FAMÍLIA CDVU
========================================================================== */
const ModuloCDVU = {
  estado: {
    medidaHasteBase: 0,
    medidaHasteBasePassante: 0,
    medidaTuboBase: 0,
    rdBase: "",
    crdBase: 0,
    materiaPrimaBase: "",

    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  verificar: function (cilindro) {
    return familiaCdvu.includes(cilindro);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;
    $('#inputAdicionaPh, #inputAdicionaPr, #inputPhPassante, #inputPrPassante').removeClass('input-ok input-erro').val('');

    // HASTE
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('.val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    $('.val-diametroHaste').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);

    $('.val-medidaRoscaTraseira').val(item.medidaRT || "");

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('.val-ebc').val(item.medidarebaixo || "");
    $('.val-cbc').val(item.medidacomprimento || "");

    // PASSANTE
    this.estado.medidaHasteBasePassante = safeParseFloat(item.cortepassante);
    $('.val-medidaHaste-passante').val(`${this.estado.medidaHasteBasePassante}mm`);
    $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase);
    $('.val-diametroHaste-passante').val(item.diametrohaste || "");
    if (item.imgpassante) $('.val-imagemHaste-passante').attr("src", item.imgpassante);
    $('.val-medidaRoscaTraseira-passante').val(item.medidaRTpassante || "");
    $('.val-ebc-passante').val(item.medidarebaixo || "");
    $('.val-cbc-passante').val(item.medidacomprimento || "");

    $('.val-diamR').val(item.diamrebbocadechave || "");
    $('.val-compR').val(item.rebaixobocadechave || "");
    $('.val-diamRPassante').val(item.diamrebbocadechave || "");
    $('.val-CRPassante').val(item.rebaixobocadechave || "");
    $('.val-diamR-passante').val(item.diamrebbocadechave || "");
    $('.val-compR-passante').val(item.rebaixobocadechave || "");

    // TUBO CDVU
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#materiaPrimaTubo-cdvu').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-cdvu').attr("src", item.imagemdotubo);
    $('#roscaTubo-cdvu').val(item.rosca || "");

    ModuloCdvuExtra.preencher(item);
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('.val-medidaHaste').val(`${totalHaste}mm`);

    // Haste Passante
    const totalPass = this.estado.medidaHasteBasePassante + curso + this.estado.prolongamentoHastePassante + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaHaste-passante').val(`${totalPass}mm`);

    // Tubo
    $('#medidaTubo-cdvu').val(`${this.estado.medidaTuboBase + curso}mm`);

    // Rosca Dianteira
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Rosca Passante
    const totalRdPass = this.estado.crdBase + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${totalRdPass}mm`);

    ModuloCdvuExtra.recalcular();
  },

  atualizarCodigo: function () {
    const cilindro = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    let codigo = curso ? `${cilindro} - ${curso}` : cilindro;

    if ($('#chkViton').is(':checked')) codigo += " - V";
    if ($('#chkPassante').is(':checked')) codigo += " - P";
    if ($('#chkInox').is(':checked')) codigo += " - I";

    if (this.estado.prolongamentoHaste > 0) codigo += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigo += ` - PR${this.estado.prolongamentoRosca}`;

    if ($('#chkPassante').is(':checked')) {
      if (this.estado.prolongamentoHastePassante > 0) codigo += ` - PH${this.estado.prolongamentoHastePassante}`;
      if (this.estado.prolongamentoRoscaPassante > 0) codigo += ` - PR${this.estado.prolongamentoRoscaPassante}`;
    }

    // inox matéria prima update
    if ($('#chkInox').is(':checked')) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase || '');
    }

    $('.campo-codigo').val(codigo);
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');
    $('#hasteCdvu').removeClass('hidden');
    $('#folha-tubo-cdvu').removeClass('hidden');

    const passante = $('#chkPassante').is(':checked');
    if (passante) {
      $('#hastePassanteCdvu').removeClass('hidden');
      $('#hasteCdvuExtra').removeClass('hidden');
      $('#hasteCdvu').addClass('hidden');
      $('.imghaste').first().addClass('hidden');
    } else {
      $('#hastePassanteCdvu').addClass('hidden');
      $('#hasteCdvuExtra').addClass('hidden');
      $('#hasteCdvu').removeClass('hidden');
      $('.imghaste').first().removeClass('hidden');
    }
  },


  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    ModuloCdvuExtra.adicionaPH(valor, $input);
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    ModuloCdvuExtra.removePH($input);
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    ModuloCdvuExtra.adicionaPR(valor, $input);
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    ModuloCdvuExtra.removePR($input);
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  validarImpresso: function () {
    const phDigitado = safeParseFloat($('#inputAdicionaPh').val());
    if (!isNaN(phDigitado) && phDigitado > 0 && phDigitado !== this.estado.prolongamentoHaste) {
      alert("⚠️ Você digitou um valor para PH mas não clicou em ADICIONAR.");
      return false;
    }
    const prDigitado = safeParseFloat($('#inputAdicionaPr').val());
    if (!isNaN(prDigitado) && prDigitado > 0 && prDigitado !== this.estado.prolongamentoRosca) {
      alert("⚠️ Você digitou um valor para PR mas não clicou em ADICIONAR.");
      return false;
    }
    const phPDigitado = safeParseFloat($('#inputPhPassante').val());
    if (!isNaN(phPDigitado) && phPDigitado > 0 && phPDigitado !== this.estado.prolongamentoHastePassante) {
      alert("⚠️ Você digitou um valor para PH-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    const prPDigitado = safeParseFloat($('#inputPrPassante').val());
    if (!isNaN(prPDigitado) && prPDigitado > 0 && prPDigitado !== this.estado.prolongamentoRoscaPassante) {
      alert("⚠️ Você digitou um valor para PR-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    return true;
  }
};

/* ==========================================================================
  6) MÓDULO: FAMÍLIA CT
========================================================================== */
const ModuloCT = {
  estado: {
    medidaHasteBase: 0,
    medidaHasteBasePassante: 0,
    medidaTuboBase: 0,
    medidaTiranteBase: 0,
    rdBase: "",
    crdBase: 0,
    materiaPrimaBase: "",

    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  verificar: function (cilindro) {
    return familiaCt.includes(cilindro);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;
    $('#inputAdicionaPh, #inputAdicionaPr, #inputPhPassante, #inputPrPassante').removeClass('input-ok input-erro').val('');

    // HASTE
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('.val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    $('.val-diametroHaste').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);

    $('.val-medidaRoscaTraseira').val(item.medidaRT || "");

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('.val-ebc').val(item.medidarebaixo || "");
    $('.val-cbc').val(item.medidacomprimento || "");

    // PASSANTE
    this.estado.medidaHasteBasePassante = safeParseFloat(item.cortepassante);
    $('.val-medidaHaste-passante').val(`${this.estado.medidaHasteBasePassante}mm`);
    $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase);
    $('.val-diametroHaste-passante').val(item.diametrohaste || "");
    if (item.imgpassante) $('.val-imagemHaste-passante').attr("src", item.imgpassante);
    $('.val-medidaRoscaTraseira-passante').val(item.medidaRTpassante || "");
    $('.val-ebc-passante').val(item.medidarebaixo || "");
    $('.val-cbc-passante').val(item.medidacomprimento || "");

    $('.val-diamR').val(item.diamrebbocadechave || "");
    $('.val-compR').val(item.rebaixobocadechave || "");
    $('.val-diamRPassante').val(item.diamrebbocadechave || "");
    $('.val-CRPassante').val(item.rebaixobocadechave || "");
    $('.val-diamR-passante').val(item.diamrebbocadechave || "");
    $('.val-compR-passante').val(item.rebaixobocadechave || "");

    // TUBO CT
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#medidaTubo-ct').val(this.estado.medidaTuboBase > 0 ? `${this.estado.medidaTuboBase}mm` : "");
    $('#materiaPrimaTubo-ct').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-ct').attr("src", item.imagemdotubo);
    $('#roscaTubo-ct').val(item.rosca || "");

    // TIRANTES (se existir folha-tirantes-ct futuramente)
    this.estado.medidaTiranteBase = safeParseFloat(item.medidatirante);
    $('#medidaTirante-ct').val(this.estado.medidaTiranteBase > 0 ? `${this.estado.medidaTiranteBase}mm` : "");
    $('#diametroTirante-ct').val(item.diametrotirante || "");
    $('#medidaRoscaDianteiraTirante-ct').val(item.roscatirante || "");
    $('#medidaRoscaTraseiraTirante-ct').val(item.roscatiranteb || "");
    if (item.imagemtirante) $('#imagemTirante-ct').attr("src", item.imagemtirante);
    $('#materiaPrimaTirante-ct').val(item.materiaprimatirante || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('.val-medidaHaste').val(`${totalHaste}mm`);

    // Haste Passante
    const totalPass = this.estado.medidaHasteBasePassante + curso + this.estado.prolongamentoHastePassante + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaHaste-passante').val(`${totalPass}mm`);

    // Tubo
    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-ct').val(`${totalTubo}mm`);
    }

    // Tirantes
    const totalTirante = this.estado.medidaTiranteBase > 0 ? this.estado.medidaTiranteBase + curso : 0;
    if (totalTirante > 0) {
      $('#medidaTirante-ct').val(`${totalTirante}mm`);
    }

    // Rosca Dianteira
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Rosca Passante
    const totalRdPass = this.estado.crdBase + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${totalRdPass}mm`);

    // Quantidades Tubo e Tirantes
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;
    if (valQtd > 0) {
      $('#folha-tubo-ct .campo-quantidade').val(valQtd);
      $('#input-qtd-tirante-ct').val(valQtd * 4);
    }
  },

  atualizarCodigo: function () {
    const cilindro = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    let codigo = curso ? `${cilindro} - ${curso}` : cilindro;

    if ($('#chkViton').is(':checked')) codigo += " - V";
    if ($('#chkPassante').is(':checked')) codigo += " - P";
    if ($('#chkInox').is(':checked')) codigo += " - I";

    if (this.estado.prolongamentoHaste > 0) codigo += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigo += ` - PR${this.estado.prolongamentoRosca}`;

    if ($('#chkPassante').is(':checked')) {
      if (this.estado.prolongamentoHastePassante > 0) codigo += ` - PH${this.estado.prolongamentoHastePassante}`;
      if (this.estado.prolongamentoRoscaPassante > 0) codigo += ` - PR${this.estado.prolongamentoRoscaPassante}`;
    }

    // inox matéria prima update
    if ($('#chkInox').is(':checked')) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase || '');
    }

    $('.campo-codigo').val(codigo);
    $('#codigo-tirante-ct').val(codigo);
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');
    $('#hasteCt').removeClass('hidden');

    // Mostra Tubo CT se existir
    $('#folha-tubo-ct').removeClass('hidden');

    // Mostra Haste Passante se marcado e se existir
    const passante = $('#chkPassante').is(':checked');
    if (passante) {
      $('#hastePassanteCt').removeClass('hidden');
    } else {
      $('#hastePassanteCt').addClass('hidden');
    }

    // Mostra Tirantes CT (todos os cilindros CT)
    $('#folha-tirantes-ct').removeClass('hidden');
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  validarImpresso: function () {
    const phDigitado = safeParseFloat($('#inputAdicionaPh').val());
    if (!isNaN(phDigitado) && phDigitado > 0 && phDigitado !== this.estado.prolongamentoHaste) {
      alert("⚠️ Você digitou um valor para PH mas não clicou em ADICIONAR.");
      return false;
    }
    const prDigitado = safeParseFloat($('#inputAdicionaPr').val());
    if (!isNaN(prDigitado) && prDigitado > 0 && prDigitado !== this.estado.prolongamentoRosca) {
      alert("⚠️ Você digitou um valor para PR mas não clicou em ADICIONAR.");
      return false;
    }
    const phPDigitado = safeParseFloat($('#inputPhPassante').val());
    if (!isNaN(phPDigitado) && phPDigitado > 0 && phPDigitado !== this.estado.prolongamentoHastePassante) {
      alert("⚠️ Você digitou um valor para PH-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    const prPDigitado = safeParseFloat($('#inputPrPassante').val());
    if (!isNaN(prPDigitado) && prPDigitado > 0 && prPDigitado !== this.estado.prolongamentoRoscaPassante) {
      alert("⚠️ Você digitou um valor para PR-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    return true;
  }
};

/* ==========================================================================
  7) MÓDULO: FAMÍLIA SAI
========================================================================== */
const ModuloSAI = {
  estado: {
    medidaHasteBase: 0,
    medidaHasteBasePassante: 0,
    medidaTuboBase: 0,
    rdBase: "",
    crdBase: 0,
    materiaPrimaBase: "",

    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  verificar: function (cilindro) {
    return familiaSai.includes(cilindro);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;
    $('#inputAdicionaPh, #inputAdicionaPr, #inputPhPassante, #inputPrPassante').removeClass('input-ok input-erro').val('');

    // HASTE
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('.val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    $('.val-diametroHaste').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);

    $('.val-medidaRoscaTraseira').val(item.medidaRT || "");
    $('.val-diamR').val(item.diamrebbocadechave || "");
    $('.val-compR').val(item.rebaixobocadechave || "");

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('.val-ebc').val(item.medidarebaixo || "");
    $('.val-cbc').val(item.medidacomprimento || "");

    // TUBO
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#medidaTubo-sai').val(this.estado.medidaTuboBase > 0 ? `${this.estado.medidaTuboBase}mm` : "");

    if (item.imagemdotubo) $('#imagemTubo-sai').attr("src", item.imagemdotubo);
    $('#roscaTubo-sai').val(item.rosca || "");
    $('#materiaPrimaTubo-sai').val(item.materiaprimatubo || "");

    // TIRANTES (SEMPRE PREENCHE, SÓ EXIBE SE FOR 160 OU 200)
    this.estado.medidaTiranteBase = safeParseFloat(item.medidatirante);
    $('#medidaTirante-sai').val(this.estado.medidaTiranteBase > 0 ? `${this.estado.medidaTiranteBase}mm` : "");
    $('#diametroTirante-sai').val(item.diametrotirante || "");
    $('#medidaRoscaDianteiraTirante-sai').val(item.roscatirante || "");
    $('#medidaRoscaTraseiraTirante-sai').val(item.roscatiranteb || "");
    if (item.imagemtirante) $('#imagemTirante-sai').attr("src", item.imagemtirante);
    // Nota: mptirante não foi especificado, se existir, usará o valor. Se não, não fará nada.
    $('#materiaPrimaTirante-sai').val(item.materiaprimatirante || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('.val-medidaHaste').val(`${totalHaste}mm`);

    // Rosca Dianteira
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Tubo
    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-sai').val(`${totalTubo}mm`);
    }

    // Tirantes
    const totalTirante = this.estado.medidaTiranteBase > 0 ? this.estado.medidaTiranteBase + curso : 0;
    if (totalTirante > 0) {
      $('#medidaTirante-sai').val(`${totalTirante}mm`);
    }

    // Lógica de Quantidades Globais
    const passanteAtivo = $('#chkPassante').is(':checked');
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;

    if (valQtd > 0) {
      // Haste (Dobrar se passante)
      if (passanteAtivo) {
        $('#input-qtd-haste').val(valQtd * 2);
      } else {
        $('#input-qtd-haste').val(valQtd);
      }

      // Tubo (Sempre 1x)
      $('#folha-tubo-sai .campo-quantidade').val(valQtd);

      // Tirantes (Sempre 4x)
      $('#input-qtd-tirante-sai').val(valQtd * 4);
    } else {
      $('.campo-quantidade').val("");
    }
  },

  atualizarCodigo: function () {
    const cilindro = $('#select-cilindro').val() || "";
    const cursoRaw = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    const passanteAtivo = $('#chkPassante').is(':checked');
    const inoxAtivo = $('#chkInox').is(':checked');

    // Extrai número (ex: "SAI32SNG" -> "32")
    const matchNum = cilindro.match(/(\d+)/);
    const numero = matchNum ? matchNum[1] : "";

    // Extrai o prefixo base (ex: "SAI" ou "BSAI")
    const basePrefixo = cilindro.split(numero)[0];

    // Extrai o sufixo original (ex: "SNG")
    let sufixo = cilindro.replace(basePrefixo, "").replace(numero, "");

    // Ajuste específico para Viton → trocar N por H (SNG → SHG)
    if ($('#chkViton').is(':checked')) {
      sufixo = sufixo.replace("N", "H");
    }

    let prefixo = basePrefixo;
    if (passanteAtivo && !prefixo.includes("D")) prefixo += "D";
    if (inoxAtivo && !prefixo.includes("B")) prefixo += "B";

    let codigo = cilindro;
    if (cursoRaw) {
      codigo = `${prefixo}${numero} X ${cursoRaw}${sufixo}`;
    } else {
      codigo = `${prefixo}${numero}${sufixo}`;
    }

    if (this.estado.prolongamentoHaste > 0) codigo += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigo += ` - PR${this.estado.prolongamentoRosca}`;

    if (passanteAtivo) {
      if (this.estado.prolongamentoHastePassante > 0) codigo += ` - PH${this.estado.prolongamentoHastePassante}`;
      if (this.estado.prolongamentoRoscaPassante > 0) codigo += ` - PR${this.estado.prolongamentoRoscaPassante}`;
    }

    // inox matéria prima update
    if (inoxAtivo) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
    }

    $('.campo-codigo').val(codigo);
    // Garantir que o tirante também receba o código da família
    $('#codigo-tirante-sai').val(codigo);
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');
    $('#hasteSai').removeClass('hidden');
    $('#folha-tubo-sai').removeClass('hidden');

    const cilindro = $('#select-cilindro').val() || "";
    // Tirantes apenas para SAI 160 e SAI 200
    if (cilindro.includes("160") || cilindro.includes("200")) {
      $('#folha-tirantes-sai').removeClass('hidden');
    }
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  validarImpresso: function () {
    const phDigitado = safeParseFloat($('#inputAdicionaPh').val());
    if (!isNaN(phDigitado) && phDigitado > 0 && phDigitado !== this.estado.prolongamentoHaste) {
      alert("⚠️ Você digitou um valor para PH mas não clicou em ADICIONAR.");
      return false;
    }
    const prDigitado = safeParseFloat($('#inputAdicionaPr').val());
    if (!isNaN(prDigitado) && prDigitado > 0 && prDigitado !== this.estado.prolongamentoRosca) {
      alert("⚠️ Você digitou um valor para PR mas não clicou em ADICIONAR.");
      return false;
    }
    return true;
  }
};

/* ==========================================================================
  8) MÓDULO: FAMÍLIA G (GUIAS)
========================================================================= */
const ModuloG = {
  estado: {
    medidaCorteBase: 0,
    materiaPrimaBase: "",
    rdBase: "",
    crdBase: 0,
  },

  verificar: function (cilindro) {
    return typeof familiaG !== 'undefined' && familiaG.includes(cilindro);
  },

  preencher: function (item) {
    this.estado.medidaCorteBase = safeParseFloat(item.medidaguia);
    $('#input-medida-corte-guias').val(this.estado.medidaCorteBase > 0 ? `${this.estado.medidaCorteBase}mm` : "");

    this.estado.materiaPrimaBase = item.materiaprimaguia || '';
    $('#input-materia-prima-guias').val(this.estado.materiaPrimaBase);

    $('#input-diametro-haste-guias').val(item.diametroguia || "");

    // Imagem
    if (item.imagemguia) {
      $('#imagem-guias').attr("src", item.imagemguia);
    } else {
      $('#imagem-guias').attr("src", "");
    }

    // Rosca
    $('#input-medida-rosca-guias').val(item.roscaguia || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Medida de Corte (Base + Curso)
    const totalCorte = this.estado.medidaCorteBase + curso;
    if (totalCorte > 0) {
      $('#input-medida-corte-guias').val(`${totalCorte}mm`);
    } else {
      $('#input-medida-corte-guias').val("");
    }

    const cilindro = $('#select-cilindro').val() || "";
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;

    if (valQtd > 0) {
      if (cilindro.startsWith("GR")) {
        $('#input-qtd-guias').val(valQtd * 2);
      } else {
        $('#input-qtd-guias').val(valQtd);
      }
    } else {
      $('#input-qtd-guias').val("");
    }
  },

  atualizarCodigo: function () {
    const cilindro = $('#select-cilindro').val() || "";
    const cursoRaw = $('#curso').val() ? $('#curso').val().toString().trim() : '';
    let codigo = cursoRaw ? `${cilindro} - ${cursoRaw}` : cilindro;

    $('#codigo-guias').val(codigo);
  },

  aplicarUI: function () {
    $('#paginaGuiasG').removeClass('hidden');
  },

  adicionaPH: function (valor, $input) { },
  removePH: function ($input) { },
  adicionaPR: function (valor, $input) { },
  removePR: function ($input) { },
  adicionaPHpassante: function (valor, $input) { },
  removePHpassante: function ($input) { },
  adicionaPRpassante: function (valor, $input) { },
  removePRpassante: function ($input) { },

  validarImpresso: function () {
    const data = $('#dataguias').val() ? $('#dataguias').val().toString().trim() : "";
    const nome = $('#nomeguias').val() ? $('#nomeguias').val().toString().trim() : '';
    const prioridade = $('input[name="prioridadeGuias"]:checked').val();

    if (!prioridade) {
      mostrarErro('.opcoes-prioridade', "⚠️ Selecione a PRIORIDADE nas Guias!");
      return false;
    }
    if (!data) {
      mostrarErro('#dataguias', "⚠️ O campo DATA é obrigatório!");
      return false;
    }
    if (!nome) {
      mostrarErro('#nomeguias', "⚠️ O campo NOME é obrigatório!");
      return false;
    }
    return true;
  }
};

/* ==========================================================================
  9) MÓDULO: FAMÍLIA CSM
========================================================================== */
const ModuloCSM = {
  estado: {
    medidaHasteBase: 0,
    medidaHasteBasePassante: 0,
    medidaTuboBase: 0,
    rdBase: "",
    crdBase: 0,
    materiaPrimaBase: "",

    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  verificar: function (cilindro) {
    return familiaCsm.includes(cilindro);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;
    $('#inputAdicionaPh, #inputAdicionaPr, #inputPhPassante, #inputPrPassante').removeClass('input-ok input-erro').val('');

    // HASTE
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('.val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    $('.val-diametroHaste').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);

    $('.val-medidaRoscaTraseira').val(item.medidaRT || "");

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('.val-ebc').val(item.medidarebaixo || "");
    $('.val-cbc').val(item.medidacomprimento || "");

    // PASSANTE
    this.estado.medidaHasteBasePassante = safeParseFloat(item.cortepassante);
    $('.val-medidaHaste-passante').val(`${this.estado.medidaHasteBasePassante}mm`);
    $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase);
    $('.val-diametroHaste-passante').val(item.diametrohaste || "");
    if (item.imgpassante) $('.val-imagemHaste-passante').attr("src", item.imgpassante);
    $('.val-medidaRoscaTraseira-passante').val(item.medidaRTpassante || "");
    $('.val-ebc-passante').val(item.medidarebaixo || "");
    $('.val-cbc-passante').val(item.medidacomprimento || "");

    $('.val-diamR').val(item.diamrebbocadechave || "");
    $('.val-compR').val(item.rebaixobocadechave || "");
    $('.val-diamRPassante').val(item.diamrebbocadechave || "");
    $('.val-CRPassante').val(item.rebaixobocadechave || "");
    $('.val-diamR-passante').val(item.diamrebbocadechave || "");
    $('.val-compR-passante').val(item.rebaixobocadechave || "");

    // DELEGAR PARA CSM EXTRA
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.preencher(item);

    // TUBO CSM
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#medidaTubo-csm').val(this.estado.medidaTuboBase > 0 ? `${this.estado.medidaTuboBase}mm` : "");
    $('#materiaPrimaTubo-csm').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-csm').attr("src", item.imagemdotubo);
    $('#roscaTubo-csm').val(item.rosca || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('.val-medidaHaste').val(`${totalHaste}mm`);

    // Haste Passante
    const totalPass = this.estado.medidaHasteBasePassante + curso + this.estado.prolongamentoHastePassante + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaHaste-passante').val(`${totalPass}mm`);

    // Tubo
    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-csm').val(`${totalTubo}mm`);
    }

    // Rosca Dianteira
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Rosca Passante
    const totalRdPass = this.estado.crdBase + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${totalRdPass}mm`);

    // Quantidades Tubo
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;
    if (valQtd > 0) {
      $('#folha-tubo-csm .campo-quantidade').val(valQtd);
    }

    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.recalcular();
  },

  atualizarCodigo: function () {
    const cilindroRaw = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    let baseCilindro = cilindroRaw;
    let sufixo = "";

    if (cilindroRaw.includes("-")) {
      const parts = cilindroRaw.split("-");
      baseCilindro = parts[0];
      sufixo = parts[1];
    } else {
      if (typeof familiaCsm2bA !== 'undefined' && familiaCsm2bA.includes(cilindroRaw)) {
        baseCilindro = cilindroRaw.slice(0, -1);
        sufixo = "A";
      } else if (typeof familiaCsm2bF !== 'undefined' && familiaCsm2bF.includes(cilindroRaw)) {
        baseCilindro = cilindroRaw.slice(0, -1);
        sufixo = "F";
      } else if (typeof familiaCsm2bR !== 'undefined' && familiaCsm2bR.includes(cilindroRaw)) {
        baseCilindro = cilindroRaw.slice(0, -1);
        sufixo = "R";
      }
    }

    let codigo = curso ? `${baseCilindro} - ${curso}${sufixo}` : cilindroRaw;

    if ($('#chkViton').is(':checked')) codigo += " - V";
    if ($('#chkPassante').is(':checked')) codigo += " - P";
    if ($('#chkInox').is(':checked')) codigo += " - I";

    if (this.estado.prolongamentoHaste > 0) codigo += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigo += ` - PR${this.estado.prolongamentoRosca}`;

    if ($('#chkPassante').is(':checked')) {
      if (this.estado.prolongamentoHastePassante > 0) codigo += ` - PH${this.estado.prolongamentoHastePassante}`;
      if (this.estado.prolongamentoRoscaPassante > 0) codigo += ` - PR${this.estado.prolongamentoRoscaPassante}`;
    }

    if ($('#chkInox').is(':checked')) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
      $('.val-materiaPrimaHaste-passante').val(this.estado.materiaPrimaBase || '');
    }

    $('.campo-codigo').val(codigo);
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');

    $('#folha-tubo-csm').removeClass('hidden');

    const passante = $('#chkPassante').is(':checked');
    if (passante) {
      $('#hasteCsm').addClass('hidden');
      $('#hasteCsmExtra').removeClass('hidden');
      $('#hastePassanteCsm').removeClass('hidden');
      $('.imghaste').first().addClass('hidden');
      if (typeof ModuloCsmExtra !== 'undefined') {
        ModuloCsmExtra.aplicarUI();
      }
    } else {
      $('#hasteCsm').removeClass('hidden');
      $('#hasteCsmExtra').addClass('hidden');
      $('#hastePassanteCsm').addClass('hidden');
      $('.imghaste').first().removeClass('hidden');
    }

    const cilindroRaw = $('#select-cilindro').val() || "";
    $('#avanco-mola-csm').addClass('hidden');
    $('#retorno-mola-csm').addClass('hidden');

    if ((typeof familiaCsmA !== 'undefined' && familiaCsmA.includes(cilindroRaw)) ||
      (typeof familiaCsm2bA !== 'undefined' && familiaCsm2bA.includes(cilindroRaw))) {
      $('#avanco-mola-csm').removeClass('hidden');
    }

    if ((typeof familiaCsmR !== 'undefined' && familiaCsmR.includes(cilindroRaw)) ||
      (typeof familiaCsm2bR !== 'undefined' && familiaCsm2bR.includes(cilindroRaw))) {
      $('#retorno-mola-csm').removeClass('hidden');
    }
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.adicionaPH(valor, $input);
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.removePH($input);
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.adicionaPR(valor, $input);
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.removePR($input);
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.adicionaPHpassante(valor, $input);
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.removePHpassante($input);
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.adicionaPRpassante(valor, $input);
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloCsmExtra !== 'undefined') ModuloCsmExtra.removePRpassante($input);
  },

  validarImpresso: function () {
    const phDigitado = safeParseFloat($('#inputAdicionaPh').val());
    if (!isNaN(phDigitado) && phDigitado > 0 && phDigitado !== this.estado.prolongamentoHaste) {
      alert("⚠️ Você digitou um valor para PH mas não clicou em ADICIONAR.");
      return false;
    }
    const prDigitado = safeParseFloat($('#inputAdicionaPr').val());
    if (!isNaN(prDigitado) && prDigitado > 0 && prDigitado !== this.estado.prolongamentoRosca) {
      alert("⚠️ Você digitou um valor para PR mas não clicou em ADICIONAR.");
      return false;
    }
    const phPDigitado = safeParseFloat($('#inputPhPassante').val());
    if (!isNaN(phPDigitado) && phPDigitado > 0 && phPDigitado !== this.estado.prolongamentoHastePassante) {
      alert("⚠️ Você digitou um valor para PH-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    const prPDigitado = safeParseFloat($('#inputPrPassante').val());
    if (!isNaN(prPDigitado) && prPDigitado > 0 && prPDigitado !== this.estado.prolongamentoRoscaPassante) {
      alert("⚠️ Você digitou um valor para PR-PASSANTE mas não clicou em ADICIONAR.");
      return false;
    }
    return true;
  }
};

/* ==========================================================================
  10) MÓDULO: FAMÍLIA CCN
========================================================================== */
// MÓDULO CCB
const ModuloCCB = {
  estado: {
    medidaHasteBase: 0,
    medidaHasteBasePassante: 0,
    medidaTuboBase: 0,
    rdBase: "",
    rdBasePassante: "",
    crdBase: 0,
    crdBasePassante: 0,
    materiaPrimaBase: "",
    materiaPrimaBasePassante: "",
    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  verificar: function (cilindro) {
    return typeof familiaCcb !== 'undefined' && familiaCcb.includes(cilindro);
  },

  preencher: function (item) {
    if (typeof ModuloCCBExtra !== 'undefined') ModuloCCBExtra.preencher(item);

    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;
    $('#inputAdicionaPh, #inputAdicionaPr, #inputPhPassante, #inputPrPassante').removeClass('input-ok input-erro').val('');

    // HASTE NORMAL
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('#hasteCcb .val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    $('#hasteCcb .val-diametroHaste').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);

    $('#hasteCcb .val-medidaRoscaTraseira').val(item.medidaRT || "");

    // ROSCA DIANTEIRA NORMAL
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('#hasteCcb .val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('#hasteCcb .val-ebc').val(item.medidarebaixo || "");
    $('#hasteCcb .val-cbc').val(item.medidacomprimento || "");

    $('#hasteCcb .val-diamR').val(item.diamrebbocadechave || "");
    $('#hasteCcb .val-compR').val(item.rebaixobocadechave || "");

    // HASTE PASSANTE
    this.estado.medidaHasteBasePassante = safeParseFloat(item.cortepassante);
    $('#hasteCcbPassante .val-medidaHaste').val(`${this.estado.medidaHasteBasePassante}mm`);

    this.estado.materiaPrimaBasePassante = item.materiaprimapassante || '';
    $('#materiaPrimaHaste-passante-ccb').val(this.estado.materiaPrimaBasePassante);

    $('#hasteCcbPassante .val-diametroHaste').val(item.diametrohaste || "");
    if (item.imgpassante) $('.val-imagemHaste-passante-ccb').attr("src", item.imgpassante);

    $('#hasteCcbPassante .val-medidaRoscaTraseira').val(item.medidaRTpassante || "");

    // ROSCA DIANTEIRA PASSANTE
    this.estado.rdBasePassante = item.medidardacedb || '';
    this.estado.crdBasePassante = safeParseFloat(item.medidaCRDacedb || '0');
    $('#hasteCcbPassante .val-medidaRoscaDianteira').val(`${this.estado.rdBasePassante} ${this.estado.crdBasePassante}mm`);

    $('#hasteCcbPassante .val-ebc').val(item.medidarebaixo || "");
    $('#hasteCcbPassante .val-cbc').val(item.medidacomprimento || "");

    $('#hasteCcbPassante .val-diamR').val(item.diamrebbocadechave || "");
    $('#hasteCcbPassante .val-compR').val(item.rebaixobocadechave || "");

    // TUBO CCB
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#medidaTubo-ccb').val(this.estado.medidaTuboBase > 0 ? `${this.estado.medidaTuboBase}mm` : "");
    $('#materiaPrimaTubo-ccb').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-ccb').attr("src", item.imagemdotubo);
    $('#roscaTubo-ccb').val(item.rosca || "");

    // IMAGENS PAGINA CCB/CCMB
    if (item.rebaixoDianteiraCCMB) {
      $('#imgRebaixoD, #imgRebaixoDPassante').attr("src", item.rebaixoDianteiraCCMB);
    }
    if (item.rebaixoTraseiraCCMB) {
      $('#imgRebaixoT, #imgRebaixoTPassante').attr("src", item.rebaixoTraseiraCCMB);
    }
    if (item.imgAlimentacao) {
      $('#imgAlimentacao, #imgAlimentacaoPassante').attr("src", item.imgAlimentacao);
    }
    if (item.furacao) {
      $('#imgFixacao, #imgFixacaoPassante').attr("src", item.furacao);
    }

    // CAMPOS DA PÁGINA CCB/CCMB
    $('#codigo-ccmb, #codigo-ccmb-passante').val(item.cilindro || "");

    // Tabela Rebaixo Dianteira
    $('#ccmb-dc, #ccmb-dc-passante').val(item.diametroc || "");
    $('#ccmb-c, #ccmb-c-passante').val(item.c || "");
    $('#ccmb-b, #ccmb-b-passante').val(item.b || "");
    $('#ccmb-a, #ccmb-a-passante').val(item.a || "");
    $('#ccmb-ae, #ccmb-ae-passante').val(item.diametroae || "");

    // Tabela Rebaixo Traseira
    $('#ccmb-dct, #ccmb-dct-passante').val(item.diametroctraseira || "");
    $('#ccmb-ct, #ccmb-ct-passante').val(item.ctraseira || "");
    $('#ccmb-bt, #ccmb-bt-passante').val(item.btraseira || "");
    $('#ccmb-at, #ccmb-at-passante').val(item.atraseira || "");
    $('#ccmb-aet, #ccmb-aet-passante').val(item.diametroaetraseira || "");

    // Alimentação e Fixação
    $('#ccmb-rosca-alimentacao, #ccmb-rosca-alimentacao-passante').val(item.roscaalimentacao || "");
    $('#ccmb-comprimento-alimentacao, #ccmb-comprimento-alimentacao-passante').val(item.comprimentoalimentacao || "");
    $('#ccmb-diametro-rebaixo, #ccmb-diametro-rebaixo-passante').val(item.diametrorebaixo || "");
    $('#ccmb-comprimento-rebaixo, #ccmb-comprimento-rebaixo-passante').val(item.comprimentorebaixo || "");

    // INFORMAÇÃO CCB
    $('#input-embolo').val(item.embolo || "");
  },

  recalcular: function () {
    if (typeof ModuloCCBExtra !== 'undefined') ModuloCCBExtra.recalcular();

    const curso = safeParseFloat($('#curso').val());

    // Haste Normal
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('#hasteCcb .val-medidaHaste').val(`${totalHaste}mm`);

    // Haste Passante
    const totalHastePassante = this.estado.medidaHasteBasePassante + curso + this.estado.prolongamentoHastePassante + this.estado.prolongamentoRoscaPassante;
    $('#hasteCcbPassante .val-medidaHaste').val(`${totalHastePassante}mm`);

    // Tubo
    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-ccb').val(`${totalTubo}mm`);
    } else {
      $('#medidaTubo-ccb').val("");
    }

    // Rosca Dianteira Normal
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('#hasteCcb .val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Rosca Dianteira Passante
    const totalRdPassante = this.estado.crdBasePassante + this.estado.prolongamentoRoscaPassante;
    $('#hasteCcbPassante .val-medidaRoscaDianteira').val(`${this.estado.rdBasePassante} ${totalRdPassante}mm`);

    // Quantidades Tubo
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;
    if (valQtd > 0) {
      $('#folha-tubo-ccb .campo-quantidade').val(valQtd);
    } else {
      $('#folha-tubo-ccb .campo-quantidade').val("");
    }
  },

  atualizarCodigo: function () {
    if (typeof ModuloCCBExtra !== 'undefined') ModuloCCBExtra.atualizarCodigo();

    const cilindroRaw = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    let codigo = curso ? `${cilindroRaw} - ${curso}` : cilindroRaw;

    if ($('#chkViton').is(':checked')) codigo += " - V";
    if ($('#chkInox').is(':checked')) codigo += " - I";

    if (this.estado.prolongamentoHaste > 0) codigo += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigo += ` - PR${this.estado.prolongamentoRosca}`;

    let codigoPassante = curso ? `${cilindroRaw} - ${curso}` : cilindroRaw;

    if ($('#chkViton').is(':checked')) codigoPassante += " - V";
    if ($('#chkInox').is(':checked')) codigoPassante += " - I";

    if (this.estado.prolongamentoHastePassante > 0) codigoPassante += ` - PH${this.estado.prolongamentoHastePassante}`;
    if (this.estado.prolongamentoRoscaPassante > 0) codigoPassante += ` - PR${this.estado.prolongamentoRoscaPassante}`;

    if ($('#chkPassante').is(':checked')) {
      codigo += " - P";
      codigoPassante += " - P";
    }

    if ($('#chkInox').is(':checked')) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
      $('#materiaPrimaHaste-passante-ccb').val(this.estado.materiaPrimaBasePassante ? this.estado.materiaPrimaBasePassante + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
      $('#materiaPrimaHaste-passante-ccb').val(this.estado.materiaPrimaBasePassante || '');
    }

    $('.campo-codigo').not('.val-codigo-haste-passante-ccb').val(codigo);
    $('.val-codigo-haste-passante-ccb').val(codigoPassante);
  },

  aplicarUI: function () {
    $('#folha-tubo-ccb').removeClass('hidden');

    if ($('#chkPassante').is(':checked')) {
      $('#paginaCcb').addClass('hidden');
      $('#paginaCcbPassante').removeClass('hidden');

      // Oculta o cabeçalho global
      $('#cabecalho-global').addClass('hidden');
      $('#prioridade-global').addClass('hidden');
      $('#dados-haste-global').addClass('hidden');
      $('.imghaste').first().addClass('hidden');

      $('#hasteCcb').addClass('hidden');
      $('#info-ccb').addClass('hidden');
      $('#folha-tubo-ccb').addClass('hidden');
      $('#hasteCcbPassante').removeClass('hidden');
      if (typeof ModuloCCBExtra !== 'undefined') ModuloCCBExtra.aplicarUI();
    } else {
      $('#paginaCcb').removeClass('hidden');
      $('#paginaCcbPassante').addClass('hidden');

      // Exibe o cabeçalho global
      $('#cabecalho-global').removeClass('hidden');
      $('#prioridade-global').removeClass('hidden');
      $('#dados-haste-global').removeClass('hidden');
      $('.imghaste').first().removeClass('hidden');

      $('#hasteCcb').removeClass('hidden');
      $('#info-ccb').removeClass('hidden');
      $('#hasteCcbPassante').addClass('hidden');
      $('#hasteCcbExtra').addClass('hidden');
      $('#info-ccb-extra').addClass('hidden');
      $('#folha-tubo-ccb-extra').addClass('hidden');
    }
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  validarImpresso: function () {
    const phDigitado = safeParseFloat($('#inputAdicionaPh').val());
    if (!isNaN(phDigitado) && phDigitado > 0 && phDigitado !== this.estado.prolongamentoHaste) {
      alert("⚠️ Você digitou um valor para PH mas não clicou em ADICIONAR.");
      return false;
    }
    const prDigitado = safeParseFloat($('#inputAdicionaPr').val());
    if (!isNaN(prDigitado) && prDigitado > 0 && prDigitado !== this.estado.prolongamentoRosca) {
      alert("⚠️ Você digitou um valor para PR mas não clicou em ADICIONAR.");
      return false;
    }
    return true;
  }
};

// MÓDULO CCB EXTRA (HASTE 2)
const ModuloCCBExtra = {
  estado: {
    medidaHasteBase: 0,
    medidaTuboBase: 0,
    rdBase: "",
    crdBase: 0,
    materiaPrimaBase: ""
  },
  preencher: function (item) {
    this.estado.medidaTuboBase = safeParseFloat(item.cortetuboccmbpassante);
    $('#roscaTubo-ccb-extra').val(item.rosca || "");
    $('#materiaPrimaTubo-ccb-extra').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-ccb-extra').attr("src", item.imagemdotubo);

    this.estado.medidaHasteBase = safeParseFloat(item.cortepassanteace);
    $('#hasteCcbExtra .val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste-extra-ccb').val(this.estado.materiaPrimaBase);

    $('#hasteCcbExtra .val-diametroHaste').val(item.diametrohasteextra || "");
    if (item.imgpassante) $('.val-imagemHaste-extra-ccb').attr("src", item.imgpassante);

    $('#hasteCcbExtra .val-medidaRoscaTraseira').val(item.medidartaced || "");

    this.estado.rdBase = item.medidardacedb || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRDacedb || '0');
    $('#hasteCcbExtra .val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('#hasteCcbExtra .val-ebc').val(item.medidarebaixo || "");
    $('#hasteCcbExtra .val-cbc').val(item.medidacomprimento || "");
    $('#hasteCcbExtra .val-diamR').val(item.diamrebbocadechave || "");
    $('#hasteCcbExtra .val-compR').val(item.rebaixobocadechave || "");

    $('#input-embolo-extra').val(item.embolo || "");
  },
  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    const ph = ModuloCCB.estado.prolongamentoHaste || 0;
    const pr = ModuloCCB.estado.prolongamentoRosca || 0;

    const totalHaste = this.estado.medidaHasteBase + curso + ph + pr;
    $('#hasteCcbExtra .val-medidaHaste').val(`${totalHaste}mm`);

    const totalRd = this.estado.crdBase + pr;
    $('#hasteCcbExtra .val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;
    if (valQtd > 0) {
      $('#hasteCcbExtra .campo-quantidade').val(valQtd);
      $('#folha-tubo-ccb-extra .campo-quantidade').val(valQtd);
    } else {
      $('#hasteCcbExtra .campo-quantidade').val("");
      $('#folha-tubo-ccb-extra .campo-quantidade').val("");
    }

    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-ccb-extra').val(`${totalTubo}mm`);
    } else {
      $('#medidaTubo-ccb-extra').val("");
    }
  },
  atualizarCodigo: function () {
    const cilindroRaw = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    let codigo = curso ? `${cilindroRaw} - ${curso}` : cilindroRaw;

    if ($('#chkViton').is(':checked')) codigo += " - V";
    if ($('#chkInox').is(':checked')) codigo += " - I";

    const ph = ModuloCCB.estado.prolongamentoHaste || 0;
    const pr = ModuloCCB.estado.prolongamentoRosca || 0;

    if (ph > 0) codigo += ` - PH${ph}`;
    if (pr > 0) codigo += ` - PR${pr}`;

    if ($('#chkPassante').is(':checked')) codigo += " - P";

    if ($('#chkInox').is(':checked')) {
      $('#materiaPrimaHaste-extra-ccb').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste-extra-ccb').val(this.estado.materiaPrimaBase || '');
    }

    $('.val-codigo-haste-extra-ccb').val(codigo);
  },
  aplicarUI: function () {
    $('#hasteCcbExtra').removeClass('hidden');
    $('#info-ccb-extra').removeClass('hidden');
    $('#folha-tubo-ccb-extra').removeClass('hidden');
  }
};

const ModuloCCN = {
  estado: {
    medidaHasteBase: 0,
    medidaTuboBase: 0,
    medidaGuiaBase: 0,
    rdBase: "",
    crdBase: 0,
    materiaPrimaBase: "",
    prolongamentoHaste: 0,
    prolongamentoRosca: 0
  },

  verificar: function (cilindro) {
    return typeof familiaCcn !== 'undefined' && familiaCcn.includes(cilindro);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    $('#inputAdicionaPh, #inputAdicionaPr').removeClass('input-ok input-erro').val('');

    // HASTE
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('.val-medidaHaste').val(`${this.estado.medidaHasteBase}mm`);

    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    $('.val-diametroHaste').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);

    $('.val-medidaRoscaTraseira').val(item.medidaRT || "");

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    $('.val-ebc').val(item.medidarebaixo || "");
    $('.val-cbc').val(item.medidacomprimento || "");

    $('.val-diamR').val(item.diamrebbocadechave || "");
    $('.val-compR').val(item.rebaixobocadechave || "");

    // TUBO CCN
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#medidaTubo-ccn').val(this.estado.medidaTuboBase > 0 ? `${this.estado.medidaTuboBase}mm` : "");
    $('#materiaPrimaTubo-ccn').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-ccn').attr("src", item.imagemdotubo);
    $('#roscaTubo-ccn').val(item.rosca || "");

    const cilindro = item.cilindro || $('#select-cilindro').val() || "";

    if (cilindro.startsWith("CCNG")) {
      // GUIA CCN (Se for CCNG)
      this.estado.medidaGuiaBase = safeParseFloat(item.medidaguia);
      $('#input-materia-prima-guias-ccn').val(item.materiaprimaguia || "");
      $('#input-medida-rosca-guias-ccn').val(item.roscaguia || "");
      if (item.imagemguia) $('#imagem-guias-ccn').attr("src", item.imagemguia);
      $('#input-diametro-haste-guias-ccn').val(item.diametroguia || "");
    } else {
      this.estado.medidaGuiaBase = 0;
    }
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('.val-medidaHaste').val(`${totalHaste}mm`);

    // Tubo
    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-ccn').val(`${totalTubo}mm`);
    }

    // Rosca Dianteira
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('.val-medidaRoscaDianteira').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Quantidades Tubo
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;
    if (valQtd > 0) {
      $('#folha-tubo-ccn .campo-quantidade').val(valQtd);
      $('#input-qtd-guias-ccn').val(valQtd * 2);
    } else {
      $('#input-qtd-guias-ccn').val("");
    }

    // Guia
    const totalGuia = this.estado.medidaGuiaBase + curso;
    if (totalGuia > 0) {
      $('#input-medida-corte-guias-ccn').val(`${totalGuia}mm`);
    } else {
      $('#input-medida-corte-guias-ccn').val("");
    }
  },

  atualizarCodigo: function () {
    const cilindroRaw = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    let codigo = curso ? `${cilindroRaw} - ${curso}` : cilindroRaw;

    if ($('#chkViton').is(':checked')) codigo += " - V";
    if ($('#chkInox').is(':checked')) codigo += " - I";

    if (this.estado.prolongamentoHaste > 0) codigo += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigo += ` - PR${this.estado.prolongamentoRosca}`;

    if ($('#chkPassante').is(':checked')) {
      codigo += " - P";
      if (this.estado.prolongamentoHastePassante > 0) codigo += ` - PH${this.estado.prolongamentoHastePassante}`;
      if (this.estado.prolongamentoRoscaPassante > 0) codigo += ` - PR${this.estado.prolongamentoRoscaPassante}`;
    }

    if ($('#chkInox').is(':checked')) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
    }

    $('.campo-codigo').val(codigo);

    // Codigo para guia e tubo podem ser os mesmos
    let codigoBasico = curso ? `${cilindroRaw} - ${curso}` : cilindroRaw;
    $('#codigo-guias-ccn').val(codigoBasico);
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');
    $('#hasteCcn').removeClass('hidden');

    $('#folha-tubo-ccn').removeClass('hidden');

    const cilindroRaw = $('#select-cilindro').val() || "";
    if (cilindroRaw.startsWith("CCNG")) {
      $('#paginaGuiasCcn').removeClass('hidden');
    }
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor <= 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
  },

  validarImpresso: function () {
    const phDigitado = safeParseFloat($('#inputAdicionaPh').val());
    if (!isNaN(phDigitado) && phDigitado > 0 && phDigitado !== this.estado.prolongamentoHaste) {
      alert("⚠️ Você digitou um valor para PH mas não clicou em ADICIONAR.");
      return false;
    }
    const prDigitado = safeParseFloat($('#inputAdicionaPr').val());
    if (!isNaN(prDigitado) && prDigitado > 0 && prDigitado !== this.estado.prolongamentoRosca) {
      alert("⚠️ Você digitou um valor para PR mas não clicou em ADICIONAR.");
      return false;
    }
    return true;
  }
};

/* ==========================================================================
  MODULO ACE (FAMÍLIA ACE)
========================================================================== */
const ModuloACE = {
  estado: {
    medidaHasteBase: 0,
    medidaTuboBase: 0,
    rdBase: "",
    crdBase: 0,
    rtBase: "",
    crtBase: 0,
    prolongamentoHaste: 0,
    prolongamentoRosca: 0
  },

  verificar: function (cilindro) {
    return typeof familiaAce !== 'undefined' && familiaAce.includes(cilindro);
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');
    $('.folha-tubo-ace').removeClass('hidden');

    const passante = $('#chkPassante').is(':checked');
    if (passante) {
      $('#hasteAce').addClass('hidden');
      $('#hasteAceExtra').removeClass('hidden');
      $('#hastePassanteAce').removeClass('hidden');
      $('.imghaste').first().addClass('hidden');
      if (typeof ModuloAceExtra !== 'undefined') {
        ModuloAceExtra.aplicarUI();
      }
    } else {
      $('#hasteAce').removeClass('hidden');
      $('#hasteAceExtra').addClass('hidden');
      $('#hastePassanteAce').addClass('hidden');
      $('.imghaste').first().removeClass('hidden');
    }
  },

  atualizarCodigo: function () {
    const cilindro = $('#select-cilindro').val() || "";
    const cursoRaw = $('#curso').val() ? $('#curso').val().toString().trim() : '';

    const passanteAtivo = $('#chkPassante').is(':checked');
    const vitonAtivo = $('#chkViton').is(':checked');
    const inoxAtivo = $('#chkInox').is(':checked');

    // Extrai número (ex: "ACE32SBG" -> "32")
    const matchNum = cilindro.match(/(\d+)/);
    const numero = matchNum ? matchNum[1] : "";

    // Extrai o prefixo base (ex: "ACE")
    const basePrefixo = cilindro.split(numero)[0];

    // Extrai o sufixo original (ex: "SBG")
    let sufixo = cilindro.replace(basePrefixo, "").replace(numero, "");

    // Ajuste específico para Viton
    if (vitonAtivo) {
      if (sufixo === "SB") sufixo = "SBH";
      else if (sufixo === "SBG") sufixo = "SBHG";
      else if (sufixo === "S") sufixo = "SH";
      else if (sufixo === "SG") sufixo = "SHG";
    }

    let prefixo = basePrefixo;
    if (passanteAtivo && !prefixo.includes("D")) {
      prefixo += "D";
    }

    let codigoHaste = cilindro;
    if (cursoRaw) {
      codigoHaste = `${prefixo}${numero} X ${cursoRaw}${sufixo}`;
    } else {
      codigoHaste = `${prefixo}${numero}${sufixo}`;
    }

    if (inoxAtivo) {
      codigoHaste += " - I";
    }

    // Extensões de Prolongamento Haste 1
    if (this.estado.prolongamentoHaste > 0) codigoHaste += ` - PH${this.estado.prolongamentoHaste}`;
    if (this.estado.prolongamentoRosca > 0) codigoHaste += ` - PR${this.estado.prolongamentoRosca}`;

    // Atualização de matéria prima para inox
    if (inoxAtivo) {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase ? this.estado.materiaPrimaBase + " - I" : "");
    } else {
      $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase || '');
    }

    $('.campo-codigo').val(codigoHaste);

    let codigoTubo = cursoRaw ? `${cilindro} - ${cursoRaw}` : cilindro;
    $('#codigo-tubo-ace').val(codigoTubo);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;

    // HASTE ACE
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('#input-diametro-haste-ace').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);
    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('#input-medida-rosca-dianteira-ace').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    // ROSCA TRASEIRA E REBAIXO TRASEIRO (OPERAÇÃO 2.5)
    $('#input-rebaixo-traseira-ace').val(item.rebaixotraseira || '');
    $('#input-distancia-oring-ace').val(item.distanciaoring || '');
    $('#input-rebaixo-oring-ace').val(item.rebaixooring || '');

    this.estado.rtBase = item.medidart || '';
    this.estado.crtBase = safeParseFloat(item.medidacrt || '0');
    $('#input-medida-rosca-traseira-ace').val(`${this.estado.rtBase} ${this.estado.crtBase}mm`);

    // BOCA DE CHAVE E REBAIXO
    $('#input-medida-rebaixo-ace').val(item.medidarebaixo || "");
    $('#input-medida-comprimento-ace').val(item.medidacomprimento || "");
    $('#input-diametroR-ace').val(item.diamrebbocadechave || "");
    $('#input-comprimentoR-ace').val(item.rebaixobocadechave || "");

    // TUBO ACE
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#materiaPrimaTubo-ace').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-ace').attr("src", item.imagemdotubo);
    $('#roscaTubo-ace').val(item.rosca || "");

    // DELEGAR PARA ACE EXTRA
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.preencher(item);
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste ACE
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('#input-medida-corte-ace').val(`${totalHaste}mm`);

    // Rosca Dianteira (Com prolongamento)
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('#input-medida-rosca-dianteira-ace').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Tubo ACE
    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-ace').val(`${totalTubo}mm`);
    } else {
      $('#medidaTubo-ace').val("");
    }

    // Quantidades Tubo
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;
    if (valQtd > 0) {
      $('.folha-tubo-ace .campo-quantidade').val(valQtd);
    } else {
      $('.folha-tubo-ace .campo-quantidade').val("");
    }

    // DELEGAR PARA ACE EXTRA
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.recalcular();
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.adicionaPH(valor, $input);
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.removePH($input);
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.adicionaPR(valor, $input);
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.removePR($input);
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.adicionaPHpassante(valor, $input);
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    if ($input) $input.val("").removeClass("input-ok");
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.removePHpassante($input);
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.adicionaPRpassante(valor, $input);
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    if ($input) $input.val("").removeClass("input-ok");
    if (typeof ModuloAceExtra !== 'undefined') ModuloAceExtra.removePRpassante($input);
    this.atualizarCodigo();
  }
};

/* ==========================================================================
  MÓDULO: FAMÍLIA ACE (HASTE 2 / PASSANTE)
========================================================================== */
const ModuloAceExtra = {
  estado: {
    medidaHasteBase: 0,
    rdBase: "",
    crdBase: 0,
    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    medidaHasteBasePassante: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  aplicarUI: function () {
    this.atualizarCodigo();
  },

  atualizarCodigo: function () {
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;

    // HASTE ACE 2
    this.estado.medidaHasteBase = safeParseFloat(item.cortepassanteace);
    $('#input-diametro-haste-ace-extra-ace').val(item.diametrohaste || "");
    if (item.imghasteaced) {
      $('#imagemHasteAceExtra').attr("src", item.imghasteaced);
    }

    // ROSCA DIANTEIRA 2
    this.estado.rdBase = item.medidardacedb || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRDacedb || '0');
    $('#input-medida-rosca-dianteira-ace-extra-ace').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    // INFORMAÇÕES EXTRAS
    $('#input-rebaixo-traseira-extra-ace').val(item.rebaixotraseira || '');
    $('#input-distancia-oring-extra-ace').val(item.distanciaoring || '');
    $('#input-rebaixo-oring-extra-ace').val(item.rebaixooring || '');

    // ROSCA TRASEIRA 2
    $('#input-medida-rosca-traseira-extra-ace').val(item.medidartaced || '');

    // BOCA DE CHAVE E REBAIXO
    $('#input-medida-rebaixo-extra-ace').val(item.medidarebaixo || "");
    $('#input-medida-comprimento-extra-ace').val(item.medidacomprimento || "");
    $('#input-diametroR-extra-ace').val(item.diamrebbocadechave || "");
    $('#input-comprimentoR-extra-ace').val(item.rebaixobocadechave || "");

    // --- FOLHA PASSANTE ACE ---
    this.estado.medidaHasteBasePassante = safeParseFloat(item.cortepassante);
    $('.val-diametroHaste-passante-ace').val(item.diametrohaste || "");
    if (item.imgpassante) $('.val-imagemHaste-passante-ace').attr("src", item.imgpassante);

    $('.val-medidaRoscaTraseira-passante-ace').val(item.medidaRTpassante || "");
    $('.val-ebc-passante-ace').val(item.medidarebaixo || "");
    $('.val-cbc-passante-ace').val(item.medidacomprimento || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste ACE 2
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('#input-medida-corte-ace-extra-ace').val(`${totalHaste}mm`);

    // Rosca Dianteira 2 (Com prolongamento)
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('#input-medida-rosca-dianteira-ace-extra-ace').val(`${this.estado.rdBase} ${totalRd}mm`);

    // --- FOLHA PASSANTE ACE ---
    const totalPass = this.estado.medidaHasteBasePassante + curso + this.estado.prolongamentoHastePassante + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaHaste-passante-ace').val(`${totalPass}mm`);

    const totalRdPass = this.estado.crdBase + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaRoscaDianteira-passante-ace').val(`${this.estado.rdBase} ${totalRdPass}mm`);
  },

  adicionaPH: function (valor, $input) {
    this.estado.prolongamentoHaste = valor;
    this.recalcular();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    this.recalcular();
  },

  adicionaPR: function (valor, $input) {
    this.estado.prolongamentoRosca = valor;
    this.recalcular();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    this.recalcular();
  },

  adicionaPHpassante: function (valor, $input) {
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    this.recalcular();
  },

  adicionaPRpassante: function (valor, $input) {
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    this.recalcular();
  }
};

/* ==========================================================================
  MODULO MI (FAMÍLIA MI)
========================================================================== */
const ModuloMI = {
  estado: {
    medidaHasteBase: 0,
    medidaTuboBase: 0,
    rdBase: "",
    crdBase: 0,
    rtBase: "",
    crtBase: 0,
    prolongamentoHaste: 0,
    prolongamentoRosca: 0
  },

  aplicarUI: function () {
    $('#cabecalho-global').removeClass('hidden');
    $('#prioridade-global').removeClass('hidden');
    $('#dados-haste-global').removeClass('hidden');
    $('.imghaste').first().removeClass('hidden');
    $('.folha-tubo-mi').removeClass('hidden');

    const passante = $('#chkPassante').is(':checked');
    if (passante) {
      $('.hasteMi').addClass('hidden');
      $('#hasteMiExtra').removeClass('hidden');
      $('#hastePassanteMi').removeClass('hidden');
      $('.imghaste').first().addClass('hidden'); // Oculta imagem global
      if (typeof ModuloMiExtra !== 'undefined') {
        ModuloMiExtra.aplicarUI();
      }
    } else {
      $('.hasteMi').removeClass('hidden');
      $('#hasteMiExtra').addClass('hidden');
      $('#hastePassanteMi').addClass('hidden');
      $('.imghaste').first().removeClass('hidden'); // Volta imagem global
    }
  },

  atualizarCodigo: function () {
    const basico = $('#select-cilindro').val() || "";
    const curso = $('#curso').val() || "";

    // Extensões Base
    const valM = $('#valM').val() ? ` M${$('#valM').val()}` : "";
    const valWH = $('#valWH').val() ? ` WH${$('#valWH').val()}` : "";

    // Extensões de Prolongamento Haste 1
    const phHaste1 = this.estado.prolongamentoHaste > 0 ? ` - PH${this.estado.prolongamentoHaste}` : "";
    const prHaste1 = this.estado.prolongamentoRosca > 0 ? ` - PR${this.estado.prolongamentoRosca}` : "";

    let extra = valM + valWH + phHaste1 + prHaste1;
    const isPassante = $('#chkPassante').is(':checked');

    if (isPassante) {
      let phPass = 0;
      let prPass = 0;
      if (typeof ModuloMiExtra !== 'undefined') {
        phPass = ModuloMiExtra.estado.prolongamentoHastePassante || 0;
        prPass = ModuloMiExtra.estado.prolongamentoRoscaPassante || 0;
      }
      if (phPass > 0) extra += ` - PH${phPass}`;
      if (prPass > 0) extra += ` - PR${prPass}`;
    }

    let codigoHaste = "";
    let codigoTubo = "";

    if (basico) {
      // Separa Letras, Números e Sufixo
      const match = basico.match(/^([A-Za-z]+)(\d+)(.*)$/);
      if (match) {
        let prefix = match[1];
        const num = match[2];
        const suffix = match[3];

        if (isPassante) {
          // Regra da Familia SAI/MI para Passante: Adiciona 'D' no prefixo
          prefix = prefix + "D";
        }

        if (curso) {
          codigoHaste = `${prefix}${num} X ${curso} ${suffix}${extra}`;
          codigoTubo = `${prefix}${num} X ${curso} ${suffix}`;
        } else {
          codigoHaste = `${prefix}${num}${suffix}${extra}`;
          codigoTubo = `${prefix}${num}${suffix}`;
        }
      } else {
        // Fallback
        codigoHaste = curso ? `${basico} - ${curso}${extra}` : `${basico}${extra}`;
        codigoTubo = curso ? `${basico} - ${curso}` : basico;
      }
    }

    // Atualiza campo Haste e folhas passantes
    $('.campo-codigo').val(codigoHaste);
    // Atualiza campo Tubo
    $('#codigo-tubo-mi').val(codigoTubo);
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;

    // HASTE MI
    this.estado.medidaHasteBase = safeParseFloat(item.medidacorte);
    $('#input-diametro-haste-mi').val(item.diametrohaste || "");
    if (item.imagemdahaste) $('#imagemHaste').attr("src", item.imagemdahaste);
    this.estado.materiaPrimaBase = item.materiaprima || '';
    $('#materiaPrimaHaste').val(this.estado.materiaPrimaBase);

    // ROSCA DIANTEIRA
    this.estado.rdBase = item.medidaRD || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRD || '0');
    $('#input-medida-rosca-dianteira-mi').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    //INFORMAÇÕES EXTRAS
    $('#input-rebaixo-traseira').val(item.rebaixotraseira || '');
    $('#input-distancia-oring').val(item.distanciaoring || '');
    $('#input-rebaixo-oring').val(item.rebaixooring || '');

    // ROSCA TRASEIRA
    $('#input-medida-rosca-traseira').val(item.medidaRT || '');

    // BOCA DE CHAVE E REBAIXO (Exemplo basico)
    $('#input-medida-rebaixo').val(item.medidarebaixo || "");
    $('#input-medida-comprimento').val(item.medidacomprimento || "");
    $('#input-diametroR').val(item.diamrebbocadechave || "");
    $('#input-comprimentoR').val(item.rebaixobocadechave || "");

    // TUBO MI
    this.estado.medidaTuboBase = safeParseFloat(item.medidacortetubo);
    $('#materiaPrimaTubo-mi').val(item.materiaprimatubo || "");
    if (item.imagemdotubo) $('#imagemTubo-mi').attr("src", item.imagemdotubo);
    $('#roscaTubo-mi').val(item.rosca || "");

    // DELEGAR PARA MI EXTRA
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.preencher(item);
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste MI
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('#input-medida-corte-mi').val(`${totalHaste}mm`);

    // Tubo MI
    const totalTubo = this.estado.medidaTuboBase > 0 ? this.estado.medidaTuboBase + curso : 0;
    if (totalTubo > 0) {
      $('#medidaTubo-mi').val(`${totalTubo}mm`);
    } else {
      $('#medidaTubo-mi').val("");
    }

    // Rosca Dianteira (Com prolongamento)
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('#input-medida-rosca-dianteira-mi').val(`${this.estado.rdBase} ${totalRd}mm`);

    // Quantidades Tubo
    const valQtd = $('#quantidadeHaste').val() ? parseInt($('#quantidadeHaste').val(), 10) : 0;
    if (valQtd > 0) {
      $('#folha-tubo-mi .campo-quantidade').val(valQtd);
    } else {
      $('#folha-tubo-mi .campo-quantidade').val("");
    }

    // DELEGAR PARA MI EXTRA
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.recalcular();
  },

  adicionaPH: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoHaste = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.adicionaPH(valor, $input);
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.removePH($input);
  },

  adicionaPR: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    this.estado.prolongamentoRosca = valor;
    feedbackInput($input, true);
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.adicionaPR(valor, $input);
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    if ($input) $input.val("").removeClass("input-ok");
    this.recalcular();
    this.atualizarCodigo();
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.removePR($input);
  },

  adicionaPHpassante: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.adicionaPHpassante(valor, $input);
    this.atualizarCodigo();
  },
  removePHpassante: function ($input) {
    if ($input) $input.val("").removeClass("input-ok");
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.removePHpassante($input);
    this.atualizarCodigo();
  },

  adicionaPRpassante: function (valor, $input) {
    if (isNaN(valor) || valor < 0) { feedbackInput($input, false); return; }
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.adicionaPRpassante(valor, $input);
    this.atualizarCodigo();
  },
  removePRpassante: function ($input) {
    if ($input) $input.val("").removeClass("input-ok");
    if (typeof ModuloMiExtra !== 'undefined') ModuloMiExtra.removePRpassante($input);
    this.atualizarCodigo();
  }
};

/* ==========================================================================
  11) MÓDULO: FAMÍLIA MI (HASTE 2 / PASSANTE)
========================================================================== */
const ModuloMiExtra = {
  estado: {
    medidaHasteBase: 0,
    rdBase: "",
    crdBase: 0,
    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    medidaHasteBasePassante: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  aplicarUI: function () {
    this.atualizarCodigo();
  },

  atualizarCodigo: function () {
    // Lógica especifica da Haste 2 / Passante se houver
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;

    // HASTE MI 2
    this.estado.medidaHasteBase = safeParseFloat(item.cortepassanteace);
    $('#input-diametro-haste-mi-extra').val(item.diametrohaste || "");

    // Imagem independente Haste 2
    if (item.imghasteaced) {
      $('#imagemHasteMiExtra').attr("src", item.imghasteaced);
    } else {
      $('#imagemHasteMiExtra').attr("src", "");
    }

    // ROSCA DIANTEIRA 2
    this.estado.rdBase = item.medidardacedb || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRDacedb || '0');
    $('#input-medida-rosca-dianteira-mi-extra').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    // INFORMAÇÕES EXTRAS
    $('#input-rebaixo-traseira-extra').val(item.rebaixotraseira || '');
    $('#input-distancia-oring-extra').val(item.distanciaoring || '');
    $('#input-rebaixo-oring-extra').val(item.rebaixooring || '');

    // ROSCA TRASEIRA 2
    $('#input-medida-rosca-traseira-extra').val(item.medidartaced || '');

    // BOCA DE CHAVE E REBAIXO
    $('#input-medida-rebaixo-extra').val(item.medidarebaixo || "");
    $('#input-medida-comprimento-extra').val(item.medidacomprimento || "");
    $('#input-diametroR-extra').val(item.diamrebbocadechave || "");
    $('#input-comprimentoR-extra').val(item.rebaixobocadechave || "");

    // --- FOLHA PASSANTE MI ---
    this.estado.medidaHasteBasePassante = safeParseFloat(item.cortepassante);
    $('.val-diametroHaste-passante').val(item.diametrohaste || "");
    if (item.imgpassante) $('.val-imagemHaste-passante').attr("src", item.imgpassante);

    $('.val-medidaRoscaTraseira-passante').val(item.medidaRTpassante || "");
    $('.val-ebc-passante').val(item.medidarebaixo || "");
    $('.val-cbc-passante').val(item.medidacomprimento || "");

    $('.val-diamR-passante').val(item.diamrebbocadechave || "");
    $('.val-compR-passante').val(item.rebaixobocadechave || "");
    $('.val-diamRPassante').val(item.diamrebbocadechave || "");
    $('.val-CRPassante').val(item.rebaixobocadechave || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste MI 2
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('#input-medida-corte-mi-extra').val(`${totalHaste}mm`);

    // Rosca Dianteira 2 (Com prolongamento)
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('#input-medida-rosca-dianteira-mi-extra').val(`${this.estado.rdBase} ${totalRd}mm`);

    // --- FOLHA PASSANTE MI ---
    const totalPass = this.estado.medidaHasteBasePassante + curso + this.estado.prolongamentoHastePassante + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaHaste-passante').val(`${totalPass}mm`);

    const totalRdPass = this.estado.crdBase + this.estado.prolongamentoRoscaPassante;
    $('.val-medidaRoscaDianteira-passante').val(`${this.estado.rdBase} ${totalRdPass}mm`);
  },

  adicionaPH: function (valor, $input) {
    this.estado.prolongamentoHaste = valor;
    this.recalcular();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    this.recalcular();
  },

  adicionaPR: function (valor, $input) {
    this.estado.prolongamentoRosca = valor;
    this.recalcular();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    this.recalcular();
  },

  adicionaPHpassante: function (valor, $input) {
    this.estado.prolongamentoHastePassante = valor;
    feedbackInput($input, true);
    this.recalcular();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    this.recalcular();
  },

  adicionaPRpassante: function (valor, $input) {
    this.estado.prolongamentoRoscaPassante = valor;
    feedbackInput($input, true);
    this.recalcular();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    this.recalcular();
  }
};

/* ==========================================================================
  12) MÓDULO: FAMÍLIA CSM (HASTE 2 / PASSANTE)
========================================================================== */
const ModuloCsmExtra = {
  estado: {
    medidaHasteBase: 0,
    medidaHasteBasePassante: 0,
    rdBase: "",
    crdBase: 0,
    prolongamentoHaste: 0,
    prolongamentoRosca: 0,
    prolongamentoHastePassante: 0,
    prolongamentoRoscaPassante: 0
  },

  aplicarUI: function () {
    this.atualizarCodigo();
  },

  atualizarCodigo: function () {
    // Lógica especifica da Haste 2 / Passante se houver
  },

  preencher: function (item) {
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;
    this.estado.prolongamentoHastePassante = 0;
    this.estado.prolongamentoRoscaPassante = 0;

    // HASTE CSM 2 (PASSANTE)
    this.estado.medidaHasteBase = safeParseFloat(item.cortepassanteace);
    $('#input-diametro-haste-csm-extra').val(item.diametrohaste || "");

    if (item.imghasteaced) {
      $('#imagemHasteCsmExtra').attr("src", item.imghasteaced);
    } else {
      $('#imagemHasteCsmExtra').attr("src", "");
    }

    // ROSCA DIANTEIRA 2
    this.estado.rdBase = item.medidardacedb || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRDacedb || '0');
    $('#input-medida-rosca-dianteira-csm-extra').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    // INFORMAÇÕES EXTRAS
    $('#input-rebaixo-traseira-csm-extra').val(item.rebaixotraseira || '');
    $('#input-distancia-oring-csm-extra').val(item.distanciaoring || '');
    $('#input-rebaixo-oring-csm-extra').val(item.rebaixooring || '');

    // ROSCA TRASEIRA 2
    $('#input-medida-rosca-traseira-csm-extra').val(item.medidartaced || '');

    // BOCA DE CHAVE E REBAIXO
    $('#input-medida-rebaixo-csm-extra').val(item.medidarebaixo || "");
    $('#input-medida-comprimento-csm-extra').val(item.medidacomprimento || "");
    $('#input-diametroR-csm-extra').val(item.diamrebbocadechave || "");
    $('#input-comprimentoR-csm-extra').val(item.rebaixobocadechave || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste CSM 2
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('#input-medida-corte-csm-extra').val(`${totalHaste}mm`);

    // Rosca Dianteira 2
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('#input-medida-rosca-dianteira-csm-extra').val(`${this.estado.rdBase} ${totalRd}mm`);
  },

  adicionaPH: function (valor, $input) {
    this.estado.prolongamentoHaste = valor;
    this.recalcular();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    this.recalcular();
  },

  adicionaPR: function (valor, $input) {
    this.estado.prolongamentoRosca = valor;
    this.recalcular();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    this.recalcular();
  },

  adicionaPHpassante: function (valor, $input) {
    this.estado.prolongamentoHastePassante = valor;
    if ($input) feedbackInput($input, true);
    this.recalcular();
  },
  removePHpassante: function ($input) {
    this.estado.prolongamentoHastePassante = 0;
    this.recalcular();
  },

  adicionaPRpassante: function (valor, $input) {
    this.estado.prolongamentoRoscaPassante = valor;
    if ($input) feedbackInput($input, true);
    this.recalcular();
  },
  removePRpassante: function ($input) {
    this.estado.prolongamentoRoscaPassante = 0;
    this.recalcular();
  }
};

/* ==========================================================================
  13) MÓDULO: FAMÍLIA CDVU (HASTE 2 / PASSANTE)
========================================================================== */
const ModuloCdvuExtra = {
  estado: {
    medidaHasteBase: 0,
    rdBase: "",
    crdBase: 0,
    prolongamentoHaste: 0,
    prolongamentoRosca: 0
  },

  aplicarUI: function () {
    this.atualizarCodigo();
  },

  atualizarCodigo: function () {
    // Lógica específica
  },

  preencher: function (item) {
    this.estado.prolongamentoHaste = 0;
    this.estado.prolongamentoRosca = 0;

    // HASTE CDVU 2
    this.estado.medidaHasteBase = safeParseFloat(item.cortepassanteace);
    $('#input-diametro-haste-cdvu-extra').val(item.diametrohaste || "");

    if (item.imghasteaced) {
      $('#imagemHasteCdvuExtra').attr("src", item.imghasteaced);
    } else {
      $('#imagemHasteCdvuExtra').attr("src", "");
    }

    // ROSCA DIANTEIRA 2
    this.estado.rdBase = item.medidardacedb || '';
    this.estado.crdBase = safeParseFloat(item.medidaCRDacedb || '0');
    $('#input-medida-rosca-dianteira-cdvu-extra').val(`${this.estado.rdBase} ${this.estado.crdBase}mm`);

    // ROSCA TRASEIRA 2
    $('#input-medida-rosca-traseira-cdvu-extra').val(item.medidartaced || '');

    // BOCA DE CHAVE E REBAIXO
    $('#input-medida-rebaixo-cdvu-extra').val(item.medidarebaixo || "");
    $('#input-medida-comprimento-cdvu-extra').val(item.medidacomprimento || "");
    $('#input-diametroR-cdvu-extra').val(item.diamrebbocadechave || "");
    $('#input-comprimentoR-cdvu-extra').val(item.rebaixobocadechave || "");
  },

  recalcular: function () {
    const curso = safeParseFloat($('#curso').val());

    // Haste CDVU 2
    const totalHaste = this.estado.medidaHasteBase + curso + this.estado.prolongamentoHaste + this.estado.prolongamentoRosca;
    $('#input-medida-corte-cdvu-extra').val(`${totalHaste}mm`);

    // Rosca Dianteira 2
    const totalRd = this.estado.crdBase + this.estado.prolongamentoRosca;
    $('#input-medida-rosca-dianteira-cdvu-extra').val(`${this.estado.rdBase} ${totalRd}mm`);
  },

  adicionaPH: function (valor, $input) {
    this.estado.prolongamentoHaste = valor;
    this.recalcular();
  },
  removePH: function ($input) {
    this.estado.prolongamentoHaste = 0;
    this.recalcular();
  },

  adicionaPR: function (valor, $input) {
    this.estado.prolongamentoRosca = valor;
    this.recalcular();
  },
  removePR: function ($input) {
    this.estado.prolongamentoRosca = 0;
    this.recalcular();
  }
};
