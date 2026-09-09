# Guia completo de reprodução — VozSegura com TinyML

Este documento descreve todo o processo para recriar o reconhecimento de comandos do VozSegura no Edge Impulse, desde a definição das classes até a integração do modelo no navegador. Ele também incorpora melhorias para obter acurácia superior à primeira versão.

## 1. Resultado esperado

Ao final, o sistema deverá executar este fluxo:

```text
Usuário fala
  → microfone captura o áudio
  → MFCC extrai características da fala
  → modelo TinyML classifica o comando
  → aplicação valida confiança e estabilidade
  → checklist avança ou repete a instrução
  → usuário recebe feedback por voz e tela
```

O modelo terá quatro classes:

| Rótulo no Edge Impulse | Conteúdo |
|---|---|
| `concluido` | Comando para confirmar e avançar |
| `repetir` | Comando para ouvir novamente |
| `desconhecido` | Outras palavras e frases humanas |
| `ruido` | Silêncio e sons que não são fala útil |

Use os rótulos exatamente como estão escritos, sem acentos.

## 2. O que foi aprendido com a primeira versão

A primeira coleta teve 1 minuto e 41 segundos, com 52 amostras divididas entre as quatro classes. Os resultados foram:

| Avaliação | Acurácia |
|---|---:|
| Validação do treinamento | 60,0% |
| Conjunto de teste | 75,86% |

O modelo reconheceu bem `ruido`, mas confundiu `concluido`, `repetir` e `desconhecido`. A principal causa foi a pequena quantidade e variedade de dados.

Para melhorar a próxima versão, é mais importante ampliar e organizar os dados do que apenas aumentar os ciclos de treinamento.

## 3. Escolher os comandos antes da coleta

Existem duas opções.

### Opção A — manter comandos curtos

- “concluído”;
- “repetir”.

Essa opção preserva a interface original, mas exige mais dados porque palavras isoladas podem ser confundidas com trechos de outras palavras.

### Opção B — usar frases mais distintas, recomendada

- “etapa concluída”;
- “repetir instrução”.

Frases com mais sílabas oferecem um padrão acústico mais específico e tendem a produzir menos falsos positivos. Os rótulos continuam sendo `concluido` e `repetir`.

Não misture palavras curtas e frases longas dentro da mesma classe, a menos que queira aceitar deliberadamente as duas formas. Misturar formatos aumenta a variação que o modelo precisa aprender.

## 4. Criar o projeto no Edge Impulse

1. Acesse <https://studio.edgeimpulse.com/>.
2. Entre na conta.
3. Crie um novo projeto.
4. Use um nome descritivo, como `vozsegura-keyword-spotting-v2`.
5. Mantenha o projeto como **Personal** se não precisar de colaboradores.
6. Não compartilhe chaves de API ou tokens nos arquivos do projeto.

## 5. Conectar o iPhone

1. No menu do projeto, abra **Devices**.
2. Clique em **Connect a new device**.
3. Escolha **Mobile phone**.
4. Escaneie o QR Code com a câmera do iPhone.
5. Abra o endereço no Safari.
6. Autorize o acesso ao microfone quando solicitado.
7. Confirme no computador que o iPhone aparece como conectado.

Se o dispositivo não conectar:

- confirme que computador e iPhone possuem internet;
- abra novamente o QR Code;
- desative temporariamente bloqueadores de conteúdo no Safari;
- confira as permissões de microfone do Safari nos Ajustes do iPhone.

## 6. Planejar um conjunto de dados melhor

Para um modelo mais confiável, use dados balanceados: cada classe deve ter duração semelhante.

### Meta recomendada

| Classe | Treinamento | Teste separado | Total desejado |
|---|---:|---:|---:|
| `concluido` | 8 minutos | 2 minutos | 10 minutos |
| `repetir` | 8 minutos | 2 minutos | 10 minutos |
| `desconhecido` | 8 minutos | 2 minutos | 10 minutos |
| `ruido` | 8 minutos | 2 minutos | 10 minutos |

