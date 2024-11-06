

module.exports = {
    routes:[
        {
            method: 'POST',
            path:"/coupon/validate",
            handler:'coupon.validateCoupon',
            config:{
                auth:false,
            }
        }
    ]
}