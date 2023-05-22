import moment from 'moment';

export const calculateDaysAgo = date => {
  const currentDate = moment();
  const targetDate = moment(date);
  const daysAgo = currentDate.diff(targetDate, 'days');
  return daysAgo;
};

export function isTitleAvailable(
  elements: Array<Item>,
  title: string
): boolean {
  if (!Array.isArray(elements)) {
    return false;
  }
  return elements.some(element => element.title === title);
}
