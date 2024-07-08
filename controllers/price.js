import Price from "../models/Price.js";

export const getPrice = async (req, res) =>{
    try {
        const { id, companyId } = req.params;

        const price = await Price.find({partnerId : id, companyId});
        if (!price)
        {
            res.status(404).json({ message: "Price list not found" });
            return;
        }

        res.status(200).json(price);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postPrice = async (req, res)=>{
    try {
        const { partnerId, companyId,  catalogId} = req.body;

        const oldPrice = await Price.findOne({
            partnerId,
            companyId,
            catalogId
        });

        if (oldPrice)
        {
            const { price }= req.body;
            const updResult = await Price.updateOne({_id: oldPrice._id}, {$set: {price: price}});
            res.status(200).json(updResult);
        }
        else
        {
            const newPrice = new Price(req.body);
            const savedPrice = await newPrice.save();
            res.status(200).json(savedPrice);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
