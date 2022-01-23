export default class InvalidQueryParameterError extends Error {
  constructor(message: string) {
    super(message);
      
    this.name = "InvalidQueryParameterError";
  }
}
  
