export class Contact {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: { name: string; catchPhrase: string; bs: string };
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: { lat: string; lng: string };
    };
  
    constructor() {
      this.id = 0;
      this.name = "";
      this.username = "";
      this.email = "";
      this.phone = "";
      this.website = "";
      this.company = {
        name: "",
        catchPhrase: "",
        bs: "",
      };
      this.address = {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "", lng: "" },
      };
    }
  }
  