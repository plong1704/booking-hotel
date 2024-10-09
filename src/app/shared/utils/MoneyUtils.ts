import { ONE_DOLLAR_IN_USD } from "src/app/models/constance";

export const getMoneyFormat = (money: number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formatter.format(money);
}

export const convertVNDToUSD = (money: number) => {
    return Math.round(money / ONE_DOLLAR_IN_USD);
}