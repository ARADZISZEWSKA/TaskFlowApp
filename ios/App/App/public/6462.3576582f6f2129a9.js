"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6462],{6462:(w,_,r)=>{r.r(_),r.d(_,{SettingsAdminPageModule:()=>A});var m=r(1368),p=r(4716),t=r(9548),C=r(8424),a=r(4548),h=r(1528),n=r(4496),s=r(628);let g=(()=>{var i;class d{constructor(e,o){this.modalController=e,this.userService=o,this.currentPassword="",this.newPassword="",this.confirmNewPassword=""}dismissModal(){this.modalController.dismiss()}changePassword(){var e=this;return(0,h.c)(function*(){console.log(e.newPassword),console.log(e.confirmNewPassword),e.newPassword===e.confirmNewPassword?e.userService.changePassword(e.currentPassword,e.newPassword,e.confirmNewPassword).subscribe(o=>{console.log("Password changed successfully",o),e.dismissModal()},o=>{console.error("Error changing password",o)}):console.log("Passwords do not match")})()}}return(i=d).\u0275fac=function(e){return new(e||i)(n.GI1(t.qS),n.GI1(s.o))},i.\u0275cmp=n.In1({type:i,selectors:[["app-change-admin-password-modal"]],decls:22,vars:3,consts:[[1,"ion-padding"],["slot","end"],[3,"click"],["position","stacked"],["type","password",3,"ngModel","ngModelChange"],["expand","block",3,"click"]],template:function(e,o){1&e&&(n.I0R(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),n.OEk(3,"Change Password"),n.C$Y(),n.I0R(4,"ion-buttons",1)(5,"ion-button",2),n.qCj("click",function(){return o.dismissModal()}),n.OEk(6,"Close"),n.C$Y()()()(),n.I0R(7,"ion-content",0)(8,"ion-item")(9,"ion-label",3),n.OEk(10,"Current Password"),n.C$Y(),n.I0R(11,"ion-input",4),n.iHE("ngModelChange",function(c){return n.kNx(o.currentPassword,c)||(o.currentPassword=c),c}),n.C$Y()(),n.I0R(12,"ion-item")(13,"ion-label",3),n.OEk(14,"New Password"),n.C$Y(),n.I0R(15,"ion-input",4),n.iHE("ngModelChange",function(c){return n.kNx(o.newPassword,c)||(o.newPassword=c),c}),n.C$Y()(),n.I0R(16,"ion-item")(17,"ion-label",3),n.OEk(18,"Confirm New Password"),n.C$Y(),n.I0R(19,"ion-input",4),n.iHE("ngModelChange",function(c){return n.kNx(o.confirmNewPassword,c)||(o.confirmNewPassword=c),c}),n.C$Y()(),n.I0R(20,"ion-button",5),n.qCj("click",function(){return o.changePassword()}),n.OEk(21,"Change Password"),n.C$Y()()),2&e&&(n.yG2(11),n.OKB("ngModel",o.currentPassword),n.yG2(4),n.OKB("ngModel",o.newPassword),n.yG2(4),n.OKB("ngModel",o.confirmNewPassword))},dependencies:[p.ue,p._G,t.sn,t.GS,t._i,t.wB,t.A5,t.Yb,t.QR,t.tM,t.Md,t.qG]}),d})();var P=r(5359);const f=[{path:"",component:(()=>{var i;class d{constructor(e,o,l){this.router=e,this.authService=o,this.modalController=l}presentChangeAdminPasswordModal(){var e=this;return(0,h.c)(function*(){return yield(yield e.modalController.create({component:g})).present()})()}ngOnInit(){}goToSettingsAdmin(){this.router.navigateByUrl("/settings-admin")}goToTasksAdmin(){this.router.navigateByUrl("/tasks-admin")}goToAdminHomepage(){this.router.navigateByUrl("/admin-homepage")}logout(){this.authService.logout().subscribe({next:e=>{console.log("Wylogowano pomy\u015blnie"),this.router.navigateByUrl("/login")},error:e=>{console.error("B\u0142\u0105d podczas wylogowywania",e)}})}goToManageUsers(){this.router.navigateByUrl("/manage-users")}}return(i=d).\u0275fac=function(e){return new(e||i)(n.GI1(C.E5),n.GI1(P.o),n.GI1(t.qS))},i.\u0275cmp=n.In1({type:i,selectors:[["app-settings-admin"]],decls:33,vars:2,consts:[[3,"translucent"],["size","large",2,"font-size","24px","margin-left","20px"],[3,"fullscreen"],[1,"flex-center"],["shape","round"],["size","large","name","cog-outline"],["expand","block",1,"ion-margin-top",3,"click"],["expand","block","color","danger",1,"ion-margin-top",3,"click"],["name","log-out-outline"],["slot","bottom","slot","fixed"],["tab","tasks",3,"click"],["name","hourglass-outline"],["tab","admin-homepage",3,"click"],["name","home"],["tab","settings","selected","",3,"click"],["name","settings"]],template:function(e,o){1&e&&(n.I0R(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title",1),n.OEk(3,"Settings"),n.C$Y()()(),n.I0R(4,"ion-content",2)(5,"div",3)(6,"ion-card",4)(7,"ion-card-content")(8,"ion-card-header"),n.wR5(9,"ion-icon",5),n.C$Y(),n.I0R(10,"ion-button",6),n.qCj("click",function(){return o.goToManageUsers()}),n.OEk(11," See all your users "),n.C$Y(),n.I0R(12,"ion-button",6),n.qCj("click",function(){return o.presentChangeAdminPasswordModal()}),n.OEk(13," Change your password "),n.C$Y(),n.I0R(14,"ion-button",7),n.qCj("click",function(){return o.logout()}),n.OEk(15," Log out "),n.wR5(16,"ion-icon",8),n.C$Y()()()()(),n.I0R(17,"ion-footer")(18,"ion-toolbar")(19,"ion-tabs")(20,"ion-tab-bar",9)(21,"ion-tab-button",10),n.qCj("click",function(){return o.goToTasksAdmin()}),n.wR5(22,"ion-icon",11),n.I0R(23,"ion-label"),n.OEk(24,"Projects"),n.C$Y()(),n.I0R(25,"ion-tab-button",12),n.qCj("click",function(){return o.goToAdminHomepage()}),n.wR5(26,"ion-icon",13),n.I0R(27,"ion-label"),n.OEk(28,"Home"),n.C$Y()(),n.I0R(29,"ion-tab-button",14),n.qCj("click",function(){return o.goToSettingsAdmin()}),n.wR5(30,"ion-icon",15),n.I0R(31,"ion-label"),n.OEk(32,"Settings"),n.C$Y()()()()()()),2&e&&(n.E7m("translucent",!0),n.yG2(4),n.E7m("fullscreen",!0))},dependencies:[t.sn,t.KC,t.Gg,t.YY,t._i,t.eV,t.wB,t.Ko,t.QR,t.mx,t.ej,t.tM,t.Md,t.CE],styles:["ion-tab-bar[_ngcontent-%COMP%]{--background: #ffffff;--color-selected: #488aff;--color: grey;--mode: ios;padding-top:5px;border-top:1px solid #e0e0e0}ion-card-header[_ngcontent-%COMP%]{justify-content:center;align-items:center;width:100%;color:var(--ion-secondary-text-color);display:block;text-align:center;padding:0 20px}ion-card-title[_ngcontent-%COMP%]{color:#243158}ion-card-content[_ngcontent-%COMP%]{padding-top:50px;padding-bottom:50px}.flex-center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%}ion-button[_ngcontent-%COMP%]{padding:5px;height:10px;--border-width:1px}@media (max-width: 600px){.ion-button[_ngcontent-%COMP%]{width:90%;padding-top:50%}}"]}),d})(),canActivate:[a.o]}];let M=(()=>{var i;class d{}return(i=d).\u0275fac=function(e){return new(e||i)},i.\u0275mod=n.a4G({type:i}),i.\u0275inj=n.s3X({imports:[C.qQ.forChild(f),C.qQ]}),d})(),A=(()=>{var i;class d{}return(i=d).\u0275fac=function(e){return new(e||i)},i.\u0275mod=n.a4G({type:i}),i.\u0275inj=n.s3X({imports:[m.MD,p.y,t.wZ,M]}),d})()},5359:(w,_,r)=>{r.d(_,{o:()=>C});var m=r(9212),p=r(4496),t=r(7048);let C=(()=>{var a;class h{constructor(s){this.http=s,this.baseUrl="https://taskflowapp.azurewebsites.net"}register(s){return this.http.post(`${this.baseUrl}/user/register`,s,{withCredentials:!0})}registerByAdmin(s){return this.http.post(`${this.baseUrl}/user/registerByAdmin`,s,{withCredentials:!0})}login(s){return this.http.post(`${this.baseUrl}/user/login`,s,{withCredentials:!0}).pipe((0,m.y)(g=>{localStorage.setItem("username",g.firstName),localStorage.setItem("role",g.role)}))}logout(){return this.http.post(`${this.baseUrl}/user/logout`,{},{withCredentials:!0}).pipe((0,m.y)(()=>{localStorage.removeItem("username"),localStorage.removeItem("role")}))}isLoggedIn(){return!!localStorage.getItem("username")}isUserAdmin(){return"admin"===localStorage.getItem("role")}}return(a=h).\u0275fac=function(s){return new(s||a)(p.CoB(t.KK))},a.\u0275prov=p.wxM({token:a,factory:a.\u0275fac,providedIn:"root"}),h})()},4548:(w,_,r)=>{r.d(_,{o:()=>C});var m=r(4496),p=r(5359),t=r(8424);let C=(()=>{var a;class h{constructor(s,g){this.authService=s,this.router=g}canActivate(s,g){if(this.authService.isLoggedIn()){if(this.authService.isUserAdmin())return!0;{const P=this.getUserRouteForState(g);return this.router.navigate([P]),!1}}return this.router.navigate(["/login"]),!1}getUserRouteForState(s){return{"/settings-admin":"/settings","/tasks-admin":"/tasks","/admin-homepage":"/home"}[s.url]||"/home"}}return(a=h).\u0275fac=function(s){return new(s||a)(m.CoB(p.o),m.CoB(t.E5))},a.\u0275prov=m.wxM({token:a,factory:a.\u0275fac,providedIn:"root"}),h})()}}]);