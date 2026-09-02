# Quiz — Getting Started with Images

Transcrição do formulário do curso, com as marcações de resposta e as
justificativas verificadas. Os nomes que não apareceram no texto copiado da
página foram reconstituídos a partir do notebook desta aula.

## Question 1

**What happens if the filename specified in `cv2.imwrite()` already exists?**

- [ ] An error is raised
- [x] The existing file is overwritten
- [ ] A new file is created
- [ ] None of the above

**Resposta:** The existing file is overwritten.

**Por quê:** `cv2.imwrite(filename, img)` grava a imagem exatamente no caminho
informado. Se já houver um arquivo nesse caminho, a nova codificação substitui
seu conteúdo. Isso também foi confirmado no OpenCV 4.12 do container: uma imagem
preta foi gravada e depois substituída por uma imagem branca usando o mesmo nome;
a leitura seguinte retornou o pixel branco `[255, 255, 255]`.

## Question 2

**Given a colored image, which of these will result in an error?**

- [ ]

  ```python
  img = cv2.imread("image.jpeg", 0)
  img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
  ```

- [ ]

  ```python
  img = cv2.imread("image.jpeg", 1)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  ```

- [ ]

  ```python
  img = cv2.imread("image.jpeg", 1)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  ```

- [x]

  ```python
  img = cv2.imread("image.jpeg", 0)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  ```

**Resposta:** a quarta opção.

**Por quê:** o flag `0` (`IMREAD_GRAYSCALE`) já produz uma matriz de um canal.
Entretanto, `COLOR_BGR2GRAY` espera uma imagem BGR com três ou quatro canais para
remover a informação de cor. Aplicar essa conversão a uma matriz que já é
grayscale causa erro de quantidade inválida de canais. As outras opções possuem
combinações compatíveis: grayscale para BGR, BGR para grayscale e BGR para RGB.
As quatro combinações também foram verificadas no OpenCV 4.12 do container.

## Question 3

**What is the difference between `cv2.imread(filename, 0)` and
`cv2.imread(filename, 1)`?**

- [x] `0` is used to read the image as a grayscale image, while `1` is used to
  read the image as a color image.
- [ ] `1` is used to read the image as a grayscale image, while `0` is used to
  read the image as a color image.
- [ ] There is no difference in using `0` or `1`.
- [ ] None of the above

**Resposta:** `0` lê em escala de cinza e `1` lê como imagem colorida.

**Por quê:** na enumeração oficial do OpenCV, `IMREAD_GRAYSCALE` possui valor
`0`, enquanto `IMREAD_COLOR`/`IMREAD_COLOR_BGR` possui valor `1`. O primeiro
retorna uma imagem de um canal e o segundo retorna uma imagem BGR de três canais.

## Question 4

**What is the purpose of the `cv2.cvtColor()` function?**

- [x] To convert an image from one color space to another.
- [ ] To resize an image.
- [ ] To crop an image.
- [ ] To apply a filter to an image.

**Resposta:** To convert an image from one color space to another.

**Por quê:** `cvtColor` recebe a imagem de origem e um código de conversão, como
`COLOR_BGR2RGB` ou `COLOR_BGR2GRAY`, e produz a representação correspondente no
espaço de cores de destino. Redimensionamento, recorte e filtragem são operações
diferentes.

## Question 5

**What is the return type of `imshow()` of Matplotlib?**

- [x] `matplotlib.image.AxesImage` object
- [ ] NumPy array
- [ ] PIL Image object
- [ ] None of the above

**Resposta:** `matplotlib.image.AxesImage` object.

**Por quê:** `matplotlib.pyplot.imshow()` usa a matriz ou imagem fornecida para
criar um artista visual nos eixos e retorna esse objeto `AxesImage`; não retorna
os dados como array NumPy nem como imagem PIL.

## Fontes

- [Notebook da aula — Getting Started with Images](<./01_Getting_Started_with_Images.ipynb>)
- [OpenCV 4.12 — leitura e escrita de arquivos de imagem](https://docs.opencv.org/4.12.0/d4/da8/group__imgcodecs.html)
- [OpenCV 4.12 — flags de leitura, incluindo `IMREAD_GRAYSCALE` e `IMREAD_COLOR`](https://docs.opencv.org/4.12.0/d8/d6a/group__imgcodecs__flags.html)
- [OpenCV 4.12 — conversões de espaços de cores com `cvtColor`](https://docs.opencv.org/4.12.0/d8/d01/group__imgproc__color__conversions.html)
- [Matplotlib — retorno de `matplotlib.pyplot.imshow`](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.imshow.html)
