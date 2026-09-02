# Quiz — TensorFlow Object Detection

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**What is a TensorFlow model?**

- [ ] A dataset used for training machine learning models.
- [ ] A set of rules that a machine learning model uses to make predictions.
- [ ] A software library for developing and training machine learning models.
- [x] A machine learning model that has been trained on a specific task.

**Resposta:** A machine learning model that has been trained on a specific task.

**Por quê:** entre as alternativas, essa é a que descreve corretamente o modelo
usado para inferência: uma estrutura de aprendizado de máquina cujos parâmetros
foram ajustados para executar uma tarefa. O dataset fornece os exemplos de
treinamento, enquanto TensorFlow é a plataforma usada para construir, treinar e
executar modelos.

> A formulação é simplificada: na API Keras, um modelo é um objeto que agrupa
> camadas e pode ser treinado; portanto, ele já pode existir antes do
> treinamento. Ainda assim, a quarta alternativa é a única resposta adequada no
> contexto de um modelo pronto para detecção e inferência.

## Question 2

**The benefits of using TensorFlow is/are:**

- [ ] Scalability and performance
- [ ] Flexibility and ease of use
- [ ] Wide range of supported platforms and languages
- [x] All of the above

**Resposta:** All of the above

**Por quê:** TensorFlow oferece treinamento distribuído para escalar cargas de
trabalho, APIs de alto nível como Keras para facilitar a construção de modelos e
mecanismos flexíveis para arquiteturas personalizadas. Também permite treinar e
implantar modelos em servidores, navegadores e dispositivos móveis ou de borda,
com suporte a diferentes ambientes e linguagens.

## Question 3

**What is the default order of the channels in the output of cv2.dnn.blobFromImage function?**

- [ ] RGB
- [x] BGR
- [ ] GRB
- [ ] BRG

**Resposta:** BGR

**Por quê:** `blobFromImage()` possui `swapRB=False` por padrão; assim, ela não
troca o primeiro e o último canal. Como as imagens normalmente lidas pelo
OpenCV estão em BGR, essa ordem é mantida no blob. O notebook define
`swapRB=True` explicitamente porque o modelo utilizado espera a troca entre os
canais azul e vermelho.

> Rigorosamente, a função preserva a ordem da entrada quando `swapRB=False`.
> Portanto, “BGR” pressupõe a entrada BGR convencional do OpenCV; uma entrada
> que já estivesse em RGB continuaria em RGB.

## Question 4

**What is the effect of specifying the parameter crop = False in blobFromImage() ?**

- [ ] Crops the image to the specified size
- [x] Resizes the image without cropping
- [ ] Performs center cropping of the image
- [ ] Performs random cropping of the image

**Resposta:** Resizes the image without cropping

**Por quê:** com `crop=False`, `blobFromImage()` redimensiona diretamente a
imagem para o tamanho espacial solicitado sem executar o recorte central. O
recorte central após o redimensionamento é o comportamento associado a
`crop=True`; a função não realiza recorte aleatório.

## Question 5

**Given objects = net.forward() , shape of the variable objects is (1, 1, n, 7), here n is the number of objects detected. For each detected object, we have an array of length 7 to describe it. How can we extract the score (or confidence) of nth detected object ?**

- [ ] objects[0, 0, n-1, 1]
- [x] objects[0, 0, n-1, 2]
- [ ] objects[0, 0, n-1, 3]
- [ ] objects[0, 0, n-1, 4]

**Resposta:** objects[0, 0, n-1, 2]

**Por quê:** cada detecção segue a ordem `[batchId, classId, confidence, left,
top, right, bottom]`; por isso, a confiança ocupa o índice `2`. Como os índices
começam em zero, o n-ésimo objeto ocupa a posição `n-1`. No notebook, isso
aparece como `score = float(objects[0, 0, i, 2])`.

## Fontes

- [Notebook da aula — Deep Learning based Object Detection](<./13_tf_object_detection.ipynb>)
- [TensorFlow — Why TensorFlow](https://www.tensorflow.org/about)
- [TensorFlow — Keras: The high-level API for TensorFlow](https://www.tensorflow.org/guide/keras)
- [TensorFlow — Introduction to TensorFlow](https://www.tensorflow.org/learn)
- [OpenCV 4.12 — Deep Neural Network module e `blobFromImage`](https://docs.opencv.org/4.12.0/d6/d0f/group__dnn.html)
- [OpenCV 4.12 — exemplo de Object Detection](https://docs.opencv.org/4.12.0/d4/db9/samples_2dnn_2object_detection_8cpp-example.html)
