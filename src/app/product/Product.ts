export interface Product {
    id : number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    image: string;
    fournisseur: {
      id: number;
      username: string;
      email: string;
      password: string;
      role: string;
    };
    selectedQuantity : number; // Optional property for selected quantity
  }
  