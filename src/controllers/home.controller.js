const Book=require('../models/books.model');

module.exports={
    //Paginated API
    getAllBooks:async(req,res)=>{
        res.status(200).json({message:"All Books"});
    },
    getBooksByName:async(req,res)
}