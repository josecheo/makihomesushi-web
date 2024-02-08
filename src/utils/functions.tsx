/* eslint-disable @typescript-eslint/no-explicit-any */

import { products } from "./data.tsx";

export const getProductFromID = (id: number) => {
  const product = products.find((product) => product.id === Number(id));
  return product;
};

export function buildMessage(order: any[]) {
  let message = "";

  order.forEach((item) => {
    const items = item.summary;
    const product = getProductFromID(item.productId);
    message += `*${item.isMedium ? "½" : ""} ${product?.name.toUpperCase()}*\n`;

    for (const category in items) {
      if (Object.prototype.hasOwnProperty.call(items, category)) {
        if (items[category].length > 0) {
          message += `🔸 *${category.toUpperCase()}:*\n`;
          items[category].forEach(
            (subItem: { amount: any; productId: any }) => {
              message += `  • ${subItem.amount}x ${
                getProductFromID(subItem.productId)?.name
              }\n`;
            }
          );
        }
      }
    }

    const totalPrice = item.totalPrice;
    const additionalPrice = item.additionalsPrice;
    const containerPrice = item.containerPrice;
    const basePrice = item.basePrice;

    message += `🛒 Precio Base: S/${basePrice.toFixed(2)}\n`;
    message += `🛍️ Adicionales: S/${additionalPrice.toFixed(2)}\n`;
    message += `📦 Envases: S/${containerPrice.toFixed(2)}\n`;
    message += `💰 *Subtotal: S/${totalPrice.toFixed(2)}*\n`;
    message += `-----------------------------------------------\n`;
  });

  return message;
}
