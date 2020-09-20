/**
 *
 * @param items 需要进行处理的items
 * @param getOptions 进行排序时所需要参照的顺序规则
 * @param getOption
 *
 * 排序的原则采用分而治之的方式，首先将items进行当前depth下的group；然后
 * 对子group进行sort，一直到depth为skuOptions的length
 */

export interface sortWithOptionsProps<T, K> {
  items: Array<T>;
  getOptions: (index: number) => Array<K>;
  getOption: (item: object, index: number) => K;
}

export const sortWithOptions = <
  T extends object = object,
  K extends any = any
>({
  items,
  getOptions,
  getOption,
}: sortWithOptionsProps<T, K>) => {
  const sorter = ({
    items,
    getOptions,
    getOption,
    index,
  }: sortWithOptionsProps<T, K> & {
    index: number;
  }) => {
    const options = getOptions(index);
    items.sort((a, b) => {
      const aIndex = options.indexOf(getOption(a, index));
      const bIndex = options.indexOf(getOption(b, index));
      return aIndex - bIndex;
    });

    const result: Array<Array<T>> = [];
    let parts: Array<T> = [];

    for (let i = 0; i < items.length; i++) {
      const current = items[i];
      const last = parts[parts.length - 1];

      if (!last) {
        parts.push(current);
      } else if (getOption(current, index) === getOption(last, index)) {
        parts.push(current);
      } else {
        result.push(parts);
        parts = [current];
      }
    }

    if (parts.length) {
      result.push(parts);
      parts = [];
    }

    const nextIndex = index + 1;
    let next: Array<Array<T>> = [];
    if (getOptions(nextIndex)) {
      result.forEach(group => {
        next.push(
          sorter({
            items: group,
            getOption,
            getOptions,
            index: nextIndex,
          })
        );
      });
    } else {
      next = result;
    }

    return next.reduce((values, cur) => {
      return values.concat(cur);
    }, []);
  };

  return sorter({
    items,
    getOption,
    getOptions,
    index: 0,
  });
};
