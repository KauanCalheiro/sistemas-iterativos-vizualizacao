# Quiz — Pose Estimation using OpenPose

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**Which OpenCV function is used for drawing the pose estimation results on an image?**

- [ ] cv2.rectangle()
- [ ] cv2.putText()
- [x] cv2.line()
- [ ] cv2.drawContours()

**Resposta:** cv2.line()

**Por quê:** os pontos-chave detectados são ligados para formar os membros e o
esqueleto da pose. No notebook, o laço sobre `POSE_PAIRS` chama `cv2.line()`
entre as coordenadas das duas articulações de cada par. `cv2.putText()` apenas
identifica os pontos, enquanto retângulos e contornos não são usados para montar
o esqueleto.

## Question 2

**Why is it important to convert an image to a blob before feeding it to a pose estimation model?**

- [ ] It reduces the size of the image and makes it faster to process
- [x] It standardizes the image format and ensures compatibility with the model
- [ ] It makes the image easier to visualize and interpret
- [ ] It allows the model to adjust its parameters based on the specific image being processed.

**Resposta:** It standardizes the image format and ensures compatibility with the model

**Por quê:** o blob transforma a imagem no tensor de entrada esperado pela
rede, aplicando operações como redimensionamento, escala, subtração da média e
eventual troca de canais. `blobFromImage()` produz uma matriz de quatro
dimensões em ordem NCHW, compatível com a entrada configurada para a inferência.
Essa conversão não treina nem ajusta os parâmetros do modelo.

## Question 3

**The applications of Caffe Model for pose estimation is/are:**

- [ ] Human action recognition and behavior analysis
- [ ] Facial recognition and emotion detection
- [ ] Autonomous driving and robotics
- [x] All of the above

**Resposta:** All of the above

**Por quê:** as posições corporais e faciais estimadas podem alimentar tarefas
posteriores de reconhecimento de ações, análise de comportamento e emoção. Em
robótica e direção autônoma, a pose também pode ajudar a interpretar gestos,
ações e intenções humanas. Assim, todas as áreas enumeradas podem empregar
informações de pose, embora cada aplicação necessite de modelos e etapas
adicionais apropriados.

> “Caffe Model” não designa um único modelo nem uma capacidade específica.
> Caffe é o formato/framework usado para representar a arquitetura e os pesos;
> a tarefa efetivamente executada depende da rede e de seu treinamento. Além
> disso, estimar pontos faciais não realiza, por si só, reconhecimento de
> identidade ou de emoção.

## Question 4

**Which of the following is a challenge in using the Caffe Model for pose estimation?**

- [ ] The model is not able to detect poses in videos
- [ ] The model is not able to detect poses in real-time
- [x] The model is sensitive to variations in lighting and background.
- [ ] The model is not accurate for images containing multiple people.

**Resposta:** The model is sensitive to variations in lighting and background.

**Por quê:** mudanças de iluminação, fundo complexo, oclusões, escala e ponto de
vista podem alterar a aparência dos pontos corporais e dificultar sua
localização. As demais alternativas não caracterizam o OpenPose original: ele
pode ser aplicado frame a frame em vídeos e foi proposto como um sistema
multi-pessoa em tempo real.

> O notebook simplifica o pós-processamento para uma única pessoa ao escolher o
> máximo global de cada mapa de probabilidade. Essa limitação da demonstração
> não significa que a arquitetura OpenPose original seja incapaz de estimar
> poses de várias pessoas.

## Fontes

- [Notebook da aula — Deep Learning with OpenCV/OpenPose](<./14_OpenPose.ipynb>)
- [OpenCV 4.12 — Drawing Functions e `cv::line`](https://docs.opencv.org/4.12.0/d6/d6e/group__imgproc__draw.html)
- [OpenCV 4.12 — Deep Neural Network module e `blobFromImage`](https://docs.opencv.org/4.12.0/d6/d0f/group__dnn.html)
- [Cao et al. — Realtime Multi-Person 2D Pose Estimation using Part Affinity Fields](https://openaccess.thecvf.com/content_cvpr_2017/papers/Cao_Realtime_Multi-Person_2D_CVPR_2017_paper.pdf)
- [Marinoiu et al. — 3D Human Sensing, Action and Emotion Recognition in Robot Assisted Therapy of Children with Autism](https://openaccess.thecvf.com/content_cvpr_2018/papers/Marinoiu_3D_Human_Sensing_CVPR_2018_paper.pdf)
- [Deep learning-based approaches for human pose estimation in interdisciplinary physics applications](https://pmc.ncbi.nlm.nih.gov/articles/PMC12669660/)
