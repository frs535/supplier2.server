import Stock from "../models/Stock.js";

export const getStock = async (req, res)=>{
    try {
        const stock = await Stock.find();
        res.status(200).json(stock);
    }
    catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}

export const postStock = async (req, res)=>{
    try {
        await Stock.deleteMany();
        const savedStock = await Stock.insertMany(req.body);
        res.status(200).json(savedStock);
    }
    catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}
