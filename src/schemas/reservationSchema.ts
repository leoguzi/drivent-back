import joi from "joi";

export default joi.object({
  enrollmentId: joi.number().min(1).required(),
  roomId: joi.number().min(1).required()  
});
