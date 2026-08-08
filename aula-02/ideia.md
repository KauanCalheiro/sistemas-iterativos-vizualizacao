# Receita Clara

Aplicação multimodal — Sistemas Interativos e de Visualização (UNIVATES)

## Problema

O paciente sai do consultório com um papel ilegível e uma posologia que ele
traduz errado. Não-adesão a tratamento por confusão de horário é uma das
maiores causas de falha terapêutica — e afeta principalmente idosos e pessoas
com baixa escolaridade.

**Público-alvo:** pacientes idosos, cuidadores familiares, pessoas em
polifarmácia (5+ medicamentos).

**Objetivo:** transformar uma receita médica em qualquer formato numa grade de
horários clara, visual e imprimível.

**Justificativa do uso de IA multimodal:** a mesma informação chega por canais
diferentes — foto da receita impressa, foto de receita manuscrita, receita
digital em PDF, ou o relato falado do que o médico orientou. Nenhuma solução
de texto puro cobre esses casos.

## Modalidades de entrada

- **Imagem** — foto da receita (impressa ou manuscrita)
- **Áudio** — paciente ou cuidador relatando as orientações do médico
- **Texto / PDF** — receita digital

## Fluxo

```
[imagem | áudio | texto/PDF]  +  janela de vigília (acorda/dorme)
              ↓
    ETAPA 1 — extração dos dados brutos
              ↓
    ETAPA 2 — escalonamento de horários
              ↓
  tabela  +  grade visual do dia  +  lista "confirme com o farmacêutico"
```

## O diferencial: o escalonador de horários

Extrair texto da receita é a parte fácil e todo mundo faz. O valor está aqui:

**1. Janela de vigília** — o app pergunta que horas a pessoa acorda e dorme
(ex. 7h–23h) e distribui as doses dentro dela.

**2. Rigidez do espaçamento** — nem todo "8 em 8" é igual:

- **Rígido** (antibiótico, anticonvulsivante, imunossupressor): o intervalo é
  clínico, não pode esticar. Se cai às 3h da manhã, o app **não esconde
  isso** — avisa "esse precisa mesmo de dose noturna, programe o alarme" e
  sugere deslocar o início do dia pra minimizar o estrago (começar 7h →
  7h/15h/23h em vez de 6h/14h/22h).
- **Flexível** (analgésico "se dor", vitamina, protetor gástrico): distribui
  confortavelmente dentro da vigília.

**3. Restrições alimentares** — "em jejum", "após refeição", "não tomar com
leite". O app resolve como conflito: se dois remédios caem no mesmo horário
mas um é jejum e o outro é com comida, ele separa e explica por quê.

**4. Agrupamento** — junta doses compatíveis no mesmo horário. Menos alarmes =
mais adesão. 6 remédios viram 3 momentos do dia, não 6.

**5. Data de término** — "antibiótico por 7 dias" gera "termina em 10/08 —
tome até o fim mesmo se melhorar".

## Visualização

Grade do dia com blocos por período — 🌅 manhã / ☀️ almoço / 🌆 tarde /
🌙 noite — cada bloco listando o remédio com nome, dose e ícone. Fonte grande,
alto contraste, pronta pra imprimir e grudar na geladeira. Mais um checklist
marcável por dia.

## Segurança

O app **transcreve e organiza** o que o médico prescreveu — nunca altera dose,
nunca sugere medicamento. Três regras no prompt:

- Campo ilegível → `null` + "não consegui ler, confirme com o farmacêutico".
  **Nunca chutar dose.**
- Cada item mostra o **recorte da imagem original** ao lado do texto extraído,
  pra conferência.
- Aviso fixo: *"Confira sempre com a receita original e seu farmacêutico."*

Isso não é burocracia — é material para a análise crítica da entrega 6.

## Prompt inicial (Google AI Studio)

