# Contexto completo da sessão — Aula 6 e VozSegura 2.0

> Este documento permite continuar o trabalho em uma nova sessão sem acesso ao histórico da conversa. Leia-o integralmente antes de alterar o projeto.

## 1. Informações gerais

**Workspace:** `sistemas-iterativos-vizualizacao`  
**Pasta da atividade:** `aula-06`  
**Período desta etapa:** 31 de agosto e 1º de setembro de 2026  
**Unidade de Aprendizagem:** Sistemas Interativos e de Visualização  
**Professor:** Edson Moacir Ahlert  
**Estudantes usados no relatório:** Kauan Morinel Calheiro e Everton Luiz de Oliveira

Os nomes foram reutilizados da aula 5 porque o projeto é uma continuação direta. Confirmar com o usuário se a entrega atual continuará em dupla.

## 2. Histórico do pedido

O usuário pediu inicialmente que o conteúdo do PDF da aula 6 fosse carregado no contexto. Em seguida, solicitou a leitura da atividade em Markdown, ajuda para escolher um problema, dez ideias adicionais e uma análise de qual delas seria mais fácil de implementar.

Após discutir o papel real de TinyML, foi autorizada a implementação. Durante o planejamento, o usuário perguntou se a nova atividade poderia ser vinculada à aula anterior. A solução foi então redirecionada para continuar o projeto **VozSegura**, concebido na aula 5.

## 3. Material da aula 6

PDF:

```text
aula-06/Conceitos de IoT aplicados a Interacao.pdf
```

O material possui 37 páginas e apresenta:

- sensores e atuadores em sistemas interativos;
- sensores como ponte entre o mundo físico e digital;
- tipos de sensores: movimento, acústicos, ambientais, imagem, biométricos, toque, força e rotação;
- dispositivos IoT de baixo consumo;
- aplicações *always on*;
- AIoT;
- Edge Computing, EdgeML e TinyML;
- benefícios de latência, privacidade, conectividade e energia;
- TensorFlow Lite e TensorFlow Lite Micro;
- Arduino Nano 33 BLE Sense;
- Edge Impulse Studio;
- aplicações de TinyML em áudio, imagem, gestos, saúde e indústria.

Aplicação no VozSegura:

1. o microfone é um sensor acústico;
2. o modelo interpreta o sinal na borda;
3. tela e síntese de voz são saídas perceptíveis;
4. processamento local reduz latência e exposição da voz;
5. o modelo pode futuramente ser implantado em hardware mais restrito.

## 4. Enunciado da atividade

Arquivo:

```text
aula-06/Criacao de Experiencias Interativas com IoT.md
```

Fluxo exigido:

```text
Usuário/Ambiente → Sensor ou Entrada → Processamento → Atuador ou Saída → Feedback
```

Entregas exigidas:

1. relatório técnico resumido;
2. descrição do problema e justificativa;
3. sensores e atuadores selecionados;
4. papel do TinyML;
5. evidência da plataforma;
6. protótipo funcional ou parcialmente funcional;
7. captura, vídeo curto ou link.

Critérios:

| Critério | Peso |
|---|---:|
| Criatividade e relevância | 20% |
| Clareza da interação | 15% |
| IoT + TinyML | 25% |
| Protótipo funcional | 30% |
| Apresentação e documentação | 10% |

## 5. Ligação com a aula 5

Entrega anterior:

```text
aula-05/produto-da-atividade.md
```

Na aula 5 foram investigadas interfaces por voz e interação multimodal. A oportunidade escolhida foi:

> VozSegura — checklist falado para procedimentos em laboratórios e oficinas.

Problema já definido:

- usuários podem estar usando luvas ou ferramentas;
- consultar uma tela interrompe a atividade;
- esquecer uma etapa pode gerar erro ou acidente;
- a voz mantém as mãos livres.

Comandos imaginados: iniciar, concluído, repetir, voltar e cancelar. A primeira versão usaria Web Speech API sem IA. Na aula 6, o reconhecimento passa a ser feito por um classificador local treinado no Edge Impulse.

