9b3f31247 2018-02-21 11:52:46 -0500 Isaac Datlof | chore: flipadelphia
diff --git a/src/app/app-routing.module.ts b/src/app/app-routing.module.ts

+import { FlipadelphiaWrapperComponent } from '@my-common';
@@ -44,6 +45,7 @@ const routes: Routes = [
+  { path: 'toggles', component: FlipadelphiaWrapperComponent, resolve: { translations: TranslationsResolver } },

diff --git a/src/modules/common/components/flipadelphia-wrapper.component.ts b/src/modules/common/components/flipadelphia-wrapper.component.ts
new file mode 100644
index 000000000..dc253a39d
--- /dev/null
+++ b/src/modules/common/components/flipadelphia-wrapper.component.ts
@@ -0,0 +1,7 @@
+import { Component } from '@angular/core';
+import { MyToggles } from '../my-toggles';
+
+@Component({ template: '<flipadelphia [flipadelphiaInstance]="toggles"></flipadelphia>' })
+export class FlipadelphiaWrapperComponent {
+  constructor(public toggles: MyToggles) {}
+}

diff --git a/src/modules/common/index.ts b/src/modules/common/index.ts
index bfea4aa34..427fbeeb0 100644
--- a/src/modules/common/index.ts
+++ b/src/modules/common/index.ts
@@ -62,3 +62,5 @@ export { ObjectEntitlementService } from './services/object-entitlement.service'
+export { FlipadelphiaWrapperComponent } from './components/flipadelphia-wrapper.component';
+export { MyToggles } from './my-toggles';

diff --git a/src/modules/common/my-common.module.ts b/src/modules/common/my-common.module.ts
index aaab880b1..f7b0b4d6c 100644
--- a/src/modules/common/my-common.module.ts
+++ b/src/modules/common/my-common.module.ts
+import { Flipadelphia, FlipadelphiaModule } from 'flipadelphia';
+import { MyToggles } from './my-toggles';
+import { FlipadelphiaWrapperComponent } from './components/flipadelphia-wrapper.component';


 @NgModule({
+  imports: [FlipadelphiaModule],
+    FlipadelphiaWrapperComponent
+  ],
+  entryComponents: [
+    FlipadelphiaWrapperComponent
   ],
   exports: [
+    FlipadelphiaWrapperComponent
   ]
 })
 export class MyCommonModule {
@@ -87,6 +95,7 @@ export class MyCommonModule {
       ngModule: MyCommonModule,
       providers: [
+        MyToggles,
       ]
     };
   }

diff --git a/src/modules/common/my-toggles.ts b/src/modules/common/my-toggles.ts
new file mode 100644
index 000000000..b8cce5972
--- /dev/null
+++ b/src/modules/common/my-toggles.ts
@@ -0,0 +1,12 @@
+import { Injectable } from '@angular/core';
+import { Flip, Flipadelphia } from 'flipadelphia';
+
+@Injectable()
+export class MyToggles extends Flipadelphia {
+  @Flip(false, 'This is a message for foo') foo: boolean;
+  @Flip(true) bar: boolean;
+
+  constructor() {
+    super();
+  }
+}

SOME COMPONENT HTML:
@@ -1,5 +1,5 @@
+<div *ngIf="toggles.bar">

SOME COMPONENT TS:
+import { MyToggles } from '@mycommon';

+  constructor(public toggles: MyToggles) { }
