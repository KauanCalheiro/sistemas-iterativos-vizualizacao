# Quiz — Video Writing

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**VideoWriter in OpenCV is used to:**

- [ ] To capture video from a webcam
- [ ] To play video files
- [x] To write frames to a video file
- [ ] To read frames from a video file

**Resposta:** To write frames to a video file

**Por quê:** `cv2.VideoWriter` cria um arquivo ou fluxo de vídeo de saída, e o
método `write(frame)` grava nele o próximo frame. A captura e a leitura de
frames são responsabilidades de `cv2.VideoCapture`.

## Question 2

**How can you check if cap.read() was successful? (Here: cap = cv2.VideoCapture())**

- [ ] By checking the value of the isOpened() function.
- [ ] By checking the value of the capOpened() variable.
- [x] By checking the return value of the function cap.read().
- [ ] None of the above.

**Resposta:** By checking the return value of the function cap.read().

**Por quê:** em Python, `cap.read()` retorna `(retval, image)`. O primeiro valor
é `True` quando um frame foi obtido e `False` quando nenhum frame pôde ser
capturado. `isOpened()` informa se a inicialização da fonte foi bem-sucedida,
mas não confirma a leitura de um frame específico.

## Question 3

**For a VideoWriter object output, how can we release it's memory at the end of the program**

- [ ] output.erase()
- [ ] output.release_memory()
- [x] output.release()
- [ ] output.releaseAllWindows()

**Resposta:** output.release()

**Por quê:** `release()` fecha o arquivo de saída e libera o recurso associado
ao `VideoWriter`. O notebook da aula aplica esse método aos dois escritores de
vídeo depois de terminar a gravação. Os outros três métodos não pertencem à
API de `VideoWriter`.

## Question 4

**How can you handle errors that may occur when using cap.read()?**

- [ ] By checking the return value of the function and handling any errors accordingly.
- [ ] By using a try-except block to catch any exceptions that may be raised.
- [ ] By using the isOpened() function to check if the video capture object is still open before calling cap.read()
- [x] All of the above

**Resposta:** All of the above

**Por quê:** as três verificações cobrem situações complementares. O retorno de
`cap.read()` indica diretamente se um frame foi obtido; `isOpened()` permite
detectar se a fonte foi inicializada antes da leitura; e `try-except` pode
tratar exceções produzidas pelo OpenCV ou pelo código ao redor da captura. A
API também oferece modo de exceções por meio de `setExceptionMode`.

> Na prática, a verificação indispensável para saber se uma chamada específica
> de `read()` funcionou é testar seu valor de retorno. `isOpened()` verifica a
> abertura da fonte, não garante que o próximo frame será lido.

## Question 5

**What does fourcc mean in cv2.VideoWriter()?**

- [x] It refers to the four-character code used to specify the codec to be used for video compression
- [ ] It is a parameter to set the frame rate of the output video
- [ ] It is the size of the video frame in pixels
- [ ] It is the file extension of the output video file

**Resposta:** It refers to the four-character code used to specify the codec to be used for video compression

**Por quê:** FourCC é o código de quatro caracteres que identifica o codec
usado para codificar ou comprimir os frames. A taxa de quadros e o tamanho dos
frames são parâmetros separados de `VideoWriter`, e a extensão faz parte do
nome do arquivo de saída.

## Fontes

- [Notebook da aula — Writing a video using OpenCV](<./06_Writing_Video_using_OpenCV.ipynb>)
- [OpenCV 4.12 — Getting Started with Videos](https://docs.opencv.org/4.12.0/dd/d43/tutorial_py_video_display.html)
- [OpenCV 4.12 — `cv::VideoWriter` Class Reference](https://docs.opencv.org/4.12.0/dd/d9e/classcv_1_1VideoWriter.html)
- [OpenCV 4.12 — `cv::VideoCapture` Class Reference](https://docs.opencv.org/4.12.0/d8/dfe/classcv_1_1VideoCapture.html)
