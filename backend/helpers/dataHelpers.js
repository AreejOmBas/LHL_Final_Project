/* 
 Misc. Helper functions 
*/

// functions to get the previous month from today
const previousMonth =() => {
  const current = new Date();
  current.setMonth(current.getMonth()-1);
  const previousMonth = current.toLocaleString('default', { month: 'long' });
  const previousYear =current.getFullYear(); 
  const date = previousMonth + ' ' +previousYear;
  return {date};
};


module.exports = {
  previousMonth
}