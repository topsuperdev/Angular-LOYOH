
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { DateTime, Duration } from "luxon";
import { CreateIssuerProgramDto, CreateOrEditIssuerProgramDto, GetProfilePictureOutput, UpdateProfilePictureInput } from 'app/models/CreateIssuerProgramDto';
import { AuthenticateModel, AuthenticateResultModel } from 'app/models/CreateIssuerCustomerDto';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
import * as localForage from 'localforage';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class IssuerProgramsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://linux.caasius.com";
  }

  /**
   * @param body (optional) 
   * @return Success
   */
  createOrEdit(body: CreateOrEditIssuerProgramDto | undefined): Observable<void> {
    let url_ = this.baseUrl + "/api/services/app/IssuerPrograms/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json-patch+json",
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processCreateOrEdit(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processCreateOrEdit(<any>response_);
        } catch (e) {
          return <Observable<void>><any>_observableThrow(e);
        }
      } else
        return <Observable<void>><any>_observableThrow(response_);
    }));
  }

  protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  /**
   * @param id (optional) 
   * @return Success
   */
  delete(id: number | undefined): Observable<void> {
    let url_ = this.baseUrl + "/api/services/app/IssuerPrograms/Delete?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
      })
    };

    return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processDelete(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processDelete(<any>response_);
        } catch (e) {
          return <Observable<void>><any>_observableThrow(e);
        }
      } else
        return <Observable<void>><any>_observableThrow(response_);
    }));
  }

  protected processDelete(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }
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

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(new ApiException(message, status, response, headers, null));
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

@Injectable()
export class TokenAuthServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  authenticateModel: AuthenticateModel = new AuthenticateModel();
  authenticateResult: AuthenticateResultModel = new AuthenticateResultModel();
  private _localStorageService: LocalStorageService;
  rememberMe: boolean;
  private _tokenService: TokenService;
  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://linux.caasius.com";
  }

  /**
   * @param body (optional) 
   * @return Success
   */
  authenticate(body: AuthenticateModel | undefined): Observable<AuthenticateResultModel> {
    let url_ = this.baseUrl + "/api/TokenAuth/Authenticate";
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
      return this.processAuthenticate(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAuthenticate(<any>response_);
        } catch (e) {
          return <Observable<AuthenticateResultModel>><any>_observableThrow(e);
        }
      } else
        return <Observable<AuthenticateResultModel>><any>_observableThrow(response_);
    }));
  }

  protected processAuthenticate(response: HttpResponseBase): Observable<AuthenticateResultModel> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AuthenticateResultModel.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<AuthenticateResultModel>(<any>null);
  }

  public processAuthenticateResult(
    authenticateResult: AuthenticateResultModel,
    redirectUrl?: string
  ) {
    this.authenticateResult = authenticateResult;
    if (authenticateResult.accessToken) {
      if (authenticateResult.returnUrl && !redirectUrl) {
        redirectUrl = authenticateResult.returnUrl;
      }

      this.login(
        authenticateResult.accessToken,
        authenticateResult.encryptedAccessToken,
        authenticateResult.expireInSeconds,
        authenticateResult.refreshToken,
        authenticateResult.refreshTokenExpireInSeconds,
        this.rememberMe,
        authenticateResult.twoFactorRememberClientToken,
        redirectUrl
      );
    }
  }

  public login(
    accessToken: string,
    encryptedAccessToken: string,
    expireInSeconds: number,
    refreshToken: string,
    refreshTokenExpireInSeconds: number,
    rememberMe?: boolean,
    twoFactorRememberClientToken?: string,
    redirectUrl?: string
  ): void {
    let tokenExpireDate = rememberMe
      ? new Date(new Date().getTime() + 1000 * expireInSeconds)
      : undefined;

    this._tokenService.setToken(accessToken, tokenExpireDate);

    if (refreshToken && rememberMe) {
      let refreshTokenExpireDate = rememberMe
        ? new Date(
          new Date().getTime() + 1000 * refreshTokenExpireInSeconds
        )
        : undefined;
      this._tokenService.setRefreshToken(
        refreshToken,
        refreshTokenExpireDate);
    }

    let self = this;
    this._localStorageService.setItem(
      AppConsts.authorization.encrptedAuthTokenName,
      {
        token: encryptedAccessToken,
        expireDate: tokenExpireDate,
      }

    );
  }


}

