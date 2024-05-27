const express = require('express');
const axios = require('axios');
const app = express();

function hexToRgb(hex) {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToInt(rgb) {
  return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
}

function rgbToHsl(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

exports.name = "/color";
exports.index = async (req, res) => {
  try {
    const response = await axios.get('https://www.colr.org/json/color/random');
    const colorData = response.data.colors[0];

    const name = colorData.tags[0].name;
    const hex = colorData.hex;

    const rgb = hexToRgb(hex);
    const int = rgbToInt(rgb);
    const hsl = rgbToHsl(rgb);

    res.json({ name, rgb, hex, int, hsl });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
