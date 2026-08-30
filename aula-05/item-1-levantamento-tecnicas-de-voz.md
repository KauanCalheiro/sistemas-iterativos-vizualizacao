# Item 1 — Levantamento de técnicas não convencionais de interação

## Recorte da pesquisa

O levantamento foi direcionado a técnicas em que a **voz é a principal forma de entrada**, mas que também podem utilizar tela, olhar, gestos e informações do ambiente para melhorar a interação. As duas técnicas selecionadas para aprofundamento são:

1. **Interface de usuário por voz (VUI) e interação conversacional**;
2. **Interação multimodal por voz, olhar e gestos**.

Uma terceira linha, o **reconhecimento de fala personalizado para pessoas com fala atípica**, foi mantida como tema complementar e possível foco de acessibilidade para o futuro protótipo.

---

## Técnica 1 — Interface de usuário por voz e interação conversacional

### Caracterização inicial

Uma *Voice User Interface* (VUI) permite executar tarefas por meio da fala. A voz captada pelo microfone é convertida em texto por reconhecimento automático de fala (ASR); o sistema identifica a intenção e os dados importantes da solicitação; em seguida, executa a ação e devolve uma resposta por áudio, texto ou elementos visuais.

Essa interação pode ocorrer por comandos objetivos, como “aumentar o volume”, ou por diálogo, como “quais compromissos eu tenho depois do almoço?”. Também pode ser *voice-only*, quando toda a experiência é sonora, ou *voice-first*, quando a voz é o meio principal e a tela serve para complementar a informação e o feedback.

### Por que o tema é relevante

- Permite interação sem as mãos e sem exigir atenção visual constante.
- Pode facilitar o acesso para pessoas com deficiência visual ou motora.
- É útil para pessoas idosas e para situações em que as mãos estão ocupadas, como cozinhar, dirigir, realizar manutenção ou cuidar de pacientes.
- Pode reduzir etapas de navegação em menus, mas introduz problemas de descoberta de comandos, reconhecimento incorreto, ruído, sotaques e privacidade.
- Tem relação direta com as heurísticas de visibilidade do estado do sistema, prevenção de erros, reconhecimento em vez de memorização e ajuda/documentação.

### Aplicações e produtos reais

- **Google Assistant — Quick Commands:** comandos rápidos em fones de ouvido, sem a necessidade de repetir uma palavra de ativação. Um estudo com mais de 80 participantes investigou utilidade, naturalidade e conforto em ambientes públicos, privados, silenciosos e ruidosos.
- **Android Voice Access:** recurso de acessibilidade que possibilita abrir aplicativos, navegar e editar texto usando comandos de voz.
- **Amazon Echo Show:** assistente de voz com tela. Um estudo de campo de 40 dias com pessoas idosas mostrou que a tela ajudou na apresentação das informações, embora os participantes ainda preferissem responder por voz.

### Fontes acadêmicas e técnicas

1. PEARL, David; FULTON, Laura Beth; CACKETT, Megan. **Sound as an interface: methods to evaluate voice user interface experiences in various contexts**. Google Research, 2022.  
   <https://research.google/pubs/sound-as-an-interface-methods-to-evaluate-voice-user-interface-vui-experiences-in-various-contexts/>

2. CHEN, Chen et al. **Screen or No Screen? Lessons Learnt from a Real-World Deployment Study of Using Voice Assistants With and Without Touchscreen for Older Adults**. ASSETS 2023.  
   Artigo: <https://arxiv.org/abs/2307.07723>  
   DOI: <https://doi.org/10.1145/3597638.3608378>

3. GOOGLE. **Use Voice Access commands**. Documentação técnica do Android Accessibility.  
   <https://support.google.com/accessibility/android/answer/6151854>

4. ZHONG, Yu et al. **JustSpeak: Enabling Universal Voice Control on Android**. W4A 2014. Trabalho clássico que fundamenta o controle não visual do Android por voz.  
   <https://research.google/pubs/justspeak-enabling-universal-voice-control-on-android/>

---

## Técnica 2 — Interação multimodal por voz, olhar e gestos

### Caracterização inicial

A interação multimodal combina duas ou mais modalidades de entrada. Neste recorte, a fala comunica a ação desejada, enquanto o olhar ou o gesto indica o objeto, local ou contexto ao qual o comando se refere. Por exemplo, o usuário olha para um equipamento e pergunta “como eu ligo isso?”, ou aponta para um objeto virtual e diz “coloque isso ali”.

O sistema recebe áudio, direção do olhar, gesto de apontar e, em alguns casos, imagens do ambiente. Esses sinais são sincronizados e combinados para interpretar a intenção. A resposta pode aparecer como áudio, texto, destaque visual ou objeto virtual sobreposto ao ambiente.

### Por que o tema é relevante

- Torna comandos de voz mais naturais, pois o usuário não precisa falar o nome exato de todos os objetos.
- Usa o contexto visual para reduzir ambiguidades de expressões como “isso”, “aquilo” e “ali”.
- Pode apoiar treinamento, manutenção, educação e orientação de tarefas com realidade aumentada.
- Oferece alternativas quando uma modalidade falha ou não é acessível ao usuário.
- Introduz desafios de sincronização, erros de rastreamento, custo do equipamento, sobrecarga de sensores e coleta de dados sensíveis sobre voz, olhar e ambiente.
- Tem relação direta com as heurísticas de correspondência com o mundo real, visibilidade do estado do sistema, controle do usuário, prevenção de erros e consistência.

