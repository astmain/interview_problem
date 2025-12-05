function 函数延迟(time) {
  let 时间;
  if (!time) {
    时间 = 1 * 1000;
  } else {
    时间 = time;

  };
  // console.log('111:---时间', 时间)
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove('111');
      // reslove("延迟秒");
    }, 时间);
  })
};