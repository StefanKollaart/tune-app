export const getAverageColor = (filePath) => {
  const imgEl = document.createElement('img');
  imgEl.src = filePath;

  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
};

export const getContrastColor = (rgb) => {
  // Extract the RGB values
  const { r, g, b } = rgb;

  // Calculate the luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Determine the contrast color
  const textContrast = luminance > 0.5 ? 'black' : 'white';

  return textContrast;
};

export const getDominantColors = (filePath) => {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement('img');
    imgEl.src = filePath;
    imgEl.crossOrigin = 'Anonymous';

    imgEl.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imgEl.width;
      canvas.height = imgEl.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colorFrequencies = {};

      for (let i = 0; i < imageData.length; i += 4) {
        const color = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]}`;
        colorFrequencies[color] = (colorFrequencies[color] || 0) + 1;
      }

      const dominantColors = Object.entries(colorFrequencies)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([color]) => color);

      resolve(dominantColors);
    };

    imgEl.onerror = function (error) {
      reject(error);
    };
  });
};