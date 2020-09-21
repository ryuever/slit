import { sortWithOptions } from '../src';

describe('Two columns', () => {
  const items = [
    {
      slugs: ['丝绒款09 #草莓粉', '4.8g'],
    },
    {
      slugs: ['丝绒款10 #珊瑚红', '5.2g'],
    },
    {
      slugs: ['丝绒款10 #珊瑚红', '3.0g'],
    },
    {
      slugs: ['丝绒款10 #珊瑚红', '7.0g'],
    },
    {
      slugs: ['丝绒款10 #珊瑚红', '4.8g'],
    },
    {
      slugs: ['果汁款03 #西瓜红', '3.0g'],
    },
    {
      slugs: ['果汁款09 #荔枝色', '4.8g'],
    },
    {
      slugs: ['丝绒款10 #珊瑚红', '3.0g'],
    },
  ];

  const skuOptions = [
    {
      id: '5a60c42f69bd891ed8939a3c',
      name: '颜色/款式',
      values: [
        '丝绒款01 #桃红色',
        '丝绒款03 #成熟红',
        '丝绒款06 #暗红棕',
        '丝绒款07 #雾面正红',
        '丝绒款09 #草莓粉',
        '丝绒款10 #珊瑚红',
        '丝绒款11 #橘暖红',
        '果汁款02 #红柚色',
        '果汁款03 #西瓜红',
        '果汁款07 #红枣色',
        '果汁款08 #柿子色',
        '果汁款09 #荔枝色',
      ],
      soldOutValues: [
        '丝绒款06 #暗红棕',
        '丝绒款07 #雾面正红',
        '丝绒款10 #珊瑚红',
        '果汁款07 #红枣色',
      ],
    },
    {
      id: '5a60c42f69bd891ed8939a40',
      name: '重量',
      values: ['3.0g', '4.8g', '5.2g', '7.0g'],
      soldOutValues: [],
    },
  ];

  test('basic works', () => {
    const result = sortWithOptions({
      items,
      getOptions: index => {
        return skuOptions[index].values;
      },
      getOption: (item, index) => {
        return item.slugs[index];
      },
      getOptionsCount: () => skuOptions.length,
    });
    expect(result).toMatchSnapshot();
  });
});

describe('Four columns', () => {
  const items = [
    {
      slugs: ['姜黄色', 'aa', '3'],
    },
    {
      slugs: ['姜黄色', 'dd', '1'],
    },
    {
      slugs: ['姜黄色', 'cc', '5'],
    },
    {
      slugs: ['姜黄色', 'aaaad', '5', 'LL'],
    },
    {
      slugs: ['姜黄色', 'cc', '1', 'L'],
    },
    {
      slugs: ['姜黄色', 'ee', '4'],
    },
    {
      slugs: ['姜黄色', 'cc', '3', 'M'],
    },
    {
      slugs: ['姜黄色', 'dd', '2', 'XS'],
    },
    {
      slugs: ['姜黄色', 'aa', '1', 'LL'],
    },
    {
      slugs: ['姜黄色', 'dd', '1', 'XS'],
    },
    {
      slugs: ['姜黄色', 'cc', '1', 'M'],
    },
    {
      slugs: ['姜黄色', 'bb', '1', 'L'],
    },
    {
      slugs: ['姜黄色', 'cc', '5', 'XS'],
    },
    {
      slugs: ['姜黄色', 'cc', '5', 'LL'],
    },
  ];

  const skuOptions = [
    {
      id: '5a60c43a69bd891ed893aaf6',
      name: '颜色',
      values: ['姜黄色', '姜色', '湖蓝色', '粉红色', '紫色'],
      soldOutValues: [],
    },
    {
      id: '5a60c42f69bd891ed8939a46',
      name: '套装明细',
      values: ['aa', 'aaaad', 'bb', 'cc', 'dd', 'ee'],
      soldOutValues: [],
    },
    {
      id: '',
      name: '组合数量',
      values: ['1', '2', '3', '4', '5'],
      soldOutValues: [],
    },
    {
      id: '',
      name: '尺寸',
      values: ['XS', 'S', 'M', 'L', 'LL'],
      soldOutValues: [],
    },
  ];

  test('Four columns', () => {
    const result = sortWithOptions({
      items,
      getOptions: index => {
        return skuOptions[index].values;
      },
      getOption: (item, index) => {
        return item.slugs[index];
      },
      getOptionsCount: () => skuOptions.length,
    });
    expect(result).toMatchSnapshot();
  });
});
