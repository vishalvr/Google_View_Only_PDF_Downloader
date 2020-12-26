let allElements = document.querySelectorAll("*");
let chosenElement;
let heightOfScrollableElement = 0;

function generatePDF() {
  var link = document.createElement("a");
  let j = 1;
  let elements = document.getElementsByTagName("img");
  for (let i in elements) {
    let img = elements[i];
    console.log("add img ", img);
    if (!/^blob:/.test(img.src)) {
      console.log("invalid src");
      continue;
    }
    let can = document.createElement("canvas");
    let con = can.getContext("2d");
    can.width = img.width;
    can.height = img.height;
    con.drawImage(img, 0, 0, img.width, img.height);
    let imgData = can.toDataURL("image/jpeg", 1.0);
    link.href = imgData;
    link.download = j + ".jpeg";
    j = j + 1;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

for (let i = 0; i < allElements.length; i++) {
  if (allElements[i].scrollHeight >= allElements[i].clientHeight) {
    if (heightOfScrollableElement < allElements[i].scrollHeight) {
      heightOfScrollableElement = allElements[i].scrollHeight;
      chosenElement = allElements[i];
    }
  }
}

if (chosenElement.scrollHeight > chosenElement.clientHeight) {
  console.log("Auto Scroll");

  let scrollDistance = Math.round(chosenElement.clientHeight / 4);
  let loopCounter = 0;
  function myLoop(remainingHeightToScroll, scrollToLocation) {
    loopCounter = loopCounter + 1;
    console.log(loopCounter);

    setTimeout(function () {
      if (remainingHeightToScroll === 0) {
        scrollToLocation = scrollDistance;
        chosenElement.scrollTo(0, scrollToLocation);
        remainingHeightToScroll = chosenElement.scrollHeight - scrollDistance;
      } else {
        scrollToLocation = scrollToLocation + scrollDistance;
        chosenElement.scrollTo(0, scrollToLocation);
        remainingHeightToScroll = remainingHeightToScroll - scrollDistance;
      }

      if (remainingHeightToScroll >= chosenElement.clientHeight) {
        myLoop(remainingHeightToScroll, scrollToLocation);
      } else {
        setTimeout(function () {
          generatePDF();
        }, 1500);
      }
    }, 500);
  }
  myLoop(0, 0);
} else {
  console.log("No Scroll");
  setTimeout(function () {
    generatePDF();
  }, 1500);
}
