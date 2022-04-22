
import { IssuerCustomerCustomerStateDefLookupTableDto } from 'app/models/CreateIssuerCustomerDto';
import { CreateOrEditIssuerCustomerDto, IssuerCustomersServiceProxy } from './customer-issuer.service';
import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConsts } from 'app/AppConsts';
@Component({
  selector: 'app-customer-issuer',
  templateUrl: './customer-issuer.component.html',
  styleUrls: ['./customer-issuer.component.css']
})
export class CustomerIssuerComponent implements OnInit {
  @ViewChild('issuerCustomerIssuerProgramLookupTableModal', { static: true })

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  walletButtonActivate = false;
  googleWalletUrl: string;
  appleWalletUrl: string;
  tenantName: string;

  issuerCustomer: CreateOrEditIssuerCustomerDto = new CreateOrEditIssuerCustomerDto();

  customerStateDefDescription = '';
  issuerProgramProgramName = '';
  remoteServiceUrl: string = AppConsts.remoteServiceBaseUrl;
  appPath: string = AppConsts.appBaseUrl;
  barcodeScanUrl: string;


  allCustomerStateDefs: IssuerCustomerCustomerStateDefLookupTableDto[];

  constructor(
    public router: Router,
    injector: Injector,
    private _issuerCustomersServiceProxy: IssuerCustomersServiceProxy
  ) {
    // super(injector);
  }
  ngOnInit(): void {
    
    var urlParse = this.router.url.split("/");
    this.tenantName = urlParse[urlParse.length-1];

    this.issuerCustomer.tenantName = this.tenantName;
    this.issuerCustomer.customerState = 1;
    this.show();
  }
  getQrScanUrl(qrCode: string, tenantId?: number): string {
    this.barcodeScanUrl = AppConsts.appBaseUrl + '/app/main/action?id=' + qrCode;
    if (tenantId)
      this.barcodeScanUrl += '&tenantId=' + tenantId;

    return this.barcodeScanUrl;
  }

  show(issuerCustomerId?: string): void {

    if (!issuerCustomerId) {
      this.issuerCustomer = new CreateOrEditIssuerCustomerDto();
      this.issuerCustomer.id = issuerCustomerId;
      this.issuerCustomer.stampCounter = 0;
      this.issuerCustomer.rewardCounter = 0;
      this.issuerCustomer.lastStampEarnedDate = null;
      this.issuerCustomer.lastRewardEarnedDate = null;
      this.issuerCustomer.lastRewardUsedDate = null;
      this.customerStateDefDescription = 'Active';
      this.issuerCustomer.customerState = 1;
      this.issuerCustomer.isAllowGdpr = false;

      this.active = true;
    } else {
      this._issuerCustomersServiceProxy.getIssuerCustomerForEdit(issuerCustomerId).subscribe((result) => {
        this.issuerCustomer = result.issuerCustomer;

        this.customerStateDefDescription = result.customerStateDefDescription;
        this.issuerProgramProgramName = result.issuerProgramProgramName;

        this.issuerCustomer.barcode = this.getQrScanUrl(this.issuerCustomer.id, this.issuerCustomer.tenantId);
        this.active = true;
      });
    }
  }

  save(): void {
    this.saving = true;
    this.issuerCustomer.tenantName = this.tenantName;

    this._issuerCustomersServiceProxy
      .createOrEdit(this.issuerCustomer)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response) => {
        
        this.saving = false;
        this.walletButtonActivate = true;
        this.googleWalletUrl = response.passesAddUrl;
        this.appleWalletUrl = response.passesAddUrlIos;
        console.log("Apple pass link:" + AppConsts.appBaseUrl + "/" + this.appleWalletUrl);
        this.showSuccess();
        this.issuerCustomer = new CreateOrEditIssuerCustomerDto();
      });
  }

  setIssuerProgramIdNull() {
    this.issuerCustomer.issuerProgramId = null;
    this.issuerProgramProgramName = '';
  }

  googleWallet() {
    this.router.navigate([]).then(result => {  window.open(this.googleWalletUrl, '_blank'); });
  }

  appleWallet() {
    console.log("Apple pass link:" + AppConsts.appBaseUrl + "/" + this.appleWalletUrl);
    this.router.navigate([]).then(result => {  window.open(AppConsts.appBaseUrl + "/" + this.appleWalletUrl, '_blank'); });
  }

  showSuccess() {
    
  }
  
  
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  
}

