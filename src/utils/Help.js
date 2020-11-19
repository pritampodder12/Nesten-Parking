export class Help {
  static formatHourString(str) {
    return `${('0' + str).slice(-2)}.00-${
      str != 23 ? ('0' + (str + 1)).slice(-2) : '00'
    }.00`;
  }
}
