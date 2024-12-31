// Create audio context lazily to work around autoplay restrictions
let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playHitSound() {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  // Configure sound
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(150, context.currentTime);
  gainNode.gain.setValueAtTime(0.1, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

  // Play sound
  oscillator.start();
  oscillator.stop(context.currentTime + 0.1);
}