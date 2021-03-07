export default function getSortedIndexArray(list,property){

// временный массив содержит объекты с позицией и значением сортировки
var mapped = list.map(function(el, i) {
return { index: i, value: el[property] };
});

mapped.sort(function(a, b) {
  if (a.value > b.value) {
    return 1; }
  if (a.value < b.value) {
    return -1; }
  return 0;
});

var result = mapped.map(function(el) {
  return el.index;
});

return result;
};