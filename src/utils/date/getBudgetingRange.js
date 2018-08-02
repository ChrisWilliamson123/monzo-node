const today = require('./today');

module.exports = () => {
  const t = today();
  const yesterdayAt4 = new Date(t.getFullYear(), t.getMonth(), t.getDate() -1, 5)
  const todayAt4 = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 5)
  return { since: yesterdayAt4, before: todayAt4 };
}