## 6. Ideias consideradas

Foram consideradas: monitor de postura, alerta de sonolência, campainha acessível, vazamento doméstico, controle de apresentação por gestos, monitor de exercícios, desperdício de energia, auxílio para baixa visão, monitor de plantas e separação de resíduos.

O controle de apresentação por gestos foi inicialmente recomendado pela facilidade. Depois foi feita uma distinção importante: modelo em navegador de computador é mais precisamente EdgeML. Uma alternativa com acelerômetro do iPhone foi discutida, mas o VozSegura mostrou maior coerência com a aula anterior e melhor justificativa acadêmica.

## 7. Solução escolhida

> **VozSegura 2.0 — checklist inteligente de segurança por voz**

Fluxo:

```text
Usuário fala
  → microfone
  → áudio em 16 kHz e PCM16
  → MFCC
  → modelo TinyML
  → validação de segurança
  → checklist
  → feedback por tela e voz
```

| Parte | Implementação |
|---|---|
| Usuário/ambiente | Pessoa em laboratório ou oficina |
| Sensor | Microfone do iPhone ou computador |
| Processamento | MFCC + rede neural Edge Impulse |
| Saída | Tela e síntese de voz |
| Feedback | Estado, confiança, progresso e confirmação |

## 8. Papel de TinyML

O modelo reconhece um vocabulário pequeno e específico. Benefícios: inferência local, resposta rápida, privacidade, menor dependência da internet e possível execução contínua.

Ressalva: o iPhone não é microcontrolador e também caracteriza EdgeML. A defesa de TinyML deve se apoiar no modelo compacto, pipeline otimizado, estimativas de recursos e possibilidade de exportação para hardware embarcado. Não afirmar que o iPhone é microcontrolador.

## 9. Projeto e dados no Edge Impulse

Projeto informado:

```text
kauancalheiro / kauancalheiro-project-1
```

Classes:

```text
concluido
repetir
desconhecido
ruido
```

Conjunto inicial:

- duração total: 1 minuto e 41 segundos;
- total: 52 amostras;
- treino: 41;
- teste: 11;
- divisão: 80% / 20%;
- várias amostras tinham 2 segundos.

Foi recomendado coletar mais, mas o usuário escolheu testar a primeira versão.

## 10. Configuração do impulso

| Campo | Valor |
|---|---:|
| Window size | 1000 ms |
| Window increase | 500 ms |
| Frequency | 16000 Hz |
| Processing block | Audio (MFCC) |
| Learning block | Classification |
| Training cycles | 100 |
| Learning rate | 0.005 |
| Validation | 20% |

Passos: Create impulse, configurar janela e frequência, adicionar MFCC e Classification, salvar, gerar características, abrir classificador, treinar e analisar a matriz.

## 11. Validação do treinamento

| Métrica | Valor |
|---|---:|
| Accuracy | 60,0% |
| Loss | 0,88 |
| AUC | 0,91 |
| Precisão ponderada | 0,70 |
| Recall ponderado | 0,60 |
| F1 ponderado | 0,59 |

| Real / Previsto | Concluído | Desconhecido | Repetir | Ruído |
|---|---:|---:|---:|---:|
| Concluído | 44,4% | 0% | 55,6% | 0% |
| Desconhecido | 33,3% | 33,3% | 0% | 33,3% |
| Repetir | 33,3% | 0% | 66,7% | 0% |
| Ruído | 0% | 0% | 0% | 100% |

Interpretação: `ruido` estava bem separado; comandos ainda se confundiam; o conjunto era pequeno; não seria seguro executar ações apenas pela classe vencedora.

## 12. Model testing

| Métrica | Valor |
|---|---:|
| Accuracy | 75,86% |
| AUC | 0,96 |
| Precisão ponderada | 0,88 |
| Recall ponderado | 0,76 |
| F1 ponderado | 0,77 |

