import joi from "joi";

export default joi.object({
  type: joi.string().valid("online", "presential").required(),
  withHotel: joi.boolean().required(),
  paymentDate: joi.date().allow(null),
});