A documentação oficial recomenda aproximadamente 10 minutos por classe para um modelo de keyword spotting mais robusto. Se não houver tempo, use no mínimo 3 a 5 minutos por classe, mantendo o equilíbrio.

### Por que separar o teste durante a coleta

Não use apenas fragmentos da mesma gravação tanto no treinamento quanto no teste. Janelas vizinhas podem ser muito parecidas e produzir uma acurácia artificialmente alta.

Faça o conjunto de teste em outra sessão:

- em outro horário;
- preferencialmente em outro ambiente;
- com posição ou distância diferente;
- com algumas vozes que não apareçam no treinamento.

Ao coletar, escolha explicitamente **Training** ou **Test** antes de iniciar cada gravação.

## 7. Configurar cada captura

Na área **Data acquisition**, utilize:

| Campo | Valor |
|---|---|
| Sensor | `Microphone` |
| Frequência | `16000 Hz` |
| Duração da gravação | `10 segundos` |
| Categoria | `Training` ou `Test` conforme o planejamento |
| Rótulo | Uma das quatro classes |

Durante uma gravação de comando:

1. fale o comando;
2. espere uma pequena pausa;
3. repita o comando;
4. varie levemente volume, velocidade e entonação;
5. não sobreponha uma repetição à outra.

## 8. Coletar `concluido` e `repetir`

Inclua variedade realista:

- voz normal, baixa e um pouco mais alta;
- fala lenta, normal e rápida;
- iPhone próximo, intermediário e distante;
- ambientes silenciosos e moderadamente ruidosos;
- celular apoiado e segurado na mão;
- diferentes pessoas, gêneros de voz e sotaques, quando possível.

Evite alterar completamente a pronúncia ou gritar. O objetivo é representar condições reais de uso.

Depois de cada gravação longa:

1. abra o menu **⋮** da amostra;
2. escolha **Split sample**;
3. confira se cada janela contém um comando completo;
4. ative **Shift samples** quando disponível;
5. exclua janelas cortadas ou rotuladas incorretamente.

## 9. Coletar `desconhecido`

Essa classe é fundamental para evitar que conversas comuns avancem o checklist.

Grave:

- palavras aleatórias;
- pequenas frases;
- termos utilizados no laboratório;
- números;
- nomes de objetos;
- vozes de outras pessoas;
- conversas ao fundo.

Inclua principalmente **negativos difíceis**, isto é, palavras parecidas com os comandos:

- “concluir”;
- “continuar”;
- “conteúdo”;
- “repetição”;
- “permitir”;
- “retirar”;
- “primeiro”;
- “finalizado”.

Não pronuncie acidentalmente o comando completo dentro da classe `desconhecido`.

## 10. Coletar `ruido`

Grave sons que podem ocorrer no contexto de uso:

- silêncio do ambiente;
- ventilador ou ar-condicionado;
- passos;
- portas;
- ferramentas;
- movimentação de objetos;
- ruído elétrico;
- pessoas conversando à distância;
- sons produzidos pelo próprio computador ou celular.

Não grave apenas um tipo de ruído. Um conjunto variado melhora a rejeição de situações desconhecidas.

## 11. Conferir a qualidade dos dados

Antes de treinar:

1. remova todos os filtros da tela **Data acquisition**;
2. confira se existem as quatro classes;
3. compare a duração total de cada classe;
4. mantenha a diferença entre classes abaixo de aproximadamente 10%;
5. reproduza amostras aleatórias;
6. exclua áudio vazio, saturado, cortado ou rotulado incorretamente;
7. confirme que o teste foi gravado em sessão separada;
8. verifique se cada comando cabe na janela escolhida.

Dados ruins não são corrigidos aumentando o número de ciclos da rede neural.

## 12. Criar o impulso

Abra **Impulse design → Create impulse**.

### Para comandos curtos

| Configuração | Valor inicial |
|---|---:|
| Window size | `1000 ms` |
| Window increase | `500 ms` |
| Frequency | `16000 Hz` |

### Para frases mais longas

