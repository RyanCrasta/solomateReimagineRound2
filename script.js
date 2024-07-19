gsap.to(".lastLowerSection img", {
  x: 45,
  repeat: -1,
  duration: 1,
  yoyo: true,
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  preventInteractionOnTransition: true,
  allowTouchMove: false,
});

// gsap.to(".thirdSection", {
//   scale: 1.5,
//   duration: 2,
//   scrollTrigger: {
//     trigger: ".thirdSection",
//     scrub: 5,
//     markers: true,
//     scroller: "body",
//     start: "bottom -5%",
//   },
// });

function myFunction(x) {
  if (x.matches) {
    // If media query matches
  } else {
    gsap.to(".thirdSection", {
      scale: 1.5,
      duration: 2,
      scrollTrigger: {
        trigger: ".thirdSection",
        scrub: 5,
        markers: true,
        scroller: "body",
        start: "bottom -5%",
      },
    });

    gsap.to(".soleImages img", {
      rotate: "-10deg",
      stagger: 1,

      scrollTrigger: {
        trigger: ".fourthSection",
        scrub: 5,
        markers: true,
        scroller: "body",
        start: "bottom -60%",
      },
    });
  }
}

var x = window.matchMedia("(max-width: 500px)");

myFunction(x);

gsap.to(".thirdSection", {
  x: !window.matchMedia("(max-width: 500px)").matches && "-5%",
  scrollTrigger: {
    trigger: ".fourthSection",
    scrub: 5,
    markers: true,
    scroller: "body",
    start: "bottom -70%",
  },
});

// gsap.to(".soleImages", {
//   right: "-50px",
//   rotate: "-10deg",
//   stagger: 4,

//   scrollTrigger: {
//     trigger: ".fourthSection",
//     scrub: 5,
//     markers: true,
//     scroller: "body",
//     start: "bottom -180%",
//   },
// });

let lastScrollTop = 0;
let timer = null;

function TextAnimate() {
  document.addEventListener(
    "scroll",
    () => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      let st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        gsap.to(".thirdSectionMainCtn h2", {
          transform: "skew(8deg, 0deg)",
        });
      } else if (st < lastScrollTop) {
        gsap.to(".thirdSectionMainCtn h2", {
          transform: "skew(-8deg, 0deg)",
        });
      }

      lastScrollTop = st <= 0 ? 0 : st;

      timer = setTimeout(function () {
        // do something
        gsap.to(".thirdSectionMainCtn h2", {
          transform: "skew(0deg, 0deg)",
        });
      }, 150);
    },
    false
  );
}

TextAnimate();

// code for animation human

const dude = document.querySelector(".dude");
const head = dude.querySelector(".head");
const legs = Array.from(dude.querySelectorAll(".leg"));
const arms = Array.from(dude.querySelectorAll(".arm"));
const legBottoms = Array.from(dude.querySelectorAll(".leg-bottom"));
const armBottoms = Array.from(dude.querySelectorAll(".arm-bottom"));

const walkcontent = document.querySelector(".content");
const arrowEl = document.querySelector(".arrow-animated");

gsap.set(arms, {
  svgOrigin: "180 58",
});
gsap.set(head, {
  svgOrigin: "180 45",
});
gsap.set(armBottoms, {
  svgOrigin: "178 118",
});
gsap.set(legs, {
  svgOrigin: "177 145",
});
gsap.set(legBottoms, {
  svgOrigin: "171 220",
});

