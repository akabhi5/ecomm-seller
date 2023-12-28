const minutes: number = 15;
const millisecondsInMinute: number = 60000; // 1 minute = 60,000 milliseconds

export const queryStaleTime: number = minutes * millisecondsInMinute; // 15 mins
