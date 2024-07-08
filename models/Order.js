import mongoose from "mongoose";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

const orderSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4(),
            required: true,
        },
        number: {
            type: String,
            default: ""
        },
        data: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["Created", " Received", " Confirmed", "InDelivery", "Closed", "HasProblems", "Canceled"],
            default: "Created"
        },
        deliveryType: {
            type: String,
            default: "pickup"
        }, //Тип доставки
        deliveryAddress: String, //Адрес доставки товара
        deliveryDate: Date, //Желаемая дата поставки
        deliveryComment: String, //Комментарий к доставке
        wholeShip: Boolean, //Заказ будет отгружаться только целиком, когда все позиции на складе.
        currencyId: String, //Идентификатор валюты
        amount: Number, //Сумма документа
        partnerId: String, //Ссылка на партнера
        companyId: String, //Ссылка на организацию партнера
        contractId: String, //Ссылка на договор
        agreementId: String, //Ссылка на соглашение
        warehouseId: { //Ссылка на склад
            type: String,
            default: ""
        },
        comment: String, //Комментарий к заказу
        confirmed: { //Подтвержден учетной системой
            type: Boolean,
            default: false
        },
        uploaded: { //Загружен в учетную систему
            type: Boolean,
            default: false,
        },
        goods: [
            {
                rowNumber: Number, //Номер строки
                productId: String, //Ссылка на товар
                productName: String, //Наименование прродукции. Что бы не искть при отображении
                unitRef: String, //Ссылка на упаковку
                unitName: String, //Наименование упаковки. Что бы не искть при отображении
                quantity: Number, // Количество
                amount: Number, //Сумма
                price: Number, // Цена
                priceTypeId: {
                    type: String,
                    default: ""
                },
                priceTypeName: String, //Наименование вида цен. Что бы не искть при отображении
                priceByUnit: Number, //Цена за упаковку
                unitQuantity: Number, //Количество упаковок
                TAXRate:String, //Ставка НДС
                amountTaxes: Number, //Сумма НДС
                discountPercent: { //Процент скидки
                    type: Number,
                    default: 0
                },
                discountAmount: { //Сумма скидки
                    type: Number,
                    default: 0
                },
                warehouseId: {
                    type: String,
                    default: ""
                },
            }
        ]
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;