import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { DateTime, Duration } from "luxon";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


export interface ICreateIssuerProgramDto {
    issuerName: string;
    programName: string;
    loyaltyPointLabel: string;
    barcodeText: string;
    backgroundColor: string;
    stampCount: number;
    programUrl: string;
    heroLogoUrl: string;
    state: boolean;
    id: number | undefined;
}

export class CreateIssuerProgramDto implements ICreateIssuerProgramDto {
    issuerName!: string;
    programName!: string;
    loyaltyPointLabel!: string;
    barcodeText!: string;
    backgroundColor!: string;
    stampCount!: number;
    programUrl!: string;
    heroLogoUrl!: string;
    state!: boolean;
    id!: number | undefined;

    constructor(data?: ICreateIssuerProgramDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.issuerName = _data["issuerName"];
            this.programName = _data["programName"];
            this.loyaltyPointLabel = _data["loyaltyPointLabel"];
            this.barcodeText = _data["barcodeText"];
            this.backgroundColor = _data["backgroundColor"];
            this.stampCount = _data["stampCount"];
            this.programUrl = _data["programUrl"];
            this.heroLogoUrl = _data["heroLogoUrl"];
            this.state = _data["state"];
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): CreateIssuerProgramDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateIssuerProgramDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issuerName"] = this.issuerName;
        data["programName"] = this.programName;
        data["loyaltyPointLabel"] = this.loyaltyPointLabel;
        data["barcodeText"] = this.barcodeText;
        data["backgroundColor"] = this.backgroundColor;
        data["stampCount"] = this.stampCount;
        data["programUrl"] = this.programUrl;
        data["heroLogoUrl"] = this.heroLogoUrl;
        data["state"] = this.state;
        data["id"] = this.id;
        return data;
    }
}
export class UpdateProfilePictureInput implements IUpdateProfilePictureInput {
    fileToken!: string | undefined;
    x!: number;
    y!: number;
    width!: number;
    height!: number;
    useGravatarProfilePicture!: boolean;

    constructor(data?: IUpdateProfilePictureInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.fileToken = _data["fileToken"];
            this.x = _data["x"];
            this.y = _data["y"];
            this.width = _data["width"];
            this.height = _data["height"];
            this.useGravatarProfilePicture = _data["useGravatarProfilePicture"];
        }
    }

    static fromJS(data: any): UpdateProfilePictureInput {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateProfilePictureInput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fileToken"] = this.fileToken;
        data["x"] = this.x;
        data["y"] = this.y;
        data["width"] = this.width;
        data["height"] = this.height;
        data["useGravatarProfilePicture"] = this.useGravatarProfilePicture;
        return data;
    }
}

export interface IUpdateProfilePictureInput {
    fileToken: string | undefined;
    x: number;
    y: number;
    width: number;
    height: number;
    useGravatarProfilePicture: boolean;
}

export class CreateOrEditIssuerProgramDto implements ICreateOrEditIssuerProgramDto {
    issuerName!: string;
    programName!: string;
    loyaltyPointLabel!: string;
    barcodeText!: string;
    backgroundColor!: string;
    stampCount!: number;
    programUrl!: string;
    heroLogoUrl!: string;
    state!: boolean;
    programGuid!: string;
    id!: number | undefined;

    constructor(data?: ICreateOrEditIssuerProgramDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.issuerName = _data["issuerName"];
            this.programName = _data["programName"];
            this.loyaltyPointLabel = _data["loyaltyPointLabel"];
            this.barcodeText = _data["barcodeText"];
            this.backgroundColor = _data["backgroundColor"];
            this.stampCount = _data["stampCount"];
            this.programUrl = _data["programUrl"];
            this.heroLogoUrl = _data["heroLogoUrl"];
            this.state = _data["state"];
            this.programGuid = _data["programGuid"];
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): CreateOrEditIssuerProgramDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditIssuerProgramDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issuerName"] = this.issuerName;
        data["programName"] = this.programName;
        data["loyaltyPointLabel"] = this.loyaltyPointLabel;
        data["barcodeText"] = this.barcodeText;
        data["backgroundColor"] = this.backgroundColor;
        data["stampCount"] = this.stampCount;
        data["programUrl"] = this.programUrl;
        data["heroLogoUrl"] = this.heroLogoUrl;
        data["state"] = this.state;
        data["programGuid"] = this.programGuid;
        data["id"] = this.id;
        return data;
    }
}

export interface ICreateOrEditIssuerProgramDto {
    issuerName: string;
    programName: string;
    loyaltyPointLabel: string;
    barcodeText: string;
    backgroundColor: string;
    stampCount: number;
    programUrl: string;
    heroLogoUrl: string;
    state: boolean;
    programGuid: string;
    id: number | undefined;
}

export class GetProfilePictureOutput implements IGetProfilePictureOutput {
    profilePicture!: string | undefined;

    constructor(data?: IGetProfilePictureOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.profilePicture = _data["profilePicture"];
        }
    }

    static fromJS(data: any): GetProfilePictureOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetProfilePictureOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["profilePicture"] = this.profilePicture;
        return data; 
    }
}

export interface IGetProfilePictureOutput {
    profilePicture: string | undefined;
}