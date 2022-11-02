export const debounce = (fun: Function, delay: number) => {
    let timer: any;
    return (...args: any) => {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => fun.apply(context, args), delay)
    }
  };

export interface ISearchItem {
    [key: string]: any;
  }