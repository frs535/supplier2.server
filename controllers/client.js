import Order from "../models/Order.js";
import Partner from "../models/Partner.js";
import Proposal from "../models/Proposal.js";
import {nanoid} from "nanoid";
import jwt from "jsonwebtoken";

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
            return {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1,
            };
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

        await Order.replaceOne({id}, req.body, {upsert: true});

        res.status(200).json({id, updatedAt: new Date()});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProposal = async (req, res) =>{
    try {
        const { id } = req.params;

        const proposal = await Proposal.findOne({linkId:id})
            .then(model=>model._doc);

        if (!proposal) return res.status(404).json({ message: "Proposal not found" });

        const token = jwt.sign({
            id: proposal.id,
            _id: proposal._id
        }, process.env.JWT_SECRET, {expiresIn: "10h"});

        const expirationTo = new Date();
        expirationTo.setTime(expirationTo.getTime() + (10 * 60 * 60 * 1000));

        const newProposal = {
            ...proposal,
            auth: {
                expirationTo,
                token
            }
        };

        res.status(200).json(newProposal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUnhandledProposal = async (req, res) =>{
    try {

        const proposals =  await Proposal.find({handled: false})

        res.status(200).json(proposals);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const putHandledProposal = async (req, res) =>{
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({ message: "id is required" });

        await Proposal.updateOne({id}, {$set: {handled : true}})

        res.status(200).json({ message: "Successfully updated" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postProposal = async (req, res) =>{
    try {
        const { id } = req.body;

        if (!id) return res.status(404).json({ message: "id is required" });

        const oldProposal = await Proposal.findOne({id: id});
        const linkId = oldProposal? oldProposal.linkId : nanoid();

        const proposal = {
            linkId,
                ...req.body
        };

        await Proposal.replaceOne({id}, proposal, {upsert: true});

        res.status(200).json({id:linkId, updatedAt: new Date()});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const patchProposal = async (req, res) =>{
    try {
        const { id } = req.user;
        if (!id) return res.status(404).json({ message: "id is required" });

        const currentProposal = await Proposal.findOne({basedOn: id, direction: "out"});

        if (currentProposal) {
            req.body.id = currentProposal.id;
            req.body.linkId = currentProposal.linkId;
        }
        else {
            req.body.id = nanoid();
            req.body.linkId = req.body.id;
        }

        await Proposal.replaceOne({id: req.body.id}, req.body, {upsert: true});

        res.status(200).json({id:req.body.linkId, updatedAt: new Date()});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteProposal = async (req, res) =>{
    try {
        const { id } = req.params;

        const result = await Proposal.deleteOne({id: id});

        res.status(200).json({deleted: result.deletedCount!==0});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}