'use strict';



;define("myapp/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "myapp/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"ember-resolver",0,"ember-load-initializers",0,"myapp/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class App extends _application.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);
      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);
      _defineProperty(this, "Resolver", _emberResolver.default);
    }
  }
  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("myapp/authenticators/token", ["exports", "ember-simple-auth/authenticators/base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/authenticators/base"eaimeta@70e063a35619d71f
  //import { BaseAuthenticator } from 'ember-simple-auth/authenticators/base';
  var _default = _exports.default = _base.default.extend({
    restore(data) {},
    async authenticate(username, password) {
      //let response = await fetch('/api/token.json', {
      let response = await fetch('/auth/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      if (response.ok) {
        return response.json();
      } else {
        let error = await response.text();
        throw new Error(error);
      }
    },
    async invalidate(data) {}
  });
});
;define("myapp/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("myapp/components/ball", ["exports", "@ember/component", "@glimmer/component", "@ember/template", "@ember/template-factory"], function (_exports, _component, _component2, _template, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/template",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="ball" style={{this.ballStyle}}></div>

  */
  {
    "id": "ftKo66ND",
    "block": "[[[10,0],[14,0,\"ball\"],[15,5,[30,0,[\"ballStyle\"]]],[12],[13],[1,\"\\n\"]],[],false,[\"div\"]]",
    "moduleName": "myapp/components/ball.hbs",
    "isStrictMode": false
  });
  class BallComponent extends _component2.default {
    get ballStyle() {
      // Adjust translate based on your game logic
      return (0, _template.htmlSafe)(`transform: translate(${this.args.positionX}px, ${this.args.positionY}px);`); // Pass X and Y positions
    }
  }
  _exports.default = BallComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, BallComponent);
});
;define("myapp/components/navigation-bar", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function (_exports, _component, _templateOnly, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/template-only",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <nav class="navigation-bar">
      <button class="nav-button" type="button">Friends</button>
      <button class="nav-button" type="button">All</button>
      <button class="nav-button" type="button">Last</button>
  </nav>

  */
  {
    "id": "tLPJ+48H",
    "block": "[[[10,\"nav\"],[14,0,\"navigation-bar\"],[12],[1,\"\\n    \"],[10,\"button\"],[14,0,\"nav-button\"],[14,4,\"button\"],[12],[1,\"Friends\"],[13],[1,\"\\n    \"],[10,\"button\"],[14,0,\"nav-button\"],[14,4,\"button\"],[12],[1,\"All\"],[13],[1,\"\\n    \"],[10,\"button\"],[14,0,\"nav-button\"],[14,4,\"button\"],[12],[1,\"Last\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"nav\",\"button\"]]",
    "moduleName": "myapp/components/navigation-bar.hbs",
    "isStrictMode": false
  });
  var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
});
;define("myapp/components/paddle", ["exports", "@ember/component", "@glimmer/component", "@ember/template", "@ember/template-factory"], function (_exports, _component, _component2, _template, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/template",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="paddle {{this.args.side}}" style={{this.paddleStyle}}></div>

  */
  {
    "id": "S8zvLVaU",
    "block": "[[[10,0],[15,0,[29,[\"paddle \",[30,0,[\"args\",\"side\"]]]]],[15,5,[30,0,[\"paddleStyle\"]]],[12],[13],[1,\"\\n\"]],[],false,[\"div\"]]",
    "moduleName": "myapp/components/paddle.hbs",
    "isStrictMode": false
  });
  class PaddleComponent extends _component2.default {
    constructor() {
      super(...arguments);
      console.log('Paddle side:', this.args.side);
      console.log('Paddle position:', this.args.position);
    }
    get paddleStyle() {
      // You can adjust the translateY based on your logic
      return (0, _template.htmlSafe)(`transform: translateY(${this.args.position}px);`); // Pass position from args
    }
  }
  _exports.default = PaddleComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, PaddleComponent);
});
;define("myapp/components/profile-other", ["exports", "@ember/component", "@glimmer/component", "@ember/template-factory"], function (_exports, _component, _component2, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container-fluid row">
    {{!-- Profile picture column (1 part) --}}
    <div class="col-3">
      <img src="/images/default-profile.jpeg" alt="Profile Picture" class="profile-pic" />
    </div>

    {{!-- Profile details column (3 parts) --}}
    <div class="col-9">
      {{!-- First row of profile details --}}
      <div class="profile-details">
        <h2 class="name">Other User</h2>
        <h2 class="points">1000🏆</h2>
      </div>

      {{!-- Second row of profile details --}}
      <div class="profile-details">
        <h2 class="name">Some</h2>
        <h2 class="name">Other</h2>
        <h2 class="name">Stuff</h2>
      </div>

      <div class="profile-details">
        <h2 class="name">Some</h2>
        <h2 class="name">Other</h2>
        <h2 class="name">Stuff</h2>
      </div>

    </div>
  </div>
  */
  {
    "id": "fxZiKTTU",
    "block": "[[[10,0],[14,0,\"container-fluid row\"],[12],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"col-3\"],[12],[1,\"\\n    \"],[10,\"img\"],[14,\"src\",\"/images/default-profile.jpeg\"],[14,\"alt\",\"Profile Picture\"],[14,0,\"profile-pic\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"col-9\"],[12],[1,\"\\n\"],[1,\"    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Other User\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"points\"],[12],[1,\"1000🏆\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[1,\"    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Some\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Other\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Stuff\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Some\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Other\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Stuff\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"img\",\"h2\"]]",
    "moduleName": "myapp/components/profile-other.hbs",
    "isStrictMode": false
  });
  class ProfileOtherComponent extends _component2.default {
    get user() {
      return this.userTracker.selectedUser; // Access the selected user
    }
  }
  _exports.default = ProfileOtherComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ProfileOtherComponent);
});
;define("myapp/components/profile-own", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container-fluid row">
    {{!-- Profile picture column (1 part) --}}
    <div class="col-3">
      <img src="/images/default-profile.jpeg" alt="Profile Picture" class="profile-pic" />
    </div>

    {{!-- Profile details column (3 parts) --}}
    <div class="col-9">
      {{!-- First row of profile details --}}
      <div class="profile-details">
        <h2 class="name">OwnUser</h2>
        {{#if this.session.isAuthenticated}}
          <button class="logout-button" type="button" {{on "click" this.logout}}>Logout</button>
        {{/if}}
        <h2 class="points">1000🏆</h2>

      </div>

      {{!-- Second row of profile details --}}
      <div class="profile-details">
        <h2 class="name">Some</h2>
        <h2 class="name">Other</h2>
        <h2 class="name">Stuff</h2>
      </div>

      <div class="profile-details">
        <h2 class="name">Some</h2>
        <h2 class="name">Other</h2>
        <h2 class="name">Stuff</h2>
      </div>

    </div>
  </div>

  */
  {
    "id": "NZRAgy+7",
    "block": "[[[10,0],[14,0,\"container-fluid row\"],[12],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"col-3\"],[12],[1,\"\\n    \"],[10,\"img\"],[14,\"src\",\"/images/default-profile.jpeg\"],[14,\"alt\",\"Profile Picture\"],[14,0,\"profile-pic\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"col-9\"],[12],[1,\"\\n\"],[1,\"    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"OwnUser\"],[13],[1,\"\\n\"],[41,[30,0,[\"session\",\"isAuthenticated\"]],[[[1,\"        \"],[11,\"button\"],[24,0,\"logout-button\"],[24,4,\"button\"],[4,[38,5],[\"click\",[30,0,[\"logout\"]]],null],[12],[1,\"Logout\"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[10,\"h2\"],[14,0,\"points\"],[12],[1,\"1000🏆\"],[13],[1,\"\\n  \\n    \"],[13],[1,\"\\n\\n\"],[1,\"    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Some\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Other\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Stuff\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Some\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Other\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Stuff\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"div\",\"img\",\"h2\",\"if\",\"button\",\"on\"]]",
    "moduleName": "myapp/components/profile-own.hbs",
    "isStrictMode": false
  });
  let NavigationComponent = _exports.default = (_class = class NavigationComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    logout() {
      this.session.invalidate();
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "logout", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "logout"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, NavigationComponent);
});
;define("myapp/components/scoreboard", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function (_exports, _component, _templateOnly, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/template-only",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*

    {{!-- Profile picture column (1 part) --}}
    <div class="col-3">
      <h2 class="name">Next Match</h2>
      <User />
      <User />
    </div>

    {{!-- Profile details column (3 parts) --}}
    <div class="col-6">
      <h1>3:1</h1>
    </div>

    <div class="col-3">
     <h2 class="name">Tournament Rank</h2>
      <User />
      <User />
    </div>


  */
  {
    "id": "lWxHSrTw",
    "block": "[[[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"col-3\"],[12],[1,\"\\n    \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Next Match\"],[13],[1,\"\\n    \"],[8,[39,2],null,null,null],[1,\"\\n    \"],[8,[39,2],null,null,null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"col-6\"],[12],[1,\"\\n    \"],[10,\"h1\"],[12],[1,\"3:1\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"col-3\"],[12],[1,\"\\n   \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,\"Tournament Rank\"],[13],[1,\"\\n    \"],[8,[39,2],null,null,null],[1,\"\\n    \"],[8,[39,2],null,null,null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"]],[],false,[\"div\",\"h2\",\"user\",\"h1\"]]",
    "moduleName": "myapp/components/scoreboard.hbs",
    "isStrictMode": false
  });
  var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
});
;define("myapp/components/user-list", ["exports", "@ember/component", "@glimmer/tracking", "@ember/object", "@ember/template-factory"], function (_exports, _component, _tracking, _object, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="scrollable-list">
      {{#each this.users as |user|}}
          <User @name={{user.name}} @points={{user.points}} @profilePicture={{user.profilePicture}} @selectUser={{this.selectUser}} />
      {{/each}}
  </div>
  */
  {
    "id": "Bche07Eo",
    "block": "[[[10,0],[14,0,\"scrollable-list\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"users\"]]],null]],null],null,[[[1,\"        \"],[8,[39,3],null,[[\"@name\",\"@points\",\"@profilePicture\",\"@selectUser\"],[[30,1,[\"name\"]],[30,1,[\"points\"]],[30,1,[\"profilePicture\"]],[30,0,[\"selectUser\"]]]],null],[1,\"\\n\"]],[1]],null],[13]],[\"user\"],false,[\"div\",\"each\",\"-track-array\",\"user\"]]",
    "moduleName": "myapp/components/user-list.hbs",
    "isStrictMode": false
  });
  let UserListComponent = _exports.default = (_class = class UserListComponent extends _component.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "users", _descriptor, this);
      this.fetchUsers();
    }
    async fetchUsers() {
      try {
        const response = await fetch('/api/users.json'); // Simulating API call
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.users = await response.json();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "users", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _applyDecoratedDescriptor(_class.prototype, "fetchUsers", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "fetchUsers"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserListComponent);
});
;define("myapp/components/user", ["exports", "@ember/component", "@glimmer/component", "@ember/template-factory"], function (_exports, _component, _component2, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- app/components/user-card.hbs --}}
  <div class="user-card" role="button" tabindex="0" onclick={{this.selectUser}}>
      <img src={{@profilePicture}} alt="Profile Picture" class="user-pic user" />
      <div class="profile-details">
          <h2 class="name">{{@name}}</h2>
          <h2 class="points">{{@points}}🏆</h2>
      </div>
  </div>

  */
  {
    "id": "TimdHeR6",
    "block": "[[[10,0],[14,0,\"user-card\"],[14,\"role\",\"button\"],[14,\"tabindex\",\"0\"],[15,\"onclick\",[30,0,[\"selectUser\"]]],[12],[1,\"\\n    \"],[10,\"img\"],[15,\"src\",[30,1]],[14,\"alt\",\"Profile Picture\"],[14,0,\"user-pic user\"],[12],[13],[1,\"\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n        \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,[30,2]],[13],[1,\"\\n        \"],[10,\"h2\"],[14,0,\"points\"],[12],[1,[30,3]],[1,\"🏆\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"@profilePicture\",\"@name\",\"@points\"],false,[\"div\",\"img\",\"h2\"]]",
    "moduleName": "myapp/components/user.hbs",
    "isStrictMode": false
  });
  class UserComponent extends _component2.default {
    // Define a method to select a user
    selectUser() {
      console.log('User selected:');
    }
  }
  _exports.default = UserComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserComponent);
});
;define("myapp/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-welcome-page/components/welcome-page"eaimeta@70e063a35619d71f
});
;define("myapp/container-debug-adapter", ["exports", "ember-resolver/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _containerDebugAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-resolver/container-debug-adapter"eaimeta@70e063a35619d71f
});
;define("myapp/controllers/login", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/service", "@ember/object"], function (_exports, _controller, _tracking, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let LoginController = _exports.default = (_class = class LoginController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "username", _descriptor3, this);
      _initializerDefineProperty(this, "password", _descriptor4, this);
      _initializerDefineProperty(this, "error", _descriptor5, this);
    }
    update(attr, event) {
      this[attr] = event.target.value;
    }
    async login(event) {
      event.preventDefault();
      try {
        await this.session.authenticate('authenticator:token', this.username, this.password);
        this.router.transitionTo('pong-game'); // Redirect here after successful authentication
      } catch (error) {
        this.error = error;
      }
    }
    async register() {
      try {
        const response = await fetch('/register/users/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        if (!response.ok) {
          throw new Error('Registration failed');
        }

        // Optionally, log in the user directly after registration
        await this.session.authenticate('authenticator:token', this.username, this.password);
        this.router.transitionTo('pong-game'); // Redirect here after successful authentication
      } catch (error) {
        this.error = error.message || 'An error occurred during registration';
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "username", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "password", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "update", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "login", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "login"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "register", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "register"), _class.prototype), _class);
});
;define("myapp/controllers/pong-game", ["exports", "@ember/controller", "@glimmer/tracking"], function (_exports, _controller, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let PongGameController = _exports.default = (_class = class PongGameController extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "leftPaddlePosition", _descriptor, this);
      // Normalize between 0 and 1
      _initializerDefineProperty(this, "rightPaddlePosition", _descriptor2, this);
      // Normalize between 0 and 1
      _initializerDefineProperty(this, "ballPositionX", _descriptor3, this);
      // Ball position
      _initializerDefineProperty(this, "ballPositionY", _descriptor4, this);
      // Ball position
      _initializerDefineProperty(this, "leftScore", _descriptor5, this);
      _initializerDefineProperty(this, "rightScore", _descriptor6, this);
      // Track the state of key presses
      _defineProperty(this, "upKeyPressed", false);
      _defineProperty(this, "downKeyPressed", false);
      this.setupKeyListeners();
      this.startKeyPolling(); // Start polling when the controller is created
    }
    setupKeyListeners() {
      // Use the traditional function syntax for event listener methods
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
      window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    startKeyPolling() {
      this.pollingInterval = setInterval(() => {
        this.sendKeyPresses();
      }, 50); // Poll every 50ms
    }
    async sendKeyPresses() {
      const keyPress = this.getKeyPress();
      try {
        const keyPress = this.getKeyPress(); // Assuming this gets the current key press state

        // Create the request body
        const requestBody = JSON.stringify({
          keyPress
        });

        // Log the request body to the console
        console.log('Request body sent to API:', requestBody);
        const response = await fetch('/api3/pong/pong/game/', {
          //fetch('/api/gamestate.json'
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody // Use the formatted request body here
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.updateGameState(data);
      } catch (error) {
        console.error('Error sending key press:', error);
      }
    }
    getKeyPress() {
      if (this.upKeyPressed && !this.downKeyPressed) {
        return 'up';
      } else if (this.downKeyPressed && !this.upKeyPressed) {
        return 'down';
      } else {
        return ''; // No keys pressed
      }
    }
    handleKeyDown(event) {
      if (event.key === 'ArrowUp') {
        this.upKeyPressed = true;
        console.log('Up key pressed');
      } else if (event.key === 'ArrowDown') {
        this.downKeyPressed = true;
        console.log('Down key pressed');
      }
    }
    handleKeyUp(event) {
      if (event.key === 'ArrowUp') {
        this.upKeyPressed = false;
        console.log('Up key released');
      } else if (event.key === 'ArrowDown') {
        this.downKeyPressed = false;
        console.log('Down key released');
      }
    }
    willDestroy() {
      super.willDestroy();
      // Cleanup the event listeners when the controller is destroyed
      window.removeEventListener('keydown', this.handleKeyDown.bind(this));
      window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    }
    updateGameState(data) {
      // Assuming the response structure matches what you provided
      this.ballPositionX = data.ball_x;
      this.ballPositionY = data.ball_y;
      this.leftPaddlePosition = data.left_paddle_y;
      this.rightPaddlePosition = data.right_paddle_y;
      this.leftScore = data.left_score;
      this.rightScore = data.right_score;
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "leftPaddlePosition", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0.5;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "rightPaddlePosition", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0.5;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "ballPositionX", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0.5;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "ballPositionY", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0.5;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "leftScore", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "rightScore", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _class);
});
;define("myapp/data-adapter", ["exports", "@ember-data/debug/data-adapter"], function (_exports, _dataAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dataAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug/data-adapter"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/app-version", ["exports", "@ember/component/helper", "myapp/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"myapp/config/environment",0,"ember-cli-app-version/utils/regexp"eaimeta@70e063a35619d71f
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }
    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }
    return match ? match[0] : version;
  }
  var _default = _exports.default = (0, _helper.helper)(appVersion);
});
;define("myapp/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/helpers/page-title"eaimeta@70e063a35619d71f
});
;define("myapp/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "myapp/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-app-version/initializer-factory",0,"myapp/config/environment"eaimeta@70e063a35619d71f
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = _exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define("myapp/initializers/ember-data", ["exports", "@ember-data/request-utils/deprecation-support"], function (_exports, _deprecationSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/request-utils/deprecation-support"eaimeta@70e063a35619d71f
  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = _exports.default = {
    name: 'ember-data',
    initialize(application) {
      application.registerOptionsForType('serializer', {
        singleton: false
      });
      application.registerOptionsForType('adapter', {
        singleton: false
      });
    }
  };
});
;define("myapp/initializers/ember-simple-auth", ["exports", "ember-simple-auth/initializers/ember-simple-auth"], function (_exports, _emberSimpleAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberSimpleAuth.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/initializers/ember-simple-auth"eaimeta@70e063a35619d71f
});
;define("myapp/router", ["exports", "@ember/routing/router", "myapp/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/router",0,"myapp/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Router extends _router.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "location", _environment.default.locationType);
      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }
  }
  _exports.default = Router;
  Router.map(function () {
    this.route('login');
    this.route('pong-game');
  });
});
;define("myapp/routes/application", ["exports", "@ember/routing/route", "@ember/service", "@ember/object"], function (_exports, _route, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ApplicationRoute = _exports.default = (_class = class ApplicationRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
      // Flag to track if the session has been set up
      _defineProperty(this, "sessionInitialized", false);
    }
    async beforeModel() {
      if (!this.sessionInitialized) {
        // Run the session setup only once
        await this.session.setup();
        this.sessionInitialized = true;
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("myapp/routes/index", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let IndexRoute = _exports.default = (_class = class IndexRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    async beforeModel(transition) {
      if (!this.session.isAuthenticated) {
        this.session.requireAuthentication(transition, 'login');
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("myapp/routes/login", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let LoginRoute = _exports.default = (_class = class LoginRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    beforeModel() {
      this.session.prohibitAuthentication('/');
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("myapp/routes/pong-game", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let PongGameRoute = _exports.default = (_class = class PongGameRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    async beforeModel(transition) {
      if (!this.session.isAuthenticated) {
        this.session.requireAuthentication(transition, 'login');
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("myapp/services/cookies", ["exports", "ember-cookies/services/cookies"], function (_exports, _cookies) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cookies.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cookies/services/cookies"eaimeta@70e063a35619d71f
});
;define("myapp/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title"eaimeta@70e063a35619d71f
});
;define("myapp/services/session", ["exports", "ember-simple-auth/services/session"], function (_exports, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _session.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/services/session"eaimeta@70e063a35619d71f
});
;define("myapp/services/store", ["exports", "@ember/debug", "ember-data/store"], function (_exports, _debug, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"ember-data/store"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the store service. Use `export { default } from 'ember-data/store';` in app/services/store.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("myapp/session-stores/application", ["exports", "ember-simple-auth/session-stores/application"], function (_exports, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _application.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/session-stores/application"eaimeta@70e063a35619d71f
});
;define("myapp/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- app/templates/application.hbs --}}
  <main>

  <div id="ember-bootstrap-wormhole"></div>

  <div class="container-fluid">
    <div class="row">
      <div class="col profile-header">
       <ProfileOwn />
      </div>
      <div class="col profile-header">
          <ProfileOther />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="nav-button" type="button">Create Tournament</button>
      </div>
      <div class="col-6 pong-game">
  		{{outlet}}
      </div>
      <div class="col">
        <NavigationBar />
        <UserList/>
      </div>
    </div>
    <div class="row">
      <div class="col profile-footer">
        1 of 3
      </div>
      <div class="col-6 profile-footer">
        <Scoreboard />
      </div>
      <div class="col profile-footer">
        3 of 3
      </div>
    </div>
  </div>

  </main>

  */
  {
    "id": "6IrkQQ7M",
    "block": "[[[10,\"main\"],[12],[1,\"\\n\\n\"],[10,0],[14,1,\"ember-bootstrap-wormhole\"],[12],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"container-fluid\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col profile-header\"],[12],[1,\"\\n     \"],[8,[39,2],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col profile-header\"],[12],[1,\"\\n        \"],[8,[39,3],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[10,\"button\"],[14,0,\"nav-button\"],[14,4,\"button\"],[12],[1,\"Create Tournament\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-6 pong-game\"],[12],[1,\"\\n\\t\\t\"],[46,[28,[37,6],null,null],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col\"],[12],[1,\"\\n      \"],[8,[39,7],null,null,null],[1,\"\\n      \"],[8,[39,8],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col profile-footer\"],[12],[1,\"\\n      1 of 3\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-6 profile-footer\"],[12],[1,\"\\n      \"],[8,[39,9],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col profile-footer\"],[12],[1,\"\\n      3 of 3\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"    \\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\"]],[],false,[\"main\",\"div\",\"profile-own\",\"profile-other\",\"button\",\"component\",\"-outlet\",\"navigation-bar\",\"user-list\",\"scoreboard\"]]",
    "moduleName": "myapp/templates/application.hbs",
    "isStrictMode": false
  });
});
;define("myapp/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*

  */
  {
    "id": "WC9lYDjz",
    "block": "[[],[],false,[]]",
    "moduleName": "myapp/templates/index.hbs",
    "isStrictMode": false
  });
});
;define("myapp/templates/login", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="overlay">
    <div class="overlay-content">
      <form {{on "submit" this.login}}>
        <label>Username:</label>
        <input type="text" name="username" {{on "change" (fn this.update "username")}} />

        <label>Password:</label>
        <input type="password" name="password" {{on "change" (fn this.update "password")}} />

        <button type="submit">Login</button>
        <button type="button" class="register-button" {{on "click" this.register}}>Register</button>
      </form>

      {{#if this.error}}
        <p><strong>{{this.error}}</strong></p>
      {{/if}}
    </div>
  </div>
  */
  {
    "id": "Y2NM5GB8",
    "block": "[[[10,0],[14,0,\"overlay\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"overlay-content\"],[12],[1,\"\\n    \"],[11,\"form\"],[4,[38,2],[\"submit\",[30,0,[\"login\"]]],null],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"Username:\"],[13],[1,\"\\n      \"],[11,\"input\"],[24,3,\"username\"],[24,4,\"text\"],[4,[38,2],[\"change\",[28,[37,5],[[30,0,[\"update\"]],\"username\"],null]],null],[12],[13],[1,\"\\n\\n      \"],[10,\"label\"],[12],[1,\"Password:\"],[13],[1,\"\\n      \"],[11,\"input\"],[24,3,\"password\"],[24,4,\"password\"],[4,[38,2],[\"change\",[28,[37,5],[[30,0,[\"update\"]],\"password\"],null]],null],[12],[13],[1,\"\\n\\n      \"],[10,\"button\"],[14,4,\"submit\"],[12],[1,\"Login\"],[13],[1,\"\\n      \"],[11,\"button\"],[24,0,\"register-button\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"register\"]]],null],[12],[1,\"Register\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"error\"]],[[[1,\"      \"],[10,2],[12],[10,\"strong\"],[12],[1,[30,0,[\"error\"]]],[13],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"form\",\"on\",\"label\",\"input\",\"fn\",\"button\",\"if\",\"p\",\"strong\"]]",
    "moduleName": "myapp/templates/login.hbs",
    "isStrictMode": false
  });
});
;define("myapp/templates/pong-game", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="pong-game">
    <Paddle @position={{this.leftPaddlePosition}} @side="paddle-left" />
    <Ball @positionX={{this.ballPositionX}} @positionY={{this.ballPositionY}} />
    <Paddle @position={{this.rightPaddlePosition}} @side="paddle-right" />
  </div>
  */
  {
    "id": "hJj6ybRr",
    "block": "[[[10,0],[14,0,\"pong-game\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@position\",\"@side\"],[[30,0,[\"leftPaddlePosition\"]],\"paddle-left\"]],null],[1,\"\\n  \"],[8,[39,2],null,[[\"@positionX\",\"@positionY\"],[[30,0,[\"ballPositionX\"]],[30,0,[\"ballPositionY\"]]]],null],[1,\"\\n  \"],[8,[39,1],null,[[\"@position\",\"@side\"],[[30,0,[\"rightPaddlePosition\"]],\"paddle-right\"]],null],[1,\"\\n\"],[13]],[],false,[\"div\",\"paddle\",\"ball\"]]",
    "moduleName": "myapp/templates/pong-game.hbs",
    "isStrictMode": false
  });
});
;define("myapp/transforms/boolean", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the BooleanTransform. Use `export { BooleanTransform as default } from '@ember-data/serializer/transform';` in app/transforms/boolean.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("myapp/transforms/date", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the DateTransform. Use `export { DateTransform as default } from '@ember-data/serializer/transform';` in app/transforms/date.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("myapp/transforms/number", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the NumberTransform. Use `export { NumberTransform as default } from '@ember-data/serializer/transform';` in app/transforms/number.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("myapp/transforms/string", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the StringTransform. Use `export { StringTransform as default } from '@ember-data/serializer/transform';` in app/transforms/string.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("myapp/utils/inject", ["exports", "ember-simple-auth/utils/inject"], function (_exports, _inject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inject.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/inject"eaimeta@70e063a35619d71f
});
;define("myapp/utils/is-fastboot", ["exports", "ember-simple-auth/utils/is-fastboot"], function (_exports, _isFastboot) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isFastboot.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/is-fastboot"eaimeta@70e063a35619d71f
});
;define("myapp/utils/location", ["exports", "ember-simple-auth/utils/location"], function (_exports, _location) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _location.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/location"eaimeta@70e063a35619d71f
});
;define("myapp/utils/objects-are-equal", ["exports", "ember-simple-auth/utils/objects-are-equal"], function (_exports, _objectsAreEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _objectsAreEqual.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/objects-are-equal"eaimeta@70e063a35619d71f
});
;

;define('myapp/config/environment', [], function() {
  var prefix = 'myapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("myapp/app")["default"].create({"name":"myapp","version":"0.0.0"});
          }

//# sourceMappingURL=myapp.map
