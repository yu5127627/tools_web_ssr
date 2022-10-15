// 获取证件照底色
const getBgColor = (imageArray) => {
  let result = [];
  let str1, str2;
  for (let i = 0; i < imageArray.length; i += 4) {
    str1 = [imageArray[i], imageArray[i + 1], imageArray[i + 2], imageArray[i + 3]].join(',');
    str2 = [imageArray[i + 4], imageArray[i + 5], imageArray[i + 6], imageArray[i + 7]].join(',');
    if (str1 === str2) {
      result = [imageArray[i], imageArray[i + 1], imageArray[i + 2], imageArray[i + 3]];
      break
    }
  }
  return result
}

const colorDistance = function (arrRGB1, arrRGB2) {
    let [r1, g1, b1] = arrRGB1;
    let [r2, g2, b2] = arrRGB2;

    let r = (r1 - r2)/256;
    let g = (g1 - g2)/256;
    let b = (b1 - b2)/256;
    return Math.sqrt(r*r+g*g+b*b);
}

const changeBgColor = (imageArray,colorArray,targetColor) => {
  for (let i = 0; i < imageArray.length; i += 4) {
    const diff = colorDistance([imageArray[i],imageArray[i+1],imageArray[i+2]], colorArray);
    if (diff < 0.1) {
      imageArray[i] = targetColor[0];
      imageArray[i+1] = targetColor[1];
      imageArray[i+2] = targetColor[2];
    }
  }
}

const updateBgColor = (imageData, targetColor) => {
  const bgcolor = getBgColor(imageData.data);
  changeBgColor(imageData.data, bgcolor, targetColor);
  return imageData
}

export default updateBgColor