@Injectable()
export class LocalStorageService {

  getItem(key: string, callback: any): void {
    if (!localForage) {
      return;
    }

    localForage.getItem(key, callback);
  }


  setItem(key, value, callback?: any): void {
    if (!localForage) {
      return;
    }

    if (value === null) {
      value = undefined;
    }

    localForage.setItem(key, value, callback);
  }

  removeItem(key, callback?: any): void {
    if (!localForage) {
      return;
    }

    localForage.removeItem(key, callback);
  }

}

/// <reference types="abp-web-resources" />
import * as ɵngcc0 from '@angular/core';
import { AppConsts } from 'app/AppConsts';
export declare class TokenService {
  getToken(): any;
  getTokenCookieName(): string;
  clearToken(): void;
  setToken(authToken: string, expireDate?: Date): void;
  getRefreshToken(): string;
  getRefreshTokenCookieName(): string;
  clearRefreshToken(): void;
  setRefreshToken(refreshToken: string, expireDate?: Date): void;
  static ɵfac: ɵngcc0.ɵɵFactoryDef<TokenService, never>;
}

//# sourceMappingURL=token.service.d.ts.map

/// <reference types="abp-web-resources" />
export declare class LogService {
  debug(logObject?: any): void;
  info(logObject?: any): void;
  warn(logObject?: any): void;
  error(logObject?: any): void;
  fatal(logObject?: any): void;
  static ɵfac: ɵngcc0.ɵɵFactoryDef<LogService, never>;
}

