# Explorando Técnicas Não Convencionais de Interação

**Unidade de Aprendizagem:** Sistemas Interativos e de Visualização  
**Professor:** Edson Moacir Ahlert  
**Nome do estudante:**  
**Data:**  

# 1 - Exploração e levantamento

Para esta atividade, foram escolhidas duas técnicas que usam a voz como parte principal da interação:

1. **Interface por voz (VUI):** permite conversar com o sistema ou executar ações por comandos falados. É usada em assistentes virtuais, celulares, carros e dispositivos inteligentes.
2. **Interação multimodal por voz, olhar e gestos:** combina a fala com o olhar ou o apontamento. Assim, o sistema consegue entender comandos como “o que é aquilo?” usando o contexto do ambiente.

A primeira técnica foi escolhida por ser acessível e útil quando o usuário não pode usar as mãos ou olhar para uma tela. A segunda amplia essa ideia ao usar mais de uma forma de entrada, tornando a conversa com o sistema mais natural.

## Aplicações encontradas

- **Android Voice Access:** permite navegar no celular e editar textos usando a voz.
- **Amazon Echo Show:** combina comandos falados com respostas sonoras e visuais.
- **GazePointAR:** protótipo de realidade aumentada que usa voz, olhar e gestos para identificar o objeto ao qual o usuário está se referindo.
- **Microsoft SIGMA:** sistema de realidade mista que orienta tarefas práticas usando voz, visão computacional, mãos e olhar.

## Fontes pesquisadas

- PEARL, David; FULTON, Laura Beth; CACKETT, Megan. *Sound as an interface: methods to evaluate voice user interface experiences in various contexts*. Google Research, 2022. <https://research.google/pubs/sound-as-an-interface-methods-to-evaluate-voice-user-interface-vui-experiences-in-various-contexts/>
- CHEN, Chen et al. *Screen or No Screen? Lessons Learnt from a Real-World Deployment Study of Using Voice Assistants With and Without Touchscreen for Older Adults*. ASSETS, 2023. <https://arxiv.org/abs/2307.07723>
- LEE, Jaewook et al. *GazePointAR: A Context-Aware Multimodal Voice Assistant for Pronoun Disambiguation in Wearable Augmented Reality*. CHI, 2024. <https://arxiv.org/abs/2404.08213>
- MICROSOFT RESEARCH. *SIGMA: An open-source mixed-reality system for research on physical task assistance*. 2024. <https://www.microsoft.com/en-us/research/blog/sigma-an-open-source-mixed-reality-system-for-research-on-physical-task-assistance/>

# 2 - Compreensão e análise das técnicas

## 2.1 Interface por voz

**1. Que técnica está sendo utilizada?**  
É uma interface por voz, na qual o usuário conversa com o sistema ou fala comandos para realizar ações.

**2. Como ela funciona?**  
O microfone capta a fala, o sistema transforma o áudio em texto e identifica o pedido. Depois, executa a ação e responde por áudio, texto ou imagem.

> Usuário fala → sistema interpreta → ação é executada → resposta é apresentada

**3. Em que contexto ela é aplicada?**  
É usada em assistentes virtuais, automação residencial e recursos de acessibilidade. O Voice Access, por exemplo, permite controlar um celular sem tocar na tela.

**4. Quem são os usuários?**  
Pode ser usada por qualquer pessoa, mas é especialmente útil para pessoas com deficiência visual ou motora, idosos e usuários que estejam com as mãos ocupadas.

**5. Qual é o principal benefício?**  
Permite realizar tarefas sem teclado, mouse ou toque. Em alguns casos, um comando falado também substitui várias etapas de navegação.

**6. Quais são as limitações?**  
Ruídos, sotaques e falas pouco claras podem causar erros. O usuário também pode não saber quais comandos existem, e falar em público nem sempre é confortável.

**7. O que precisa ser considerado?**  
A interface deve oferecer alternativas como texto e toque. Também precisa indicar quando está ouvindo e explicar como as gravações são usadas. Internet, qualidade do microfone e custo do serviço podem afetar o funcionamento.

## 2.2 Interação por voz, olhar e gestos

**1. Que técnica está sendo utilizada?**  
É uma interação multimodal que reúne fala, direção do olhar e gestos, como apontar para um objeto.

**2. Como ela funciona?**  
O microfone capta a voz e os sensores acompanham o olhar e as mãos. O sistema combina essas informações para entender o pedido e responde por som ou por elementos visuais.

> Usuário fala e aponta → sensores captam as entradas → sistema combina os dados → resposta é apresentada

**3. Em que contexto ela é aplicada?**  
É usada principalmente em realidade aumentada, treinamentos e orientação de tarefas. No GazePointAR, o usuário pode olhar para um objeto e perguntar “o que é isso?”.

**4. Quem são os usuários?**  
Pode atender estudantes, técnicos, profissionais em treinamento e pessoas que precisam manter as mãos livres durante uma atividade.

**5. Qual é o principal benefício?**  
O usuário não precisa saber o nome exato de um objeto. Ele pode indicar o elemento com o olhar ou um gesto e usar a voz para dizer o que deseja.

**6. Quais são as limitações?**  
O sistema pode associar a fala ao objeto errado se as entradas não estiverem sincronizadas. Iluminação, ruído e falhas dos sensores também podem prejudicar a interação.

