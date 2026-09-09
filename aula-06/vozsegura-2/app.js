const procedure = {
  id: "preparacao-bancada",
  title: "Preparação segura da bancada",
  steps: [
    "Retire objetos desnecessários e mantenha livre a área de trabalho.",
    "Coloque os equipamentos de proteção individual exigidos para a atividade.",
    "Verifique se cabos, ferramentas e componentes apresentam danos visíveis.",
    "Confirme que a alimentação elétrica está desligada antes da montagem.",
    "Posicione os instrumentos e confirme que a bancada está pronta para uso.",
  ],
};

const COMMAND_THRESHOLD = 0.8;
const COMMAND_COOLDOWN_MS = 1700;
const STORAGE_KEY = "vozsegura-2-progress";

const elements = {
  state: document.querySelector("#system-state"),
  stateLabel: document.querySelector("#system-state-label"),
  stepCounter: document.querySelector("#step-counter"),
  stepNumber: document.querySelector("#step-number"),
  stepText: document.querySelector("#step-text"),
  progressTrack: document.querySelector(".progress-track"),
  progressBar: document.querySelector("#progress-bar"),
  heardPanel: document.querySelector("#heard-panel"),
  heardCommand: document.querySelector("#heard-command"),
  confidence: document.querySelector("#confidence"),
  listenButton: document.querySelector("#listen-button"),
  listenLabel: document.querySelector("#listen-label"),
  repeatButton: document.querySelector("#repeat-button"),
  backButton: document.querySelector("#back-button"),
  completeButton: document.querySelector("#complete-button"),
  cancelButton: document.querySelector("#cancel-button"),
  resetButton: document.querySelector("#reset-button"),
  toast: document.querySelector("#toast"),
  dialog: document.querySelector("#completion-dialog"),
  restartDialogButton: document.querySelector("#restart-dialog-button"),
  modelName: document.querySelector("#model-name"),
  modelDescription: document.querySelector("#model-description"),
  executionPlace: document.querySelector("#execution-place"),
  demoButtons: document.querySelectorAll("[data-demo-command]"),
};

let currentStep = restoreProgress();
let listening = false;
let lastAcceptedAt = 0;
let candidateLabel = null;
let candidateStreak = 0;
let commandArmed = true;
let speechGeneration = 0;
let toastTimer;

function restoreProgress() {
  const value = Number.parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  return Number.isFinite(value) && value >= 0 && value < procedure.steps.length ? value : 0;
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, String(currentStep));
}

function render() {
  const completed = currentStep;
  const progress = Math.round((completed / procedure.steps.length) * 100);

  elements.stepCounter.textContent = `Etapa ${currentStep + 1} de ${procedure.steps.length}`;
  elements.stepNumber.textContent = String(currentStep + 1).padStart(2, "0");
  elements.stepText.textContent = procedure.steps[currentStep];
  elements.progressBar.style.width = `${progress}%`;
  elements.progressTrack.setAttribute("aria-valuenow", String(progress));
  elements.backButton.disabled = currentStep === 0;
}

function setSystemState(state, label) {
  elements.state.dataset.state = state;
  elements.stateLabel.textContent = label;
  elements.heardPanel.classList.toggle("listening", state === "listening");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2800);
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    showToast("Síntese de voz indisponível neste navegador.");
    return;
  }

  const generation = ++speechGeneration;
  window.speechSynthesis.cancel();
  window.VozSeguraTinyML?.pause?.();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.94;
  const resumeModel = () => window.setTimeout(() => {
    if (generation === speechGeneration) window.VozSeguraTinyML?.resume?.();
  }, 300);
  utterance.addEventListener("end", resumeModel, { once: true });
  utterance.addEventListener("error", resumeModel, { once: true });
  window.speechSynthesis.speak(utterance);
}

function readCurrentStep() {
  speak(`Etapa ${currentStep + 1}. ${procedure.steps[currentStep]}`);
}

function completeStep() {
  if (currentStep === procedure.steps.length - 1) {
    localStorage.removeItem(STORAGE_KEY);
    speak("Procedimento finalizado. Todas as etapas foram confirmadas.");
    elements.progressBar.style.width = "100%";
    elements.progressTrack.setAttribute("aria-valuenow", "100");
    elements.dialog.showModal();
    return;
  }

  currentStep += 1;
  saveProgress();
  render();
  speak(`Etapa concluída. Próxima etapa. ${procedure.steps[currentStep]}`);
  showToast("Etapa confirmada com segurança.");
}