```
Crie um app web chamado "Receita Clara".

O usuário envia uma receita médica como imagem (foto, impressa ou manuscrita),
áudio (relato das orientações) ou texto/PDF, e informa a hora que acorda e a
hora que dorme.

ETAPA 1 — Extração. Para cada medicamento identificado, extraia:
  nome, dose_por_tomada, forma (comprimido/gota/ml), frequencia,
  duracao_tratamento, restricoes (jejum / com alimento / antes de dormir /
  outras), observacoes, trecho_original, legibilidade (alta/media/baixa)

ETAPA 2 — Escalonamento. Gere os horários de cada dose considerando:
  - Distribuir dentro da janela de vigília informada.
  - Classificar o espaçamento como RÍGIDO (antibióticos, anticonvulsivantes,
    imunossupressores — o intervalo é clínico) ou FLEXÍVEL (analgésicos "se
    dor", vitaminas, sintomáticos).
  - Se um medicamento RÍGIDO exigir dose na madrugada, MANTENHA o horário
    correto e avise explicitamente, sugerindo o início de dia que minimiza o
    incômodo. Não distorça o intervalo clínico por conveniência.
  - Agrupar doses compatíveis no mesmo horário para reduzir alarmes.
  - Sinalizar conflitos entre restrições (ex.: jejum vs. com alimento no mesmo
    horário) e separá-los.

REGRAS INEGOCIÁVEIS:
  - NUNCA invente ou infira dose, nome de medicamento ou frequência. Se estiver
    ilegível ou ambíguo, retorne null e liste em "itens_para_confirmar".
  - NÃO sugira, substitua nem remova medicamentos. Você organiza o que foi
    prescrito, não prescreve.
  - Sempre exiba o trecho original ao lado do dado extraído.

SAÍDA na interface:
  1. Tabela: medicamento | dose | horários | duração | observação | confiança
  2. Grade visual do dia em blocos (🌅 manhã, ☀️ almoço, 🌆 tarde, 🌙 noite),
     fonte grande, alto contraste, otimizada para impressão.
  3. Lista "Confirme com o farmacêutico" com os itens ilegíveis.
  4. Aviso fixo: "Confira sempre com a receita original e seu farmacêutico."

Português do Brasil. Interface acessível para idosos: fonte grande, botões
grandes, sem jargão.
```

## Plano de testes

| # | Entrada | Testa | Resultado esperado |
|---|---|---|---|
| 1 | Receita **impressa**, 2 medicamentos simples | Baseline de extração | Acerto total |
| 2 | Receita **manuscrita** (letra de médico real) | OCR em condição difícil | Acerto parcial — falhar aqui é ótimo, mostra o limite |
| 3 | **6 medicamentos** com restrições conflitantes (um em jejum, um com alimento, um antes de dormir) | O escalonador e o agrupamento | Agrupa corretamente e separa o conflito |
| 4 | **Áudio**: cuidador relatando *"o doutor falou pra tomar o azul de 8 em 8 e o branco só à noite"* | Modalidade não-visual + informação incompleta | Extrai o que dá, pergunta o nome do "azul" |
| 5 | Foto **borrada / dose rasurada** | **Teste negativo — o mais importante** | Deve dizer "não consegui ler". Se chutar uma dose, é falha grave e rende a melhor análise crítica do trabalho |

O teste 5 é o que separa um trabalho nota 7 de um nota 10: documenta o
comportamento do modelo sob incerteza num domínio onde alucinar tem
consequência física.

## Mapa para as entregas da atividade

| Entrega | Onde está |
|---|---|
| 1. Descrição da aplicação | Problema · Público-alvo · Objetivo · Justificativa |
| 2. Projeto da solução | Modalidades · Fluxo · Escalonador · Visualização |
| 3. Desenvolvimento | *(link do AI Studio — preencher)* |
| 4. Prompts utilizados | Prompt inicial · *(prompts de iteração — a fazer)* |
| 5. Testes realizados | Plano de testes |
| 6. Documentação | 2–3 páginas a montar a partir deste documento + prints |

## Pendências

- [ ] Criar o app no Google AI Studio e colar o link
- [ ] Escrever os prompts de iteração com o objetivo de cada alteração
- [ ] Reunir os arquivos dos 5 testes
- [ ] Capturar prints de cada iteração (não só do resultado final)