@Injectable()
export class ProfileServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://linux.caasius.com";
  }

  protected processSendVerificationSms(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  protected processVerifySmsCode(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  /**
   * @return Success
   */
  prepareCollectedData(): Observable<void> {
    let url_ = this.baseUrl + "/api/services/app/Profile/PrepareCollectedData";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processPrepareCollectedData(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processPrepareCollectedData(<any>response_);
        } catch (e) {
          return <Observable<void>><any>_observableThrow(e);
        }
      } else
        return <Observable<void>><any>_observableThrow(response_);
    }));
  }

  protected processPrepareCollectedData(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }


  protected processUpdateCurrentUserProfile(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  protected processChangePassword(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  /**
   * @param body (optional) 
   * @return Success
   */
  updateProfilePicture(body: UpdateProfilePictureInput | undefined): Observable<void> {
    let url_ = this.baseUrl + "/api/services/app/Profile/UpdateProfilePicture";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json-patch+json",
      })
    };

    return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processUpdateProfilePicture(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processUpdateProfilePicture(<any>response_);
        } catch (e) {
          return <Observable<void>><any>_observableThrow(e);
        }
      } else
        return <Observable<void>><any>_observableThrow(response_);
    }));
  }

  protected processUpdateProfilePicture(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  /**
   * @param body (optional) 
   * @return Success
   */
  updatePicture(body: UpdateProfilePictureInput | undefined): Observable<string> {
    let url_ = "https://linux.caasius.com/api/services/app/Profile/UpdatePicture";
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

    return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processUpdatePicture(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processUpdatePicture(<any>response_);
        } catch (e) {
          return <Observable<string>><any>_observableThrow(e);
        }
      } else
        return <Observable<string>><any>_observableThrow(response_);
    }));
  }

  protected processUpdatePicture(response: HttpResponseBase): Observable<string> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<string>(<any>null);
  }




  /**
   * @return Success
   */
  getProfilePicture(): Observable<GetProfilePictureOutput> {
    let url_ = this.baseUrl + "/api/services/app/Profile/GetProfilePicture";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetProfilePicture(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetProfilePicture(<any>response_);
        } catch (e) {
          return <Observable<GetProfilePictureOutput>><any>_observableThrow(e);
        }
      } else
        return <Observable<GetProfilePictureOutput>><any>_observableThrow(response_);
    }));
  }

  protected processGetProfilePicture(response: HttpResponseBase): Observable<GetProfilePictureOutput> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetProfilePictureOutput.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<GetProfilePictureOutput>(<any>null);
  }

  /**
   * @param username (optional) 
   * @return Success
   */
  getProfilePictureByUserName(username: string | undefined): Observable<GetProfilePictureOutput> {
    let url_ = this.baseUrl + "/api/services/app/Profile/GetProfilePictureByUserName?";
    if (username === null)
      throw new Error("The parameter 'username' cannot be null.");
    else if (username !== undefined)
      url_ += "username=" + encodeURIComponent("" + username) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetProfilePictureByUserName(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetProfilePictureByUserName(<any>response_);
        } catch (e) {
          return <Observable<GetProfilePictureOutput>><any>_observableThrow(e);
        }
      } else
        return <Observable<GetProfilePictureOutput>><any>_observableThrow(response_);
    }));
  }

  protected processGetProfilePictureByUserName(response: HttpResponseBase): Observable<GetProfilePictureOutput> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetProfilePictureOutput.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<GetProfilePictureOutput>(<any>null);
  }

  /**
   * @param userId (optional) 
   * @param tenantId (optional) 
   * @return Success
   */
  getFriendProfilePicture(userId: number | undefined, tenantId: number | undefined): Observable<GetProfilePictureOutput> {
    let url_ = this.baseUrl + "/api/services/app/Profile/GetFriendProfilePicture?";
    if (userId === null)
      throw new Error("The parameter 'userId' cannot be null.");
    else if (userId !== undefined)
      url_ += "UserId=" + encodeURIComponent("" + userId) + "&";
    if (tenantId === null)
      throw new Error("The parameter 'tenantId' cannot be null.");
    else if (tenantId !== undefined)
      url_ += "TenantId=" + encodeURIComponent("" + tenantId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetFriendProfilePicture(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetFriendProfilePicture(<any>response_);
        } catch (e) {
          return <Observable<GetProfilePictureOutput>><any>_observableThrow(e);
        }
      } else
        return <Observable<GetProfilePictureOutput>><any>_observableThrow(response_);
    }));
  }

  protected processGetFriendProfilePicture(response: HttpResponseBase): Observable<GetProfilePictureOutput> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetProfilePictureOutput.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<GetProfilePictureOutput>(<any>null);
  }

  /**
   * @param userId (optional) 
   * @return Success
   */
  getProfilePictureByUser(userId: number | undefined): Observable<GetProfilePictureOutput> {
    let url_ = this.baseUrl + "/api/services/app/Profile/GetProfilePictureByUser?";
    if (userId === null)
      throw new Error("The parameter 'userId' cannot be null.");
    else if (userId !== undefined)
      url_ += "userId=" + encodeURIComponent("" + userId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetProfilePictureByUser(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetProfilePictureByUser(<any>response_);
        } catch (e) {
          return <Observable<GetProfilePictureOutput>><any>_observableThrow(e);
        }
      } else
        return <Observable<GetProfilePictureOutput>><any>_observableThrow(response_);
    }));
  }

  protected processGetProfilePictureByUser(response: HttpResponseBase): Observable<GetProfilePictureOutput> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetProfilePictureOutput.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<GetProfilePictureOutput>(<any>null);
  }

  protected processChangeLanguage(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }
}
export interface IValidationErrorInfo {
  message: string;
  members: string[];
}
export interface IErrorInfo {
  code: number;
  message: string;
  details: string;
  validationErrors: IValidationErrorInfo[];
}
export interface IAjaxResponse {
  success: boolean;
  result?: any;
  targetUrl?: string;
  error?: IErrorInfo;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
/// <reference types="abp-web-resources" />
export declare class SettingService {
  get(name: string): string;
  getBoolean(name: string): boolean;
  getInt(name: string): number;
  static ɵfac: ɵngcc0.ɵɵFactoryDef<SettingService, never>;
}