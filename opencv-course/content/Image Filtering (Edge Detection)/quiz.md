# Quiz — Image Filtering

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**Which of the following is not a blurring/smoothening filter in OpenCV?**

- [ ] Median Filter
- [ ] Gaussian Filter
- [ ] Bilateral Filter
- [x] Canny Filter

**Resposta:** Canny Filter

**Por quê:** os filtros mediano, Gaussiano e bilateral são técnicas de
suavização. Canny não é um filtro de suavização: é um algoritmo de detecção de
bordas. O exemplo da aula também apresenta `cv2.blur` e `cv2.Canny` como modos
separados.

## Question 2

**Which of the following is true about the Bilateral Filter in OpenCV?**

- [ ] It only blurs the edges in an image
- [x] It can reduce unwanted noise while keeping edges fairly sharp
- [ ] It can only be applied to grayscale images
- [ ] It is faster than other blurring filters in OpenCV

**Resposta:** It can reduce unwanted noise while keeping edges fairly sharp

**Por quê:** o filtro bilateral considera tanto a distância espacial quanto a
diferença de intensidade entre pixels. Isso permite reduzir ruído e preservar
bordas relativamente nítidas. A documentação ressalta também que ele é mais
lento que os outros filtros de suavização.

## Question 3

**What happens when the low threshold is too high in the Canny edge detection algorithm?**

- [ ] Too many edges are detected
- [ ] Only vertical edges are detected
- [ ] Only horizontal edges are detected
- [x] Very few edges are detected

**Resposta:** Very few edges are detected

**Por quê:** na etapa de histerese do Canny, gradientes abaixo do limiar
inferior são descartados. Se esse limiar estiver alto demais, muitos candidatos
a borda serão rejeitados e restarão poucas bordas. Os limiares não selecionam
uma orientação específica, portanto não limitam o resultado a bordas verticais
ou horizontais.

## Question 4

**In which of the following methods does the kernel have all equal values?**

- [ ] Laplacian filtering
- [ ] Gaussian filtering
- [x] Box filtering
- [ ] None of the above

**Resposta:** Box filtering

**Por quê:** o filtro de caixa usa um kernel em que todos os coeficientes são
iguais. Quando normalizado, cada coeficiente vale `1 / (largura × altura)` e o
resultado é a média da vizinhança. O kernel Gaussiano atribui pesos diferentes
conforme a distância ao centro, e o Laplaciano possui coeficientes de sinais e
valores diferentes.

## Question 5

**What is the function of cv2.blur() in OpenCV?**

- [ ] It applies a Gaussian blur to an image.
- [ ] It applies a median blur to an image.
- [x] It applies an average blurring filter to an image.
- [ ] It applies a bilateral filter for edge-preserving and noise-reducing image smoothing.

**Resposta:** It applies an average blurring filter to an image.

**Por quê:** `cv2.blur()` aplica um filtro de caixa normalizado. Para cada
posição, ele calcula a média dos pixels cobertos pelo kernel e usa essa média no
resultado. Os filtros Gaussiano, mediano e bilateral possuem funções próprias:
`GaussianBlur`, `medianBlur` e `bilateralFilter`.

## Fontes

- [Código da aula — Image Filtering (Edge Detection)](<./Image Filtering (Edge Detection).py>)
- [OpenCV 4.12 — Smoothing Images](https://docs.opencv.org/4.12.0/d4/d13/tutorial_py_filtering.html)
- [OpenCV 4.12 — Canny e os limiares de histerese](https://docs.opencv.org/4.12.0/dd/d1a/group__imgproc__feature.html)
