scoreProgress: function (score) {
    let progressBar = document.querySelector(".circular-progress");
    let valueContainer = document.querySelector(".value-container");
    let progressValue = 0;
    let progressEndValue = score;
    let maxValue = 100;
    let speed = 40;
    console.log(progressEndValue);
    let progress = setInterval(() => {
      progressValue++;

      valueContainer.textContent = `${progressValue}%`;

      let coefProgress = progressValue * 3.6;
      let coefEmpty = (maxValue - progressValue) * 3.6;
      console.log(progressValue);
      progressBar.style.background = `conic-gradient(
      #1a53ff ${coefProgress}deg,
      #cadcff ${coefEmpty}deg
      )`;

      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    if (this.modalScoreAlternativeSubjects == true) {
      this.modalScoreMySubject == false
    } else {
      this.modalScoreMySubject == true
    }
  }

  .progressbar-container {
    height: 55px;
    width: 55px;
    background-color: #fff;
    display: grid;
    place-items: center;
    margin: 0 10px 0 10px;
    position: absolute;
    transform: translate(-50%, -50%);
    right: -4%;
    top: 37%;
  }

  .circular-progress {
    position: relative;
    height: 44px;
    width: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: "";
  }

  .circular-progress:before {
    content: "";
    position: absolute;
    height: 84%;
    width: 84%;
    background-color: #ffffff;
    border-radius: 50%;
  }

  .value-container {
    color: #414141;
    font-size: 1rem;
  }