| Configuração | Valor inicial |
|---|---:|
| Window size | `1500 ms` |
| Window increase | `500 ms` |
| Frequency | `16000 Hz` |

Adicione:

1. **Audio (MFCC)** como bloco de processamento;
2. **Classification** como bloco de aprendizado.

Clique em **Save impulse**.

Se parte do comando ficar fora da janela, aumente o `Window size`. Evite janelas muito maiores do que a fala, pois o excesso de silêncio pode prejudicar o aprendizado.

## 13. Configurar e gerar MFCC

1. Abra o bloco **MFCC**.
2. Selecione algumas amostras de classes diferentes.
3. Observe se os espectrogramas apresentam padrões visualmente distintos.
4. Mantenha os parâmetros padrão no primeiro treinamento.
5. Clique em **Save parameters**.
6. Clique em **Generate features**.
7. Aguarde a geração completa.
8. Abra o **Feature explorer** e observe se as classes formam grupos parcialmente separados.

Se todas as classes estiverem completamente misturadas, retorne aos dados antes de treinar a rede.

## 14. Treinar o classificador

Abra o bloco **Classifier** ou **Classification**.

Use como ponto de partida:

| Configuração | Valor inicial |
|---|---:|
| Training cycles | `100` |
| Learning rate | `0.005` |
| Validation set | `20%` quando não houver teste previamente separado |

Depois:

1. confirme que todas as classes aparecem;
2. inicie o treinamento;
3. acompanhe acurácia e loss;
4. observe se a acurácia de treinamento cresce enquanto a validação piora — sinal de sobreajuste;
5. salve a versão do modelo.

Não aumente imediatamente para centenas de ciclos quando o resultado for ruim. Primeiro confira dados, rótulos, equilíbrio e janela.

## 15. Interpretar a validação

Analise mais do que a acurácia geral:

- matriz de confusão;
- F1 de cada classe;
- precisão;
- recall;
- loss;
- área sob a curva ROC;
- classes confundidas entre si.

Para o VozSegura, o erro mais perigoso é uma entrada `desconhecido` ou `repetir` ser prevista como `concluido`, pois isso pode avançar indevidamente uma etapa.

Metas sugeridas para a versão melhorada:

| Indicador | Meta |
|---|---:|
| Acurácia no conjunto de teste | pelo menos 85% |
| Recall de `concluido` | pelo menos 90% |
| Recall de `repetir` | pelo menos 90% |
| Falso `concluido` em negativos | abaixo de 5% |
| F1 de cada comando | pelo menos 0,85 |

## 16. Executar Model testing

1. Abra **Model testing**.
2. Clique em **Classify all**.
3. Aguarde a classificação do conjunto reservado.
4. registre acurácia, AUC, precisão, recall e F1;
5. salve uma captura da matriz de confusão;
6. examine manualmente os erros;
7. anote quais arquivos foram confundidos.

O resultado de **Model testing** é mais importante do que a acurácia mostrada durante o treinamento, desde que o conjunto de teste seja realmente independente.

## 17. Fazer classificação ao vivo

1. Abra **Live classification**.
2. Conecte novamente o iPhone pelo QR Code, se necessário.
3. toque em **Switch to classification mode** no celular;
4. permita o microfone;
5. execute o protocolo abaixo.

### Protocolo mínimo

| Situação | Quantidade | Resultado desejado |
|---|---:|---|
| Comando `concluido` | 10 vezes | Pelo menos 9 acertos |
| Comando `repetir` | 10 vezes | Pelo menos 9 acertos |
| Palavras desconhecidas | 20 palavras | Nenhuma ação válida |
| Ruídos do ambiente | 20 eventos/janelas | Nenhuma ação válida |

Repita parte dos testes:

- mais distante do microfone;
- em voz baixa;
- com ruído moderado;
- usando uma pessoa que não participou do treinamento.

Registre a confiança de cada tentativa e guarde uma captura ou vídeo.

## 18. Corrigir erros de forma direcionada

Quando houver erro:

