# Curso de OpenCV

Projeto de apoio às atividades práticas e aos questionários do curso. O ambiente
usa Python 3.12, OpenCV 4.12 e NumPy dentro de um container Docker.

## Estrutura

```text
content/        textos e conteúdos do curso que foram extraídos
```

As demais pastas serão definidas pelo estudante conforme o andamento do curso.

## Como usar

Construa a imagem:

```bash
docker compose build
```

Valide o ambiente:

```bash
docker compose run --rm opencv
```

Execute um arquivo Python:

```bash
docker compose run --rm opencv python caminho/do/arquivo.py
```

Os arquivos da pasta local são montados em `/app` no container, portanto as
alterações e os resultados ficam disponíveis no projeto.

## Fluxo de estudo

1. Coloque os textos extraídos das aulas e apostilas em `content/`.
2. Informe qual atividade ou questionário deve ser resolvido e onde salvar os
   arquivos correspondentes.
3. A solução será pesquisada, implementada e validada no container.
4. Cada resposta será acompanhada das fontes efetivamente consultadas.

## Referências iniciais

- [Documentação do OpenCV 4.x](https://docs.opencv.org/4.x/)
- [Tutoriais de OpenCV-Python](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- [Documentação do NumPy](https://numpy.org/doc/stable/)
- [Instruções de projeto do Codex com AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
