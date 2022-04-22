import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { CreateIssuerCustomerDto, IssuerCustomerCustomerStateDefLookupTableDto } from 'app/models/CreateIssuerCustomerDto';
import { DateTime } from 'luxon';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class IssuerCustomersServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://linux.caasius.com";
  }


  /**
   * @param id (optional) 
   * @return Success
   */
  getIssuerCustomerForEdit(id: string | undefined): Observable<GetIssuerCustomerForEditOutput> {
    let url_ = this.baseUrl + "/api/services/app/IssuerCustomers/GetIssuerCustomerForEdit?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetIssuerCustomerForEdit(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetIssuerCustomerForEdit(<any>response_);
        } catch (e) {
          return <Observable<GetIssuerCustomerForEditOutput>><any>_observableThrow(e);
        }
      } else
        return <Observable<GetIssuerCustomerForEditOutput>><any>_observableThrow(response_);
    }));
  }

  protected processGetIssuerCustomerForEdit(response: HttpResponseBase): Observable<GetIssuerCustomerForEditOutput> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetIssuerCustomerForEditOutput.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<GetIssuerCustomerForEditOutput>(<any>null);
  }
  /**
   * @param body (optional) 
   * @return Success
   */
  createOrEdit(body: CreateIssuerCustomerDto | undefined): Observable<CreateIssuerCustomerDto> {
    let url_ = this.baseUrl + "/api/services/app/IssuerCustomers/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json-patch+json",
        "Accept": "text/plain"
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processCreateOrEdit(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processCreateOrEdit(<any>response_);
        } catch (e) {
          return <Observable<CreateIssuerCustomerDto>><any>_observableThrow(e);
        }
      } else
        return <Observable<CreateIssuerCustomerDto>><any>_observableThrow(response_);
    }));
  }

  protected processCreateOrEdit(response: HttpResponseBase): Observable<CreateIssuerCustomerDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CreateIssuerCustomerDto.fromJS(resultData200.result);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<CreateIssuerCustomerDto>(<any>null);
  }

  getAllCustomerStateDefForTableDropdown(): Observable<IssuerCustomerCustomerStateDefLookupTableDto[]> {
    let url_ = this.baseUrl + "/api/services/app/IssuerCustomers/GetAllCustomerStateDefForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetAllCustomerStateDefForTableDropdown(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetAllCustomerStateDefForTableDropdown(<any>response_);
        } catch (e) {
          return <Observable<IssuerCustomerCustomerStateDefLookupTableDto[]>><any>_observableThrow(e);
        }
      } else
        return <Observable<IssuerCustomerCustomerStateDefLookupTableDto[]>><any>_observableThrow(response_);
    }));
  }

  protected processGetAllCustomerStateDefForTableDropdown(response: HttpResponseBase): Observable<IssuerCustomerCustomerStateDefLookupTableDto[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200)
            result200!.push(IssuerCustomerCustomerStateDefLookupTableDto.fromJS(item));
        }
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<IssuerCustomerCustomerStateDefLookupTableDto[]>(<any>null);
  }

}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(new ApiException(message, status, response, headers, null));
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

export class CreateOrEditIssuerCustomerDto implements ICreateOrEditIssuerCustomerDto {
  tenantId!: number | undefined;
  name!: string;
  email!: string;
  mobileNumber!: string | undefined;
  barcode!: string | undefined;
  stampCounter!: number;
  totalStampCounter!: number;
  lastStampEarnedDate!: DateTime | undefined;
  rewardCounter!: number;
  lastRewardEarnedDate!: DateTime | undefined;
  lastRewardUsedDate!: DateTime | undefined;
  passesAddUrl!: string | undefined;
  passesAddUrlIos!: string | undefined;
  customerState!: number;
  issuerProgramId!: number;
  tenantName!: string;
  isAllowGdpr: boolean;
  id!: string | undefined;