1. identifique a entrada real;
2. observe a classe prevista;
3. salve ou grave novos exemplos semelhantes;
4. adicione-os à classe correta;
5. mantenha o equilíbrio entre as classes;
6. gere novamente as características;
7. use **Retrain model**;
8. repita **Model testing** e classificação ao vivo.

Exemplos:

- se “continuar” virar `concluido`, adicione diferentes vozes dizendo “continuar” a `desconhecido`;
- se voz baixa virar `ruido`, acrescente comandos falados em volume baixo;
- se ferramentas virarem `repetir`, acrescente esses sons a `ruido`;
- se `concluido` virar `repetir`, grave mais pronúncias variadas dos dois comandos.

Esse processo é chamado de melhoria orientada pelos erros e costuma ser mais eficiente do que coletar dados aleatórios.

## 19. Ajustar o limiar e a estabilidade

O modelo fornece probabilidades, mas a aplicação decide quando executar uma ação.

Configuração inicial recomendada:

- confiança mínima: 80%;
- duas classificações consecutivas iguais;
- bloqueio do comando depois da execução;
- liberação somente após `desconhecido`, `ruido` ou `uncertain`;
- pausa da classificação enquanto o sistema produz voz sintetizada.

Se ainda ocorrerem falsos positivos, aumente o limiar para 85% ou 90%. Se comandos corretos forem frequentemente rejeitados, primeiro melhore os dados; reduza o limiar apenas depois de analisar o impacto.

Em sistemas relacionados à segurança, é preferível pedir que o usuário repita um comando a avançar incorretamente.

## 20. Usar Performance calibration e EON Tuner

Depois que os dados e a classificação estiverem bons:

1. use **Performance calibration** para avaliar comportamento contínuo e limiares;
2. experimente o **EON Tuner** para comparar arquiteturas;
3. compare acurácia, RAM, Flash e latência;
4. escolha um modelo que mantenha boa acurácia com recursos compatíveis com o dispositivo-alvo.

Essas ferramentas não substituem um conjunto de dados representativo.

## 21. Exportar o modelo

Abra **Deployment**.

Para executar no Safari ou em outro navegador moderno, escolha:

> **WebAssembly (browser, SIMD)**

Essa opção é adequada porque:

- foi criada para navegadores;
- utiliza instruções SIMD para acelerar cálculos;
- mantém a inferência local;
- funciona com a aplicação JavaScript do VozSegura.

As outras opções têm finalidades diferentes:

| Opção | Uso |
|---|---|
| WebAssembly | Alternativa genérica e possível fallback de compatibilidade |
| WebAssembly (browser, SIMD) | Navegadores modernos — opção recomendada |
| WebAssembly (Node.js, SIMD) | Aplicações executadas pelo Node.js, não pelo Safari |

Quando disponível:

1. escolha o modelo quantizado `int8`;
2. habilite o EON Compiler;
3. registre as estimativas de RAM, Flash e latência;
4. clique em **Build**;
5. baixe o arquivo ZIP;
6. preserve o ZIP original como evidência da exportação.

## 22. Integrar à aplicação web

O pacote de navegador normalmente contém:

```text
edge-impulse-standalone.js
edge-impulse-standalone.wasm
run-impulse.js
```

Na aplicação:

1. carregue `edge-impulse-standalone.js`;
2. carregue `run-impulse.js`;
3. inicialize `EdgeImpulseClassifier`;
4. obtenha as propriedades do projeto e do modelo;
5. solicite o microfone com `getUserMedia` após um clique do usuário;
6. capture áudio mono com Web Audio API;
7. reamostre para 16 kHz;
8. converta as amostras para PCM16;
9. envie as fatias para `classifyContinuous`;
10. selecione a classe de maior probabilidade;
11. aplique limiar e confirmação temporal;
12. execute a ação correspondente.

No VozSegura, essa integração está em [`vozsegura-2/tinyml-adapter.js`](vozsegura-2/tinyml-adapter.js).

## 23. Evitar que o sistema reconheça a própria voz

