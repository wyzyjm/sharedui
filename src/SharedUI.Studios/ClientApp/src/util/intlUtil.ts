import { FormatDateOptions, FormattedDate, IntlShape } from "react-intl";

export class INTL {
  private static intl: IntlShape = undefined;

  public static setIntl(intl: IntlShape): void {
    INTL.intl = intl;
  }

  static get locale(): string {
    if (INTL.intl) {
      return INTL.intl.locale;
    }

    return undefined;
  }

  public static formatDate(dateSource: Parameters<Intl.DateTimeFormat['format']>[0], options?: FormatDateOptions): string {
    if (!dateSource) {
      return undefined;
    }
    if (INTL.intl) {
      if (dateSource) {
        return INTL.intl.formatDate(dateSource, options);

      }
    } else {
      return null;
    }
  }

  public static formatTime(dateSource: Parameters<Intl.DateTimeFormat['format']>[0], options?: FormatDateOptions): string {
    if (!dateSource) {
      return undefined;
    }
    if (INTL.intl) {
      if (dateSource) {
        return INTL.intl.formatTime(dateSource, options);
      }
    } else {
      return null;
    }
  }

  public static formatMessage(message: any, values?: any): string {
    if (!message) {
      return undefined;
    }

    if (INTL.intl) {
      if (values) {
        return INTL.intl.formatMessage(message, (values = values));
      } else {
        return INTL.intl.formatMessage(message);
      }
    } else {
      return message.defaultMessage;
    }
  }

  public static formatNumber(number: number): string {
    if (INTL.intl) {
      return INTL.intl.formatNumber(number);
    } else {
      return number.toString();
    }
  }
}
