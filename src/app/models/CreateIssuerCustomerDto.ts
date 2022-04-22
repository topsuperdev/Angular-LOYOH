import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { DateTime } from 'luxon';




export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


export interface ICreateIssuerCustomerDto {
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
    passesAddUrlIos: string | undefined;
    customerState: number;
    issuerProgramId: number;
    tenantName: string | undefined;
    isAllowGdpr: boolean;
    id: string | undefined;
}

export class CreateIssuerCustomerDto implements ICreateIssuerCustomerDto {
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
    tenantName!: string | undefined;
    isAllowGdpr: boolean;
    id!: string | undefined;

    constructor(data?: ICreateIssuerCustomerDto) {
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

    static fromJS(data: any): CreateIssuerCustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateIssuerCustomerDto();
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
        data["passesAddUrlIos"] = this.passesAddUrlIos;
        data["customerState"] = this.customerState;
        data["issuerProgramId"] = this.issuerProgramId;
        data["tenantName"] = this.tenantName;
        data["isAllowGdpr"] = this.isAllowGdpr;
        data["id"] = this.id;
        return data;
    }
}

export class IssuerCustomerCustomerStateDefLookupTableDto implements IIssuerCustomerCustomerStateDefLookupTableDto {
    id!: number;
    displayName!: string | undefined;

    constructor(data?: IIssuerCustomerCustomerStateDefLookupTableDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.displayName = _data["displayName"];
        }
    }

    static fromJS(data: any): IssuerCustomerCustomerStateDefLookupTableDto {
        data = typeof data === 'object' ? data : {};
        let result = new IssuerCustomerCustomerStateDefLookupTableDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["displayName"] = this.displayName;
        return data;
    }
}

export interface IIssuerCustomerCustomerStateDefLookupTableDto {
    id: number;
    displayName: string | undefined;
}

export class AuthenticateResultModel implements IAuthenticateResultModel {
    accessToken!: string | undefined;
    encryptedAccessToken!: string | undefined;
    expireInSeconds!: number;
    shouldResetPassword!: boolean;
    passwordResetCode!: string | undefined;
    userId!: number;
    requiresTwoFactorVerification!: boolean;
    twoFactorAuthProviders!: string[] | undefined;
    twoFactorRememberClientToken!: string | undefined;
    returnUrl!: string | undefined;
    refreshToken!: string | undefined;
    refreshTokenExpireInSeconds!: number;

    constructor(data?: IAuthenticateResultModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.encryptedAccessToken = _data["encryptedAccessToken"];
            this.expireInSeconds = _data["expireInSeconds"];
            this.shouldResetPassword = _data["shouldResetPassword"];
            this.passwordResetCode = _data["passwordResetCode"];
            this.userId = _data["userId"];
            this.requiresTwoFactorVerification = _data["requiresTwoFactorVerification"];
            if (Array.isArray(_data["twoFactorAuthProviders"])) {
                this.twoFactorAuthProviders = [] as any;
                for (let item of _data["twoFactorAuthProviders"])
                    this.twoFactorAuthProviders!.push(item);
            }
            this.twoFactorRememberClientToken = _data["twoFactorRememberClientToken"];
            this.returnUrl = _data["returnUrl"];
            this.refreshToken = _data["refreshToken"];
            this.refreshTokenExpireInSeconds = _data["refreshTokenExpireInSeconds"];
        }
    }

    static fromJS(data: any): AuthenticateResultModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateResultModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["encryptedAccessToken"] = this.encryptedAccessToken;
        data["expireInSeconds"] = this.expireInSeconds;
        data["shouldResetPassword"] = this.shouldResetPassword;
        data["passwordResetCode"] = this.passwordResetCode;
        data["userId"] = this.userId;
        data["requiresTwoFactorVerification"] = this.requiresTwoFactorVerification;
        if (Array.isArray(this.twoFactorAuthProviders)) {
            data["twoFactorAuthProviders"] = [];
            for (let item of this.twoFactorAuthProviders)
                data["twoFactorAuthProviders"].push(item);
        }
        data["twoFactorRememberClientToken"] = this.twoFactorRememberClientToken;
        data["returnUrl"] = this.returnUrl;
        data["refreshToken"] = this.refreshToken;
        data["refreshTokenExpireInSeconds"] = this.refreshTokenExpireInSeconds;
        return data;
    }
}

export interface IAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number;
    shouldResetPassword: boolean;
    passwordResetCode: string | undefined;
    userId: number;
    requiresTwoFactorVerification: boolean;
    twoFactorAuthProviders: string[] | undefined;
    twoFactorRememberClientToken: string | undefined;
    returnUrl: string | undefined;
    refreshToken: string | undefined;
    refreshTokenExpireInSeconds: number;
}

export class AuthenticateModel implements IAuthenticateModel {
    userNameOrEmailAddress!: string;
    password!: string;
    twoFactorVerificationCode!: string | undefined;
    rememberClient!: boolean;
    twoFactorRememberClientToken!: string | undefined;
    singleSignIn!: boolean | undefined;
    returnUrl!: string | undefined;
    captchaResponse!: string | undefined;

    constructor(data?: IAuthenticateModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userNameOrEmailAddress = _data["userNameOrEmailAddress"];
            this.password = _data["password"];
            this.twoFactorVerificationCode = _data["twoFactorVerificationCode"];
            this.rememberClient = _data["rememberClient"];
            this.twoFactorRememberClientToken = _data["twoFactorRememberClientToken"];
            this.singleSignIn = _data["singleSignIn"];
            this.returnUrl = _data["returnUrl"];
            this.captchaResponse = _data["captchaResponse"];
        }
    }

    static fromJS(data: any): AuthenticateModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
        data["password"] = this.password;
        data["twoFactorVerificationCode"] = this.twoFactorVerificationCode;
        data["rememberClient"] = this.rememberClient;
        data["twoFactorRememberClientToken"] = this.twoFactorRememberClientToken;
        data["singleSignIn"] = this.singleSignIn;
        data["returnUrl"] = this.returnUrl;
        data["captchaResponse"] = this.captchaResponse;
        return data;
    }
}

export interface IAuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    twoFactorVerificationCode: string | undefined;
    rememberClient: boolean;
    twoFactorRememberClientToken: string | undefined;
    singleSignIn: boolean | undefined;
    returnUrl: string | undefined;
    captchaResponse: string | undefined;
}