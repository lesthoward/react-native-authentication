export const capitalize = (text) => {
  if (!text) return '';
  const splitText = text.split(' ');
  const capitalizedText = splitText.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return capitalizedText;
};
