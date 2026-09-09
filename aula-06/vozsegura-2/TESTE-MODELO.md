# Testes do modelo TinyML

## Treinamento — versão 1

Conjunto inicial com 1 minuto e 41 segundos de áudio distribuído entre quatro classes.

| Métrica | Resultado |
|---|---:|
| Acurácia de validação | 60,0% |
| Loss | 0,88 |
| Área sob a curva ROC | 0,91 |
| Precisão média ponderada | 0,70 |
| Recall médio ponderado | 0,60 |
| F1 médio ponderado | 0,59 |

### Matriz de confusão da validação

| Classe real | Concluído | Desconhecido | Repetir | Ruído |
|---|---:|---:|---:|---:|
| Concluído | 44,4% | 0% | 55,6% | 0% |
| Desconhecido | 33,3% | 33,3% | 0% | 33,3% |
| Repetir | 33,3% | 0% | 66,7% | 0% |
| Ruído | 0% | 0% | 0% | 100% |

### Interpretação

O modelo identifica bem a classe `ruido`, mas ainda confunde os dois comandos e apresenta baixo desempenho para palavras desconhecidas. A validação contém poucas amostras, portanto os percentuais são instáveis. Esta versão será testada ao vivo para observar o comportamento real antes da ampliação direcionada do conjunto de dados.

## Protocolo de teste ao vivo — versão 1

Realizar cinco tentativas para cada situação, mantendo o iPhone aproximadamente à mesma distância usada na coleta.

| Entrada falada/ambiente | Resultado esperado | Acertos em 5 tentativas | Observações |
|---|---|---:|---|
| “Concluído” | `concluido` |  |  |
| “Repetir” | `repetir` |  |  |
| Cinco palavras diferentes | `desconhecido` |  |  |
| Silêncio ou ruído ambiente | `ruido` |  |  |

Depois, repetir “concluído” e “repetir” em voz baixa, rápida e a uma distância maior. Registrar quais variações provocam erros servirá para escolher novas amostras de treinamento.

## Model testing — versão 1

Avaliação realizada sobre o conjunto de teste reservado pelo Edge Impulse.

| Métrica | Resultado |
|---|---:|
| Acurácia | 75,86% |
| Área sob a curva ROC | 0,96 |
| Precisão média ponderada | 0,88 |
| Recall médio ponderado | 0,76 |
| F1 médio ponderado | 0,77 |

### Matriz de confusão do teste

| Classe real | Concluído | Desconhecido | Repetir | Ruído | Incerto |
|---|---:|---:|---:|---:|---:|
| Concluído | 100% | 0% | 0% | 0% | 0% |
| Desconhecido | 16,7% | 58,3% | 0% | 8,3% | 16,7% |
| Repetir | 11,1% | 0% | 77,8% | 11,1% | 0% |
| Ruído | 0% | 0% | 0% | 100% | 0% |

O teste apresenta resultado melhor que a validação do treinamento, com reconhecimento integral de `concluido` e `ruido`. Entretanto, 16,7% das palavras desconhecidas e 11,1% dos exemplos de `repetir` foram classificados como `concluido`. Esse é o erro de maior impacto, pois poderia avançar o procedimento indevidamente. A interface exige duas previsões consecutivas com confiança mínima de 80%, bloqueia novas ações até observar uma classe negativa e mantém botões alternativos para reduzir esse risco.

## Critério para a próxima versão

O protótipo só deve executar uma ação quando a confiança da classe de comando for igual ou superior a 80%. Classes negativas (`desconhecido` e `ruido`) nunca alteram o checklist. Se um comando não atingir o limiar, o sistema mantém a etapa e solicita repetição, priorizando prevenção de erros.

## Classificação ao vivo no iPhone

Uma captura contínua de 14,5 segundos produziu 29 janelas de classificação, processadas a cada 500 ms.

| Resultado predominante | Quantidade de janelas |
|---|---:|
| `concluido` | 13 |
| `repetir` | 9 |
| `desconhecido` | 2 |
| `ruido` | 2 |
| Incerto | 3 |

Os trechos de `concluido` apresentaram diversas previsões entre 0,82 e 1,00. Os trechos de `repetir` alcançaram valores entre 0,89 e 1,00, com uma janela intermediária de 0,70. As classes negativas atingiram no máximo 0,65 para `desconhecido` e 0,76 para `ruido` nessa captura.

O limiar de 80% aceitaria os dois comandos nos seus trechos estáveis e rejeitaria todas as classes negativas observadas. Como uma única fala gera várias janelas consecutivas, a interface exige duas classificações concordantes e só libera um novo comando depois que o modelo retorna a `desconhecido`, `ruido` ou `uncertain`.