const halfBodyTimeline = (leg, arm) => {
  const legBottom = leg.querySelector(".leg-bottom");
  const armBottom = arm.querySelector(".arm-bottom");

  return gsap
    .timeline({
      repeat: -1,
      paused: true,
    })
    .fromTo(
      leg,
      {
        rotation: -25,
      },
      {
        duration: 0.5,
        rotation: 15,
        ease: "sine.inOut",
      },
      0
    )
    .to(
      leg,
      {
        duration: 0.25,
        rotation: -25,
        ease: "sine.in",
      },
      ">"
    )
    .to(
      legBottom,
      {
        duration: 0.25,
        rotation: 15,
        ease: "sine.inOut",
      },
      0.25
    )
    .to(
      legBottom,
      {
        duration: 0.25,
        rotation: 80,
        ease: "sine.in",
      },
      ">"
    )
    .to(
      legBottom,
      {
        duration: 0.25,
        rotation: 0,
        ease: "sine.out",
      },
      ">"
    )
    .fromTo(
      arm,
      {
        rotation: -12,
      },
      {
        duration: 0.5,
        rotation: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      0
    )
    .fromTo(
      armBottom,
      {
        rotation: -15,
      },
      {
        duration: 0.5,
        rotation: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      0
    );
};

const backCycle = halfBodyTimeline(legs[0], arms[1]);
const frontCycle = halfBodyTimeline(legs[1], arms[0]);

const bodyTimeline = gsap
  .timeline({
    paused: true,
  })
  .to(
    dude,
    {
      duration: 0.25,
      y: "-=20",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    },
    0
  )
  .fromTo(
    head,
    {
      rotation: -25,
    },
    {
      duration: 0.25,
      rotation: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    },
    0
  );

const numberOfCycles = Math.ceil((3 * window.innerWidth) / window.innerHeight);
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".page",
      scrub: true,
      start: "0% 0%",
      end: "100% 100%",
    },
  })
  .to(
    arrowEl,
    {
      duration: 0.05,
      opacity: 0,
    },
    0
  )
  // .fromTo(
  //   walkcontent,
  //   {
  //     xPercent: 0,
  //   },
  //   {
  //     xPercent: -50,
  //     easy: "none",
  //   },
  //   0
  // )

  .fromTo(
    bodyTimeline,
    {
      time: 0.7,
    },
    {
      time: 0.75 + numberOfCycles,
    },
    0
  )
  .fromTo(
    backCycle,
    {
      time: 0.7,
    },
    {
      time: 0.75 + numberOfCycles,
    },
    0
  )
  .fromTo(
    frontCycle,
    {
      time: 0.2,
    },
    {
      time: 0.25 + numberOfCycles,
    },
    0
  );
// code for animation human

// gsap.to(".middleSectionCircle", {
//   y: "-100%",
//   // duration: 100,
//   scrollTrigger: {
//     pin: true,
//     body: ".bigCircle",
//     trigger: ".seventhSection",
//     scrub: 5,
//     start: "bottom -450%",
//   },
// });

// drag and scroll

const box = document.getElementById("middleSectionCircleID");

let isDown = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;

box.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - box.offsetLeft;
  startY = e.pageY - box.offsetTop;
  scrollLeft = box.scrollLeft;
  scrollTop = box.scrollTop;
  box.style.cursor = "grabbing";
});

box.addEventListener("mouseleave", () => {
  isDown = false;
  box.style.cursor = "grab";
});

box.addEventListener("mouseup", () => {
  isDown = false;
  box.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - box.offsetLeft;
  const y = e.pageY - box.offsetTop;
  const walkX = (x - startX) * 1; // Change this number to adjust the scroll speed
  const walkY = (y - startY) * 1; // Change this number to adjust the scroll speed
  box.scrollLeft = scrollLeft - walkX;
  box.scrollTop = scrollTop - walkY;
});

// drag and scroll

// cursor effect

function getMousePosition(canvas, e) {
  var rect = canvas.getBoundingClientRect();

  return {
    xx:
      parseInt(e.clientX) -
      parseInt(rect.left) -
      $("#eyeCursorID").height() / 2,
    yy:
      parseInt(e.clientY) - parseInt(rect.top) - $("#eyeCursorID").height() / 2,
  };
}

function cursorEffect(cursorId, pageContent) {
  pageContent.addEventListener("mousemove", function (e) {
    var relativePosition = getMousePosition(pageContent, e);

    gsap.to(cursorId, {
      left: relativePosition.xx,
      top: relativePosition.yy,
      opacity: 1,
    });
  });

  function scaleUp() {
    gsap.to(cursorId, {
      scale: 1,
      opacity: 1,
    });
  }

  function scaleDown() {
    gsap.to(cursorId, {
      scale: 0,
      opacity: 0,
    });
  }

  document.querySelector(".bigCircle").addEventListener("mouseenter", scaleUp);

  document
    .querySelector(".bigCircle")
    .addEventListener("mouseleave", scaleDown);
}

cursorEffect("#eyeCursorID", document.querySelector("#abraKaDabraID"));