Quando a aplicação lê uma instrução pelo alto-falante, o microfone pode captar essa fala. Para evitar realimentação:

1. pause o envio de áudio ao modelo antes da síntese de voz;
2. cancele uma fala anterior, se houver;
3. reproduza o feedback;
4. espere aproximadamente 300 ms após o término;
5. retome a classificação;
6. limpe o buffer de áudio antes de voltar a ouvir.

## 24. Executar localmente

Na pasta da aplicação, inicie um servidor estático:

```bash
python3 -m http.server 8765
```

No mesmo computador, abra:

```text
http://localhost:8765
```

O endereço `localhost` permite testar o microfone no computador. Não abra os arquivos diretamente por `file://`, porque o carregamento do WebAssembly e as permissões podem falhar.

## 25. Testar no iPhone

O navegador do iPhone exige uma origem HTTPS para liberar o microfone em uma aplicação web. `localhost` no iPhone representa o próprio celular, não o computador.

Publique a pasta em um serviço HTTPS, por exemplo:

- GitHub Pages;
- hospedagem estática equivalente;
- túnel HTTPS temporário para desenvolvimento.

Depois:

1. abra o endereço HTTPS no Safari;
2. aguarde a mensagem **Modelo carregado**;
3. toque em **Ativar comandos de voz**;
4. autorize o microfone;
5. teste os dois comandos e entradas negativas;
6. confirme que o áudio não é enviado a um servidor de inferência;
7. grave o vídeo de evidência.

Se o Browser SIMD não carregar em um dispositivo antigo, exporte a opção WebAssembly genérica como fallback.

## 26. Evidências para guardar

Durante todo o processo, salve:

- distribuição e duração das quatro classes;
- exemplo de onda sonora de cada classe;
- Feature explorer;
- parâmetros do impulso;
- tela do MFCC;
- curvas de treinamento;
- matriz de confusão da validação;
- resultado de Model testing;
- classificação ao vivo;
- estimativas de RAM, Flash e latência;
- opção de deployment escolhida;
- interface com o modelo carregado;
- vídeo executando os comandos.

Nomeie os arquivos em ordem, por exemplo:

```text
01-dataset.png
02-impulse.png
03-mfcc.png
04-treinamento.png
05-model-testing.png
06-live-classification.png
07-deployment.png
08-prototipo.png
09-demonstracao.mp4
```

## 27. Checklist de reprodução

- [ ] Projeto criado no Edge Impulse;
- [ ] iPhone conectado;
- [ ] quatro classes criadas sem acentos;
- [ ] comandos definidos antes da coleta;
- [ ] pelo menos 3 a 5 minutos por classe;
- [ ] classes balanceadas;
- [ ] teste coletado em sessão separada;
- [ ] negativos difíceis adicionados;
- [ ] amostras cortadas e rótulos revisados;
- [ ] impulso configurado;
- [ ] MFCC gerado;
- [ ] classificador treinado;
- [ ] matriz de confusão analisada;
- [ ] Model testing executado;
- [ ] classificação ao vivo executada;
- [ ] falsos positivos investigados;
- [ ] limiar e confirmação temporal configurados;
- [ ] métricas de hardware registradas;
- [ ] Browser SIMD exportado;
- [ ] modelo integrado à aplicação;
- [ ] teste em HTTPS realizado no iPhone;
- [ ] capturas e vídeo salvos.

## 28. Referências

- EDGE IMPULSE. **Keyword spotting**. <https://docs.edgeimpulse.com/tutorials/end-to-end/keyword-spotting>
- EDGE IMPULSE. **Mobile phone**. <https://docs.edgeimpulse.com/hardware/devices/mobile-phone>
- EDGE IMPULSE. **Live classification**. <https://docs.edgeimpulse.com/studio/projects/live-classification>
- EDGE IMPULSE. **Deployment**. <https://docs.edgeimpulse.com/studio/projects/deployment>
- EDGE IMPULSE. **Sample audio continuously**. <https://docs.edgeimpulse.com/tutorials/topics/inference/sample-audio-continuously>
