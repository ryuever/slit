/**
 *
 * @param items items to process
 * @param getOptions return an array, which is used to constraint the order of on `${index}th` loop
 * @param getOptionsCount limit the recursive count
 * @param getOption get value from item, which is used for comparison..
 *
 */

export interface sortWithOptionsProps<T, K> {
  items: Array<T>;
  getOptions: (index: number) => Array<K>;
  getOption: (item: T, index: number) => K;
  getOptionsCount?: () => number;
}

export interface sortWithOptionsInternalProps<T> {
  items: Array<T>;
  index: number;
}

const sortWithOptions = <T extends object = object, K extends any = any>({
  items,
  getOptions,
  getOption,
  getOptionsCount,
}: sortWithOptionsProps<T, K>) => {
  const sorter = ({ items, index }: sortWithOptionsInternalProps<T>) => {
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
    let shouldRecursiveCheck = false;

    if (typeof getOptionsCount === 'function') {
      const count = getOptionsCount();
      if (nextIndex < count) shouldRecursiveCheck = true;
    } else {
      try {
        if (getOptions(nextIndex)) shouldRecursiveCheck = true;
      } catch (err) {
        shouldRecursiveCheck = false;
      }
    }

    if (shouldRecursiveCheck) {
      result.forEach(group => {
        next.push(
          sorter({
            items: group,
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
    index: 0,
  });
};

export default sortWithOptions;
