# Coleta de voz no iPhone

Esta etapa cria o conjunto de dados usado pelo classificador do VozSegura 2.0.

## Antes de começar

Crie um projeto do tipo **Audio** no Edge Impulse Studio. Na tela **Devices**, escolha **Connect a new device → Mobile phone**, escaneie o QR Code com a câmera do iPhone e autorize o uso do microfone no Safari.

Use estes rótulos exatamente como estão escritos:

- `concluido`
- `repetir`
- `desconhecido`
- `ruido`

## Primeira rodada de coleta

Configure cada gravação com:

- Sensor: `Microphone`;
- frequência: `16 kHz`;
- duração: `10 segundos`;
- categoria: `Training`.

Grave inicialmente:

1. **12 gravações de `concluido`:** fale “concluído” várias vezes, deixando uma pequena pausa entre as repetições;
2. **12 gravações de `repetir`:** faça o mesmo com “repetir”;
3. **12 gravações de `desconhecido`:** fale palavras e pequenas frases que não sejam os dois comandos;
4. **12 gravações de `ruido`:** registre silêncio, ventilador, conversas distantes, ferramentas e sons normais do ambiente.

Varie distância, volume e velocidade da fala. Faça parte das gravações em um lugar silencioso e parte no ambiente onde o protótipo seria usado. Não inclua informações pessoais nas frases da classe `desconhecido`.

Depois de cada gravação dos comandos, use **Split sample** para gerar janelas individuais de aproximadamente 1 segundo. Ative o deslocamento aleatório (*shift samples*) se a opção aparecer.

Essa rodada fornece cerca de dois minutos por classe e serve para o primeiro protótipo. Se os testes mostrarem confusão, ampliaremos o conjunto; a documentação oficial recomenda conjuntos balanceados e substancialmente maiores para um modelo de produção.

## Quando parar

Depois que as quatro classes aparecerem na área **Data acquisition**, interrompa o trabalho e envie uma captura da tela com a contagem/duração de cada classe. A configuração do impulso, MFCC e rede neural será feita na etapa seguinte.
