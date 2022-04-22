import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LocalStorageService, TokenAuthServiceProxy, TokenService } from './components/passes.service';
import { AuthenticateModel, AuthenticateResultModel } from './models/CreateIssuerCustomerDto';
import { UrlHelper } from 'UrlHelper';
import { AppConsts } from './AppConsts';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    authenticateModel: AuthenticateModel = new AuthenticateModel();
    authenticateResult: AuthenticateResultModel = new AuthenticateResultModel();
    private _localStorageService: LocalStorageService;
    private _tokenService: TokenService;

    rememberMe: boolean;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    constructor(private renderer: Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any,
        private _tokenAuthService: TokenAuthServiceProxy, private element: ElementRef, public location: Location) { }
    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }
        // this.authenticateModel.userNameOrEmailAddress = "test";
        // this.authenticateModel.password = "test";
        // this._tokenAuthService
        //     .authenticate(this.authenticateModel)
        //     .subscribe({
        //         next: (result: AuthenticateResultModel) => {
        //             console.log(result);
        //             this._tokenAuthService.processAuthenticateResult(result);

        //         },
        //         error: (err: any) => {
        //         },
        //     });
    }
    twoFactorRememberClientTokenName = 'TwoFactorRememberClientToken';

    authenticate(
        finallyCallback?: () => void,
        redirectUrl?: string,
        captchaResponse?: string
    ): void {

        const self = this;
        this._localStorageService.getItem(
            this.twoFactorRememberClientTokenName,
            function (err, value) {
                self.authenticateModel.twoFactorRememberClientToken =
                    value?.token;
                self.authenticateModel.singleSignIn = UrlHelper.getSingleSignIn();
                self.authenticateModel.returnUrl = UrlHelper.getReturnUrl();
                self.authenticateModel.captchaResponse = captchaResponse;

                self._tokenAuthService
                    .authenticate(self.authenticateModel)
                    .subscribe({
                        next: (result: AuthenticateResultModel) => {
                            self.processAuthenticateResult(result, redirectUrl);
                            finallyCallback();
                        },
                        error: (err: any) => {
                            finallyCallback();
                        },
                    });
            }
        );
    }

    private processAuthenticateResult(
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

    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (titlee === 'signup' || titlee === 'nucleoicons') {
            return false;
        }
        else {
            return true;
        }
    }

    private login(
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

function redirectUrl(result: AuthenticateResultModel, redirectUrl: any) {
    throw new Error('Function not implemented.');
}
