# Quiz — HDR

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**The purpose of cv2.createAlignMTB is:**

- [ ] To create a multi-threaded image blending object for stitching images
- [ ] To create a camera calibration object for determining camera parameters
- [x] To create an object for aligning images based on brightness differences
- [ ] To create an object for color correction and white balancing of images

**Resposta:** To create an object for aligning images based on brightness differences

**Por quê:** `cv2.createAlignMTB()` cria um alinhador baseado em Median
Threshold Bitmaps. Ele compara mapas binários construídos a partir da luminância
mediana, o que permite alinhar imagens mesmo quando foram capturadas com
exposições diferentes. No notebook, `alignMTB.process(images, images)` executa
essa etapa antes da fusão HDR.

## Question 2

**What is the purpose of the tone mapping process?**

- [ ] To map the gradients of an image, with respect to the target image.
- [x] To reduce the dynamic range of the HDR image for display on a low dynamic range monitor
- [ ] To sharpen the edges and details of the HDR image
- [ ] To convert the HDR image to a grayscale format

**Resposta:** To reduce the dynamic range of the HDR image for display on a low dynamic range monitor

**Por quê:** a imagem HDR contém uma faixa de luminância maior do que monitores
comuns conseguem exibir. O tone mapping comprime ou mapeia esses valores para
uma faixa LDR, procurando preservar os detalhes visuais. Na API básica do
OpenCV, o resultado é mapeado para valores de ponto flutuante na faixa `[0, 1]`.

## Question 3

**For an object of class createCalibrateDebevec(), which method is used to estimate camera response function?**

- [ ] calibrateDebevec.calculate(times, images)
- [ ] calibrateDebevec.process(times, images)
- [ ] calibrateDebevec.calculate(images, times)
- [x] calibrateDebevec.process(images, times)

**Resposta:** calibrateDebevec.process(images, times)

**Por quê:** `CalibrateDebevec.process` recebe primeiro a sequência de imagens e
depois o vetor com os tempos de exposição. Ele retorna a função de resposta
inversa da câmera. Essa é exatamente a chamada usada no notebook da aula.

## Question 4

**Which OpenCV function is used to merge exposures into an HDR image?**

- [ ] cv2.merge()
- [ ] cv2.cvtColor()
- [ ] cv2.stitcher()
- [x] cv2.createMergeDebevec()

**Resposta:** cv2.createMergeDebevec()

**Por quê:** `cv2.createMergeDebevec()` cria o objeto que combina imagens com
exposições diferentes em uma imagem HDR. Seu método `process()` considera as
imagens, os tempos de exposição e, opcionalmente, a resposta da câmera.
`cv2.merge()` apenas junta canais de matrizes e não executa fusão de exposições.

## Question 5

**How does cv2.createMergeDebevec handle over- and under-exposed pixels?**

- [ ] By discarding them
- [ ] By compressing their values
- [x] By using an adaptive weighting function
- [ ] By interpolating their values

**Resposta:** By using an adaptive weighting function

**Por quê:** o método de Debevec combina as exposições por uma média ponderada
que considera o valor observado, o tempo de exposição e a resposta da câmera.
Na prática, amostras próximas dos extremos — subexpostas ou saturadas — recebem
menor peso, enquanto valores com informação mais confiável contribuem mais para
a radiância final.

## Question 6

**Which of the following is a potential issue when using cv2.createMergeDebevec?**

- [x] Motion blur in the input images
- [ ] Overlapping regions in the input images
- [ ] Low contrast in the input images
- [ ] None of the above

**Resposta:** Motion blur in the input images

**Por quê:** a fusão HDR pressupõe que as exposições representem a mesma cena e
estejam alinhadas. Movimento da câmera ou dos objetos durante as capturas pode
produzir borrão, desalinhamento ou artefatos de ghosting na imagem combinada.
Por isso, a documentação destaca o alinhamento como uma etapa necessária quando
há movimento entre as exposições.

## Fontes

- [Notebook da aula — High Dynamic Range Imaging](<./10_hdr.ipynb>)
- [OpenCV 4.12 — tutorial High Dynamic Range (HDR)](https://docs.opencv.org/4.12.0/d2/df0/tutorial_py_hdr.html)
- [OpenCV 4.12 — tutorial High Dynamic Range Imaging](https://docs.opencv.org/4.12.0/d3/db7/tutorial_hdr_imaging.html)
- [OpenCV 4.12 — `cv::AlignMTB`](https://docs.opencv.org/4.12.0/d7/db6/classcv_1_1AlignMTB.html)
- [OpenCV 4.12 — `cv::MergeDebevec`](https://docs.opencv.org/4.12.0/df/d62/classcv_1_1MergeDebevec.html)
- [OpenCV 4.12 — `cv::Tonemap`](https://docs.opencv.org/4.12.0/d8/d5e/classcv_1_1Tonemap.html)
