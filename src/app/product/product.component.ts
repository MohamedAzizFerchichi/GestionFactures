import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../Service/product-service.service';
import { Product_Recipe } from './Product_Recipe';
import { Product } from './Product';
import { PurchaseValidationService } from '../Service/purchase-validation.service';
import { NavigationComponent } from '../shared/header/navigation.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductServiceService ,private purchaseValidationService: PurchaseValidationService) {}
  products: Product[] = [];
  PR: Product_Recipe[] = [];
  recipeIdCounter: number = 1;
  recipeIdCounter1: number = 0;
  ngOnInit(): void {
    this.getProducts();
    this.getMaxIdRecipe();
  }
  showChild = false;
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        console.log('Products:', products);
        this.products = products.map((product) => ({
          ...product,
          selectedQuantity: 0,
        }));
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getMaxIdRecipe(){
   this.purchaseValidationService.Maxid().subscribe((id)=>{
    
    if(this.recipeIdCounter1 == null){
      this.recipeIdCounter1 = 0
    }
    this.recipeIdCounter1 = id ;
    console.log(this.recipeIdCounter1)
   })
   
  }

  increaseQuantity(product: Product): void {
    if (product.selectedQuantity < 5) {
      product.selectedQuantity++;
    }
  
    // Check if a Produit with the same product ID already exists in PR
    const existingProduitIndex = this.PR.findIndex(item => item.product.id === product.id);
  
    if (existingProduitIndex !== -1) {
      // If it exists, update only the quantity
      this.PR[existingProduitIndex].quantity = product.selectedQuantity;
    } else {
      // If it doesn't exist, create a new Produit
      const newProduit: Product_Recipe = {
        recipe: {
          id: this.recipeIdCounter1+1, 
          name: "Facture d'achat ",
          description: "La facture d'achat, un document essentiel, présente vos sélections de produits en détail, ainsi que le montant total de l'achat, jouant un rôle clé dans la gestion transparente de vos dépenses. ",
          instructions: "HT (Hors Taxes) : "
          +"TVA (Taxe sur la Valeur Ajoutée) :"+
         " TTC (Toutes Taxes Comprises) ",
          status : "Valide" 
        },
        product: {
          id: product.id // Initialize with the provided id
        },
        quantity: product.selectedQuantity // Set the quantity based on the product's selectedQuantity
      };
  
      this.PR.push(newProduit); // Add the newProduit to the PR array
  
      // Increment the recipe ID counter for the next creation
      this.recipeIdCounter++;

    }
    this.purchaseValidationService.setValidationState(true);
    const credentialsJSON = JSON.stringify(this.PR);
    sessionStorage.setItem('PR', credentialsJSON);
    
  }
  
  decreaseQuantity(product: Product): void {
    if (product.selectedQuantity > 0) {
      product.selectedQuantity--;
    }
  
   
    const existingProduitIndex = this.PR.findIndex(item => item.product.id === product.id);
  
    if (existingProduitIndex !== -1) {
     
      this.PR[existingProduitIndex].quantity = product.selectedQuantity;
    } else {
     
      const newProduit: Product_Recipe = {
        recipe: {
          id:this.recipeIdCounter1+1, 
          name: "Facture d'achat ",
          description: "La facture d'achat, un document essentiel, présente vos sélections de produits en détail, ainsi que le montant total de l'achat, jouant un rôle clé dans la gestion transparente de vos dépenses. ",
          instructions: "HT (Hors Taxes) : "
          +"TVA (Taxe sur la Valeur Ajoutée) :"+
         " TTC (Toutes Taxes Comprises) ",
          status : "Valide" 
        },
        product: {
          id: product.id 
        },
        quantity: product.selectedQuantity 
      };
  
      this.PR.push(newProduit); 
  
     
      this.recipeIdCounter++;
    }
    this.purchaseValidationService.setValidationState(true);
    const credentialsJSON = JSON.stringify(this.PR);
    sessionStorage.setItem('PR', credentialsJSON);
    
  }
}
