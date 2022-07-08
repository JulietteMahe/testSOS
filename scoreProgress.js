scoreProgress: function (score) {
    let progressBar = document.querySelector(".circular-progress");
    let valueContainer = progressBar.querySelector(".value-container");
    let progressEndValue = 0;
    let progressValue = 0;
    progressEndValue = score;

    let maxValue = 100;
    let speed = 40;
    let progress = setInterval(() => {
      progressValue++;
      valueContainer.textContent = `${progressValue}`;
      let coefProgress = progressValue * 3.6;
      let coefEmpty = (maxValue - progressValue) * 3.6;
      progressBar.style.background = `conic-gradient(
      #1a53ff ${coefProgress}deg,
      #cadcff ${coefEmpty}deg
      )`;

      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  },