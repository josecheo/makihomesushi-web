/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../../type.t.ts";
import { products } from "./data.tsx";

export const getProductFromID = (id: number) => {
  const product = products.find((product) => product.id === Number(id));
  return product;
};

export function buildMessage(order: any[]) {
  const messages: any = [];

  order.forEach((item) => {
    const items = item.summary;
    const product = getProductFromID(item.productId);
    let message = `*${product?.name.toUpperCase()}*\n`;
    message += `${product?.description}\n`;

    for (const category in items) {
      if (Object.prototype.hasOwnProperty.call(items, category)) {
        if (items[category].length > 0) {
          message += `*${category}*\n`;
          items[category].forEach(
            (subItem: { amount: any; productId: any }) => {
              message += `x${subItem.amount} ${
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
    message += `-----------------------\n`;
    message += `*PRECIO DE COMBO:*\nS/${product?.price.toFixed(2)}\n`;
    message += `*ADICIONALES:*\nS/${additionalPrice.toFixed(2)}\n`;
    message += `*ENVASES:*\nS/${containerPrice.toFixed(2)}\n`;
    message += `-----------------------\n`;
    message += `*PRECIO DE TOTAL:*\n*S/${totalPrice.toFixed(2)}*\n`;
    message += `-----------------------\n`;

    messages.push(message);
  });

  return messages;
}