// gsap.set(".eyeCursor", { xPercent: -50, yPercent: -50 });

// let xSetter = gsap.quickSetter(".eyeCursor", "x", "px"); //apply it to the #id element's x property and append a "px" unit
// let ySetter = gsap.quickSetter(".eyeCursor", "y", "px"); //apply it to the #id element's x property and append a "px" unit

// document.querySelector("#abraKaDabraID").addEventListener("mousemove", (e) => {
//   xSetter(e.x);
//   ySetter(e.y);
// });

gsap.to(".curveRight", {
  x: "10",
  duration: 1,
  yoyo: true,
  repeat: -1,
});

gsap.to(".curveLeft", {
  x: "-10",
  duration: 1,
  yoyo: true,
  repeat: -1,
});

// footer section animation

function onMouseLeaveHandler() {
  gsap.to(".ourStory, .artists", {
    width: "25%",
    duration: 1,
  });

  gsap.to(".events, .contact", {
    width: "25%",
    duration: 1,
  });
}

document.querySelector(".ourStory").addEventListener("mouseenter", () => {
  gsap.to(
    "#learnMoreCtnContact p, #learnMoreCtnArtist p, #learnMoreCtnEvent p",
    {
      y: "100%",
    }
  );

  gsap.to(".ourStory", {
    width: "70%",
    duration: 1,
  });

  gsap.to(".artists, .events, .contact", {
    width: "10%",
    duration: 1,
  });

  gsap.to("#bigLettersCtnStory", {
    x: "-80%",
    duration: 0.5,
  });

  gsap.to("#learnMoreCtnStory p", {
    y: "0",
    duration: 0.5,
  });
});

document.querySelector(".ourStory").addEventListener("mouseleave", () => {
  onMouseLeaveHandler();

  gsap.to("#bigLettersCtnStory", {
    x: "0%",
    duration: 1,
  });

  gsap.to("#learnMoreCtnStory p", {
    y: "100%",
    duration: 0.5,
  });
});

document.querySelector(".artists").addEventListener("mouseenter", () => {
  gsap.to(
    "#learnMoreCtnStory p, #learnMoreCtnContact p, #learnMoreCtnEvent p",
    {
      y: "100%",
    }
  );

  gsap.to(".artists", {
    width: "70%",
    duration: 1,
  });

  gsap.to(".ourStory, .events, .contact", {
    width: "10%",
    duration: 1,
  });

  gsap.to("#bigLettersCtnArtist", {
    x: "-100%",
    duration: 0.5,
  });

  gsap.to("#learnMoreCtnArtist p", {
    y: "0",
    duration: 0.5,
  });
});

document.querySelector(".artists").addEventListener("mouseleave", () => {
  onMouseLeaveHandler();

  gsap.to("#bigLettersCtnArtist", {
    x: "0%",
    duration: 1,
  });

  gsap.to("#learnMoreCtnArtist p", {
    y: "100%",
    duration: 0.5,
  });
});

document.querySelector(".events").addEventListener("mouseenter", () => {
  gsap.to(
    "#learnMoreCtnStory p, #learnMoreCtnContact p, #learnMoreCtnArtist p",
    {
      y: "100%",
    }
  );

  gsap.to(".events", {
    width: "70%",
    duration: 1,
  });

  gsap.to(".ourStory, .artists, .contact", {
    width: "10%",
    duration: 1,
  });

  gsap.to("#bigLettersCtnEvent", {
    x: "-100%",
    duration: 0.5,
  });

  gsap.to("#learnMoreCtnEvent p", {
    y: "0",
    duration: 0.5,
  });
});

document.querySelector(".events").addEventListener("mouseleave", () => {
  onMouseLeaveHandler();

  gsap.to("#bigLettersCtnEvent", {
    x: "0%",
    duration: 1,
  });

  gsap.to("#learnMoreCtnEvent p", {
    y: "100%",
    duration: 0.5,
  });
});

