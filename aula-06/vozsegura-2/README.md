# VozSegura 2.0

Continuação do conceito desenvolvido na aula 5. O checklist falado para laboratórios e oficinas passa a usar um classificador de palavras-chave treinado no Edge Impulse.

## Fluxo

```text
Usuário fala
  → microfone do iPhone
  → modelo TinyML classifica o comando localmente
  → checklist valida e atualiza a etapa
  → tela e síntese de voz confirmam a ação
```

## Estado atual

- Interface funcional e responsiva;
- checklist completo com progresso salvo no navegador;
- feedback visual e síntese de voz;
- controles alternativos por botão;
- simulador das três saídas esperadas do modelo;
- modelo WebAssembly exportado do Edge Impulse integrado ao microfone;
- áudio reamostrado para 16 kHz, convertido para PCM16 e inferência contínua a cada 500 ms;
- pausa automática da escuta durante o feedback falado do sistema.

O simulador continua disponível para validar a interface, mas **não deve ser apresentado como inferência de TinyML**. O botão principal utiliza o modelo real quando a página é servida por uma origem segura com acesso ao microfone.

## Classes do modelo

| Rótulo | Função |
|---|---|
| `concluido` | Confirma a etapa e avança |
| `repetir` | Lê novamente a etapa atual |
| `desconhecido` | Rejeita palavras que não são comandos |
| `ruido` | Rejeita silêncio e sons do ambiente |

Os rótulos devem ser criados exatamente sem acentos para simplificar a integração.

## Executar localmente

Na pasta `vozsegura-2`, inicie um servidor estático. Por exemplo:

```bash
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000`. O acesso ao microfone no iPhone exigirá uma origem HTTPS quando o modelo real for integrado; para a entrega, a aplicação poderá ser publicada em uma hospedagem estática HTTPS.

## Integração do modelo

O arquivo `tinyml-adapter.js` conecta a API gerada pelo Edge Impulse ao Web Audio API. O áudio mono é reamostrado para a frequência do modelo, convertido para PCM16 e enviado em fatias à inferência contínua. A interface só executa `concluido` ou `repetir` após duas previsões consecutivas com confiança mínima de 80%. Depois da execução, o comando permanece bloqueado até o modelo observar uma classe negativa.

As instruções detalhadas de coleta estão em [`COLETA.md`](COLETA.md).

Os resultados e o protocolo da primeira avaliação estão em [`TESTE-MODELO.md`](TESTE-MODELO.md).

O histórico completo e o estado para retomada em outra sessão estão em [`../CONTEXTO-PROXIMA-SESSAO.md`](../CONTEXTO-PROXIMA-SESSAO.md). O guia para recriar o modelo com maior acurácia está em [`../GUIA-REPRODUCAO-TINYML.md`](../GUIA-REPRODUCAO-TINYML.md).
