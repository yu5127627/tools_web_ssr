// 延迟函数
export const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

// 防抖函数
export const debounce = (fn, timeout) => {
  try {
    let timmer;
    return () => {
      timmer ? clearTimeout(timmer) : null;
      timmer = setTimeout(fn, timeout);
    };
  } catch (error) {
    console.log(error);
  }
};
