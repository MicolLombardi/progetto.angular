export interface Users {
    id?: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
  }
  
export interface Payload {
    fullName: string;
    userHandle: string;
    contactEmail: string;
    streetName: string;
    apartment: string;
    town: string;
    postalCode: string;
  }