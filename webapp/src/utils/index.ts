export function shortcutString(item: string, shortcutLength: number) {
  return item.slice(0, shortcutLength) + '...' + item.slice(-shortcutLength);
}

export function priceConvert(price: number) {
  const formatter = new Intl.NumberFormat('vi-VI', {
    currency: 'VND',
  });
  return formatter.format(price);
}
