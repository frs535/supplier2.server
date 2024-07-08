import Image from "../models/Image.js";
import fs from 'fs';
import sharp from "sharp";

const resizeFile = (path, destination, filename, width, height) =>
    new Promise((resolve) => {

        const newPath = `${destination}/${width}_${height}_${filename}`;

        if (destination.startsWith("public")) {
            destination = destination.slice(7, path.length).trimEnd();
        }

        const returnPath = `${destination}/${width}_${height}_${filename}`;

        let inStream = fs.createReadStream(path);
        let outStream = fs.createWriteStream(newPath, {flags: "w"});

        let transform = sharp()
            .resize({ width: width, height: height })
            .on('info', function(fileInfo) {
                console.log(`Resizing done. New size: ${fileInfo.size}`);
                // fs.rm(path, err=>{
                //     if (err) console.log(err);
                //     console.log(`Deleted file ${path}`)
                // });
                resolve(returnPath);
            });

        inStream.pipe(transform).pipe(outStream);
    });

export const postImage = async (req, res) => {
    try {
        let { filename, path,  destination} = req.file;
        const { description, type } =req.body;
        const { id } = req.params;

        const newPath256 = await resizeFile(path, destination, filename, 256, 256);
        const newPath512 = await resizeFile(path, destination, filename, 512, 512);
        const newPath1024 = await resizeFile(path, destination, filename, 1024, 1024);

        if (path.startsWith("public")) {
            path = path.slice(7, path.length).trimEnd();
        }

        const image = type === "logo" || type === "manager" ?
            await Image.findOne({id: id, destination: type}):
            await Image.findOne({id: id, destination: type, filename: filename});

        // if (destination === "logo" || destination === "manager")
        //     image = await Image.findOne({id: id, destination: type});
        // else
        //     image = await Image.findOne({id: id, destination: type, filename: filename});

        //const image = await Image.findOne({id: id, destination: type, filename: filename});
        if (image)
        {
            await Image.updateOne({_id: image._id}, {$set:
                    {
                        url: path,
                        url256: newPath256,
                        url512: newPath512,
                        url1024: newPath1024,
                        description: description
                    }});
            res.status(200).json(image);
        }
        else
        {
            const newImage = new Image({
                id: id,
                filename : filename,
                url: path,
                url256: newPath256,
                url512: newPath512,
                url1024: newPath1024,
                destination: type,
                description
            });

            const savedImage = await newImage.save();
            res.status(200).json(savedImage);
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getImages = async (req, res) => {
    try {
        const { id, type }  = req.query;
        const images = await Image.find({id: id, destination: type}).sort({updatedAt: -1});
        res.status(200).json(images);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const deleteImages = async  (req, res) =>{
    try {
        const { id }  = req.params;

        const images = await Image.find({id: id});
        images.map(async img=>{
            await fs.rm(`public/${img.url}`, (err)=>{
                if (err) console.log(err);
            });
            await fs.rm(`public/${img.url256}`, (err)=>{
                if (err) console.log(err);
            });
            await fs.rm(`public/${img.url512}`, (err)=>{
                if (err) console.log(err);
            });
            await fs.rm(`public/${img.url1024}`, (err)=>{
                if (err) console.log(err);
            });
            console.log(`Deleted image ${img.url}`);
        })

        const result = await Image.deleteMany({id:id});

        res.status(200).json(result);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};