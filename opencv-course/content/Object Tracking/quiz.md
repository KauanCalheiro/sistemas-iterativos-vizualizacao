# Quiz — Object Tracking

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**The Meanshift algorithm in computer vision is used for:**

- [ ] Image segmentation
- [ ] Object detection
- [x] Object tracking
- [ ] Feature extraction

**Resposta:** Object tracking

**Por quê:** no contexto apresentado, o MeanShift acompanha um objeto ao mover
iterativamente a janela de busca para a região de maior densidade na
retroprojeção do histograma. Conforme o objeto muda de posição entre os frames,
a janela converge para sua nova localização.

## Question 2

**How does the Medianflow object tracking work in OpenCV?**

- [ ] The program automatically detects and tracks the object.
- [x] Tracks objects by using optical flow to estimate key point movements and median displacement of the points
- [ ] The program uses machine learning algorithms to identify the object in each frame of the video sequence
- [ ] The program uses a pre-trained neural network to track the object in the video sequence

**Resposta:** Tracks objects by using optical flow to estimate key point movements and median displacement of the points

**Por quê:** o MedianFlow acompanha pontos da região do objeto para frente e
para trás entre frames, usando fluxo óptico, e avalia a consistência das
trajetórias pelo erro forward-backward. As trajetórias confiáveis permitem
estimar por medianas o deslocamento e a mudança de escala da caixa. Portanto,
a segunda alternativa é a descrição mais adequada, embora resumida.

## Question 3

**Which of the following is a deep learning based object tracker?**

- [x] GOTURN
- [ ] CRST
- [ ] MEDIANFLOW
- [ ] MOOSE

**Resposta:** GOTURN

**Por quê:** GOTURN é um tracker de alvo único baseado em uma rede neural
convolucional treinada previamente para estimar a nova caixa delimitadora. O
notebook da aula também o classifica explicitamente como “Deep Learning based”.

> As alternativas `CRST` e `MOOSE` parecem conter erros de digitação. Os nomes
> dos trackers do OpenCV mostrados no notebook são `CSRT` e `MOSSE`.

## Question 4

**Which OpenCV function is commonly used to measure the FPS(Frame per second)?**

- [ ] cv2.VideoCapture()
- [ ] cv2.imshow()
- [x] cv2.getTickCount()
- [ ] cv2.waitKey()

**Resposta:** cv2.getTickCount()

**Por quê:** `cv2.getTickCount()` fornece a contagem de ticks antes e depois da
operação medida. No notebook, a diferença entre essas contagens é combinada com
`cv2.getTickFrequency()` para calcular o tempo por frame e, por inversão, o FPS.
As demais funções tratam de captura, exibição ou espera de eventos.

## Question 5

**What is the recommended FPS for real-time computer vision applications?**

- [ ] 10-15 FPS
- [ ] 30 FPS
- [ ] 60 FPS
- [x] There is no recommended FPS and it depends on the specific application

**Resposta:** There is no recommended FPS and it depends on the specific application

**Por quê:** não existe uma taxa universal que defina toda aplicação de visão
computacional em tempo real. O FPS necessário depende da velocidade da cena,
da taxa da fonte, da latência aceitável e do objetivo do sistema. Aplicações
com movimento lento podem operar com poucos frames por segundo, enquanto
cenários de alta velocidade podem exigir taxas muito maiores.

## Fontes

- [Notebook da aula — Object Tracking](<./11_objectTracking.ipynb>)
- [OpenCV 4.12 — Meanshift and Camshift](https://docs.opencv.org/4.12.0/d7/d00/tutorial_meanshift.html)
- [OpenCV 4.12 — Performance Measurement and Improvement Techniques](https://docs.opencv.org/4.12.0/dc/d71/tutorial_py_optimization.html)
- [OpenCV 4.12 — `cv::TrackerGOTURN`](https://docs.opencv.org/4.12.0/d7/d4c/classcv_1_1TrackerGOTURN.html)
- [Kalal, Mikolajczyk e Matas — Forward-Backward Error: Automatic Detection of Tracking Failures](https://dspace.cvut.cz/entities/publication/4f34fd8a-dffe-4857-96c2-42ed3d5a8449)
- [YOLO with adaptive frame control for real-time object detection applications](https://link.springer.com/article/10.1007/s11042-021-11480-0)