function previousStep() {
  if (currentStep === 0) {
    showToast("Você já está na primeira etapa.");
    return;
  }

  currentStep -= 1;
  saveProgress();
  render();
  speak(`Voltando para a etapa ${currentStep + 1}. ${procedure.steps[currentStep]}`);
}

function cancelProcedure() {
  stopListening();
  showToast("Procedimento pausado. O progresso foi mantido.");
  speak("Procedimento pausado.");
}

function resetProcedure() {
  currentStep = 0;
  localStorage.removeItem(STORAGE_KEY);
  render();
  elements.dialog.close();
  showToast("Procedimento reiniciado.");
}

function displayClassification(label, confidence, simulated) {
  const friendlyLabels = {
    concluido: "Concluído",
    repetir: "Repetir",
    desconhecido: "Outra palavra",
    ruido: "Ruído / outro",
  };

  elements.heardCommand.textContent = `${friendlyLabels[label] || label}${simulated ? " · simulação" : ""}`;
  elements.confidence.textContent = `${Math.round(confidence * 100)}%`;
}

function handleClassification({ label, confidence = 0, source = "model" }) {
  const normalizedLabel = String(label).toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const simulated = source === "simulation";
  const negativeLabel = ["ruido", "desconhecido", "unknown", "noise", "uncertain"].includes(normalizedLabel);
  displayClassification(normalizedLabel, confidence, simulated);

  if (simulated) {
    if (normalizedLabel === "concluido") completeStep();
    if (normalizedLabel === "repetir") readCurrentStep();
    return;
  }

  if (negativeLabel || confidence < COMMAND_THRESHOLD) {
    candidateLabel = null;
    candidateStreak = 0;
    if (negativeLabel) commandArmed = true;
    return;
  }

  if (!commandArmed) return;

  if (candidateLabel === normalizedLabel) candidateStreak += 1;
  else {
    candidateLabel = normalizedLabel;
    candidateStreak = 1;
  }

  if (candidateStreak < 2) return;

  const now = Date.now();
  if (now - lastAcceptedAt < COMMAND_COOLDOWN_MS) return;
  lastAcceptedAt = now;
  commandArmed = false;
  candidateLabel = null;
  candidateStreak = 0;

  if (normalizedLabel === "concluido") completeStep();
  if (normalizedLabel === "repetir") readCurrentStep();
}

async function startListening() {
  if (!window.VozSeguraTinyML?.available) {
    showToast("Modelo ainda não integrado. Use os botões de simulação por enquanto.");
    document.querySelector(".demo-card").open = true;
    return;
  }

  try {
    await window.VozSeguraTinyML.start();
    listening = true;
    elements.listenLabel.textContent = "Parar de ouvir";
    setSystemState("listening", "Ouvindo localmente");
  } catch (error) {
    setSystemState("error", "Microfone indisponível");
    showToast(error.message || "Não foi possível acessar o microfone.");
  }
}

function stopListening() {
  if (!listening) return;
  window.VozSeguraTinyML.stop();
  listening = false;
  candidateLabel = null;
  candidateStreak = 0;
  commandArmed = true;
  elements.listenLabel.textContent = "Ativar comandos de voz";
  setSystemState("idle", "Pronto");
}

async function toggleListening() {
  if (listening) stopListening();
  else await startListening();
}

async function initializeModel() {
  window.VozSeguraTinyML.subscribe(handleClassification);
  try {
    const loaded = await window.VozSeguraTinyML.load();
    if (!loaded) return;
    elements.modelName.textContent = window.VozSeguraTinyML.name;
    elements.modelDescription.textContent = "Modelo carregado e pronto para classificar comandos sem enviar o áudio para um servidor.";
    elements.executionPlace.textContent = "no dispositivo";
    setSystemState("idle", "Modelo carregado");
  } catch (error) {
    elements.modelName.textContent = "Falha ao carregar o modelo";
    elements.modelDescription.textContent = error.message || "O runtime WebAssembly não pôde ser inicializado.";
    setSystemState("error", "Modelo indisponível");
  }
}

elements.listenButton.addEventListener("click", toggleListening);
elements.repeatButton.addEventListener("click", readCurrentStep);
elements.completeButton.addEventListener("click", completeStep);
elements.backButton.addEventListener("click", previousStep);
elements.cancelButton.addEventListener("click", cancelProcedure);
elements.resetButton.addEventListener("click", resetProcedure);
elements.restartDialogButton.addEventListener("click", resetProcedure);

elements.demoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.VozSeguraTinyML.simulate(button.dataset.demoCommand);
  });
});

window.addEventListener("beforeunload", stopListening);

render();
initializeModel();