  constructor(data?: ICreateOrEditIssuerCustomerDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.tenantId = _data["tenantId"];
      this.name = _data["name"];
      this.email = _data["email"];
      this.mobileNumber = _data["mobileNumber"];
      this.barcode = _data["barcode"];
      this.stampCounter = _data["stampCounter"];
      this.totalStampCounter = _data["totalStampCounter"];
      this.lastStampEarnedDate = _data["lastStampEarnedDate"] ? DateTime.fromISO(_data["lastStampEarnedDate"].toString()) : <any>undefined;
      this.rewardCounter = _data["rewardCounter"];
      this.lastRewardEarnedDate = _data["lastRewardEarnedDate"] ? DateTime.fromISO(_data["lastRewardEarnedDate"].toString()) : <any>undefined;
      this.lastRewardUsedDate = _data["lastRewardUsedDate"] ? DateTime.fromISO(_data["lastRewardUsedDate"].toString()) : <any>undefined;
      this.passesAddUrl = _data["passesAddUrl"];
      this.passesAddUrlIos = _data["passesAddUrlIos"];
      this.customerState = _data["customerState"];
      this.issuerProgramId = _data["issuerProgramId"];
      this.tenantName = _data["tenantName"];
      this.isAllowGdpr = _data["isAllowGdpr"];
      this.id = _data["id"];
    }
  }

  static fromJS(data: any): CreateOrEditIssuerCustomerDto {
    data = typeof data === 'object' ? data : {};
    let result = new CreateOrEditIssuerCustomerDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["tenantId"] = this.tenantId;
    data["name"] = this.name;
    data["email"] = this.email;
    data["mobileNumber"] = this.mobileNumber;
    data["barcode"] = this.barcode;
    data["stampCounter"] = this.stampCounter;
    data["totalStampCounter"] = this.totalStampCounter;
    data["lastStampEarnedDate"] = this.lastStampEarnedDate ? this.lastStampEarnedDate.toString() : <any>undefined;
    data["rewardCounter"] = this.rewardCounter;
    data["lastRewardEarnedDate"] = this.lastRewardEarnedDate ? this.lastRewardEarnedDate.toString() : <any>undefined;
    data["lastRewardUsedDate"] = this.lastRewardUsedDate ? this.lastRewardUsedDate.toString() : <any>undefined;
    data["passesAddUrl"] = this.passesAddUrl;
    data["customerState"] = this.customerState;
    data["issuerProgramId"] = this.issuerProgramId;
    data["tenantName"] = this.tenantName;
    data["isAllowGdpr"] = this.isAllowGdpr;
    data["id"] = this.id;
    return data;
  }
}

export interface ICreateOrEditIssuerCustomerDto {
  tenantId: number | undefined;
  name: string;
  email: string;
  mobileNumber: string | undefined;
  barcode: string | undefined;
  stampCounter: number;
  totalStampCounter: number;
  lastStampEarnedDate: DateTime | undefined;
  rewardCounter: number;
  lastRewardEarnedDate: DateTime | undefined;
  lastRewardUsedDate: DateTime | undefined;
  passesAddUrl: string | undefined;
  customerState: number;
  issuerProgramId: number;
  tenantName: string;
  isAllowGdpr: boolean;
  id: string | undefined;
}

export class GetIssuerCustomerForEditOutput implements IGetIssuerCustomerForEditOutput {
  issuerCustomer!: CreateOrEditIssuerCustomerDto;
  customerStateDefDescription!: string | undefined;
  issuerProgramProgramName!: string | undefined;
  maxStampCount!: number;

  constructor(data?: IGetIssuerCustomerForEditOutput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.issuerCustomer = _data["issuerCustomer"] ? CreateOrEditIssuerCustomerDto.fromJS(_data["issuerCustomer"]) : <any>undefined;
      this.customerStateDefDescription = _data["customerStateDefDescription"];
      this.issuerProgramProgramName = _data["issuerProgramProgramName"];
      this.maxStampCount = _data["maxStampCount"];
    }
  }

  static fromJS(data: any): GetIssuerCustomerForEditOutput {
    data = typeof data === 'object' ? data : {};
    let result = new GetIssuerCustomerForEditOutput();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["issuerCustomer"] = this.issuerCustomer ? this.issuerCustomer.toJSON() : <any>undefined;
    data["customerStateDefDescription"] = this.customerStateDefDescription;
    data["issuerProgramProgramName"] = this.issuerProgramProgramName;
    data["maxStampCount"] = this.maxStampCount;
    return data;
  }
}

export interface IGetIssuerCustomerForEditOutput {
  issuerCustomer: CreateOrEditIssuerCustomerDto;
  customerStateDefDescription: string | undefined;
  issuerProgramProgramName: string | undefined;
  maxStampCount: number;
}