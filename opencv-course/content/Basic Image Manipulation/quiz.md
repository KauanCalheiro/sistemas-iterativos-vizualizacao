# Quiz — Basic Image Manipulation

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas. Os elementos de código que desapareceram do texto copiado da
página foram reconstituídos a partir do notebook da aula e da API documentada do
OpenCV.

## Question 1

**What is the default interpolation method used by `cv2.resize()`?**

- [ ] `cv2.INTER_NEAREST`
- [x] `cv2.INTER_LINEAR`
- [ ] `cv2.INTER_CUBIC`
- [ ] `cv2.INTER_AREA`

**Resposta:** `cv2.INTER_LINEAR`.

**Por quê:** a assinatura oficial de `resize` define o parâmetro opcional como
`interpolation=INTER_LINEAR`. Esse método faz interpolação bilinear e é utilizado
quando nenhum método diferente é informado.

## Question 2

**What happens when the new size specified in `cv2.resize()` is larger than the original image?**

- [ ] The image is cropped to fit the new size
- [ ] The image is padded with black pixels to fit the new size
- [x] The image is stretched to fit the new size
- [ ] None of the above

**Resposta:** The image is stretched to fit the new size.

**Por quê:** `resize` reamostra a imagem para produzir exatamente o tamanho de
destino solicitado. Quando esse tamanho é maior, novos valores de pixels são
estimados pelo algoritmo de interpolação, ampliando a imagem. A função não faz
um simples recorte nem adiciona automaticamente bordas pretas.

## Question 3

**What happens when the flipCode parameter in `cv2.flip()` is set to 0?**

- [x] The image is flipped vertically
- [ ] The image is flipped horizontally
- [ ] The image is flipped both horizontally and vertically
- [ ] The image is not flipped

**Resposta:** The image is flipped vertically.

**Por quê:** com `flipCode == 0`, o OpenCV inverte a ordem das linhas em torno do
eixo x. Isso troca a parte superior pela inferior e, portanto, produz um
espelhamento vertical. Valores positivos fazem o espelhamento horizontal e
valores negativos combinam os dois sentidos.

## Question 4

**What is the purpose of the interpolation method parameter in `cv2.resize()`?**

- [ ] To specify the output size of the image
- [ ] To specify the scaling factor of the image
- [x] To specify the interpolation algorithm used to resize the image
- [ ] To specify the color space of the output image

**Resposta:** To specify the interpolation algorithm used to resize the image.

**Por quê:** durante o redimensionamento, as coordenadas calculadas podem não
coincidir com pixels inteiros da imagem original. O parâmetro seleciona como os
novos valores serão estimados, por exemplo por vizinho mais próximo, interpolação
bilinear, bicúbica ou relação de área. O tamanho e os fatores de escala são
controlados por outros parâmetros.

## Question 5

**What is an example of an application where cropping an image using array slicing in OpenCV is useful?**

- [ ] Extracting a region of interest from an image
- [ ] Removing unwanted borders or margins from an image
- [x] All of the above
- [ ] None of the above.

**Resposta:** All of the above.

**Por quê:** o fatiamento seleciona um intervalo de linhas e colunas da matriz da
imagem. A mesma operação pode isolar uma região de interesse e também descartar
linhas ou colunas correspondentes a bordas e margens indesejadas. Portanto, as
duas primeiras opções são exemplos válidos.

## Fontes

- [Notebook da aula — Basic Image Manipulation](<./02_Basic_Image_Manipulations_Crop_Resize_Flip_and_Modify_Pixels.ipynb>)
- [OpenCV 4.12 — `resize` e métodos de interpolação](https://docs.opencv.org/4.12.0/da/d54/group__imgproc__transform.html)
- [OpenCV — tutorial de transformações geométricas](https://docs.opencv.org/4.x/da/d6e/tutorial_py_geometric_transformations.html)
- [OpenCV 4.12 — comportamento de `flipCode` em `cv2.flip`](https://docs.opencv.org/4.12.0/d2/de8/group__core__array.html)
