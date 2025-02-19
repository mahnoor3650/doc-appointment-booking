import jwt from "jsonwebtoken";

//admin autyentication middleware
const authAdmin= async (req,res,next)=>{
    try {
        
        const {atoken}= req.headers;
        if(!atoken){
            res.json({ success: false, message: "Not Authorized. login again" });
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD)
        {
              res.json({
                success: false,
                message: "Not Authorized. login again",
              });
        }
        next()
    } catch (error) {
         console.log("erroe", error);
         res.json({ success: false, message: error.message });
    }
}
export default authAdmin;