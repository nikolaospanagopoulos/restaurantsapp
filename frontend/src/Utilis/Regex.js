//remove words from address that are not nessesary
export const removeWord = (string) => {
  const uselessWordsArray = ["Municipal", "Municipality", "of", "Unit"];

  const expStr = uselessWordsArray.join("|");
  return string
    .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), " ")
    .replace(/\s{2,}/g, " ");
};
