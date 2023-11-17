

export const unicodeToChar = (unicode) => {
  if (unicode && unicode.length > 0) {
    const code = unicode[0].substring(2); // remove the "U+"
    return String.fromCodePoint(parseInt(code, 16));
  }
  return '';
};

export const removeHyphensFromCategory = (categories) => {
  return categories.map(category => {
    return category.replace(/-/g, ' ');
  });
}
