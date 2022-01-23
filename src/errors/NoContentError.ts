export default class NoContentError extends Error {
  constructor(message: string) {
    super(message);
    
    this.name = "NoContentError";
  }
}
  
