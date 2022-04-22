import { Component, Injector, OnInit, Renderer2, Output, EventEmitter, ViewChild, NgModule } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IAjaxResponse, IssuerProgramsServiceProxy, ProfileServiceProxy, SettingService } from './passes.service';
import { finalize } from 'rxjs/operators';
import { CreateOrEditIssuerProgramDto, UpdateProfilePictureInput } from 'app/models/CreateIssuerProgramDto';
import { FormControl } from '@angular/forms';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { Cookie } from 'ng2-cookies';
import { Cmyk } from 'ngx-color-picker';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',    
    styleUrls: ['./components.component.less']
})

export class ComponentsComponent implements OnInit {
    @ViewChild('issuerProgramForm') issuerProgramForm: FormControl;
    company: string = 'caasius';
    logoUrl: string = 'assets/img/logo.png';
    companySiteUrl: string = 'https://caasius.com/';
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: { year: number, month: number };
    model: NgbDateStruct;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    apple = false;
    programLogo: any;
    heroImage: any;
    public uploader: FileUploader;
    public uploader2: FileUploader;
    public temporaryPictureUrl: string;
    public maxProfilPictureBytesUserFriendlyValue = 2;
    public useGravatarProfilePicture = false;
    private _uploaderOptions: FileUploaderOptions = {};

    public color8: string = '#2889e9';

    issuerProgram: CreateOrEditIssuerProgramDto = new CreateOrEditIssuerProgramDto();
    imageError: string;
    cardImageBase64: any;
    isImageSaved: boolean;
    setting: SettingService;
    imageChangedEvent: any = '';
    imageChangedEvent2: any = '';

    public cmykValue: string = '';

