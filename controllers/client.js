import Order from "../models/Order.js";
import Partner from "../models/Partner.js";

export const getPartners = async (req, res)=>{
    try {
        const partners = await Partner.find()
            .then(docs=>
                docs.map(p=>{
                    return {
                        id: p.id,
                        agreementId: p.agreementId,
                        priceTypeId: p.priceTypeId
                    }
                }));

        res.status(200).json(partners);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
};

export const getPartner = async (req, res)=>{
    try {
        const { id } = req.params;
        const partners = await Partner.findOne({id: id});

        res.status(200).json(partners);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
};

export  const postPartner = async (req, res)=> {
    try {
        const {
            id,
            name,
            agreementId,
            priceTypeId,
            deliveryAddress,
            manager,
            companies,
        } = req.body;

        const partner = await Partner.findOne({id: id});
        if (partner)
            await Partner.deleteOne( { "_id" : partner._id } )

        const newPartner = new Partner(
            {
                id,
                name,
                agreementId,
                priceTypeId,
                deliveryAddress,
                manager,
                companies,
            });

        const savedPartner = await newPartner.save();

        res.status(200).json(savedPartner);
    }catch (error){
        res.status(404).json({ message: error.message });
    }
}

export  const getOrder = async (req, res) =>{
    try {
        const { id } = req.query;

        let filter = {id};

        if (req.user.role !== "admin")
            filter.partnerId = req.user.partnerId;

        const orders = await Order.findOne(filter);
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export  const getOrders = async (req, res) =>{
    try {
        const {page = 0, pageSize = 10, sort = null,  status } = req.query;

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1,
            };

            return sortFormatted;
        };

        const sortFormatted = sort !== "{}" && Boolean(sort)? generateSort() : {updatedAt: -1};

        let filter = {}
        if (status !== undefined)
            filter = {status};

        if (req.user.role !== "admin")
            filter.partnerId = req.user.partnerId;

        const orders = await Order.find(filter)
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Order.countDocuments(filter);

        res.status(200).json({orders, total});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postOrder = async (req, res) =>{
    try {

        const { id } = req.body;

        const result = await Order.replaceOne({id}, req.body, {upsert: true});

        //const savedOrder = await newOrder.save();
        res.status(200).json({id, updatedAt: new Date()});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}