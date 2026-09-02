# Quiz — Panorama

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas.

## Question 1

**The purpose of image blending in image stitching is:**

- [ ] To remove parallax errors in the images
- [ ] To align the images to a common reference frame
- [x] To seamlessly merge overlapping regions and remove visible seams.
- [ ] To resize the images to the same size

**Resposta:** To seamlessly merge overlapping regions and remove visible seams.

**Por quê:** depois que as imagens são alinhadas e projetadas no mesmo espaço,
o blending combina suas regiões sobrepostas para suavizar transições e reduzir
costuras visíveis. Alinhamento, correção de paralaxe e redimensionamento são
problemas diferentes dentro ou antes do pipeline de stitching.

## Question 2

**What is the process of creating a panorama in OpenCV?**

- [ ] Stacking multiple images on top of each other
- [x] Merging multiple images to create a wide-angle image
- [ ] Cropping multiple images to create a panoramic view
- [ ] None of the above

**Resposta:** Merging multiple images to create a wide-angle image

**Por quê:** um panorama é produzido combinando várias imagens com regiões em
comum em uma única visão mais ampla. O processo envolve encontrar e
corresponder características, estimar transformações, projetar as imagens e
misturar as regiões sobrepostas.

## Question 3

**Given stitcher = cv2.Stitcher_create(). What method of stitcher is used to create panaroma image?**

- [ ] stitcher.apply(images)
- [ ] stitcher.create(images)
- [ ] stitcher.create_panaroma(images)
- [x] stitcher.stitch(images)

**Resposta:** stitcher.stitch(images)

**Por quê:** o método `stitch()` recebe as imagens de entrada e retorna o código
de status e o panorama. O notebook da aula utiliza exatamente `status, result =
stitcher.stitch(images)`. `Stitcher_create()` cria e configura o objeto; não
realiza por si só a composição das imagens fornecidas.

## Question 4

**Which technique is commonly used to ensure that the stitching process produces a seamless panorama?**

- [ ] Image cropping
- [x] Image blending
- [ ] Image scaling
- [ ] None of the above

**Resposta:** Image blending

**Por quê:** o image blending mistura os pixels nas zonas de sobreposição,
compensando transições abruptas e tornando as junções menos perceptíveis. O
OpenCV oferece, entre outras opções, os blenders Feather e Multi-Band para essa
etapa.

## Question 5

**What is the purpose of the cv2.Stitcher() class in OpenCV**

- [ ] To detect features in an image
- [ ] To match features in two images
- [x] To stitch multiple images together to create a panorama
- [ ] To crop an image

**Resposta:** To stitch multiple images together to create a panorama

**Por quê:** `Stitcher` é a interface de alto nível que coordena as etapas do
pipeline de stitching, incluindo características, correspondências,
transformações, estimação de costuras e blending, para produzir o panorama
final a partir de várias imagens.

## Fontes

- [Notebook da aula — Creating Panoramas using OpenCV](<./09_panorama.ipynb>)
- [OpenCV 4.12 — `cv::Stitcher` Class Reference](https://docs.opencv.org/4.12.0/d2/d8d/classcv_1_1Stitcher.html)
- [OpenCV 4.12 — módulo Images stitching](https://docs.opencv.org/4.12.0/d1/d46/group__stitching.html)
- [OpenCV 4.12 — `cv::detail::Blender`](https://docs.opencv.org/4.12.0/d6/d4a/classcv_1_1detail_1_1Blender.html)
