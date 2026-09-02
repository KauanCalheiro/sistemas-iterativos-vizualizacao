# Quiz — Face Detection

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**Which of the following is NOT mandatory to use the function: cv2.dnn.readNetFromCaffe?**

- [ ] The .caffemodel file containing the pre-trained weights of the model
- [ ] The .prototxt file containing the model's architecture and configuration
- [ ] The model needs to be first fine-tuned on a custom dataset.
- [x] GPU

**Respostas tecnicamente corretas:** The model needs to be first fine-tuned on a custom dataset. **e** GPU

**Por quê:** o código da aula carrega diretamente o `.prototxt` e o modelo
pré-treinado `.caffemodel`, sem qualquer fine-tuning e sem configurar GPU. O
módulo DNN possui execução em CPU, que é inclusive o alvo padrão. Portanto,
nenhum desses dois requisitos é obrigatório para usar o modelo mostrado.

> **Atenção:** a pergunta é ambígua se o formulário aceitar somente uma
> alternativa, pois tanto o fine-tuning quanto a GPU são dispensáveis. Se o
> campo permitir múltiplas marcações, selecione as duas alternativas assinaladas
> acima. Se permitir apenas uma, não existe resposta única tecnicamente válida.
>
> A assinatura oficial é `readNetFromCaffe(prototxt[, caffeModel])`, tornando o
> arquivo de pesos opcional para apenas construir a rede. Para executar a
> inferência pré-treinada usada nesta aula, contudo, o `.caffemodel` é necessário
> para fornecer os pesos aprendidos; por isso ele não foi marcado no contexto do
> exercício.

## Question 2

**Which of the following will give the same result as cv2.flip(img, 1)? ("img" represents BGR image)**

- [x] img[:, ::-1,:]
- [ ] img[::-1, :, :]
- [ ] img[:, :, ::-1]
- [ ] img[:, :1,:]

**Resposta:** img[:, ::-1,:]

**Por quê:** `cv2.flip(img, 1)` faz o espelhamento horizontal, invertendo a
ordem das colunas. No fatiamento `img[:, ::-1, :]`, o primeiro eixo mantém todas
as linhas, o segundo percorre as colunas em ordem inversa e o terceiro mantém os
canais BGR. A equivalência foi confirmada no container com OpenCV 4.12 e NumPy.

## Question 3

**Which of the following is a challenge in face detection?**

- [ ] Variation in lighting and background
- [ ] Low contrast in facial features
- [ ] Pose and occlusion
- [x] All of the above

**Resposta:** All of the above

**Por quê:** mudanças de iluminação e de fundo alteram a aparência e a
separação entre face e ambiente; baixo contraste reduz pistas visuais; e pose ou
oclusão escondem e deformam características esperadas. O benchmark WIDER FACE,
usado amplamente para avaliar detectores, destaca explicitamente variações de
pose, oclusão, aparência e iluminação entre os fatores desafiadores.

## Fontes

- [Código da aula — Face Detection](<./main.py>)
- [OpenCV 4.12 — `readNetFromCaffe` e alvos do módulo DNN](https://docs.opencv.org/4.12.0/d6/d0f/group__dnn.html)
- [OpenCV 4.12 — exemplo de modelo Caffe e CPU como alvo padrão](https://docs.opencv.org/4.12.0/d5/de7/tutorial_dnn_googlenet.html)
- [OpenCV 4.12 — `cv::flip`](https://docs.opencv.org/4.12.0/d2/de8/group__core__array.html)
- [WIDER FACE — artigo do CVPR 2016](https://openaccess.thecvf.com/content_cvpr_2016/html/Yang_WIDER_FACE_A_CVPR_2016_paper.html)
