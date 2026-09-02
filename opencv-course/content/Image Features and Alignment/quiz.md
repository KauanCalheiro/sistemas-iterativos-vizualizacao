# Quiz — Image Features and Alignment

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**Which feature detection algorithm is the fastest?**

- [ ] SIFT
- [ ] SURF
- [x] ORB
- [ ] All have similar speed

**Resposta:** ORB

**Por quê:** ORB foi desenvolvido como uma alternativa eficiente a SIFT e
SURF. A documentação oficial informa que ele é muito mais rápido que os dois,
pois combina o detector FAST e o descritor binário BRIEF com adaptações para
orientação e rotação.

## Question 2

**Which of the following cv2 function can be used to visualize the keypoints detected in an image?**

- [ ] cv2.visualizeKeypoints()
- [x] cv2.drawKeypoints()
- [ ] cv2.Keypoints.draw()
- [ ] cv2.drawMatches()

**Resposta:** cv2.drawKeypoints()

**Por quê:** `cv2.drawKeypoints()` desenha os pontos-chave detectados sobre uma
imagem. O notebook da aula usa essa função para visualizar os pontos encontrados
pelo ORB. `cv2.drawMatches()` tem outro propósito: desenhar correspondências
entre pontos-chave de duas imagens.

## Question 3

**In ORB.detectAndCompute(), what is the role of the mask parameter?**

- [x] It specifies a region of interest where keypoints should be detected
- [ ] It specifies the maximum number of keypoints to be detected
- [ ] It filters out keypoints that are not within the specified mask
- [ ] It has no role in ORB.detectAndCompute()

**Resposta:** It specifies a region of interest where keypoints should be detected

**Por quê:** a máscara determina onde o detector deve procurar pontos-chave.
Ela deve ser uma matriz de 8 bits cujos valores diferentes de zero identificam
a região de interesse. Passar `None`, como no notebook, significa não restringir
a detecção por uma máscara.

## Question 4

**The role of DescriptorMatcher in feature matching is:**

- [ ] It creates feature descriptors for the input image
- [x] It matches the feature descriptors of two images
- [ ] It removes the redundant features from an image
- [ ] It creates a binary mask for the matched features

**Resposta:** It matches the feature descriptors of two images

**Por quê:** `DescriptorMatcher` recebe descritores já calculados e procura as
correspondências entre os conjuntos de duas imagens. No notebook, os descritores
produzidos pelo ORB são fornecidos a `matcher.match(descriptors1, descriptors2,
None)`.

## Question 5

**Which method will be called for descriptor matching with the following code matcher = cv2.DescriptorMatcher_create(2) ?**

- [x] Brute-Force
- [ ] Brute-Force-L1
- [ ] Brute-Force-Hamming
- [ ] FlannBased

**Resposta:** Brute-Force

**Por quê:** na enumeração `DescriptorMatcher::MatcherType`, `BRUTEFORCE` vale
`2`. Para comparação, `FLANNBASED` vale `1`, `BRUTEFORCE_L1` vale `3` e
`BRUTEFORCE_HAMMING` vale `4`. Esses valores também foram confirmados no
container com OpenCV 4.12.

> O notebook usa `DESCRIPTOR_MATCHER_BRUTEFORCE_HAMMING`, que é normalmente
> apropriado para os descritores binários do ORB. Isso corresponde ao valor
> `4`, não ao valor `2` apresentado nesta pergunta.

## Question 6

**The role of cv2.getPerspectiveTransform() in perspective transformation is:**

- [x] It computes the homography matrix from the corresponding points
- [ ] It applies the homography matrix to the input image
- [ ] It specifies the region of interest in the input image
- [ ] It computes the inverse of the homography matrix

**Resposta:** It computes the homography matrix from the corresponding points

**Por quê:** `cv2.getPerspectiveTransform()` calcula uma matriz de transformação
perspectiva `3 × 3` a partir de quatro pares de pontos correspondentes. A
aplicação dessa matriz à imagem é feita separadamente por
`cv2.warpPerspective()`.

## Fontes

- [Notebook da aula — Image Alignment](<./08_Image_Alignment.ipynb>)
- [OpenCV 4.12 — ORB](https://docs.opencv.org/4.12.0/d1/d89/tutorial_py_orb.html)
- [OpenCV 4.12 — desenho de keypoints e matches](https://docs.opencv.org/4.12.0/d4/d5d/group__features2d__draw.html)
- [OpenCV 4.12 — `Feature2D` e máscara de detecção](https://docs.opencv.org/4.12.0/d0/d13/classcv_1_1Feature2D.html)
- [OpenCV 4.12 — Descriptor Matchers](https://docs.opencv.org/4.12.0/d8/d9b/group__features2d__match.html)
- [OpenCV 4.12 — `DescriptorMatcher` e `MatcherType`](https://docs.opencv.org/4.12.0/db/d39/classcv_1_1DescriptorMatcher.html)
- [OpenCV 4.12 — transformações geométricas](https://docs.opencv.org/4.12.0/da/d54/group__imgproc__transform.html)
