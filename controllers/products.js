import Product from "../models/Product.js";
import Price from "../models/Price.js";
import Stock from "../models/Stock.js";
import Image from "../models/Image.js";
import Catalog from "../models/Catalog.js";

export const getProducts = async (req, res) => {
    try {
        const { partnerId } = req.user;
        if (!partnerId) return  res.status(404).json({ message: "Unknown partner" });

        const { groupId } = req.query;

        const products = groupId? await Product.find({"searchId" : {$regex : groupId}}) : await Product.find();

        const result = await Promise.all(products.map(async product=>{
            const prices = await Price.findOne({partnerId, catalogId: product.id})
                .then(doc=> doc?.prices);

            const defPrice = prices && prices.length > 0 ? prices[0] : {value: 0, unit: { id: "", name: ""}};

            const stock = await Stock.find({catalogId: product.id,});
            const quantity =  stock.reduce((acc, cur) => { return acc + cur.quantity }, 0);

            const images = await Image.find({id: product.id, destination: "product"}).sort({updatedAt: -1});

            return {
                id: product.id,
                name: product.name,
                article: product.article,
                quantity: quantity,
                unit: defPrice.unit.name,
                price: defPrice.value,
                prices: !prices? []: prices,
                stock,
                order: 0,
                images
            }
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { partnerId } = req.user;
        if (!partnerId) return  res.status(404).json({ message: "Unknown partner" });

        const { id } = req.query;
        if (!id) return res.status(404).json({ message: "Unknown product id" });

        const product = await Product.findOne({"id": id});
        if (!product) return res.status(404).json({ message: "Product not found" });

        const prices = await Price.findOne({partnerId, catalogId: product.id})
            .then(doc=> doc?.prices);

        const defPrice = prices && prices.length > 0 ? prices[0] : {value: 0, unit: { id: "", name: ""}};

        const stock = await Stock.find({catalogId: product.id,});

        const images = await Image.find({id, destination: "product"}).sort({updatedAt: -1});

        res.status(200).json({product,  stock, prices: !prices? []: prices, defPrice, images});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export  const patchProduct = async (req, res) => {
    try {

        await Product.deleteMany();
        const savedProduct = await Product.insertMany(req.body);

        res.status(200).json({savedProduct: savedProduct.length})
    }
    catch (error){
        res.status(404).json({ message: error.message });
    }
}


export const getCatalogs = async  (req, res)=>{
    try {

        const catalogs = await Catalog.find();

        res.status(200).json(catalogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const patchCatalog = async (req, res)=>{

    await Product.deleteMany();
    await Catalog.deleteMany();

    try {
        req.body.map(async (catalog)=>{

            const {
                id,
                code,
                name,
                child,
            } = catalog;

            const foundCatalog = Catalog.findOne({id: id})
            if(!foundCatalog)
                await Catalog.deleteOne(foundCatalog);

            const newCatalog= new Catalog({
                id,
                code,
                name,
                child,
            });
            await newCatalog.save();
        });

        res.status(200).json({message: 'successful'})
    }
    catch (error){
        res.status(404).json({ message: error.message });
    }
}
