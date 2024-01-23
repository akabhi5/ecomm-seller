const minutes: number = 15;
const millisecondsInMinute: number = 60000; // 1 minute = 60,000 milliseconds

export const queryStaleTime: number = minutes * millisecondsInMinute; // 15 mins

export function createArrayOfObjects(urlsString: string): { url: string }[] {
  const urls: string[] = urlsString.split(";").filter(Boolean); // Split string by ';' and remove empty strings

  const arrayOfObjects: { url: string }[] = urls.map((url) => ({ url }));

  return arrayOfObjects;
}
