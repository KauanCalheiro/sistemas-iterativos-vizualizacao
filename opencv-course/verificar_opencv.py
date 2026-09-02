import cv2
import numpy as np


imagem = np.zeros((100, 100, 3), dtype=np.uint8)
imagem[:] = (0, 255, 0)

print(f"OpenCV {cv2.__version__} instalado com sucesso.")
print(f"Imagem de teste criada: {imagem.shape}")
