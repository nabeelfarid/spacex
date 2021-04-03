export const text_truncate = (
  str: string,
  length?: number,
  ending?: string
) => {
  if (length == null) {
    length = 180;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};
