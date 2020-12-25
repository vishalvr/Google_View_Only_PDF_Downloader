var link = document.createElement('a');
let j = 1;
let elements = document.getElementsByTagName("img");
for (let i in elements) {
    let img = elements[i];
    console.log("add img ", img);
    if (!/^blob:/.test(img.src)) {
        console.log("invalid src");
        continue;
    }
    let can = document.createElement('canvas');
    let con = can.getContext("2d");
    can.width = img.width;
    can.height = img.height;
    con.drawImage(img, 0, 0, img.width, img.height);
    let imgData = can.toDataURL("image/jpeg", 1.0);
    link.href = imgData;
    link.download = j+'.jpeg';
    j = j+1;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
