export function limitLength(text = '', limit = 30, includeDots = true) {
  if (!text) return '';

  const words = text.split(' ');
  let finalText = '';
  let breakLoop = false;

  words.forEach((word, i) => {
    let tempText = i === 0 ? '' : `${finalText} `;
    tempText += word;

    if (tempText.length <= limit && !breakLoop) finalText = tempText;
    else breakLoop = true;
  });

  return breakLoop && includeDots ? `${finalText}...` : finalText;
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function humanize(str) {
  return str.replace(/_/g, ' ');
}

export function humanizeAndCap(str) {
  return capitalize(humanize(str));
}