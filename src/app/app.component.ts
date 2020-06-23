import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MobileKeyService } from './mobile-key.service';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface MobileKey{
 key: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  title = 'mobile-key-app';
  form: FormGroup = new FormGroup({});
  phone: string;
  record_count: number = 10;
  page_nbr: number = 1;
  mobileKeyData: any;
  datasource: MobileKey[];
  mobileKeys: MobileKey[] = [];
  totalRecords: number;
  cols: any[];
  loading: boolean = false;
  mobNumberPattern = "^((\\+1-?)|0)?[0-9]{10}$";  
  isValidFormSubmitted = false;

  constructor(private mobileKeyService: MobileKeyService) { }

  // constructor(private mobileKeyService: MobileKeyService, 
  //             private fb: FormBuilder) {
  //   this.form = fb.group({
  //     phone_nbr: ['', [Validators.required, Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")]]
  //   })
  // }

  ngOnInit() {
    this.cols = [
      { field: 'key', header: 'Unique Mobile Key' }
    ];
  }
 
  onClickSubmit(data) {
     //datasource imitation
     this.loading = true;
     this.mobileKeys = [];
     this.mobileKeyService.getMobileKeys(
       ''+this.phone, this.page_nbr, this.record_count).subscribe(response => {
         this.loading = false;
      this.mobileKeyData = response;
      this.totalRecords = this.mobileKeyData.totalMobileKeys;
      // this.mobileKeys = this.mobileKeyData.mobileKeys;
      for(var i in this.mobileKeyData.mobileKeys) {
        var obj = {key: this.mobileKeyData.mobileKeys[i]};
        this.mobileKeys.push(obj);
      }
  });
    
 }

    loadMobileKeysLazy(event: LazyLoadEvent) {
        if(this.phone) {
          this.loading = true;
          var newPageNbr = (event.first / this.record_count) + 1; 
          this.mobileKeyService.getMobileKeys(
            ''+this.phone, newPageNbr, this.record_count).subscribe((response) => {
            this.mobileKeyData = response;
            this.totalRecords = this.mobileKeyData.totalMobileKeys;
            this.mobileKeys = [];
            for(var i in this.mobileKeyData.mobileKeys) {
              var obj = {key: this.mobileKeyData.mobileKeys[i]};
              this.mobileKeys.push(obj);
            }
            this.loading = false;
        });
        }
    }
}
