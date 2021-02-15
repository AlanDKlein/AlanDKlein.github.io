//Slider Components

const slider = function () {
  //Putting all of this code into one function so we don't contaminate the global namespace.

  const slides = document.querySelectorAll(".slide")
  const btnLeft = document.querySelector(".slider__btn--left")
  const btnRight = document.querySelector(".slider__btn--right")
  const dotContainer = document.querySelector(".dots")

  let curSlide = 0
  const maxSlide = slides.length
  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    })
  }

  //Change color of the dots to indicate the active openModal
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"))
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active")
  } //This replaces the line below.  When we call goToSlide with a 0 it is the same as just i.

  //
  // 0%, 100%, 200%, 300% <--Putting slides in this order to start
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`))

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    )
  }

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0
    } else {
      curSlide++
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1
    } else {
      curSlide--
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = function () {
    createDots()
    goToSlide(0)
    activateDot(0)
  }

  init()

  // Event handlers

  btnRight.addEventListener("click", () => {
    nextSlide()
    btnRight.blur()
  })

  btnLeft.addEventListener("click", () => {
    prevSlide()
    btnLeft.blur()
  })

  //Using left and right arrow keys on the slider
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide()
    if (e.key === "ArrowRight") nextSlide()
  })

  //Use Event Delegation for the dots event listener
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide //This line is the same as the one below.  Below is 'destructuring'
      // const { slide } = e.target.dataset;
      goToSlide(slide)
      activateDot(slide)
      curSlide = +slide
      e.target.blur()
    }
  })
}

slider() // could pass in an object containing options for the slider to work with.  Very common technique not doing it here.
////////////////////////
