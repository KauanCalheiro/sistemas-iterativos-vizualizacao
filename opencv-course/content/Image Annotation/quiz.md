# Quiz — Image Annotation

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas. A função que desapareceu do texto copiado da questão 2 foi
reconstituída a partir do notebook da aula.

## Question 1

**Which of the following line types is not supported by cv2.line?**

- [ ] cv2.LINE_AA
- [ ] cv2.LINE_8
- [ ] cv2.LINE_4
- [x] cv2.LINE_16

**Resposta:** cv2.LINE_16.

**Por quê:** a enumeração oficial `LineTypes` contém `cv2.LINE_4`, `cv2.LINE_8`
e `cv2.LINE_AA`. Não existe uma constante `cv2.LINE_16`. Isso também foi
confirmado no OpenCV 4.12 do container, no qual `hasattr(cv2, "LINE_16")`
retornou `False`.

## Question 2

**The purpose of the pt1 and pt2 parameters in cv2.rectangle() is:**

- [x] To specify the coordinates of the top-left and bottom-right corners of the rectangle
- [ ] To specify the center and radius of the rectangle
- [ ] To specify the length and width of the rectangle
- [ ] To specify the angle and size of the rectangle

**Resposta:** To specify the coordinates of the top-left and bottom-right corners of the rectangle.

**Por quê:** `pt1` e `pt2` representam dois vértices opostos do retângulo. Na
forma de uso apresentada no curso, `pt1` é normalmente o canto superior esquerdo
e `pt2` é o canto inferior direito. Centro e raio são parâmetros de círculo, e
essa sobrecarga de `rectangle` não recebe ângulo.

## Question 3

**What happens if the specified fontScale in cv2.putText() is negative?**

**Note: Use opencv (cv2) version less than or equal to 4.13**

- [x] The text is mirrored or reversed
- [ ] The text will not be displayed
- [ ] The function will return an error
- [ ] The text size will be proportional to the image size

**Resposta:** The text is mirrored or reversed.

**Por quê:** na documentação do OpenCV 4.12, `fontScale < 0` faz o texto ser
espelhado ou invertido. A função continua desenhando e não gera erro. A validação
no container confirmou que a escala positiva desenha a partir da origem para a
direita e para cima, enquanto a escala negativa desenha para a esquerda e para
baixo, caracterizando o espelhamento nos dois eixos.

## Question 4

**Which of the following is expected when thickness = -2 is passed in cv2.circle()?**

- [ ] The size of the circle is shrunk by 2 times.
- [ ] The thickness of the circle is shrunk by 2 times.
- [ ] The brightness of the color is reduced.
- [x] The color fills the complete circle.

**Resposta:** The color fills the complete circle.

**Por quê:** em `cv2.circle`, uma espessura positiva desenha somente o contorno;
qualquer valor negativo solicita um círculo preenchido. Portanto, `-2` tem o
mesmo efeito de preenchimento relevante para a questão, sem reduzir tamanho,
espessura ou brilho. O pixel central do círculo ficou colorido no teste com
OpenCV 4.12.

## Question 5

**When the thickness parameter is set to a negative value in cv2.rectangle, then:**

- [x] The rectangle is filled with color instead of being outlined
- [ ] The rectangle is not drawn
- [ ] An error is thrown
- [ ] The thickness is set to the absolute value of the negative value

**Resposta:** The rectangle is filled with color instead of being outlined.

**Por quê:** a documentação de `cv2.rectangle` determina que valores negativos
de `thickness`, como `cv2.FILLED`, desenham o interior do retângulo. O valor não é
convertido para módulo e a função não deixa de desenhar nem lança erro. O teste
com `thickness=-2` no OpenCV 4.12 confirmou o preenchimento do pixel central.

## Fontes

- [Notebook da aula — Image Annotation](<./03_Annotating_Images.ipynb>)
- [OpenCV 4.12 — funções de desenho, tipos de linha, `circle`, `putText` e `rectangle`](https://docs.opencv.org/4.12.0/d6/d6e/group__imgproc__draw.html)
- [OpenCV 4.12 — tutorial de funções de desenho](https://docs.opencv.org/4.12.0/dc/da5/tutorial_py_drawing_functions.html)
