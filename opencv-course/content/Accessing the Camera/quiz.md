# Quiz — Accessing the Camera

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas. Os trechos de código que desapareceram na cópia do
formulário foram recuperados do arquivo da aula existente nesta pasta.

## Question 1

**What is the correct way to release the resources used by cv2.VideoCapture() when done with the webcam? Here `cap` is an object of `cv2.VideoCapture`.**

- [x] cap.release()
- [ ] cap.end()
- [ ] cap.close()
- [ ] None of the above.

**Resposta:** cap.release()

**Por quê:** `release()` é o método de `VideoCapture` que fecha o arquivo de
vídeo ou o dispositivo de captura e libera o recurso. O exemplo oficial de
captura pela câmera também chama `cap.release()` ao terminar. No container com
OpenCV 4.12, foi confirmado que o objeto possui `release()`, mas não possui os
métodos `end()` ou `close()`.

## Question 2

**Which of the following is not a valid way to call cv2.VideoCapture()?**

- [x] cap = cv2.VideoCapture('https://www.youtube.com/watch?v=xxxxxxxxxxx') # link of a youtube video
- [ ] cap = cv2.VideoCapture("video.avi") # video.avi is present at the same location
- [ ] cap = cv2.VideoCapture(0) # the computer has a working webcam
- [ ] cap = cv2.VideoCapture("images/img_%02d.jpg") #where images folder contains sequences of images

**Resposta:** cap = cv2.VideoCapture('https://www.youtube.com/watch?v=xxxxxxxxxxx') # link of a youtube video

**Por quê:** `VideoCapture` aceita o nome de um arquivo de vídeo, o índice de
uma câmera, um padrão de sequência de imagens ou a URL direta de um fluxo de
vídeo compatível com o backend. O endereço mostrado é uma página `watch` do
YouTube, não a URL direta do fluxo de mídia; `VideoCapture` não resolve essa
página para obter o stream. As outras três chamadas correspondem diretamente
a formatos documentados pela API.

## Question 3

**What is the purpose of `while cv2.waitKey(1) != 27:` in OpenCV?**

- [ ] To pause the execution of the program until a key is pressed
- [ ] To wait for 1 second before executing the next frame
- [x] To check if the Esc key has been pressed
- [ ] To check if the Enter key has been pressed

**Resposta:** To check if the Esc key has been pressed

**Por quê:** `cv2.waitKey(1)` aguarda brevemente por um evento de teclado e
retorna o código da tecla pressionada; o argumento `1` está em milissegundos,
não em segundos. O código `27` representa a tecla Esc. Assim, o laço do arquivo
da aula continua enquanto o retorno for diferente de `27` e termina quando Esc
é pressionada.

## Fontes

- [Código da aula — Accessing the Camera](<./Acessing-the-camera.py>)
- [OpenCV 4.12 — Getting Started with Videos](https://docs.opencv.org/4.12.0/dd/d43/tutorial_py_video_display.html)
- [OpenCV 4.12 — `cv::VideoCapture` Class Reference](https://docs.opencv.org/4.12.0/d8/dfe/classcv_1_1VideoCapture.html)
- [OpenCV 4.12 — High-level GUI (`waitKey`)](https://docs.opencv.org/4.12.0/d7/dfc/group__highgui.html)