document.querySelector(".contact").addEventListener("mouseenter", () => {
  gsap.to("#learnMoreCtnStory p, #learnMoreCtnArtist p, #learnMoreCtnEvent p", {
    y: "100%",
  });

  gsap.to(".contact", {
    width: "70%",
    duration: 1,
  });

  gsap.to(".ourStory, .artists, .events", {
    width: "10%",
    duration: 1,
  });

  gsap.to("#bigLettersCtnContact", {
    x: "-100%",
    duration: 0.5,
  });

  gsap.to("#learnMoreCtnContact p", {
    y: "0",

    duration: 0.5,
  });
});

document.querySelector(".contact").addEventListener("mouseleave", () => {
  onMouseLeaveHandler();

  gsap.to("#bigLettersCtnContact", {
    x: "0%",
    duration: 1,
  });

  gsap.to("#learnMoreCtnContact p", {
    y: "100%",
    duration: 0.5,
  });
});

document
  .querySelector(".btnCtnTwo button")
  .addEventListener("mouseenter", () => {
    document.querySelector(".shinnyStarOne").style.opacity = "1";
    document.querySelector(".shinnyStarTwo").style.opacity = "1";
  });

document
  .querySelector(".btnCtnTwo button")
  .addEventListener("mouseleave", () => {
    document.querySelector(".shinnyStarOne").style.opacity = "0";
    document.querySelector(".shinnyStarTwo").style.opacity = "0";
  });

// type write effect
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrasesTag = ["cartoon", "sports", "jewels"];
const personPhases = ["kids", "dad", "moms"];

const mainPhases = [
  {
    jibbitz: "cartoon",
    person: "kids",
  },
  {
    jibbitz: "sports",
    person: "dads",
  },
  {
    jibbitz: "jewels",
    person: "moms",
  },
];

const elTag = document.getElementById("typewriter");
const elPerson = document.getElementById("typewriterPerson");

let sleepTime = 100;

let curPhraseIndex = 0;

const writeLoop = async (phrases) => {
  while (true) {
    let curWord = phrases[curPhraseIndex].person;

    for (let i = 0; i < curWord.length; i++) {
      elPerson.innerText = curWord.substring(0, i + 1);
      await sleep(sleepTime);
    }

    let curWordTag = phrases[curPhraseIndex].jibbitz;

    for (let i = 0; i < curWordTag.length; i++) {
      elTag.innerText = curWordTag.substring(0, i + 1);
      await sleep(sleepTime);
    }

    await sleep(sleepTime * 10);

    for (let i = curWord.length; i > 0; i--) {
      elPerson.innerText = curWord.substring(0, i - 1);
      await sleep(sleepTime);
    }

    // await sleep(sleepTime * 10);

    for (let i = curWordTag.length; i > 0; i--) {
      elTag.innerText = curWordTag.substring(0, i - 1);
      await sleep(sleepTime);
    }

    await sleep(sleepTime * 5);

    if (curPhraseIndex === phrases.length - 1) {
      curPhraseIndex = 0;
    } else {
      curPhraseIndex++;
    }
  }
};

writeLoop(mainPhases);

// writeLoop(elPerson, personPhases);

const elTagMobile = document.getElementById("typewriterMobile");
const elPersonMobile = document.getElementById("typewriterPersonMobile");

let curPhraseIndexMobile = 0;

const writeLoopMobile = async (phrases) => {
  while (true) {
    let curWord = phrases[curPhraseIndexMobile].person;

    for (let i = 0; i < curWord.length; i++) {
      elPersonMobile.innerText = curWord.substring(0, i + 1);
      await sleep(sleepTime);
    }

    let curWordTag = phrases[curPhraseIndexMobile].jibbitz;

    for (let i = 0; i < curWordTag.length; i++) {
      elTagMobile.innerText = curWordTag.substring(0, i + 1);
      await sleep(sleepTime);
    }

    await sleep(sleepTime * 10);

    for (let i = curWord.length; i > 0; i--) {
      elPersonMobile.innerText = curWord.substring(0, i - 1);
      await sleep(sleepTime);
    }

    // await sleep(sleepTime * 10);

    for (let i = curWordTag.length; i > 0; i--) {
      elTagMobile.innerText = curWordTag.substring(0, i - 1);
      await sleep(sleepTime);
    }

    await sleep(sleepTime * 5);

    if (curPhraseIndexMobile === phrases.length - 1) {
      curPhraseIndexMobile = 0;
    } else {
      curPhraseIndexMobile++;
    }
  }
};

writeLoopMobile(mainPhases);

