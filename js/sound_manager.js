function SoundManager() {
  this.audioContext = null;
  this.init();
}

SoundManager.prototype.init = function() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  } catch (e) {
    console.warn('Web Audio API is not supported in this browser');
  }
};

SoundManager.prototype.playMoveSound = function() {
  if (!this.audioContext) return;

  // 如果 AudioContext 被挂起（通常是因为没有用户交互），尝试恢复
  if (this.audioContext.state === 'suspended') {
    this.audioContext.resume();
  }

  var oscillator = this.audioContext.createOscillator();
  var gainNode = this.audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(this.audioContext.destination);

  // 移动音效：短促的低频扫频
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(this.audioContext.currentTime + 0.1);
};

SoundManager.prototype.playMergeSound = function() {
  if (!this.audioContext) return;

  if (this.audioContext.state === 'suspended') {
    this.audioContext.resume();
  }

  var oscillator = this.audioContext.createOscillator();
  var gainNode = this.audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(this.audioContext.destination);

  // 合成音效：清脆的高频
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.15);

  gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

  oscillator.start();
  oscillator.stop(this.audioContext.currentTime + 0.2);
};
