import { IDropdownOption } from "@fluentui/react";
import { isString } from "lodash";

const compare = (left: any, right: any, locale?: string): number => {
  let leftLessThanRight;
  if (isString(left) && isString(right)) {
    const result = left.localeCompare(right, locale, { numeric: true });
    leftLessThanRight = result == 0 ? left.length > right.length : result < 0;
  } else {
    leftLessThanRight = left < right;
  }
  return leftLessThanRight ? -1 : 1;
};

const sortOptions = (l: IDropdownOption, r: IDropdownOption): number => {
  return l.text.toLowerCase() < r.text.toLowerCase() ? -1 : 1;
};

const scriptNamesCompare = (l: string, r: string): number => {
  if (l.length > r.length) {
    return -1;
  }
  if (l.length == r.length) {
    return l > r ? -1 : 1;
  }
  return 1;
};

export const comparatorUtil = { compare, sortOptions, scriptNamesCompare };