gsap.to(".fullImgProductOne img, .fullImgProductTwo img", {
  yPercent: "-50",
  xPercent: "-50",
});

gsap.to(".fullImgProductOne img", {
  rotate: "-65deg",

  scrollTrigger: {
    trigger: "#elevenSectionID",
    scrub: 5,
    start: !window.matchMedia("(max-width: 500px)").matches && "bottom -530%",
    scroller: "body",
  },
});

gsap.to(".fullImgProductTwo img", {
  rotate: "65deg",

  scrollTrigger: {
    trigger: "#elevenSectionID",
    scrub: 5,
    start: !window.matchMedia("(max-width: 500px)").matches && "bottom -600%",
    scroller: "body",
  },
});

gsap.to(".tenSection", {
  backgroundColor: "rgb(120, 51, 95)",
  scrollTrigger: {
    trigger: "#elevenSectionID",
    scrub: 5,
    start: !window.matchMedia("(max-width: 500px)").matches && "bottom -530%",
    scroller: "body",
  },
});

gsap.to(".fullImgProductOne p", {
  color: "rgb(250, 215, 58)",
  scrollTrigger: {
    trigger: "#elevenSectionID",
    scrub: 5,
    start: "bottom -530%",
    scroller: "body",
  },
});

gsap.to(".elevenSection", {
  backgroundColor: "#316550",
  scrollTrigger: {
    trigger: "#elevenSectionID",
    scrub: 5,
    start: !window.matchMedia("(max-width: 500px)").matches && "bottom -600%",
    scroller: "body",
  },
});

gsap.from(".dummyNavSection", {
  width: 0,
  duration: 1,
});
// homePageAnimateMobile
gsap.from(".homePageSwiperAnimate, .homePageAnimateMobile", {
  width: 0,
  duration: 2,
  stagger: 0.5,
  delay: 1,
});

setTimeout(() => {
  document.querySelector(".firstSection").classList.add("swiper");
  document.querySelector(".lastSectionSwiper").classList.add("swiper");
}, 4000);

gsap.from(".homePageAnimate", {
  width: "0",
  duration: 2,
  stagger: 0.5,
  delay: 2,
});

gsap.to(".navbtn", {
  y: "0",
  delay: 5,
  stagger: 0.2,
});

gsap.to(".reelVideo", {
  opacity: 1,
  delay: 4,
});

gsap.to(".mainTextCtn div", {
  delay: 4,
  y: "0",
  stagger: 0.2,
  opacity: 1,
});

gsap.to(".swiper-wrapper-one, .swiper-wrapper-two", {
  opacity: 1,
  duration: 1,
  ease: "power1.in",
  delay: 4,
});

gsap.to(".lastLowerSection img", {
  delay: 5,
  opacity: 1,
});

let ss = 0;

let lastScrollTopOne = 0;

const checkScrollSpeed = (function (settings) {
  settings = settings || {};

  let lastPos,
    newPos,
    timer,
    delta,
    delay = settings.delay || 50;

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function () {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

function pageSevenIntersectFn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", (e) => {
          let st = window.pageYOffset || document.documentElement.scrollTop;
          lastScrollTopOne = st <= 0 ? 0 : st;
        });
      }
    });
  });

  observer.observe(document.querySelector("#twelveSectionID"));
}

// pageSevenIntersectFn();

// second swiper
var swiperTwo = new Swiper(".mySwiperTwo", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
});

document.querySelector(".smallProductOne").addEventListener("click", () => {
  document.querySelector(".smallProductOne").style.borderBottom =
    "4px solid #000";

  document.querySelector(".mediumProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductOne").style.borderBottom = "8px solid #000";
});

document.querySelector(".mediumProductOne").addEventListener("click", () => {
  document.querySelector(".mediumProductOne").style.borderBottom =
    "4px solid #000";

  document.querySelector(".smallProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductOne").style.borderBottom = "8px solid #000";
});

