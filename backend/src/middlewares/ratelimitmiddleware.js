import ratelimit from "express-rate-limit";

const authlimiter = ratelimit({
    windowMs:15*60*1000,//15 mins
    max:20,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        status:429,
        message:"Too many requests from this IP, please try again after 15 minutes"
    },
});

export default authlimiter;

export const globalimiter = ratelimit({
    windowMs:60*1000, // 1 min
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        status:429,
        message:"Too many requests from this IP, please try again after 1 minute"
    },
});