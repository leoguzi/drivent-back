import joi from "joi";

export default joi.object({
  activityId: joi.number().min(1).required(),
});
