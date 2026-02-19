function MemoizedAdd() {
  //
  let cache = {};

  return function (n) {
    if (cache[n]) return cache[n];

    cache[n] = n + n;
    return cache[n];
  };
}

const add = MemoizedAdd()
console.log(add(5))
console.log(add(6))
console.log(add(6))// the value will be from cache
