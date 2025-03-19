import dayjs from "dayjs";

export function spaceOutPascalCase(text: string) {
  let output = text[0];

  for (const char of text.substring(1).split("")) {
    output += char.toLowerCase() === char ? char : ` ${char}`;
  }

  return output;
}

export function formatNumber(
  num: number | string,
  config?: Partial<{
    minFractions: number;
    maxFractions: number;
    compactNotation?: boolean;
  }>,
) {
  const { minFractions, maxFractions, compactNotation } = {
    minFractions: 2,
    maxFractions: 2,
    compactNotation: false,
    ...config,
  };

  return new Intl.NumberFormat("en-US", {
    // style: 'cur',
    // currency,
    minimumFractionDigits: minFractions,
    maximumFractionDigits: maxFractions,
    notation: compactNotation ? "compact" : "standard",
  }).format(typeof num === "number" ? num : parseFloat(num));
}

export function formatToDate(
  date: string | Date | number,
  params?: { utc?: boolean; shortTime?: boolean },
) {
  const format = params?.shortTime
    ? "DD-MM-YYYY h:mm A"
    : "DD-MM-YYYY HH:mm:ss";

  // if (params?.utc) {
  //   return dayjs.utc(date).format(format);
  // }

  return dayjs(date).format(format);
}