| Real / Previsto | Concluído | Desconhecido | Repetir | Ruído | Incerto |
|---|---:|---:|---:|---:|---:|
| Concluído | 100% | 0% | 0% | 0% | 0% |
| Desconhecido | 16,7% | 58,3% | 0% | 8,3% | 16,7% |
| Repetir | 11,1% | 0% | 77,8% | 11,1% | 0% |
| Ruído | 0% | 0% | 0% | 100% | 0% |

Risco principal: falsos `concluido`, pois 16,7% de desconhecidos e 11,1% de `repetir` foram classificados assim.

## 13. Classificação ao vivo

Amostra: `testing.71a0t7np`.

| Categoria | Janelas |
|---|---:|
| `concluido` | 13 |
| `desconhecido` | 2 |
| `repetir` | 9 |
| `ruido` | 2 |
| `uncertain` | 3 |

Foram 29 janelas em 14,5 segundos, a cada 500 ms. `concluido` atingiu 0,82–1,00; `repetir`, 0,89–1,00; `desconhecido` ficou até 0,65; `ruido`, até 0,76. O limiar de 0,80 separou comandos e negativos nessa captura.

## 14. Segurança implementada

1. confiança mínima de 80%;
2. duas classificações consecutivas iguais;
3. comando fica desarmado após executar;
4. só rearma após classe negativa;
5. cooldown adicional de 1,7 segundo;
6. pausa durante síntese de voz;
7. descarte de buffer durante pausa;
8. retomada 300 ms após o feedback;
9. botões como alternativa.

Cooldown sozinho não bastaria, pois uma fala longa poderia atravessar o intervalo. O bloqueio até uma classe negativa evita execução dupla.

## 15. Deployment

Opções vistas: WebAssembly, WebAssembly (browser, SIMD) e WebAssembly (Node.js, SIMD). Foi escolhida corretamente **WebAssembly (browser, SIMD)** porque o destino é Safari.

ZIP:

```text
aula-06/vozsegura-2/model/kauancalheiro-project-1-wasm-browser-simd-v2-impulse-#1.zip
```

Arquivos extraídos:

```text
aula-06/vozsegura-2/model/runtime/browser/run-impulse.js
aula-06/vozsegura-2/model/runtime/browser/edge-impulse-standalone.js
aula-06/vozsegura-2/model/runtime/browser/edge-impulse-standalone.wasm
```

O `.wasm` tem aproximadamente 8,2 MB. Isso inclui runtime do navegador e não deve ser tratado como uso de Flash de microcontrolador. O ZIP original foi preservado.

## 16. Estrutura do protótipo

```text
aula-06/vozsegura-2/
├── index.html
├── styles.css
├── app.js
├── tinyml-adapter.js
├── README.md
├── COLETA.md
├── TESTE-MODELO.md
└── model/
    ├── README.md
    ├── kauancalheiro-project-1-wasm-browser-simd-v2-impulse-#1.zip
    └── runtime/browser/
        ├── edge-impulse-standalone.js
        ├── edge-impulse-standalone.wasm
        └── run-impulse.js
```

Documentos gerais:

```text
aula-06/entrega.md
aula-06/GUIA-REPRODUCAO-TINYML.md
aula-06/CONTEXTO-PROXIMA-SESSAO.md
```

## 17. Responsabilidade dos arquivos

### `index.html`

Interface completa: estado, checklist, progresso, classificação, confiança, botões, fluxo IoT, cartão do modelo, simulador e diálogo final.

Ordem obrigatória:

```html
<script src="model/runtime/browser/edge-impulse-standalone.js"></script>
<script src="model/runtime/browser/run-impulse.js"></script>
<script src="tinyml-adapter.js"></script>
<script src="app.js"></script>
```

### `styles.css`

Tema escuro, layout responsivo, cartões, status, animação do microfone, telas pequenas e `prefers-reduced-motion`.

### `app.js`

Checklist, `localStorage`, síntese pt-BR, ações, limiar, duas previsões, bloqueio, cooldown, pausa da escuta e simulador.

### `tinyml-adapter.js`

