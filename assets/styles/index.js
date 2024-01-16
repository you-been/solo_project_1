window.onload = function () {
  const elm = ".container";
  $(elm).each(function (index) {
    $(this).on("mousewheel DOMMouseScroll", function (e) {
      e.preventDefault();
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;
      var moveTop = $(window).scrollTop();
      var elmSelecter = $(elm).eq(index);
      // 마우스휠을 위에서 아래로
      if (delta < 0) {
        if ($(elmSelecter).next() != undefined) {
          try {
            moveTop = $(elmSelecter).next().offset().top;
          } catch (e) {}
        }
        // 마우스휠을 아래에서 위로
      } else {
        if ($(elmSelecter).prev() != undefined) {
          try {
            moveTop = $(elmSelecter).prev().offset().top;
          } catch (e) {}
        }
      }
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: moveTop + "px",
          },
          {
            duration: 1000,
            complete: function () {},
          }
        );
    });
  });
};

AOS.init();

document.addEventListener("DOMContentLoaded", function () {
  const depaSvg = document.getElementById("depa");
  const container = document.querySelector(".end");
  const footerDepa = document.getElementById("footerDepa");

  depaSvg.classList.add("active");

  if (container && footerDepa) {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }

  function handleScroll() {
    const containerPosition = container.offsetTop;
    const scrollPosition =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;

    console.log("containerPosition:", containerPosition);
    console.log("scrollPosition:", scrollPosition);

    if (
      scrollPosition >= containerPosition &&
      !footerDepa.classList.contains("active")
    ) {
      console.log("Adding 'active' class");
      footerDepa.classList.add("active");
    } else if (
      scrollPosition < containerPosition &&
      footerDepa.classList.contains("active")
    ) {
      console.log("Removing 'active' class");
      footerDepa.classList.remove("active");
    }
  }
});

// sticker

document.querySelectorAll(".sticker-item").forEach((element) => {
  element.addEventListener("mousedown", handleMouseDown);
});

function handleMouseDown(e) {
  e.preventDefault();

  const element = e.target;
  const rect = element.getBoundingClientRect();

  const offsetX = rect.width / 2;
  const offsetY = rect.height / 2;

  element.style.cursor = "grabbing";

  function moveAt(e) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    element.style.left = x + "px";
    element.style.top = y + "px";
  }

  function onMouseMove(e) {
    moveAt(e);
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    element.style.cursor = "grab";

    // 마우스를 떼었을 때, 위치를 고정하기
    element.style.position = "absolute";
    element.style.left = element.style.left;
    element.style.top = element.style.top;
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

const spans = document.querySelectorAll(".wave-text span");
spans.forEach((span, index) => {
  span.style.animationDelay = `${index * 0.5}s`;
});
