import Profile from "../models/Profile.js";
import Partner from "../models/Partner.js";
import Settings from "../models/Settings.js";
import Image from "../models/Image.js";

export const getProfile = async (req, res) =>{
  try {
      const profile = await Profile.findOne({userId:req.user.id});
      res.status(200).json(profile);
  }
  catch (error){
      res.status(404).json({message: error.message});
  }
};

export const postProfile = async (req, res)=>{
    try {
        const {
            userId,
            phoneNumber,
            email,
            defaultDeliveryAddress,
        } = req.body;

        const profile = await Profile.findOne({userId: userId});
        if (profile!=null)
            await Profile.deleteOne( { "_id" : profile._id } )

        const newProfile = new Profile(
        {
            userId,
            phoneNumber,
            email,
            defaultDeliveryAddress,
        });

        const savedProfile = await newProfile.save();

        res.status(200).json(savedProfile);
    }
    catch (error)
    {
        res.stat(400).json({message: error.message});
    }
}

export const getSettings = async (req, res)=>{
    try {
        const settings = await Settings.findOne({});
        res.status(200).json(settings? settings : new Settings());
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
}

export  const postSettings = async (req, res)=>{
    try {
        const newSettings = new Settings(req.body);

        const settings = await Settings.findOne({});
        if (settings) {
            await Settings.deleteOne({"_id": settings._id});
        }

        const savedSettings = await newSettings.save();

        res.status(200).json(savedSettings);
    }
    catch (error)
    {
        res.stat(400).json({message: error.message});
    }
}

export const getDashboardStats = async (req, res) => {
    try {

        const settings = await Settings.findOne();
        const partner = await  Partner.findOne({id: req.user.partnerId});
        const image = await Image.findOne({id: partner?.manager?.id, destination: "manager"});
        const logo = await Image.findOne({id: "00000000-0000-0000-0000-000000000000", destination: "logo"});

        res.status(200).json({partner, settings, image, logo});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};