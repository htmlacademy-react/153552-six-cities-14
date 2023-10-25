export const getRating = (rating: number) => Math.round(rating * 100 / 5);

export const getMonthYearDate = (date: string) => new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

export const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