document.querySelector(".largeProductOne").addEventListener("click", () => {
  document.querySelector(".largeProductOne").style.borderBottom =
    "4px solid #000";

  document.querySelector(".smallProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".mediumProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductOne").style.borderBottom = "8px solid #000";
});

document.querySelector(".xLProductOne").addEventListener("click", () => {
  document.querySelector(".xLProductOne").style.borderBottom = "4px solid #000";

  document.querySelector(".smallProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".mediumProductOne").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductOne").style.borderBottom =
    "8px solid #000";
});

// PRODUCT TWO

document.querySelector(".smallProductTwo").addEventListener("click", () => {
  document.querySelector(".smallProductTwo").style.borderBottom =
    "4px solid #000";

  document.querySelector(".mediumProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductTwo").style.borderBottom = "8px solid #000";
});

document.querySelector(".mediumProductTwo").addEventListener("click", () => {
  document.querySelector(".mediumProductTwo").style.borderBottom =
    "4px solid #000";

  document.querySelector(".smallProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductTwo").style.borderBottom = "8px solid #000";
});

document.querySelector(".largeProductTwo").addEventListener("click", () => {
  document.querySelector(".largeProductTwo").style.borderBottom =
    "4px solid #000";

  document.querySelector(".smallProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".mediumProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductTwo").style.borderBottom = "8px solid #000";
});

document.querySelector(".xLProductTwo").addEventListener("click", () => {
  document.querySelector(".xLProductTwo").style.borderBottom = "4px solid #000";

  document.querySelector(".smallProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".mediumProductTwo").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductTwo").style.borderBottom =
    "8px solid #000";
});

// PRODUCT THREE
document.querySelector(".smallProductThree").addEventListener("click", () => {
  document.querySelector(".smallProductThree").style.borderBottom =
    "4px solid #000";

  document.querySelector(".mediumProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductThree").style.borderBottom =
    "8px solid #000";
});

document.querySelector(".mediumProductThree").addEventListener("click", () => {
  document.querySelector(".mediumProductThree").style.borderBottom =
    "4px solid #000";

  document.querySelector(".smallProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductThree").style.borderBottom =
    "8px solid #000";
});

document.querySelector(".largeProductThree").addEventListener("click", () => {
  document.querySelector(".largeProductThree").style.borderBottom =
    "4px solid #000";

  document.querySelector(".smallProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".mediumProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".xLProductThree").style.borderBottom =
    "8px solid #000";
});

document.querySelector(".xLProductThree").addEventListener("click", () => {
  document.querySelector(".xLProductThree").style.borderBottom =
    "4px solid #000";

  document.querySelector(".smallProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".mediumProductThree").style.borderBottom =
    "8px solid #000";
  document.querySelector(".largeProductThree").style.borderBottom =
    "8px solid #000";
});

let productCounterOne = 1;

document.querySelector(".incrementOneProduct").addEventListener("click", () => {
  productCounterOne += 1;
  document.querySelector(".oneProductQty").innerHTML = productCounterOne;
});

document.querySelector(".decrementOneProduct").addEventListener("click", () => {
  if (productCounterOne > 1) {
    productCounterOne -= 1;
    document.querySelector(".oneProductQty").innerHTML = productCounterOne;
  }
});

let productCounterTwo = 1;

document.querySelector(".incrementTwoProduct").addEventListener("click", () => {
  productCounterTwo += 1;
  document.querySelector(".twoProductQty").innerHTML = productCounterTwo;
});

document.querySelector(".decrementTwoProduct").addEventListener("click", () => {
  if (productCounterTwo > 1) {
    productCounterTwo -= 1;
    document.querySelector(".twoProductQty").innerHTML = productCounterTwo;
  }
});

let productCounterThree = 1;

document
  .querySelector(".incrementThreeProduct")
  .addEventListener("click", () => {
    productCounterThree += 1;
    document.querySelector(".threeProductQty").innerHTML = productCounterThree;
  });

document
  .querySelector(".decrementThreeProduct")
  .addEventListener("click", () => {
    if (productCounterThree > 1) {
      productCounterThree -= 1;
      document.querySelector(".threeProductQty").innerHTML =
        productCounterThree;
    }
  });

if (!window.matchMedia("(max-width: 500px)").matches) {
  Draggable.create(".items", {
    bounds: ".realShoeImages",
    //allowNativeTouchScrolling:false,
    type: "x",
  });
}

document.querySelector(".shoeCursor").addEventListener("mousedown", (e) => {
  document.querySelector(".shoeCursor").style.transform = "scaleX(2)";
  document.querySelector(".shoeCursor h2").style.transform = "scaleX(0.5)";
});

document.querySelector(".shoeCursor").addEventListener("mouseup", () => {
  document.querySelector(".shoeCursor").style.transform = "scaleX(1)";
  document.querySelector(".shoeCursor h2").style.transform = "scaleX(1)";
});

function getMouseShoePosition(canvas, e) {
  var rect = canvas.getBoundingClientRect();

  return {
    xx:
      parseInt(e.clientX) -
      parseInt(rect.left) -
      $("#shoeCursorID").height() / 2,
    yy:
      parseInt(e.clientY) -
      parseInt(rect.top) -
      $("#shoeCursorID").height() / 2,
  };
}

function cursorEffectShoe(cursorId, pageContent) {
  pageContent.addEventListener("mousemove", function (e) {
    var relativePosition = getMouseShoePosition(pageContent, e);

    gsap.to(cursorId, {
      left: relativePosition.xx,
      top: relativePosition.yy,
      opacity: 1,
    });
  });

  function scaleUp() {
    gsap.to(cursorId, {
      scale: 1,
      opacity: 1,
    });
  }

  function scaleDown() {
    gsap.to(cursorId, {
      scale: 0,
      opacity: 0,
    });
  }

  document
    .querySelector(".realShoeImages")
    .addEventListener("mouseenter", scaleUp);

  document
    .querySelector(".realShoeImages")
    .addEventListener("mouseleave", scaleDown);
}

cursorEffectShoe("#shoeCursorID", document.querySelector(".items"));

gsap.to(".shoeNameCtn p span", {
  y: "0%",
  stagger: "0.1",
  scrollTrigger: {
    trigger: "#lemkusSection",
    scroller: "body",
    start: !window.matchMedia("(max-width: 500px)").matches && "bottom -400%",
  },
});

// document.querySelector("#myBody").style.overflowY = "scroll !important";
// document.querySelector("html").style.overflowY = "scroll !important";

// FOR MOBILE MENU
document.querySelector(".btnCtnTwoMenu div").addEventListener("click", () => {
  document.querySelector(".btnCtnTwoMenu div").style.right = "0";
  document.querySelector(".btnCtnTwoMenu div").style.bottom = "0";
  document.querySelector(".btnCtnTwoMenu div").style.backgroundColor = "#fff";

  if (document.querySelector(".menuText").innerHTML === "Menu") {
    document.querySelector(".navigation").style.backgroundColor = "#ffdd01";

    document.querySelector(".menuText").innerHTML = "Close";

    document.querySelector(".overlayNavigation").style.zIndex = "20";
    document.querySelector(".overlayNavigation").style.opacity = "1";

    document
      .querySelector("html")
      .style.setProperty("overflow-y", "hidden", "important");
    document
      .querySelector("#myBody")
      .style.setProperty("overflow-y", "hidden", "important");
  } else {
    document.querySelector(".navigation").style.backgroundColor = "transparent";

    document.querySelector(".menuText").innerHTML = "Menu";

    document.querySelector(".btnCtnTwoMenu div").style.right = "3px";
    document.querySelector(".btnCtnTwoMenu div").style.bottom = "3px";
    document.querySelector(".btnCtnTwoMenu div").style.backgroundColor =
      "#ffdd01";

    document.querySelector(".overlayNavigation").style.zIndex = "-1";
    document.querySelector(".overlayNavigation").style.opacity = "0";

    // document.querySelector("html").style.overflowY = "scroll !important";
    // document.querySelector("#myBody").style.overflowY = "scroll !important";

    document
      .querySelector("html")
      .style.setProperty("overflow-y", "scroll", "important");
    document
      .querySelector("#myBody")
      .style.setProperty("overflow-y", "scroll", "important");
  }
});

document.querySelector(".btnTwoCtnOverlay").addEventListener("click", () => {
  document.querySelector(".btnOneCtnOverlay div").style.right = "3px";
  document.querySelector(".btnOneCtnOverlay div").style.bottom = "3px";
  document.querySelector(".btnOneCtnOverlay div").style.backgroundColor =
    "#ffdd01";

  document.querySelector(".btnTwoCtnOverlay div").style.right = "0";
  document.querySelector(".btnTwoCtnOverlay div").style.bottom = "0";
  document.querySelector(".btnTwoCtnOverlay div").style.backgroundColor =
    "#8191e6";

  gsap.to(".comfyNavText", {
    x: "-100%",
  });

  gsap.to(".freshNavText", {
    x: "-100%",
  });
});

document.querySelector(".btnOneCtnOverlay").addEventListener("click", () => {
  document.querySelector(".btnTwoCtnOverlay div").style.right = "3px";
  document.querySelector(".btnTwoCtnOverlay div").style.bottom = "3px";
  document.querySelector(".btnTwoCtnOverlay div").style.backgroundColor =
    "#ffdd01";

  document.querySelector(".btnOneCtnOverlay div").style.right = "0";
  document.querySelector(".btnOneCtnOverlay div").style.bottom = "0";
  document.querySelector(".btnOneCtnOverlay div").style.backgroundColor =
    "#fa4238";

  gsap.to(".comfyNavText", {
    x: "0%",
  });

  gsap.to(".freshNavText", {
    x: "0%",
  });
});

// ORIENTATION

let portrait = window.matchMedia("(orientation: portrait)");

portrait.addEventListener("change", function (e) {
  window.location.reload();

  if (e.matches) {
    // Portrait mode

    if (window.matchMedia("(pointer: coarse)").matches) {
      if (!/mobile/i.test(navigator.userAgent)) {
        if (window.matchMedia("(orientation: portrait)").matches) {
          document.querySelector(".portraitTablet").style.opacity = 1;

          document
            .querySelector("html")
            .style.setProperty("overflow-y", "hidden", "important");
          document
            .querySelector("#myBody")
            .style.setProperty("overflow-y", "hidden", "important");
          document.querySelector(".portraitTablet").style.zIndex = 50;
        }
      } else if (/mobile/i.test(navigator.userAgent)) {
        document.querySelector(".landscapeMobile").style.opacity = 0;

        document
          .querySelector("html")
          .style.setProperty("overflow-y", "scroll", "important");
        document
          .querySelector("#myBody")
          .style.setProperty("overflow-y", "scroll", "important");

        document.querySelector(".landscapeMobile").style.zIndex = -50;
      }
    }
  } else {
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (!/mobile/i.test(navigator.userAgent)) {
        document.querySelector(".portraitTablet").style.opacity = 0;
        document.querySelector(".portraitTablet").style.zIndex = -20;

        document
          .querySelector("html")
          .style.setProperty("overflow-y", "scroll", "important");
        document
          .querySelector("#myBody")
          .style.setProperty("overflow-y", "scroll", "important");
      } else if (/mobile/i.test(navigator.userAgent)) {
        document.querySelector(".landscapeMobile").style.opacity = 1;

        document
          .querySelector("html")
          .style.setProperty("overflow-y", "hidden", "important");
        document
          .querySelector("#myBody")
          .style.setProperty("overflow-y", "hidden", "important");

        document.querySelector(".landscapeMobile").style.zIndex = 50;
      }
    }
  }
});

const userAgent = navigator.userAgent.toLowerCase();
var isIPad = /Macintosh/.test(navigator.userAgent) && "ontouchend" in document;
const isTablet =
  /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
    userAgent
  );

if (window.matchMedia("(pointer: coarse)").matches) {
  if (!/mobile/i.test(navigator.userAgent) || isIPad || isTablet) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      document.querySelector(".portraitTablet").style.opacity = 1;

      document
        .querySelector("html")
        .style.setProperty("overflow-y", "hidden", "important");
      document
        .querySelector("#myBody")
        .style.setProperty("overflow-y", "hidden", "important");

      document.querySelector(".portraitTablet").style.zIndex = 50;
    }
  } else if (/mobile/i.test(navigator.userAgent)) {
    if (!window.matchMedia("(orientation: portrait)").matches) {
      document.querySelector(".landscapeMobile").style.opacity = 1;

      document
        .querySelector("html")
        .style.setProperty("overflow-y", "hidden", "important");
      document
        .querySelector("#myBody")
        .style.setProperty("overflow-y", "hidden", "important");

      document.querySelector(".landscapeMobile").style.zIndex = 50;
    }
  }
}
