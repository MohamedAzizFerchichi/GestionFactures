import { ElementRef, Component, AfterViewInit, ViewChild } from '@angular/core';
import { RecipeServiceService } from '../Service/recipe-service.service';
//declare var require: any;
declare var require: any;
import jsPDF from 'jspdf';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as htmlToImage from 'html-to-image';
declare var html2pdf: any;
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  clientid: any;
  recipes: any[] = [];
  recipe: any;
  data: any;
  imgg: any;
  username: any;
  condition = false;
  fournisseur: any;
  path : any ;
  constructor(private recipeService: RecipeServiceService) {
    const userDataJSON = sessionStorage.getItem('credentials');
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      this.clientid = userData.id;
      this.username = userData.username;
    }
    this.recipeService.getRecipesByClientId(this.clientid).subscribe((data) => {
      this.recipes = data; // Store the fetched recipes in your component
      console.log(this.recipes);
    });
  }
  ngAfterViewInit() {
    console.log(this.recipes);
  }
  viewDetails(id: any) {
    this.recipeService.getRecipeById(this.clientid).subscribe((data) => {
      this.recipe = data; // Store the fetched recipes in your component
      console.log(this.recipe);
    });
  }
  //update recipe
  updateRecipe(id:any , path : any){
    this.recipeService.updateRecipe(id, path).subscribe((data)=>
      console.log(data)
    )
  }

  viewDetails2(id: any) {
    this.recipeService.getRecipeById(id).subscribe((data) => {
      this.recipe = data; // Store the fetched recipes in your component
      console.log(this.recipe);
    });
    this.recipeService.getPrListByRecipeId(id).subscribe((data) => {
      this.data = data; // Store the fetched recipes in your component
      console.log(this.data);
      this.fournisseur = this.data[0].product.fournisseur;
      this.condition = true;
    });
  }

  downloadAsPDF(id : any) {
    const options = {
      filename: this.recipe.name + '.pdf', // Set the filename
      html2canvas: {},
      jsPDF: {
        orientation: 'landscape',
        format: 'a4',
        margins: { top: 10, right: 10, bottom: 10, left: 10 },
      },
    };
    const element: Element = document.getElementById('content');
    html2pdf().from(element).set(options).save();
    var stringWithPercent20 = this.recipe.name.replace(/\s+/g, "%20");
    let path = `/C:/Users/Fritchou/Downloads/${this.recipe.name}.pdf`

    console.log(path)
    this.updateRecipe(id , path)
    this.condition = false;
  }
}
