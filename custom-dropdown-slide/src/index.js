// eslint-disable-next-line no-unused-vars
const customDropdown = (function customDropdown() {
  function __triggerDropdown(element, numberDropdown) {
    const downArrow = document.querySelector(
      `.downArrow[data-v=${numberDropdown}]`,
    );
    const upArrow = document.querySelector(
      `.upArrow[data-v=${numberDropdown}]`,
    );
    if (element.classList.contains("hide")) {
      element.classList.remove("hide");
      downArrow.classList.remove("hide");
      upArrow.classList.add("hide");
    } else {
      element.classList.add("hide");
      downArrow.classList.add("hide");
      upArrow.classList.remove("hide");
    }
  }

  function __clearChosenOption(numberDropdown) {
    const listDropDown = document.querySelectorAll(
      `li[data-v=${numberDropdown}]`,
    );
    listDropDown.forEach((element) => {
      element.classList.remove("chosen-option");
    });
  }

  function handleCLickDropdown(event) {
    const numberDropdown = event.currentTarget.getAttribute("data-v");
    const dropDownList = document.querySelector(`ul[data-v=${numberDropdown}]`);
    __triggerDropdown(dropDownList, numberDropdown);
  }

  function chooseOption(event) {
    const numberDropdown = event.currentTarget.getAttribute("data-v");
    const buttonDropDown = document.querySelector(
      `.dropdown-content[data-v=${numberDropdown}]`,
    );
    const dropDownList = document.querySelector(`ul[data-v=${numberDropdown}]`);

    __clearChosenOption(numberDropdown);
    event.currentTarget.classList.add("chosen-option");
    buttonDropDown.innerText = event.currentTarget.innerText;
    __triggerDropdown(dropDownList, numberDropdown);
  }

  return { handleCLickDropdown, chooseOption };
})();

// eslint-disable-next-line no-unused-vars
const customSlide = (function () {
  let arrayImage = [];
  let currentIndex = 0;
  let timer

  (function __initialScreen() {
    __initialArray()
    __start()
  })()

  function __initialArray(){
    const slideShows = document.querySelectorAll(
        `.slide-item[data-id]`,
    );
    slideShows.forEach((element) => {
      arrayImage.push(element.getAttribute('data-id'))
    });
  }

  function __clearSlideShows() {
    const slideShows = document.querySelectorAll(
        `.slide-item[data-id]`,
    );
    const buttonIndicators = document.querySelectorAll(
        `.button-indicator[data-id]`,
    );
    slideShows.forEach((element) => {
      element.classList.remove("show");
    });
    buttonIndicators.forEach((element) => {
      element.classList.remove("show");
    });
  }

  function __start() {
    timer = setInterval(() => {
      goToNext()
    }, 5000)
  }

  function __restart() {
    clearInterval(timer)
    __start()
  }

  function __changeImage() {
    __clearSlideShows()
    const slideShow = document.querySelector(`.slide-item[data-id='${arrayImage[currentIndex]}']`)
    const buttonIndicator = document.querySelector(`.button-indicator[data-id='${arrayImage[currentIndex]}']`)
    slideShow.classList.add('show')
    buttonIndicator.classList.add('show')
    __restart()
  }
  function handleButtonChangeImage(event) {
    const currentImage = event.currentTarget.getAttribute("data-id");
    currentIndex = arrayImage.indexOf(currentImage)
    __changeImage(currentIndex)
  }

  function goToPrevious() {
    if(currentIndex === 0){
      currentIndex = arrayImage.length - 1
    } else {
      currentIndex = currentIndex - 1
    }
    __changeImage()
  }

  function goToNext() {
    if(currentIndex === arrayImage.length - 1){
      currentIndex = 0
    }else {
      currentIndex = currentIndex + 1
    }
    __changeImage()
  }

  return { handleButtonChangeImage, goToPrevious, goToNext };
})();
