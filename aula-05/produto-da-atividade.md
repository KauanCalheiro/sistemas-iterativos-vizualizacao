x# Explorando Técnicas Não Convencionais de Interação

**Unidade de Aprendizagem:** Sistemas Interativos e de Visualização
**Professor:** Edson Moacir Ahlert
**Estudantes:** Kauan Morinel Calheiro e Everton Luiz de Oliveira
**Data:** 24/08/2026

## Técnicas investigadas

O trabalho investigou duas técnicas que usam a voz como parte central da interação.

| Técnica | Como funciona | Aplicações pesquisadas |
|---|---|---|
| **Interface por voz (VUI)** | A fala é convertida em texto, o sistema identifica o comando e responde por áudio ou tela. | Android Voice Access e Amazon Echo Show. |
| **Voz, olhar e gestos** | O sistema combina a fala com o objeto observado ou apontado para entender o contexto. | GazePointAR, Microsoft SIGMA e Apple Vision Pro. |

A interface por voz permite realizar tarefas sem teclado, mouse ou toque. Isso é útil para pessoas com deficiência visual ou motora e em situações nas quais as mãos estão ocupadas. Suas principais limitações são o ruído, os erros de reconhecimento, a dificuldade de descobrir quais comandos existem e a privacidade das gravações.

A interação multimodal torna comandos como “o que é isso?” mais naturais, pois o olhar ou o gesto indica o objeto citado. Entretanto, ela depende de câmeras e sensores, pode associar a fala ao objeto errado e possui custo maior.

## Análise com as heurísticas de Nielsen

### Interface por voz

| Heurística | Análise |
|---|---|
| **Visibilidade do estado do sistema** | Um ícone ou sinal sonoro deve informar quando o sistema está ouvindo e processando. |
| **Reconhecimento em vez de memorização** | Sugestões como “diga: iniciar checklist” evitam que o usuário precise decorar comandos. |
| **Prevenção de erros** | Ações importantes devem ser confirmadas antes de serem executadas. |

Essa técnica resolve a dificuldade de usar uma tela com as mãos ocupadas, mas pode introduzir outro problema: executar uma ação diferente porque a fala foi reconhecida incorretamente.

### Voz, olhar e gestos

| Heurística | Análise |
|---|---|
| **Correspondência com o mundo real** | Falar e apontar se aproxima da forma como as pessoas se comunicam entre si. |
| **Visibilidade do estado do sistema** | O objeto identificado deve ser destacado antes da execução do comando. |
| **Controle e liberdade do usuário** | O usuário precisa conseguir cancelar ou desfazer uma seleção incorreta. |

A técnica acrescenta contexto aos assistentes de voz, mas pode interpretar um olhar casual como uma intenção de selecionar um objeto.

## Oportunidade de projeto

Foi escolhida a **interface por voz** para desenvolver o **VozSegura**, um checklist falado para procedimentos em laboratórios e oficinas.

Nesses ambientes, estudantes e profissionais podem estar usando luvas ou segurando ferramentas. Consultar uma tela interrompe a atividade, enquanto esquecer uma etapa pode provocar erros ou acidentes. A voz permite acompanhar as instruções com as mãos livres e a atenção voltada à tarefa.

O VozSegura apresentará uma etapa por vez e aceitará cinco comandos principais: **iniciar**, **concluído**, **repetir**, **voltar** e **cancelar**. O objetivo é reduzir etapas esquecidas e tornar o procedimento mais seguro. A ferramenta será apenas um apoio e não substituirá as normas da instituição nem a supervisão responsável.

## Conceito do protótipo

O protótipo terá um checklist curto cadastrado pelo responsável do local. A etapa atual será lida em voz alta e também exibida na tela. Quando o usuário disser “concluído”, o sistema confirmará o comando e avançará. Ao final, será mostrado um resumo do procedimento.

### Fluxo da interação

```text
Usuário fala
      ↓
Reconhecimento do comando
      ↓
Validação e atualização da etapa
      ↓
Feedback por voz e pela tela
```

### Entrada, processamento e saída

- **Entrada:** comandos falados e botões como alternativa acessível.
- **Processamento:** conversão da fala em texto, identificação do comando e controle da etapa atual.
- **Saída:** leitura da instrução, texto, progresso e mensagens de confirmação ou erro.

Comandos duvidosos não serão executados. O sistema pedirá que o usuário repita a fala, evitando avançar por engano.

### Tecnologias

O protótipo poderá ser desenvolvido com HTML, CSS e JavaScript. A [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) poderá realizar o reconhecimento e a síntese de voz. As etapas ficarão em um arquivo JSON e o progresso poderá ser salvo no navegador. Essa primeira versão não precisará de inteligência artificial.

### Esboço da interface

```text
┌─────────────────────────────────────────┐
│ VOZSEGURA                 ● Ouvindo     │
├─────────────────────────────────────────┤
│ Checklist: Preparação do equipamento    │
│ Etapa 2 de 5              ████░░░░ 40%  │
│                                         │
│ “Verifique a área antes de continuar.”  │
│                                         │
│ Comando ouvido: “concluído”             │
│                                         │
│ [Repetir]  [Voltar]  [Concluir etapa]   │
├─────────────────────────────────────────┤
│ Diga: concluído, repetir ou cancelar    │
└─────────────────────────────────────────┘
```

## Conclusão

As técnicas pesquisadas mostram que a voz pode tornar a interação mais acessível e natural. No VozSegura, ela também responde a uma necessidade concreta: consultar e confirmar instruções sem interromper uma tarefa manual. O escopo reduzido permite testar reconhecimento, feedback e prevenção de erros antes de ampliar o sistema para outros procedimentos.

## Fontes

- PEARL, David; FULTON, Laura Beth; CACKETT, Megan. *Sound as an interface: methods to evaluate voice user interface experiences in various contexts*. Google Research, 2022. <https://research.google/pubs/sound-as-an-interface-methods-to-evaluate-voice-user-interface-vui-experiences-in-various-contexts/>
- CHEN, Chen et al. *Screen or No Screen? Lessons Learnt from a Real-World Deployment Study of Using Voice Assistants With and Without Touchscreen for Older Adults*. ASSETS, 2023. <https://arxiv.org/abs/2307.07723>
- LEE, Jaewook et al. *GazePointAR: A Context-Aware Multimodal Voice Assistant for Pronoun Disambiguation in Wearable Augmented Reality*. CHI, 2024. <https://arxiv.org/abs/2404.08213>
- MICROSOFT RESEARCH. *SIGMA: An open-source mixed-reality system for research on physical task assistance*. 2024. <https://www.microsoft.com/en-us/research/blog/sigma-an-open-source-mixed-reality-system-for-research-on-physical-task-assistance/>
- NIELSEN, Jakob. *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group. <https://www.nngroup.com/articles/ten-usability-heuristics/>

## Uso de inteligência artificial

A inteligência artificial foi utilizada como apoio para pesquisar e indicar fontes, organizar as informações e revisar a escrita. As fontes sugeridas foram consultadas e o conteúdo final foi selecionado e ajustado de acordo com os objetivos da atividade.
