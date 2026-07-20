# Sistema de Geração de Ordens de Produção (OP) - GHPC

Este sistema é uma aplicação Web front-end para a automação, cálculo e emissão de Ordens de Produção (OPs) de cilindros pneumáticos. Ele consome dados de uma API (planilha Google) e processa as regras de negócio para gerar folhas de impressão para os diferentes componentes (Haste, Tubo e Tirantes).

---

## ⚙️ Funcionalidades Principais

### 1. Integração com Banco de Dados (API)
- O sistema faz um `fetch` inicial para buscar o banco de dados de cilindros através de um endpoint do Google Apps Script.
- Os cilindros disponíveis são injetados de forma dinâmica no seletor (dropdown).
- Ao selecionar um cilindro, todos os seus dados base (dimensões de corte, matéria-prima, roscas, imagens) são armazenados em memória local e o módulo correspondente da família é ativado.

### 2. Controle de Famílias (Módulos)
A arquitetura é dividida em módulos JavaScript por família de cilindros. Cada módulo possui seus métodos únicos de preenchimento, recálculo, montagem de código e controle de interface.

#### Família CP (`ModuloCP`)
- Suporta os prefixos **CPme**, **CPn** e **CPB**.
- Lida ativamente com a geração de **2 Folhas de Haste** (Haste padrão e Haste Passante) quando o modo Passante está ativo.
- Lida com a **Folha de Tubo** específica para CP.
- Calcula de forma dinâmica os prefixos e sufixos de Inox e Viton (ex: CPBD, CPH, etc).

#### Família SAI (`ModuloSAI`)
- Suporta os prefixos **SAI** e **BSAI** (versão em Inox).
- Possui uma lógica flexível para identificar o prefixo base, evitando erros de string ao isolar diâmetros.
- Lida com a geração da **Folha de Haste** e **Folha de Tubo** da família SAI.
- **Folha de Tirantes:** Acionada exclusivamente (e revelada para impressão) para os diâmetros robustos **SAI160** e **SAI200**.

### 3. Regras Matemáticas e Recálculos em Tempo Real
Sempre que um evento ocorre (digitar curso, adicionar extensão, mudar quantidade), a função `recalcular()` do módulo ativo entra em ação.

- **Cálculo de Comprimentos:**
  - Haste = Medida Base + Curso + Prolongamento de Haste (PH) + Prolongamento de Rosca (PR).
  - Tubo = Medida Base do Tubo + Curso.
  - Tirante = Medida Base do Tirante + Curso.

- **Inteligência de Quantidades (QTD):**
  - **Padrão:** O número inserido no input global reflete de 1 para 1 em todas as folhas.
  - **Passante Ativo:** A Haste passa a render 2 peças por cilindro (QTD * 2). O Tubo permanece inalterado (QTD * 1).
  - **Tirantes:** Independentemente do Passante, os tirantes são calculados como 4 peças por cilindro (QTD * 4).

- **Prolongamentos Especiais (PH e PR):**
  - O sistema possui botões de adicionar e remover Prolongamento de Haste e de Rosca.
  - Existe validação em tempo real para impedir que o usuário insira um valor de PH/PR e esqueça de clicar em "Adicionar" (o sistema barra a impressão).

### 4. Condicionantes Físicos (Viton, Inox e Passante)
- **Viton:** Substitui letras específicas no código final (ex: 'SNG' para 'SHG') e atualiza a matéria-prima (kit de vedação).
- **Inox:** Modifica a nomenclatura do código (ex: SAI vira BSAI, CP vira CPB) e injeta " - I" ao final dos códigos de matéria-prima.
- **Passante:** Altera drasticamente as regras matemáticas de quantidade e adiciona o 'D' ao código do cilindro. Existe uma "trava" inteligente que barra o usuário de marcar "Passante" sem antes ter preenchido a quantidade base.

### 5. Engine de Impressão e UI
- Toda a interface foi pensada para se transformar de um "painel de controle" em um "documento formal" na hora do print (`Ctrl+P`).
- Através de `@media print` no `style.css`:
  - Botões, menus de seleção e controles desaparecem.
  - A classe `.quebra-pagina` impõe uma separação física (Page Break) para garantir que Haste, Tubo e Tirante sempre sejam impressos em folhas individuais A4 limpas.
  - Regras de `height` (altura) rigorosas garantem que elementos não transbordem e se sobreponham acidentalmente.

### 6. Sistema de Tratamento de Erros e Feedback
- A função visual `mostrarErro()` fornece feedback focado. Se o usuário esquecer o Curso ou a Quantidade, o campo pisca em vermelho suave, treme levemente e a tela rola (scroll automático) até o campo, chamando a atenção do usuário.

---

## 🏗️ Como a Arquitetura está Montada

A divisão principal de arquivos:
- `index.html`: A carcaça das folhas de impressão. Todos os blocos estão lá, porém com a classe `.hidden`.
- `style.css`: O design visual limpo e compacto e as regras de exclusão/quebra da impressão.
- `script.js`: O cérebro do projeto, orquestrando eventos do usuário, lógica matemática e mutações de string de cada família.
