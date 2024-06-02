import { Router, Request, Response } from "express";
import { cosmetics } from "../db/database";
import { Cosmetic } from "../models/cosmetic";


const router = Router();

let maxId = 4;
const generateId = (): number => ++maxId;

// GET ROUTES:======>>>>>>>

// Get all cosmetics
router.get("/", (req: Request, res: Response) => {
    res.json(cosmetics);
    console.log(cosmetics);
});

//Get cosmetic by ID
router.get('/cosmetics/:id', (req: Request, res: Response) => {
    const cosmeticId = parseInt(req.params.id);
    const foundCosmetic = cosmetics.find((cosmetic) => cosmetic.id === cosmeticId);

    if (!foundCosmetic) {
        return res.status(404).json({ error: 'Cosmetic not found' });
    }
    return res.status(200).json(foundCosmetic);
});

//Get cosmetic by Name
router.get('/:name', (req: Request, res: Response) => {

const cosmeticName = req.params.name;
const foundCosmetic = cosmetics.find((cosmetic) => cosmetic.name.toLowerCase() === cosmeticName.toLowerCase())

if (!foundCosmetic){
    return res.status(404).json({ error: 'Cosmetic name not found' });
}
return res.status(200).json(foundCosmetic);
})

// POST ROUTES:======>>>>>>

router.post('/' , (req:Request, res:Response) => {

    const cosmetic: Cosmetic = {
        id:  ++maxId,
        name: req.body.name,
        brand:req.body.brand,
        price:req.body.price,
        inStock:req.body.inStock
    }
    cosmetics.push(cosmetic);
    res.status(200).json(cosmetics);


})

// DELETE ROUTES: ========>>>>>>

// delete by id

router.delete('/:id',(req:Request, res:Response) =>{

const cosmeticId = parseInt(req.params.id);
const index = cosmetics.findIndex((cosmetic) => cosmetic.id === cosmeticId);

if (index === -1) {
    return res.status(404).json({ error: 'Cosmetic not found in database' });
}
const deletedCosmetic = cosmetics.splice(index, 1)[0];

return res.status(200).json(deletedCosmetic);
});

// PUT route to update a cosmetic by ID

router.put('/:id', (req: Request, res: Response) => {
    const cosmeticId = parseInt(req.params.id);
    const updatedCosmeticData = req.body;

    const cosmeticToUpdate = cosmetics.find((cosmetic) => cosmetic.id === cosmeticId);

    if (!cosmeticToUpdate) {
        return res.status(404).json({ error: 'Cosmetic not found in database' });
    }
    Object.assign(cosmeticToUpdate, updatedCosmeticData);
    return res.status(200).json(cosmeticToUpdate);
});

// PATCH route to partially update a cosmetic by ID
router.patch('/:id', (req: Request, res: Response) => {
    const cosmeticId = parseInt(req.params.id);
    const updatedFields = req.body;

    const cosmeticToUpdate = cosmetics.find((cosmetic) => cosmetic.id === cosmeticId);

    if (!cosmeticToUpdate) {
        return res.status(404).json({ error: 'Cosmetic not found in database' });
    }
    Object.assign(cosmeticToUpdate, updatedFields);
    return res.status(200).json(cosmeticToUpdate);
});



export default router;
