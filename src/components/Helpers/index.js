export const formatDate = (date) => {
  const newDate = date.split('-');
  const formatMounth =
    parseInt(newDate[1][0] === 0 ? newDate[1][1] : newDate[1]) - 1;
  console.log('format data', typeof formatMounth);
  let d = new Date(newDate[0], formatMounth, newDate[2]);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${da} ${mo} ${ye}`;
};

export const formatPrice = (price) => {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
