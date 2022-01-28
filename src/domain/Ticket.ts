interface Ticket {
  id?: number;
  type: string;
  paymentDate: Date | null;
  withHotel: boolean;
}  
  
export default Ticket;
  
