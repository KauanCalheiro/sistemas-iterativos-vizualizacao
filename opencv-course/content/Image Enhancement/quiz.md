# Quiz — Image Enhancement

Transcrição do formulário do curso, com as opções preservadas no idioma e na
ordem apresentadas. As matrizes da questão 4 foram transcritas da imagem do
formulário fornecida pelo estudante.

## Question 1

**Given the following code ->**

```python
arr1 = np.array([200, 250], dtype=np.uint8).reshape(-1, 1)
arr2 = np.array([40, 40], dtype=np.uint8).reshape(-1, 1)
add_numpy = arr1+arr2
add_cv2 = cv2.add(arr1, arr2)
```

**Then the value of add_numpy and add_cv2 respectively are -**

- [ ] [ [240, 290] ] , [ [240, 290] ]
- [ ] [ [240, 34] ] , [ [240, 290] ]
- [ ] [ [240, 255] ] , [ [240, 34] ]
- [x] [ [240, 34] ] , [ [240, 255] ]

**Resposta:** [ [240, 34] ] , [ [240, 255] ].

**Por quê:** os arrays possuem tipo `uint8`, cujo intervalo é de 0 a 255. Na
adição do NumPy, `250 + 40 = 290` sofre overflow e volta pelo módulo 256,
resultando em `34`. O `cv2.add` usa aritmética de saturação: um resultado acima
de 255 é limitado a 255. Em ambos os casos, `200 + 40` permanece 240.

> A forma real dos arrays após `reshape(-1, 1)` é uma coluna: o NumPy retorna
> `[[240], [34]]` e o OpenCV retorna `[[240], [255]]`. A alternativa do
> formulário exibe esses valores em uma única linha, preservada acima exatamente
> como foi fornecida.

## Question 2

**Which of the following is not a valid threshold type in Opencv (type parameter in cv2.threshold)?**

- [ ] cv2.THRESH_BINARY
- [x] cv2.THRESH_BINARY_ADV
- [ ] cv2.THRESH_BINARY_INV
- [ ] cv2.THRESH_OTSU

**Resposta:** cv2.THRESH_BINARY_ADV.

**Por quê:** `THRESH_BINARY`, `THRESH_BINARY_INV` e `THRESH_OTSU` constam na
enumeração oficial `ThresholdTypes`. Não existe `THRESH_BINARY_ADV` na API do
OpenCV. A ausência também foi confirmada na versão 4.12 do container.

## Question 3

**When cv2.threshold() function is applied to a grayscale image with a threshold value of 127 and maximum value of 255, then:**

**Hint: Assume THRESH_BINARY being applied in the process.**

- [ ] Pixels with intensity less than 127 are set to 0, and pixels with intensity greater than or equal to 127 are set to 255.
- [x] Pixels with intensity less than or equal to 127 are set to 0, and pixels with intensity greater than 127 are set to 255.
- [ ] Pixels with intensity greater than 127 are set to 0, and pixels with intensity less than or equal to 127 are set to 255.
- [ ] Pixels with intensity greater than or equal to 127 are set to 0, and pixels with intensity less than 127 are set to 255

**Resposta:** Pixels with intensity less than or equal to 127 are set to 0, and pixels with intensity greater than 127 are set to 255.

**Por quê:** em `THRESH_BINARY`, a condição é estritamente
`src(x, y) > thresh`. Assim, somente intensidades acima de 127 recebem 255;
intensidades iguais ou inferiores a 127 recebem 0. O teste com os valores
`[126, 127, 128]` retornou `[0, 0, 255]` no OpenCV 4.12.

## Question 4

**Given 2 inputs:**

**Input 1:**

```text
┌       ┐
│ 1 1 1 │
│ 1 0 0 │
│ 0 0 0 │
└       ┘
```

**Input 2:**

```text
┌       ┐
│ 1 1 0 │
│ 1 1 0 │
│ 1 0 0 │
└       ┘
```

**The output of the bitwise AND operation on the above binary inputs is:**

- [x]

  ```text
  ┌       ┐
  │ 1 1 0 │
  │ 1 0 0 │
  │ 0 0 0 │
  └       ┘
  ```

- [ ]

  ```text
  ┌       ┐
  │ 1 1 1 │
  │ 1 0 0 │
  │ 1 0 0 │
  └       ┘
  ```

- [ ]

  ```text
  ┌       ┐
  │ 1 1 0 │
  │ 1 1 0 │
  │ 0 0 0 │
  └       ┘
  ```

- [ ]

  ```text
  ┌       ┐
  │ 0 0 0 │
  │ 0 0 0 │
  │ 0 0 0 │
  └       ┘
  ```

**Resposta:** a primeira alternativa:

```text
┌       ┐
│ 1 1 0 │
│ 1 0 0 │
│ 0 0 0 │
└       ┘
```

**Por quê:** o AND bit a bit mantém um pixel branco somente quando o pixel
correspondente vale `1` nas duas entradas. Calculando posição por posição, apenas
`(1,1)`, `(1,2)` e `(2,1)` — usando índices iniciados em 1 — permanecem com
valor `1`. Todas as outras posições têm pelo menos um operando igual a `0` e
resultam em `0`. O resultado também foi confirmado com `cv2.bitwise_and` no
OpenCV 4.12 do container.

## Fontes

- [Notebook da aula — Image Enhancement](<./04_Basic_Image_Enhancement_Mathematical_Operations.ipynb>)
- [OpenCV 4.12 — aritmética de saturação](https://docs.opencv.org/4.12.0/d1/dfb/intro.html#saturation_arithmetics)
- [NumPy — tipos de tamanho fixo e overflow](https://numpy.org/doc/stable/user/basics.types.html)
- [OpenCV 4.12 — tipos e regra de threshold](https://docs.opencv.org/4.12.0/d7/d1b/group__imgproc__misc.html)
- [OpenCV 4.12 — `bitwise_and`](https://docs.opencv.org/4.12.0/d2/de8/group__core__array.html)
