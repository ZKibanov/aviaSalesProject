export default function getSortedIndexArray(list, property) {
  // временный массив содержит объекты с позицией и значением сортировки
  const mapped = list.map((el, i) => ({ index: i, value: el[property] }));

  mapped.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });

  const result = mapped.map((el) => el.index);

  return result;
}