    public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);

    public onEventLog(event: string, data: any): void {
        console.log(event, data);
    }

    public onChangeColor(color: string): void {
        console.log('Colour changed:', color);
    }
    constructor(private renderer: Renderer2,
        injector: Injector,
        private _issuerProgramsServiceProxy: IssuerProgramsServiceProxy,
        private _profileService: ProfileServiceProxy,
        private _sanitizer: DomSanitizer
    ) {
        // super(injector);
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    ngOnInit() {
        this.temporaryPictureUrl = '';
        this.initFileUploader();
        this.initFileUploader2();
        this.issuerProgram.state = true;
        this.issuerProgram.barcodeText = "powered by caasius.com"
        this.issuerProgram.loyaltyPointLabel = "Collected"
        this.issuerProgram.stampCount = 10

        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function () {
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function () {
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }


    showSuccess() {
      
    }


    onsave() {
        console.log(this.issuerProgramForm);
    }

    save(): void {
        this.saving = true;

        this._issuerProgramsServiceProxy
            .createOrEdit(this.issuerProgram)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.showSuccess();
                this.issuerProgram = new CreateOrEditIssuerProgramDto();
            });
    }
    fileChangeEvent(event: any): void {
        if (event.target.files[0].size > 5242880) { //5MB
            console.log("ProfilePicture_Warn_SizeLimit");
            return;
        }
        this.imageChangedEvent = event;
    }

    fileChangeEvent2(event: any): void {
        if (event.target.files[0].size > 5242880) { //5MB
            console.log("ProfilePicture_Warn_SizeLimit");
            return;
        }
        this.imageChangedEvent2 = event;
    }

    imageCroppedFile(event: ImageCroppedEvent) {
        this.uploader.clearQueue();
        this.uploader.addToQueue([<File>base64ToFile(event.base64)]);
        this.programLogo = this._sanitizer.bypassSecurityTrustResourceUrl(event.base64);
    }
    imageCroppedFile2(event: ImageCroppedEvent) {
        this.uploader2.clearQueue();
        this.uploader2.addToQueue([<File>base64ToFile(event.base64)]);
        this.heroImage = this._sanitizer.bypassSecurityTrustResourceUrl(event.base64);
    }
    initFileUploader(): void {
        this.uploader = new FileUploader({ url: 'https://linux.caasius.com/Profile/UploadPicture' });
        this._uploaderOptions.autoUpload = false;
        this._uploaderOptions.authToken = 'Bearer ' + this.getAuth();
        this._uploaderOptions.removeAfterUpload = true;
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
            form.append('FileType', fileItem.file.type);
            form.append('FileName', 'ProfilePicture');
            form.append('FileToken', this.guid());
        };

        this.uploader.onSuccessItem = (item, response, status) => {
            const resp = <IAjaxResponse>JSON.parse(response);
            if (resp.success) {
                this.updateProfilePicture(resp.result.fileToken);
            } else {
                console.log(resp.error.message);
            }
        };

        this.uploader.setOptions(this._uploaderOptions);
    }
    getAuth(): string {
        return Cookie.get('Abp.AuthToken');
    }
    initFileUploader2(): void {
        this.uploader2 = new FileUploader({ url: 'https://linux.caasius.com/Profile/UploadPicture' });
        this._uploaderOptions.autoUpload = false;
        this._uploaderOptions.authToken = 'Bearer ' + this.getAuth();
        this._uploaderOptions.removeAfterUpload = true;
        this.uploader2.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader2.onBuildItemForm = (fileItem: FileItem, form: any) => {
            form.append('FileType', fileItem.file.type);
            form.append('FileName', 'ProfilePicture');
            form.append('FileToken', this.guid());
        };

        this.uploader2.onSuccessItem = (item, response, status) => {
            const resp = <IAjaxResponse>JSON.parse(response);
            if (resp.success) {
                this.updateProfilePicture2(resp.result.fileToken);
            } else {
                console.log(resp.error.message);
            }
        };

        this.uploader2.setOptions(this._uploaderOptions);
    }

    updateProfilePicture(fileToken: string): void {
        const input = new UpdateProfilePictureInput();
        input.fileToken = fileToken;
        input.x = 0;
        input.y = 0;
        input.width = 0;
        input.height = 0;
        this.issuerProgram.programUrl = '';
        this.saving = true;
        this._profileService.updatePicture(input)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe((response: any) => {
                console.log("this.issuerProgram.programUrl");
                this.issuerProgram.programUrl = response.result;
                console.log(this.issuerProgram.programUrl);
            });
    }
    updateProfilePicture2(fileToken: string): void {
        const input = new UpdateProfilePictureInput();
        input.fileToken = fileToken;
        input.x = 0;
        input.y = 0;
        input.width = 0;
        input.height = 0;
        this.issuerProgram.heroLogoUrl = '';
        this.saving = true;
        this._profileService.updatePicture(input)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe((response: any) => {
                console.log("this.issuerProgram.heroLogoUrl");
                this.issuerProgram.heroLogoUrl = response.result;
                console.log(this.issuerProgram.heroLogoUrl);
            });
    }

    updateProfilePictureToUseGravatar(): void {
        const input = new UpdateProfilePictureInput();
        input.useGravatarProfilePicture = this.useGravatarProfilePicture;

        this.saving = true;
        this._profileService.updatePicture(input)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe((response) => {
                console.log("this.issuerProgram.programUrl");
                console.log(this.issuerProgram.programUrl);
                this.issuerProgram.programUrl = response;
            });
    }

    updateProfilePictureToUseGravatar2(): void {
        const input = new UpdateProfilePictureInput();
        input.useGravatarProfilePicture = this.useGravatarProfilePicture;

        this.saving = true;
        this._profileService.updatePicture(input)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe((response) => {
                console.log("this.issuerProgram.heroLogoUrl");
                console.log(this.issuerProgram.heroLogoUrl);
                this.issuerProgram.heroLogoUrl = response;
            });
    }

    guid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    upload(): void {
        if (this.useGravatarProfilePicture) {
            this.updateProfilePictureToUseGravatar();
        } else {
            this.uploader.uploadAll();
        }
    }
    upload2(): void {
        if (this.useGravatarProfilePicture) {
            this.updateProfilePictureToUseGravatar2();
        } else {
            this.uploader2.uploadAll();
        }
    }
    canUseGravatar(): boolean {
        return this.setting.getBoolean('App.UserManagement.AllowUsingGravatarProfilePicture');
    }
    
    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }

    setGoogle() {
        this.apple = false;
    }

    setApple() {
        this.apple = true;
    }

}
