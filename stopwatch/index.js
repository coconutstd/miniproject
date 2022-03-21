const get = (query) => document.querySelector(query)

class StopWatch {
  constructor(element) {
    this.timer = element;
    this.interval = null
    this.defaultTime = '00:00.00'
    this.startTime = 0
    this.elapsedTime = 0
    this.init()
  }

  addZero(number) {
    if (number < 10) {
      return '0' + number;
    } 
    if(number > 99) {
      return number.toString().slice(0, -1)
    }
    return number;
  }

  timeToString(time) {
    const date = new Date(time)
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()
    const milleseconds = date.getUTCMilliseconds()
    return `${this.addZero(minutes)}:${this.addZero(seconds)}.${this.addZero(milleseconds)}`
  } 

  startTimer() {
    this.elapsedTime = Date.now() - this.startTime
    const time = this.timeToString(this.elapsedTime)
    this.timer.innerHTML = time;
  }

  start() {
    this.startTime = Date.now() - this.elapsedTime
    this.interval = setInterval(() => this.startTimer(), 10)
  }
  stop() {
    clearInterval(this.interval)
    this.interval = null
  }
  reset() {
    this.stop()
    this.startTime = 0
    this.elapsedTime = 0
    this.timer.innerHTML = this.defaultTime;
  }

  init() {
    const $startButton = get('.start')
    const $stopButton = get('.stop')
    const $resetButton = get('.reset')

    $startButton.addEventListener('click', () => this.start())
    $stopButton.addEventListener('click', () => this.stop())
    $resetButton.addEventListener('click', () => this.reset())
  }
}

new StopWatch(get('.timer'))