Inicializa `EdgeImpulseClassifier`, pede microfone, captura mono com Web Audio API, reamostra para 16 kHz, converte `[-1,1]` em PCM16 pela escala 32767, chama `classifyContinuous` e publica a melhor classe.

Usa `ScriptProcessorNode` por compatibilidade com Safari, embora seja API legada. Futuramente pode migrar para `AudioWorklet`.

### Documentação

- `COLETA.md`: coleta inicial;
- `TESTE-MODELO.md`: resultados detalhados;
- `entrega.md`: relatório da atividade;
- `GUIA-REPRODUCAO-TINYML.md`: reprodução com maior acurácia;
- este arquivo: histórico e handoff entre sessões.

## 18. Checklist demonstrativo

1. liberar a área de trabalho;
2. colocar EPIs;
3. verificar cabos, ferramentas e componentes;
4. confirmar alimentação elétrica desligada;
5. posicionar instrumentos e liberar a bancada.

As etapas ficam no objeto `procedure` de `app.js`.

## 19. Verificações realizadas

Passaram:

```bash
node --check app.js
node --check tinyml-adapter.js
```

Servidor confirmou:

```text
GET / → HTTP 200, text/html
GET /model/runtime/browser/edge-impulse-standalone.wasm
  → HTTP 200, application/wasm, 8200847 bytes
```

Uma tentativa de executar o build Browser SIMD no Node foi recusada porque ele foi compilado para navegador. Isso é esperado; o utilitário temporário foi removido.

## 20. Servidor local

```bash
cd aula-06/vozsegura-2
python3 -m http.server 8765
```

Abrir no computador:

```text
http://localhost:8765
```

O servidor pode não continuar ativo entre sessões; reinicie se necessário.

## 21. Estado exato ao terminar esta sessão

A implementação principal, o treinamento, o teste no Edge Impulse, a classificação ao vivo e a integração do WebAssembly foram feitos.

Ainda não houve confirmação do teste end-to-end da **interface personalizada**. O usuário recebeu estas instruções:

1. abrir `http://localhost:8765`;
2. aguardar “Modelo carregado”;
3. ativar voz;
4. permitir microfone;
5. dizer “concluído”;
6. dizer “repetir”;
7. dizer palavra qualquer;
8. informar classe e confiança.

A próxima sessão deve começar por esse teste, sem reimplementar o projeto.

## 22. Trabalho pendente

### 22.1 Validar no computador

Confirmar carregamento do WASM, microfone, confiança, avanço único, repetição, rejeição de negativos e ausência de realimentação da síntese.

Em caso de erro, registrar navegador, console, mensagem visual e permissão do microfone.

### 22.2 Publicar em HTTPS

O iPhone exige HTTPS. `localhost` no iPhone representa o próprio aparelho, não o computador.

Remoto Git:

```text
origin https://github.com/KauanCalheiro/sistemas-iterativos-vizualizacao.git
branch main
```

GitHub Pages é uma opção, mas publicar é ação externa. Pedir autorização explícita antes de criar/pushar workflow ou configurar Pages.

### 22.3 Capturar evidências reais

Faltam imagens de Data acquisition, impulso, MFCC, treinamento, Model testing, Live classification, Deployment, interface carregada e interface após comando. Também falta vídeo curto.

Não fabricar evidências.

### 22.4 Obter métricas de hardware

RAM, Flash e latência específicas não foram fornecidas. Solicitar captura no Edge Impulse. Não usar 8,2 MB do `.wasm` como Flash embarcada.

### 22.5 Finalizar relatório

`aula-06/entrega.md` está completo, mas a seção 12 pede evidências. Antes do envio:

- confirmar estudantes;
- inserir imagens/link/vídeo;
- adicionar URL pública;
- obter RAM/Flash/latência;
- remover a observação de pendência.

## 23. Maior acurácia no futuro

O guia completo está em `aula-06/GUIA-REPRODUCAO-TINYML.md`.

Resumo:

1. usar no mínimo 3–5 minutos por classe;
2. idealmente aproximar 10 minutos por classe;
3. balancear;
4. coletar teste em sessão separada;
5. variar vozes, distâncias e ambientes;
6. adicionar negativos difíceis;
7. considerar “etapa concluída” e “repetir instrução”;
8. melhorar dados conforme erros;
9. buscar ≥85% no teste;
10. buscar recall ≥90% por comando;
11. buscar falso `concluido` <5%;
12. usar Performance calibration e EON Tuner após melhorar dados.

## 24. Limitações

- conjunto pequeno;
- 75,86% é prova de conceito, não sistema de segurança real;
- falsos `concluido` ainda são possíveis;
- Browser SIMD pode falhar em dispositivo antigo;
- iPhone exige HTTPS;
- `ScriptProcessorNode` é legado;
- poucas vozes no treinamento;
- sem teste formal com usuários;
- não substitui normas ou supervisão.

## 25. Cuidados

- preservar controles por botão;
- não baixar limiar sem testar;
- não agir com uma só janela;
- pausar modelo durante síntese;
- não incluir chaves ou tokens;
- preservar ZIP original;
- não chamar simulação de inferência;
- não inventar métricas ou capturas;
- preservar mudanças preexistentes da aula 5.

## 26. Estado do Git

Antes do trabalho já existiam alterações do usuário:

- `aula-05/produto-da-atividade.md` modificado;
- PDF da aula 5 não rastreado;
- pasta `aula-06` não rastreada.

Não usar `git reset`, `git checkout --` ou exclusões destrutivas. Nenhum commit ou push foi feito nesta sessão.

## 27. Fontes oficiais

- <https://docs.edgeimpulse.com/hardware/devices/mobile-phone>
- <https://docs.edgeimpulse.com/tutorials/end-to-end/keyword-spotting>
- <https://docs.edgeimpulse.com/studio/projects/deployment>
- <https://docs.edgeimpulse.com/studio/projects/live-classification>
- <https://docs.edgeimpulse.com/tutorials/topics/inference/sample-audio-continuously>
- <https://www.tensorflow.org/lite/microcontrollers>

## 28. Comandos para retomar

```bash
find aula-06/vozsegura-2 -maxdepth 4 -type f | sort
```

```bash
cd aula-06/vozsegura-2
node --check app.js
node --check tinyml-adapter.js
python3 -m http.server 8765
```

Depois abrir `http://localhost:8765`.

## 29. Ordem da próxima sessão

1. ler este arquivo;
2. perguntar pelo teste local;
3. iniciar servidor se necessário;
4. corrigir integração, se houver erro;
5. confirmar funcionamento no computador;
6. pedir autorização para HTTPS;
7. publicar/testar no iPhone;
8. coletar evidências;
9. inserir evidências em `entrega.md`;
10. confirmar estudantes e métricas;
11. revisar entrega;
12. opcionalmente melhorar o modelo.

## 30. Prompt pronto para uma nova sessão

```text
Leia integralmente o arquivo aula-06/CONTEXTO-PROXIMA-SESSAO.md e continue o projeto VozSegura 2.0 exatamente do estado registrado. Não recomece a implementação e preserve as alterações existentes. Primeiro verifique o teste local do modelo WebAssembly; depois me ajude a publicar por HTTPS, testar no iPhone, coletar evidências visuais e finalizar aula-06/entrega.md.
```

## 31. Definição de pronto

- [ ] modelo carrega na interface;
- [ ] microfone funciona;
- [ ] “concluído” avança uma vez;
- [ ] “repetir” lê sem avançar;
- [ ] negativos não executam;
- [ ] síntese não aciona o modelo;
- [ ] interface publicada em HTTPS;
- [ ] teste no iPhone concluído;
- [ ] capturas e vídeo reais;
- [ ] RAM, Flash e latência documentadas;
- [ ] estudantes confirmados;
- [ ] relatório sem pendências;
- [ ] link público no relatório.

O ponto atual é: **validação end-to-end da interface personalizada no navegador**.
