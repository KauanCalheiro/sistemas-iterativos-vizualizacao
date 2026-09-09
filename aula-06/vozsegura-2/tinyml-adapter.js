/** Integra o modelo WebAssembly do Edge Impulse ao microfone do navegador. */
(function registerTinyMLAdapter(global) {
  const listeners = new Set();
  const AudioContextClass = global.AudioContext || global.webkitAudioContext;

  let classifier;
  let properties;
  let project;
  let stream;
  let audioContext;
  let sourceNode;
  let processorNode;
  let silentGain;
  let pendingSamples = [];
  let paused = false;
  let running = false;

  function emit(result) {
    listeners.forEach((listener) => listener(result));
  }

  function resample(input, sourceRate, targetRate) {
    if (sourceRate === targetRate) return new Float32Array(input);

    const ratio = sourceRate / targetRate;
    const outputLength = Math.max(1, Math.round(input.length / ratio));
    const output = new Float32Array(outputLength);

    for (let index = 0; index < outputLength; index += 1) {
      const position = index * ratio;
      const left = Math.floor(position);
      const right = Math.min(left + 1, input.length - 1);
      const fraction = position - left;
      output[index] = input[left] + (input[right] - input[left]) * fraction;
    }

    return output;
  }

  function inferAvailableSlices() {
    if (!running || paused || !properties) return;

    const sliceSize = properties.slice_size || Math.round((properties.frequency || 16000) / 2);

    while (pendingSamples.length >= sliceSize) {
      const slice = pendingSamples.splice(0, sliceSize);
      const prediction = classifier.classifyContinuous(slice, true);
      const best = prediction.results.reduce(
        (current, candidate) => (candidate.value > current.value ? candidate : current),
        { label: "uncertain", value: 0 },
      );

      emit({
        label: best.label,
        confidence: best.value,
        source: "edge-impulse",
        predictions: prediction.results,
      });
    }
  }

  function receiveAudio(event) {
    if (!running || paused) return;

    const input = event.inputBuffer.getChannelData(0);
    const targetRate = properties.frequency || 16000;
    const samples = resample(input, audioContext.sampleRate, targetRate);

    for (let index = 0; index < samples.length; index += 1) {
      const normalized = Math.max(-1, Math.min(1, samples[index]));
      pendingSamples.push(normalized * 32767);
    }

    inferAvailableSlices();
  }

  global.VozSeguraTinyML = {
    available: typeof EdgeImpulseClassifier !== "undefined" && Boolean(AudioContextClass),
    name: "Edge Impulse",
    classes: ["concluido", "repetir", "desconhecido", "ruido"],

    async load() {
      if (!this.available) return false;
      if (classifier && properties) return true;

      classifier = new EdgeImpulseClassifier();
      await classifier.init();
      properties = classifier.getProperties();
      project = classifier.getProjectInfo();
      this.name = `${project.name} · versão ${project.deploy_version}`;
      return true;
    },

    async start() {
      if (!properties) await this.load();
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Este navegador não oferece acesso ao microfone.");
      }
      if (running) return;

      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        video: false,
      });

      audioContext = new AudioContextClass();
      await audioContext.resume();
      sourceNode = audioContext.createMediaStreamSource(stream);
      processorNode = audioContext.createScriptProcessor(4096, 1, 1);
      silentGain = audioContext.createGain();
      silentGain.gain.value = 0;
      pendingSamples = [];
      paused = false;
      running = true;

      processorNode.onaudioprocess = receiveAudio;
      sourceNode.connect(processorNode);
      processorNode.connect(silentGain);
      silentGain.connect(audioContext.destination);
    },

    stop() {
      running = false;
      paused = false;
      pendingSamples = [];
      if (processorNode) processorNode.onaudioprocess = null;
      sourceNode?.disconnect();
      processorNode?.disconnect();
      silentGain?.disconnect();
      stream?.getTracks().forEach((track) => track.stop());
      audioContext?.close();
      sourceNode = null;
      processorNode = null;
      silentGain = null;
      stream = null;
      audioContext = null;
    },

    pause() {
      paused = true;
      pendingSamples = [];
    },

    resume() {
      if (running) paused = false;
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    get properties() {
      return properties ? { ...properties } : null;
    },

    // Usado apenas nos testes da interface. Não representa inferência de ML.
    simulate(label, confidence = 0.96) {
      listeners.forEach((listener) => listener({ label, confidence, source: "simulation" }));
    },
  };
})(window);