**7. O que precisa ser considerado?**  
O equipamento pode ser caro e exigir câmeras, sensores e boa capacidade de processamento. Voz, olhar e imagens do ambiente são dados sensíveis. Além disso, o sistema deve permitir que pessoas com dificuldades de fala, visão ou movimento usem outra forma de entrada.

# 3 - Análise crítica com as heurísticas de Nielsen

As técnicas foram analisadas com base nas [10 heurísticas de usabilidade de Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/).

## 3.1 Interface por voz

| Heurística | Análise |
|---|---|
| **Visibilidade do estado do sistema** | O usuário precisa saber quando o sistema está ouvindo, processando ou executando uma ação. Um ícone, sinal sonoro ou mensagem como “processando” evita que ele repita o comando sem necessidade. |
| **Reconhecimento em vez de memorização** | Como os comandos de voz não ficam visíveis, o usuário pode não saber o que falar. Sugestões como “você pode dizer: criar lembrete” reduzem a necessidade de decorar comandos. |
| **Prevenção de erros** | Antes de uma ação importante, o sistema deve confirmar o que entendeu. Por exemplo: “Deseja apagar todos os lembretes?”. Isso evita consequências causadas por uma fala reconhecida incorretamente. |

Essa técnica resolve a dificuldade de usar telas quando as mãos ou a visão não estão disponíveis. Porém, introduz um novo problema: o usuário pode não perceber que o sistema entendeu outra palavra ou executou a ação errada.

## 3.2 Interação por voz, olhar e gestos

| Heurística | Análise |
|---|---|
| **Correspondência entre o sistema e o mundo real** | Falar “mova isso para lá” enquanto se olha ou aponta para os objetos se aproxima da comunicação humana. A interação se torna mais natural e exige menos termos técnicos. |
| **Visibilidade do estado do sistema** | O objeto identificado deve receber um destaque visual antes da ação. Assim, o usuário consegue conferir se o sistema associou a fala ao elemento correto. |
| **Controle e liberdade do usuário** | Deve ser possível cancelar ou desfazer uma ação por voz ou gesto. Se o objeto errado for selecionado, o usuário precisa corrigi-lo sem reiniciar toda a tarefa. |

Essa técnica resolve a falta de contexto dos assistentes de voz, pois usa o olhar e os gestos para identificar objetos. Em contrapartida, pode surgir um novo erro quando o sistema interpreta um olhar casual como uma seleção ou combina sinais que ocorreram em momentos diferentes.

# 4 - Seleção da técnica e oportunidade de projeto

**Técnica escolhida:** interface por voz e interação conversacional.

**Oportunidade de projeto:** VozSegura — checklist de procedimentos por voz.

**Problema:** em laboratórios e oficinas, o usuário pode estar usando luvas ou segurando ferramentas. Consultar uma tela interrompe a atividade, e esquecer uma etapa pode causar erros ou acidentes.

**Público-alvo:** estudantes, técnicos e profissionais que realizam procedimentos com uma sequência definida de segurança.

**Contexto de uso:** o sistema seria usado durante uma atividade prática. Ele apresentaria uma etapa por vez e aceitaria comandos como “iniciar”, “concluído”, “repetir”, “voltar” e “cancelar”.

**Por que a técnica é adequada:** a voz permite consultar e confirmar instruções sem tocar no equipamento, mantendo as mãos livres e a atenção na tarefa.

**Benefício esperado:** reduzir etapas esquecidas e tornar o procedimento mais seguro. O sistema também mostraria o progresso na tela e pediria confirmação antes de avançar, diminuindo o risco de comandos reconhecidos incorretamente.

# 5 - Conceito inicial do protótipo

## VozSegura

O VozSegura será um checklist por voz para acompanhar procedimentos em laboratórios e oficinas. O protótipo apresentará uma sequência curta, cadastrada pelo responsável do local, e permitirá avançar sem tocar na tela. Ele servirá como apoio e não substituirá as normas de segurança da instituição.

## Fluxo da interação

> Usuário fala → sistema reconhece o comando → etapa é atualizada → usuário recebe feedback por voz e pela tela

1. O usuário escolhe um checklist e diz “iniciar”.
2. O sistema lê e mostra a primeira etapa.
3. O usuário diz “concluído”, “repetir”, “voltar” ou “cancelar”.
4. Ao ouvir “concluído”, o sistema confirma e avança.
5. No final, apresenta um resumo das etapas realizadas.

## Entradas, processamento e respostas

- **Entradas:** comandos de voz e, como alternativa acessível, botões na tela.
- **Processamento:** conversão da fala em texto, identificação do comando e controle da etapa atual. Comandos duvidosos não serão executados.
- **Respostas:** leitura da instrução, texto na tela, indicador de progresso e mensagens de confirmação ou erro.

## Tecnologias possíveis

O protótipo poderá ser feito com HTML, CSS e JavaScript. A [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) oferece recursos de reconhecimento e síntese de voz. As etapas podem ficar em um arquivo JSON e o progresso pode ser salvo no próprio navegador. Não será necessário usar inteligência artificial nessa primeira versão.

## Esboço da interface

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
│ Diga: concluído, repetir ou cancelar     │
└─────────────────────────────────────────┘
```
