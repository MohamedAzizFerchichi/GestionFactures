import {
  Component,
  AfterViewInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
declare var $: any;
import { Router } from '@angular/router';
import { PurchaseValidationService } from 'src/app/Service/purchase-validation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  userName: string | null = '';
  dataToSend : any ;
  userid : any ; 
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private purchaseValidationService: PurchaseValidationService
  ) {}
  isPurchaseValid(): boolean {
    return this.purchaseValidationService.isPurchaseValid;
  }
  validatePurchase(): void {
    const PR = sessionStorage.getItem('PR');
    if (PR) {
      const PRdata = JSON.parse(PR);
      this.dataToSend =PRdata ;
      console.log( this.dataToSend)
      this.cdr.detectChanges();
      this.Purchase();
    }else{
      this.router.navigate(['/login']);
    }
  }
  ngAfterViewInit(): void {
    
    const userDataJSON = sessionStorage.getItem('credentials');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      const username = userData.username;
      this.userName = username;
      this.userid = userData.id ;
      this.cdr.detectChanges();
    }else{
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.cdr.detectChanges();
    window.location.reload();
    this.router.navigate(['/login']);
  }

 //consume Purshase from PurchaseValidationService
  Purchase(): void {
    this.purchaseValidationService.Purchase(this.dataToSend , this.userid).subscribe(
      (response) => {
        console.log('Response:', response);
        this.purchaseValidationService.setValidationState(false);
        sessionStorage.removeItem('PR');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
