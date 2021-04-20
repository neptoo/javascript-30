let countdown;
const displayText = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // 点击一个计时器之前 清除之前所有已经存在的定时器
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds); // !一开始也要展示
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000); // ！这里是减去现在的时间 不是开始的now

    if (secondLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  // console.log(minutes, remainSeconds);
  const display = `${minutes}:${remainSeconds < 10 ? '0':''} ${remainSeconds}`; // 2:05
  displayText.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();
  endTime.textContent = `Be back at ${hour}: ${min < 10 ? '0':''} ${min}`;
}

function startTimer(){
  // console.log(this, this.dataset.time);
  const seconds = parseInt(this.dataset.time);  // 将data string 转换为数字
  timer(seconds);
}
buttons.forEach(btn => btn.addEventListener('click', startTimer));

// 当元素具有name属性的时候 可以通过document.name方式获取到对应的元素
// document.customForm.minutes -> <input type="text" name="minutes" placeholder="Enter Minutes">
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  // console.log(this.minutes.value);
  const selfMin = this.minutes.value;
  timer(selfMin * 60);
  this.reset();
})