### Aplicações e protótipos reais

- **GazePointAR:** assistente de voz contextual para realidade aumentada que combina fala, direção do olhar, gesto de apontar e histórico da conversa. O protótipo permite fazer perguntas como “o que é aquilo?” sem nomear explicitamente o objeto observado.
- **Microsoft SIGMA:** plataforma aberta para assistência a tarefas físicas em realidade mista. Processa áudio, reconhecimento de fala, vídeo, profundidade, mãos, cabeça e olhar para orientar o usuário passo a passo.
- **Apple Vision Pro:** produto comercial que combina olhos, mãos e voz. O Voice Control permite acionar elementos, ditar e editar texto e simular gestos usando comandos falados.

### Fontes acadêmicas e técnicas

1. LEE, Jaewook et al. **GazePointAR: A Context-Aware Multimodal Voice Assistant for Pronoun Disambiguation in Wearable Augmented Reality**. CHI 2024.  
   Artigo: <https://arxiv.org/abs/2404.08213>  
   DOI: <https://doi.org/10.1145/3613904.3642230>

2. MICROSOFT RESEARCH. **SIGMA: An open-source mixed-reality system for research on physical task assistance**. 2024.  
   <https://www.microsoft.com/en-us/research/blog/sigma-an-open-source-mixed-reality-system-for-research-on-physical-task-assistance/>

3. MICROSOFT. **Eye-gaze-based interaction on HoloLens 2**. Documentação técnica, incluindo a combinação de olhar com voz e gestos.  
   <https://learn.microsoft.com/en-us/windows/mixed-reality/design/eye-gaze-interaction>

4. APPLE. **Use Voice Control to interact with Apple Vision Pro**. Documentação técnica.  
   <https://support.apple.com/guide/apple-vision-pro/use-voice-control-tan14d179ad1/visionos>

---

## Tema complementar — Reconhecimento personalizado de fala atípica

Essa linha utiliza modelos de reconhecimento de fala adaptados ao padrão vocal de uma pessoa. É especialmente relevante para usuários com disartria, apraxia, gagueira ou alterações de fala associadas a condições como paralisia cerebral, Parkinson, síndrome de Down, esclerose lateral amiotrófica ou acidente vascular cerebral.

### Aplicação real

O **Project Relate**, do Google, é um aplicativo experimental para Android que aprende a fala do usuário a partir de frases gravadas. Ele pode transcrever a fala, repeti-la com voz sintetizada e permitir digitação por voz em outros aplicativos. No momento da consulta, o projeto estava em beta e não aceitava novos participantes.

### Fontes relevantes

1. MÜLLER-EBERSTEIN, Max et al. **Hypernetworks for Personalizing ASR to Atypical Speech**. *Transactions of the Association for Computational Linguistics*, 2024.  
   Página e PDF: <https://aclanthology.org/2024.tacl-1.65/>  
   DOI: <https://doi.org/10.1162/tacl_a_00696>

2. GOOGLE RESEARCH. **Project Relate: An App for Non-Standard Speech**.  
   <https://sites.research.google/relate/>

3. UNIVERSITY OF ILLINOIS URBANA-CHAMPAIGN. **Speech Accessibility Project**. Projeto de criação de dados representativos para melhorar o reconhecimento de diferentes padrões de fala.  
   <https://speechaccessibilityproject.beckman.illinois.edu/>

---

## Comparação inicial e escolha sugerida

| Aspecto | VUI conversacional | Voz + olhar/gestos | Voz personalizada |
|---|---|---|---|
| Entrada principal | Fala | Fala combinada com olhar ou gesto | Fala do usuário treinado |
| Maior benefício | Uso sem as mãos e navegação mais direta | Comandos naturais e contextualizados | Inclusão de pessoas não atendidas por ASR convencional |
| Principal dificuldade | Ruído, ambiguidades e descoberta de comandos | Sincronização, sensores e custo | Coleta de amostras e treinamento individual |
| Protótipo acadêmico | Fácil a moderado | Moderado a difícil | Moderado a difícil |
| Potencial social | Alto | Alto | Muito alto |

Para a continuidade da atividade, a combinação mais equilibrada é estudar profundamente **VUI conversacional** e **voz + olhar/gestos**. A primeira é mais simples de prototipar com um navegador ou celular; a segunda oferece maior inovação e permite discutir como modalidades diferentes se complementam.

Uma oportunidade viável de protótipo seria um **assistente de voz contextual para orientar tarefas**, no qual o usuário fala o que deseja fazer e seleciona visualmente ou por toque o objeto relacionado. Isso preserva a voz como interação principal, mas permite simular olhar ou apontamento sem exigir inicialmente um equipamento caro de realidade aumentada.

## Termos usados e recomendados para novas buscas

- *voice user interface (VUI)*
- *voice-first interaction*
- *conversational user interface*
- *hands-free interaction*
- *multimodal speech and gesture interaction*
- *gaze and voice interaction*
- *context-aware voice assistant*
- *voice accessibility*
- *atypical speech recognition*
- *personalized automatic speech recognition*

Pesquisa e conferência das fontes realizadas em 24 de agosto de 2026.
