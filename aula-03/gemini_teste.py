"""Manda a folha pro Gemini e compara com a leitura do OpenCV.

Uso:  export GEMINI_API_KEY=...   &&   python3 gemini_teste.py
"""
import base64, json, os, sys, urllib.request, urllib.error

MODELO  = "gemini-2.5-flash"
IMAGEM  = "teste_6_scan_real.png"
RODADAS = 2                      # roda 2x pra ver se a resposta muda
PROMPT  = ("Esta é uma folha de respostas. Para cada questão, diga qual alternativa está marcada. "
           "Responda apenas a lista, no formato `1-B`.")

# leitura do OpenCV para essa folha, conferida à mão questão por questão
OPENCV = list("EACEABECCADBEBCCDDDECDBCBABBCABDADBCEDBEBCAAB")

def perguntar(imagem, prompt):
    b64 = base64.b64encode(open(imagem, "rb").read()).decode()
    corpo = {"contents": [{"parts": [{"text": prompt},
                                     {"inline_data": {"mime_type": "image/png", "data": b64}}]}]}
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{MODELO}:generateContent"
        f"?key={os.environ['GEMINI_API_KEY']}",
        data=json.dumps(corpo).encode(), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        d = json.load(r)
    return "".join(p.get("text", "") for p in d["candidates"][0]["content"]["parts"])

def extrair(texto, n=45):
    """Pega os pares questão-letra da resposta, em qualquer formato tipo 1-B, 1: B, 1 B."""
    import re
    achados = dict((int(q), l.upper()) for q, l in re.findall(r"(\d{1,2})\s*[-:.\)]?\s*([A-Ea-e])\b", texto))
    return [achados.get(i, "-") for i in range(1, n + 1)]

if __name__ == "__main__":
    respostas = []
    for i in range(RODADAS):
        try:
            texto = perguntar(IMAGEM, PROMPT)
        except urllib.error.HTTPError as e:
            sys.exit(f"erro {e.code}: {e.read().decode()[:300]}")
        r = extrair(texto)
        respostas.append(r)
        iguais = sum(a == b for a, b in zip(r, OPENCV))
        print(f"\n--- rodada {i+1}")
        print(" ".join(f"{q}{l}" for q, l in enumerate(r, 1)))
        print(f"concordância com o OpenCV: {iguais}/45 = {iguais/45*100:.1f}%")
        divergentes = [(q, l, o) for q, (l, o) in enumerate(zip(r, OPENCV), 1) if l != o]
        if divergentes:
            print("divergências (questão: gemini vs opencv):",
                  ", ".join(f"{q}: {l} vs {o}" for q, l, o in divergentes))

    if RODADAS > 1:
        estaveis = sum(a == b for a, b in zip(*respostas[:2]))
        print(f"\nas duas rodadas do Gemini concordam entre si em {estaveis}/45 = {estaveis/45*100:.1f}%")
