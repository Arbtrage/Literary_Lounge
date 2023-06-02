const Book=require('../models/books.model');

module.exports={
    //Paginated API
    getAllBooks:async(req,res)=>{
        res.status(200).json({message:"All Books"});
    },
    getBookByName:async(req,res)=>{
        try {
            const query={name:req.params.name};
            const result=await Book.find(query);
            if(!result) res.status(404).json({mesasage:"Not Found"});
            res.status(200).json({Book:result});
        } catch (error) {
            res.status(400).json({Error:error.message});
        }
    },
    getBookById:async(req,res)=>{
        try {
            const result=await Book.findById(req.params.id);
            if(!result) res.status(404).json({mesasage:"Not Found"});
            res.status(200).json({Book:result});
        } catch (error) {
            res.status(400).json({Error:error.message});
        }
    },
    getBooksByFiltering:async(req,res)=>{
        try {
            const filter = { ...req.query };
            console.log(filter);
            const result = await Book.find(filter);
            if (!result) res.status(404).json({ message: "Not Found" });
            res.status(200).json(result);
          } catch (error) {
            res.status(400).json({ Error: error.message });
          }
    }
}