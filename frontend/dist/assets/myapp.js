'use strict';



;define("myapp/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "myapp/config/environment", "bootstrap/dist/js/bootstrap.bundle.min.js", "bootstrap/dist/css/bootstrap.min.css"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment, _bootstrapBundleMin, _bootstrapMin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"ember-resolver",0,"ember-load-initializers",0,"myapp/config/environment",0,"bootstrap/dist/js/bootstrap.bundle.min.js",0,"bootstrap/dist/css/bootstrap.min.css"eaimeta@70e063a35619d71f
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
      return (0, _template.htmlSafe)(`transform: translate(${this.args.positionX}vw, ${this.args.positionY}vh);`); // Pass X and Y positions
    }
  }
  _exports.default = BallComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, BallComponent);
});
;define("myapp/components/bs-accordion", ["exports", "ember-bootstrap/components/bs-accordion"], function (_exports, _bsAccordion) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-accordion/item", ["exports", "ember-bootstrap/components/bs-accordion/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion/item"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-accordion/item/body", ["exports", "ember-bootstrap/components/bs-accordion/item/body"], function (_exports, _body) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion/item/body"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-accordion/item/title", ["exports", "ember-bootstrap/components/bs-accordion/item/title"], function (_exports, _title) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion/item/title"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-alert", ["exports", "ember-bootstrap/components/bs-alert"], function (_exports, _bsAlert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-alert"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-button-group", ["exports", "ember-bootstrap/components/bs-button-group"], function (_exports, _bsButtonGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-button-group"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-button-group/button", ["exports", "ember-bootstrap/components/bs-button-group/button"], function (_exports, _button) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-button-group/button"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-button", ["exports", "ember-bootstrap/components/bs-button"], function (_exports, _bsButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-button"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-carousel", ["exports", "ember-bootstrap/components/bs-carousel"], function (_exports, _bsCarousel) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsCarousel.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-carousel"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-carousel/slide", ["exports", "ember-bootstrap/components/bs-carousel/slide"], function (_exports, _slide) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _slide.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-carousel/slide"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-collapse", ["exports", "ember-bootstrap/components/bs-collapse"], function (_exports, _bsCollapse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-collapse"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-dropdown", ["exports", "ember-bootstrap/components/bs-dropdown"], function (_exports, _bsDropdown) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-dropdown/button", ["exports", "ember-bootstrap/components/bs-dropdown/button"], function (_exports, _button) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/button"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-dropdown/menu", ["exports", "ember-bootstrap/components/bs-dropdown/menu"], function (_exports, _menu) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/menu"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-dropdown/menu/divider", ["exports", "ember-bootstrap/components/bs-dropdown/menu/divider"], function (_exports, _divider) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/menu/divider"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-dropdown/menu/item", ["exports", "ember-bootstrap/components/bs-dropdown/menu/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/menu/item"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-dropdown/toggle", ["exports", "ember-bootstrap/components/bs-dropdown/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/toggle"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form", ["exports", "ember-bootstrap/components/bs-form"], function (_exports, _bsForm) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element", ["exports", "ember-bootstrap/components/bs-form/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/control", ["exports", "ember-bootstrap/components/bs-form/element/control"], function (_exports, _control) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/control/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/control/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/checkbox"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/control/input", ["exports", "ember-bootstrap/components/bs-form/element/control/input"], function (_exports, _input) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/input"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/control/radio", ["exports", "ember-bootstrap/components/bs-form/element/control/radio"], function (_exports, _radio) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _radio.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/radio"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/control/switch", ["exports", "ember-bootstrap/components/bs-form/element/control/switch"], function (_exports, _switch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _switch.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/switch"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/control/textarea", ["exports", "ember-bootstrap/components/bs-form/element/control/textarea"], function (_exports, _textarea) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/textarea"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/errors", ["exports", "ember-bootstrap/components/bs-form/element/errors"], function (_exports, _errors) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/errors"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/feedback-icon", ["exports", "ember-bootstrap/components/bs-form/element/feedback-icon"], function (_exports, _feedbackIcon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/feedback-icon"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/help-text", ["exports", "ember-bootstrap/components/bs-form/element/help-text"], function (_exports, _helpText) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/help-text"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/label", ["exports", "ember-bootstrap/components/bs-form/element/label"], function (_exports, _label) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/label"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/layout/horizontal", ["exports", "ember-bootstrap/components/bs-form/element/layout/horizontal"], function (_exports, _horizontal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/horizontal"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/layout/horizontal/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/layout/inline", ["exports", "ember-bootstrap/components/bs-form/element/layout/inline"], function (_exports, _inline) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/inline"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/layout/inline/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/inline/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/inline/checkbox"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/layout/vertical", ["exports", "ember-bootstrap/components/bs-form/element/layout/vertical"], function (_exports, _vertical) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/vertical"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/layout/vertical/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/vertical/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/vertical/checkbox"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-form/element/legend", ["exports", "ember-bootstrap/components/bs-form/element/legend"], function (_exports, _legend) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _legend.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/legend"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-link-to", ["exports", "ember-bootstrap/components/bs-link-to"], function (_exports, _bsLinkTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsLinkTo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-link-to"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-list-group", ["exports", "ember-bootstrap/components/bs-list-group"], function (_exports, _bsListGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsListGroup.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-list-group"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-list-group/item", ["exports", "ember-bootstrap/components/bs-list-group/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-list-group/item"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal-simple", ["exports", "ember-bootstrap/components/bs-modal-simple"], function (_exports, _bsModalSimple) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal-simple"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal", ["exports", "ember-bootstrap/components/bs-modal"], function (_exports, _bsModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal/body", ["exports", "ember-bootstrap/components/bs-modal/body"], function (_exports, _body) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/body"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal/dialog", ["exports", "ember-bootstrap/components/bs-modal/dialog"], function (_exports, _dialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/dialog"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal/footer", ["exports", "ember-bootstrap/components/bs-modal/footer"], function (_exports, _footer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/footer"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal/header", ["exports", "ember-bootstrap/components/bs-modal/header"], function (_exports, _header) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/header"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal/header/close", ["exports", "ember-bootstrap/components/bs-modal/header/close"], function (_exports, _close) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/header/close"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-modal/header/title", ["exports", "ember-bootstrap/components/bs-modal/header/title"], function (_exports, _title) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/header/title"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-nav", ["exports", "ember-bootstrap/components/bs-nav"], function (_exports, _bsNav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-nav"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-nav/item", ["exports", "ember-bootstrap/components/bs-nav/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-nav/item"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-navbar", ["exports", "ember-bootstrap/components/bs-navbar"], function (_exports, _bsNavbar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-navbar/content", ["exports", "ember-bootstrap/components/bs-navbar/content"], function (_exports, _content) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/content"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-navbar/link-to", ["exports", "ember-bootstrap/components/bs-navbar/link-to"], function (_exports, _linkTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/link-to"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-navbar/nav", ["exports", "ember-bootstrap/components/bs-navbar/nav"], function (_exports, _nav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/nav"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-navbar/toggle", ["exports", "ember-bootstrap/components/bs-navbar/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/toggle"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-popover", ["exports", "ember-bootstrap/components/bs-popover"], function (_exports, _bsPopover) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-popover"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-popover/element", ["exports", "ember-bootstrap/components/bs-popover/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-popover/element"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-progress", ["exports", "ember-bootstrap/components/bs-progress"], function (_exports, _bsProgress) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-progress"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-progress/bar", ["exports", "ember-bootstrap/components/bs-progress/bar"], function (_exports, _bar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-progress/bar"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-spinner", ["exports", "ember-bootstrap/components/bs-spinner"], function (_exports, _bsSpinner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsSpinner.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-spinner"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-tab", ["exports", "ember-bootstrap/components/bs-tab"], function (_exports, _bsTab) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tab"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-tab/pane", ["exports", "ember-bootstrap/components/bs-tab/pane"], function (_exports, _pane) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tab/pane"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-tooltip", ["exports", "ember-bootstrap/components/bs-tooltip"], function (_exports, _bsTooltip) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tooltip"eaimeta@70e063a35619d71f
});
;define("myapp/components/bs-tooltip/element", ["exports", "ember-bootstrap/components/bs-tooltip/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tooltip/element"eaimeta@70e063a35619d71f
});
;define("myapp/components/chat", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@glimmer/tracking", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _tracking, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@glimmer/tracking",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container-row chat-container">
  <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
    <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" checked={{this.showGeneral}} {{on "change" (fn this.toggleCheckbox "all")}}>
    <label class="btn btn-outline-secondary btn-sm" for="btncheck1">General</label>
  
    <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" checked={{this.showWhisper}} {{on "change" (fn this.toggleCheckbox "whisper")}}>
    <label class="btn btn-outline-secondary btn-sm" for="btncheck2">Whisper</label>
  
    <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" checked={{this.showTournament}} {{on "change" (fn this.toggleCheckbox "tournament")}}>
    <label class="btn btn-outline-secondary btn-sm" for="btncheck3">Tournament</label>
  
    <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" checked={{this.showSystem}} {{on "change" (fn this.toggleCheckbox "system")}}>
    <label class="btn btn-outline-secondary btn-sm" for="btncheck4">System</label>
  </div>
  
  <div class="scrollable-list chat" >
    {{#each this.filteredMessages as |message|}}
      <Message @message={{message}} @ownNickname={{this.chat.user.profile.nickname}}/>
    {{/each}}
  </div>
  
  {{!-- Corrected template --}}
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Put your message here"
      style="color: {{this.chat.inputColor}};"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      value={{this.chat.messageInput}}
      {{on "input" this.updateInputValue}}
      {{on "keydown" this.handleKeyDown}}
      {{did-insert this.setInputRef}}
    >
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" {{on "click" this.sendMessage}}>Send</button>
    </div>
  </div>
  </div>
  */
  {
    "id": "cHPyaJUo",
    "block": "[[[10,0],[14,0,\"container-row chat-container\"],[12],[1,\"\\n\"],[10,0],[14,0,\"btn-group\"],[14,\"role\",\"group\"],[14,\"aria-label\",\"Basic checkbox toggle button group\"],[12],[1,\"\\n  \"],[11,\"input\"],[24,0,\"btn-check\"],[24,1,\"btncheck1\"],[24,\"autocomplete\",\"off\"],[16,\"checked\",[30,0,[\"showGeneral\"]]],[24,4,\"checkbox\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0,[\"toggleCheckbox\"]],\"all\"],null]],null],[12],[13],[1,\"\\n  \"],[10,\"label\"],[14,0,\"btn btn-outline-secondary btn-sm\"],[14,\"for\",\"btncheck1\"],[12],[1,\"General\"],[13],[1,\"\\n\\n  \"],[11,\"input\"],[24,0,\"btn-check\"],[24,1,\"btncheck2\"],[24,\"autocomplete\",\"off\"],[16,\"checked\",[30,0,[\"showWhisper\"]]],[24,4,\"checkbox\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0,[\"toggleCheckbox\"]],\"whisper\"],null]],null],[12],[13],[1,\"\\n  \"],[10,\"label\"],[14,0,\"btn btn-outline-secondary btn-sm\"],[14,\"for\",\"btncheck2\"],[12],[1,\"Whisper\"],[13],[1,\"\\n\\n  \"],[11,\"input\"],[24,0,\"btn-check\"],[24,1,\"btncheck3\"],[24,\"autocomplete\",\"off\"],[16,\"checked\",[30,0,[\"showTournament\"]]],[24,4,\"checkbox\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0,[\"toggleCheckbox\"]],\"tournament\"],null]],null],[12],[13],[1,\"\\n  \"],[10,\"label\"],[14,0,\"btn btn-outline-secondary btn-sm\"],[14,\"for\",\"btncheck3\"],[12],[1,\"Tournament\"],[13],[1,\"\\n\\n  \"],[11,\"input\"],[24,0,\"btn-check\"],[24,1,\"btncheck4\"],[24,\"autocomplete\",\"off\"],[16,\"checked\",[30,0,[\"showSystem\"]]],[24,4,\"checkbox\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0,[\"toggleCheckbox\"]],\"system\"],null]],null],[12],[13],[1,\"\\n  \"],[10,\"label\"],[14,0,\"btn btn-outline-secondary btn-sm\"],[14,\"for\",\"btncheck4\"],[12],[1,\"System\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"scrollable-list chat\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"filteredMessages\"]]],null]],null],null,[[[1,\"    \"],[8,[39,7],null,[[\"@message\",\"@ownNickname\"],[[30,1],[30,0,[\"chat\",\"user\",\"profile\",\"nickname\"]]]],null],[1,\"\\n\"]],[1]],null],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n  \"],[11,\"input\"],[24,0,\"form-control\"],[24,\"placeholder\",\"Put your message here\"],[16,5,[29,[\"color: \",[30,0,[\"chat\",\"inputColor\"]],\";\"]]],[24,\"aria-label\",\"Recipient's username\"],[24,\"aria-describedby\",\"basic-addon2\"],[16,2,[30,0,[\"chat\",\"messageInput\"]]],[24,4,\"text\"],[4,[38,2],[\"input\",[30,0,[\"updateInputValue\"]]],null],[4,[38,2],[\"keydown\",[30,0,[\"handleKeyDown\"]]],null],[4,[38,8],[[30,0,[\"setInputRef\"]]],null],[12],[13],[1,\"\\n  \"],[10,0],[14,0,\"input-group-append\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,0,\"btn btn-outline-secondary\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"sendMessage\"]]],null],[12],[1,\"Send\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[13]],[\"message\"],false,[\"div\",\"input\",\"on\",\"fn\",\"label\",\"each\",\"-track-array\",\"message\",\"did-insert\",\"button\"]]",
    "moduleName": "myapp/components/chat.hbs",
    "isStrictMode": false
  });
  let ChatComponent = _exports.default = (_class = class ChatComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "showGeneral", _descriptor, this);
      _initializerDefineProperty(this, "showWhisper", _descriptor2, this);
      _initializerDefineProperty(this, "showTournament", _descriptor3, this);
      _initializerDefineProperty(this, "showSystem", _descriptor4, this);
      _initializerDefineProperty(this, "chat", _descriptor5, this);
      _defineProperty(this, "toggleCheckbox", type => {
        if (type === 'all') {
          this.showGeneral = !this.showGeneral;
        } else if (type === 'whisper') {
          this.showWhisper = !this.showWhisper;
        } else if (type === 'tournament') {
          this.showTournament = !this.showTournament;
        } else if (type === 'system') {
          this.showSystem = !this.showSystem;
        }
      });
    }
    // Computed property to filter messages
    get filteredMessages() {
      return this.chat.messages.filter(message => {
        if (this.showGeneral && message.type === 'all') {
          return true;
        }
        if (this.showWhisper && message.type === 'whisper') {
          return true;
        }
        if (this.showTournament && message.type === 'tournament') {
          return true;
        }
        if (this.showSystem && (message.type === 'add' || message.type === 'invite')) {
          return true;
        }
        return false;
      });
    }
    // This action is passed from the parent to update the message input value
    updateInputValue(event) {
      this.chat.updateInputValue(event.target.value);
    }

    // This action is triggered when the Send button is clicked
    sendMessage() {
      this.chat.sendMessage(); // Call the parent action to send the message
    }
    handleKeyDown(event) {
      if (event.key === 'Enter') {
        // If the Enter key was pressed, trigger the sendMessage function
        this.sendMessage();
      }
    }
    setInputRef(element) {
      this.chat.setInputElement(element); // Pass the input element reference to the service
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "showGeneral", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "showWhisper", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "showTournament", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "showSystem", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "chat", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updateInputValue", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateInputValue"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "sendMessage", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "sendMessage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleKeyDown", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleKeyDown"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setInputRef", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setInputRef"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ChatComponent);
});
;define("myapp/components/message", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if (eq @message.type "tournament")}}
    <div class="message-item message-tournament">[{{@message.from}}] {{@message.content}}</div>
  {{else if (eq @message.type "whisper")}}
    <div class="message-item message-whisper">[{{@message.from}}] {{@message.content}}</div>
  {{else if (eq @message.type "add")}}
    {{#if (eq @message.from @ownNickname)}}
      <div class="alert alert-success p-2 mt-1 mb-1" role="alert">
        You sent a friend request to {{@message.to}}.
      </div>
    {{else}}
      <div class="alert alert-success p-2 mt-1 mb-1" role="alert">
        {{@message.from}} wants to add you as a friend 
        <a href="#" class="alert-link" {{on "click" this.acceptFriend}}>ACCEPT</a>
      </div>
    {{/if}}
  {{else if (eq @message.type "invite")}}
    {{#if (eq @message.from @ownNickname)}}
      <div class="alert alert-danger p-2 mt-1 mb-1" role="alert">
        You invited {{@message.to}} to a game.
      </div>
    {{else}}
      <div class="alert alert-danger p-2 mt-1 mb-1" role="alert">
        {{@message.from}} invited you to a game
        <a href="#" class="alert-link" {{on "click" this.acceptGame}}>PLAY</a>
      </div>
    {{/if}}
  {{else}}
    <div class="message-item message-default">[{{@message.from}}] {{@message.content}}</div>
  {{/if}}
  
  */
  {
    "id": "qxcghq3o",
    "block": "[[[41,[28,[37,1],[[30,1,[\"type\"]],\"tournament\"],null],[[[1,\"  \"],[10,0],[14,0,\"message-item message-tournament\"],[12],[1,\"[\"],[1,[30,1,[\"from\"]]],[1,\"] \"],[1,[30,1,[\"content\"]]],[13],[1,\"\\n\"]],[]],[[[41,[28,[37,1],[[30,1,[\"type\"]],\"whisper\"],null],[[[1,\"  \"],[10,0],[14,0,\"message-item message-whisper\"],[12],[1,\"[\"],[1,[30,1,[\"from\"]]],[1,\"] \"],[1,[30,1,[\"content\"]]],[13],[1,\"\\n\"]],[]],[[[41,[28,[37,1],[[30,1,[\"type\"]],\"add\"],null],[[[41,[28,[37,1],[[30,1,[\"from\"]],[30,2]],null],[[[1,\"    \"],[10,0],[14,0,\"alert alert-success p-2 mt-1 mb-1\"],[14,\"role\",\"alert\"],[12],[1,\"\\n      You sent a friend request to \"],[1,[30,1,[\"to\"]]],[1,\".\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-success p-2 mt-1 mb-1\"],[14,\"role\",\"alert\"],[12],[1,\"\\n      \"],[1,[30,1,[\"from\"]]],[1,\" wants to add you as a friend \\n      \"],[11,3],[24,6,\"#\"],[24,0,\"alert-link\"],[4,[38,4],[\"click\",[30,0,[\"acceptFriend\"]]],null],[12],[1,\"ACCEPT\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]]],[]],[[[41,[28,[37,1],[[30,1,[\"type\"]],\"invite\"],null],[[[41,[28,[37,1],[[30,1,[\"from\"]],[30,2]],null],[[[1,\"    \"],[10,0],[14,0,\"alert alert-danger p-2 mt-1 mb-1\"],[14,\"role\",\"alert\"],[12],[1,\"\\n      You invited \"],[1,[30,1,[\"to\"]]],[1,\" to a game.\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-danger p-2 mt-1 mb-1\"],[14,\"role\",\"alert\"],[12],[1,\"\\n      \"],[1,[30,1,[\"from\"]]],[1,\" invited you to a game\\n      \"],[11,3],[24,6,\"#\"],[24,0,\"alert-link\"],[4,[38,4],[\"click\",[30,0,[\"acceptGame\"]]],null],[12],[1,\"PLAY\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]]],[]],[[[1,\"  \"],[10,0],[14,0,\"message-item message-default\"],[12],[1,\"[\"],[1,[30,1,[\"from\"]]],[1,\"] \"],[1,[30,1,[\"content\"]]],[13],[1,\"\\n\"]],[]]]],[]]]],[]]]],[]]]],[\"@message\",\"@ownNickname\"],false,[\"if\",\"eq\",\"div\",\"a\",\"on\"]]",
    "moduleName": "myapp/components/message.hbs",
    "isStrictMode": false
  });
  let MessageComponent = _exports.default = (_class = class MessageComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
      _initializerDefineProperty(this, "gameData", _descriptor2, this);
      _initializerDefineProperty(this, "user", _descriptor3, this);
    }
    acceptFriend(event) {
      event.preventDefault();
      console.log(`${this.args.message.from} accepted as a friend!`);
      this.makeFriends();
    }
    acceptGame(event) {
      event.preventDefault();
      console.log(`${this.args.message.from} accepted game`);
      this.createPrivateRoom("privat");
    }
    async createRoom(gameType) {
      try {
        const response = await fetch('/pong/pong/create-room', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            player: this.user.profile.nickname,
            player_2: this.args.message.from,
            gameType: gameType // Set the selected game type
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.room_name) {
          this.loading = false;
          console.log("data:", data);
          this.gameData.setGameData(gameType, data);
          this.router.transitionTo('pong-game');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    async makeFriends() {
      const apiEndpoint = "users/users/add-friend/";
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.session.data.authenticated.access}`
          },
          body: JSON.stringify({
            nickname: this.args.message.from,
            type: "add"
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add friend");
        }
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error("Error adding friend:", error.message);
        throw error;
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "gameData", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "acceptFriend", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "acceptFriend"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "acceptGame", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "acceptGame"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, MessageComponent);
});
;define("myapp/components/modal-game-history", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@glimmer/tracking", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _tracking, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@glimmer/tracking",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <button class="btn btn-success p-1 mb-1" type="button" {{on "click" this.openModal}}>
            Games: {{this.user.profile.games_total}}
  </button>
  
  <BsModal
    @open={{this.isModalOpen}}
    as |modal|
  >
    <modal.header>
      <h4 class="modal-title">
        Match History
      </h4>
    </modal.header>
  
  </BsModal>
  
  */
  {
    "id": "cpTVf5M2",
    "block": "[[[11,\"button\"],[24,0,\"btn btn-success p-1 mb-1\"],[24,4,\"button\"],[4,[38,1],[\"click\",[30,0,[\"openModal\"]]],null],[12],[1,\"\\n          Games: \"],[1,[30,0,[\"user\",\"profile\",\"games_total\"]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,2],null,[[\"@open\"],[[30,0,[\"isModalOpen\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"header\"]],null,null,[[\"default\"],[[[[1,\"\\n    \"],[10,\"h4\"],[14,0,\"modal-title\"],[12],[1,\"\\n      Match History\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n\"]],[1]]]]],[1,\"\\n\"]],[\"modal\"],false,[\"button\",\"on\",\"bs-modal\",\"h4\"]]",
    "moduleName": "myapp/components/modal-game-history.hbs",
    "isStrictMode": false
  });
  let ModalProfileComponent = _exports.default = (_class = class ModalProfileComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      // Property to manage modal visibility
      _initializerDefineProperty(this, "isModalOpen", _descriptor, this);
      _initializerDefineProperty(this, "newNickname", _descriptor2, this);
      _initializerDefineProperty(this, "user", _descriptor3, this);
      _initializerDefineProperty(this, "session", _descriptor4, this);
    }
    openModal() {
      console.log('openModal0');
      this.isModalOpen = true;
      this.newNickname = this.user.profile.nickname;
      console.log(this.isModalOpen);
    }
    closeModal() {
      console.log('Closing modal');
      this.isModalOpen = false;
    }
    cancel() {
      console.log('Modal canceled');
      this.closeModal(); // Close the modal without submitting
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isModalOpen", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "newNickname", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "openModal", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeModal", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "closeModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancel", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancel"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ModalProfileComponent);
});
;define("myapp/components/modal-profile", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@glimmer/tracking", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _tracking, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@glimmer/tracking",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <button class="btn btn-primary" type="button" {{on "click" this.openModal}}>
            Edit Profile
  </button>
  
  <BsModal
    @open={{this.isModalOpen}}
    as |modal|
  >
    <modal.header>
      <h4 class="modal-title">
        Edit Profile
      </h4>
    </modal.header>
    <modal.body>
      
        <div class="form-group">
          <label>Choose Avatar:</label>
          <input type="file" class="form-control" placeholder="Choose Avatar">
          <small>This is the visible Avatar on this Site</small>
        </div>
  
        <div class="form-group mt-3">
          <label>Nickname:</label>
          <input 
            type="name" 
            class="form-control" 
            value={{this.newNickname}}
            {{on "input" this.updateNewNickname}}
          >
          <small>This is the visible Name on this Site</small>
        </div>
      
    </modal.body>
    <modal.footer>
      <BsButton @onClick={{modal.close}}>Cancel</BsButton>
      <BsButton @type="success" @onClick={{this.submit}}>Save</BsButton>
    </modal.footer>
  </BsModal>
  
  */
  {
    "id": "11bFgGzg",
    "block": "[[[11,\"button\"],[24,0,\"btn btn-primary\"],[24,4,\"button\"],[4,[38,1],[\"click\",[30,0,[\"openModal\"]]],null],[12],[1,\"\\n          Edit Profile\\n\"],[13],[1,\"\\n\\n\"],[8,[39,2],null,[[\"@open\"],[[30,0,[\"isModalOpen\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"header\"]],null,null,[[\"default\"],[[[[1,\"\\n    \"],[10,\"h4\"],[14,0,\"modal-title\"],[12],[1,\"\\n      Edit Profile\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n  \"],[8,[30,1,[\"body\"]],null,null,[[\"default\"],[[[[1,\"\\n    \\n      \"],[10,0],[14,0,\"form-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,\"Choose Avatar:\"],[13],[1,\"\\n        \"],[10,\"input\"],[14,0,\"form-control\"],[14,\"placeholder\",\"Choose Avatar\"],[14,4,\"file\"],[12],[13],[1,\"\\n        \"],[10,\"small\"],[12],[1,\"This is the visible Avatar on this Site\"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"form-group mt-3\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,\"Nickname:\"],[13],[1,\"\\n        \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"newNickname\"]]],[24,4,\"name\"],[4,[38,1],[\"input\",[30,0,[\"updateNewNickname\"]]],null],[12],[13],[1,\"\\n        \"],[10,\"small\"],[12],[1,\"This is the visible Name on this Site\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \\n  \"]],[]]]]],[1,\"\\n  \"],[8,[30,1,[\"footer\"]],null,null,[[\"default\"],[[[[1,\"\\n    \"],[8,[39,8],null,[[\"@onClick\"],[[30,1,[\"close\"]]]],[[\"default\"],[[[[1,\"Cancel\"]],[]]]]],[1,\"\\n    \"],[8,[39,8],null,[[\"@type\",\"@onClick\"],[\"success\",[30,0,[\"submit\"]]]],[[\"default\"],[[[[1,\"Save\"]],[]]]]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[1]]]]],[1,\"\\n\"]],[\"modal\"],false,[\"button\",\"on\",\"bs-modal\",\"h4\",\"div\",\"label\",\"input\",\"small\",\"bs-button\"]]",
    "moduleName": "myapp/components/modal-profile.hbs",
    "isStrictMode": false
  });
  let ModalProfileComponent = _exports.default = (_class = class ModalProfileComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      // Property to manage modal visibility
      _initializerDefineProperty(this, "isModalOpen", _descriptor, this);
      _initializerDefineProperty(this, "newNickname", _descriptor2, this);
      _initializerDefineProperty(this, "user", _descriptor3, this);
      _initializerDefineProperty(this, "session", _descriptor4, this);
    }
    openModal() {
      console.log('openModal0');
      this.isModalOpen = true;
      this.newNickname = this.user.profile.nickname;
      console.log(this.isModalOpen);
    }
    closeModal() {
      console.log('Closing modal');
      this.isModalOpen = false;
    }
    updateNewNickname(event) {
      this.newNickname = event.target.value;
    }
    submit() {
      console.log('Form submitted!');
      this.changeNickname(this.newNickname);
      this.closeModal();
    }
    cancel() {
      console.log('Modal canceled');
      this.closeModal(); // Close the modal without submitting
    }
    async changeNickname(newNickname) {
      try {
        const response = await fetch('/api/user/nickname', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.session.data.authenticated.access}`
          },
          body: JSON.stringify({
            nickname: newNickname
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.nickname) {
          this.user.profile.nickname = nickname;
        }
      } catch (error) {
        console.error('Error changing nickname:', error);
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isModalOpen", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "newNickname", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "openModal", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeModal", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "closeModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateNewNickname", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateNewNickname"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submit", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "submit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancel", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancel"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ModalProfileComponent);
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
      return (0, _template.htmlSafe)(`transform: translateY(${this.args.position}vw);`); // Pass position from args
    }
  }
  _exports.default = PaddleComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, PaddleComponent);
});
;define("myapp/components/pong-game", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _tracking, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="pong-game">
    {{#if this.winner}}
      <h1 class="white">Winner: {{this.winner}}</h1>
    {{else}}
      <Paddle @position={{this.leftPaddlePosition}} @side="paddle-left" />
      <Ball @positionX={{this.ballPositionX}} @positionY={{this.ballPositionY}} />
      <Paddle @position={{this.rightPaddlePosition}} @side="paddle-right" />
    {{/if}}
  </div>
  
  */
  {
    "id": "+OmYV74j",
    "block": "[[[10,0],[14,0,\"pong-game\"],[12],[1,\"\\n\"],[41,[30,0,[\"winner\"]],[[[1,\"    \"],[10,\"h1\"],[14,0,\"white\"],[12],[1,\"Winner: \"],[1,[30,0,[\"winner\"]]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,3],null,[[\"@position\",\"@side\"],[[30,0,[\"leftPaddlePosition\"]],\"paddle-left\"]],null],[1,\"\\n    \"],[8,[39,4],null,[[\"@positionX\",\"@positionY\"],[[30,0,[\"ballPositionX\"]],[30,0,[\"ballPositionY\"]]]],null],[1,\"\\n    \"],[8,[39,3],null,[[\"@position\",\"@side\"],[[30,0,[\"rightPaddlePosition\"]],\"paddle-right\"]],null],[1,\"\\n\"]],[]]],[13],[1,\"\\n\"]],[],false,[\"div\",\"if\",\"h1\",\"paddle\",\"ball\"]]",
    "moduleName": "myapp/components/pong-game.hbs",
    "isStrictMode": false
  });
  let PongGameComponent = _exports.default = (_class = class PongGameComponent extends _component2.default {
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
      _initializerDefineProperty(this, "winner", _descriptor5, this);
      _initializerDefineProperty(this, "gameData", _descriptor6, this);
      _initializerDefineProperty(this, "session", _descriptor7, this);
      _initializerDefineProperty(this, "tournament", _descriptor8, this);
      // Track the state of key presses
      _defineProperty(this, "p1UpKeyPressed", false);
      _defineProperty(this, "p1DownKeyPressed", false);
      _defineProperty(this, "p2UpKeyPressed", false);
      _defineProperty(this, "p2DownKeyPressed", false);
      this.setupKeyListeners();
      this.startKeyPolling(); // Start polling when the controller is created
    }
    get roomData() {
      return this.gameData.roomData; // Access shared room data
    }
    get username() {
      return this.gameData.username; // Access shared room data
    }
    setupKeyListeners() {
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
      window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    startKeyPolling() {
      this.pollingInterval = setInterval(() => {
        this.sendKeyPresses();
      }, 50); // Poll every 50ms
    }
    async sendKeyPresses() {
      const {
        keyPressP1,
        keyPressP2
      } = this.getKeyPress();
      try {
        const requestBody = JSON.stringify({
          keypress_p1: keyPressP1,
          keypress_p2: keyPressP2,
          room_name: this.roomData.room_name,
          user: this.username
        });
        console.log('Request body sent to API:', requestBody);

        //const response = await fetch(`/api/gamestate.json`, {
        const response = await fetch(`/pong/pong/game_state/${this.roomData.room_name}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json'
          },
          body: requestBody
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
      let keyPressP1 = '';
      let keyPressP2 = '';
      if (this.p1UpKeyPressed && !this.p1DownKeyPressed) {
        keyPressP1 = 'up';
      } else if (this.p1DownKeyPressed && !this.p1UpKeyPressed) {
        keyPressP1 = 'down';
      }
      if (this.p2UpKeyPressed && !this.p2DownKeyPressed) {
        keyPressP2 = 'up';
      } else if (this.p2DownKeyPressed && !this.p2UpKeyPressed) {
        keyPressP2 = 'down';
      }
      return {
        keyPressP1,
        keyPressP2
      };
    }
    handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowUp':
          this.p1UpKeyPressed = true;
          console.log('Player 1 Up key pressed');
          break;
        case 'ArrowDown':
          this.p1DownKeyPressed = true;
          console.log('Player 1 Down key pressed');
          break;
        case 'w':
        case 'W':
          this.p2UpKeyPressed = true;
          console.log('Player 2 Up key pressed');
          break;
        case 's':
        case 'S':
          this.p2DownKeyPressed = true;
          console.log('Player 2 Down key pressed');
          break;
      }
    }
    handleKeyUp(event) {
      switch (event.key) {
        case 'ArrowUp':
          this.p1UpKeyPressed = false;
          console.log('Player 1 Up key released');
          break;
        case 'ArrowDown':
          this.p1DownKeyPressed = false;
          console.log('Player 1 Down key released');
          break;
        case 'w':
        case 'W':
          this.p2UpKeyPressed = false;
          console.log('Player 2 Up key released');
          break;
        case 's':
        case 'S':
          this.p2DownKeyPressed = false;
          console.log('Player 2 Down key released');
          break;
      }
    }
    updateGameState(data) {
      console.log(data);
      this.ballPositionX = data.ball_x * (25 - visualViewport.height / visualViewport.width);
      this.ballPositionY = data.ball_y * 24;
      this.leftPaddlePosition = data.left_paddle_y * 10;
      this.rightPaddlePosition = data.right_paddle_y * 10;
      this.winner = data.winner;
      if (!this.winner) {
        this.gameData.left_score = data.left_score;
        this.gameData.right_score = data.right_score;
      }
      if (this.winner) {
        if (this.tournament.currentLobby) this.tournament.sendWinner(this.winner);
        this.willDestroy();
      }
    }
    willDestroy() {
      window.removeEventListener('keydown', this.handleKeyDown.bind(this));
      window.removeEventListener('keyup', this.handleKeyUp.bind(this));
      clearInterval(this.pollingInterval);
      super.willDestroy();
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
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "winner", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "gameData", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "tournament", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, PongGameComponent);
});
;define("myapp/components/profile-other", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container-fluid row fill p-2">
    {{!-- Profile picture column (1 part) --}}
    <div class="col center no-padding position-relative">
      <button type="button" class="btn-close top-left" onclick={{this.onCloseClick}}></button>
      <img src={{@selectedUser.avatar}} alt="Profile Picture" class="profile-pic" />
    </div>
  
    {{!-- Profile details column (3 parts) --}}
    <div class="col-10">
      {{!-- First row of profile details --}}
      <div class="profile-details">
        <h2 class="name">{{@selectedUser.nickname}}</h2>
        <div class="actions">
          <button class="emoji-button info" data-bs-toggle="tooltip" data-bs-placement="top" title="Live Chat"
            type="button" {{on "click" this.startLiveChat}}>
            💬
          </button>
          <button class="emoji-button info" data-bs-toggle="tooltip" data-bs-placement="top" title="Play Game"
            type="button" {{on "click" this.playGame}}>
            🎮
          </button>
          <button class="emoji-button info" data-bs-toggle="tooltip" data-bs-placement="top" title="Add Friend"
            type="button" {{on "click" this.addFriend}}>
            ➕
          </button>
          <button class="emoji-button info" data-bs-toggle="tooltip" data-bs-placement="top" title="Block User"
            type="button" {{on "click" (fn this.blockUser "block")}}>
            🚫
          </button>
        </div>
        <h2 class="points">{{@selectedUser.trophies}}🏆</h2>
      </div>
  
      {{!-- Second row of profile details --}}
      <div class="profile-details">
        <ModalGameHistory />
        <h2 class="info">Wins: {{@selectedUser.wins}}</h2>
      </div>
  
      <div class="profile-details">
        {{#if this.isOnline}}
        <h2 class="info">🟢 online</h2>
        {{else}}
        <h2 class="info">🔴 offline</h2>
        {{/if}}
        <h2 class="info">Losses: {{@selectedUser.losses}}</h2>
      </div>
  
    </div>
  </div>
  */
  {
    "id": "8OqFHzEo",
    "block": "[[[10,0],[14,0,\"container-fluid row fill p-2\"],[12],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"col center no-padding position-relative\"],[12],[1,\"\\n    \"],[10,\"button\"],[14,0,\"btn-close top-left\"],[15,\"onclick\",[30,0,[\"onCloseClick\"]]],[14,4,\"button\"],[12],[13],[1,\"\\n    \"],[10,\"img\"],[15,\"src\",[30,1,[\"avatar\"]]],[14,\"alt\",\"Profile Picture\"],[14,0,\"profile-pic\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"col-10\"],[12],[1,\"\\n\"],[1,\"    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,[30,1,[\"nickname\"]]],[13],[1,\"\\n      \"],[10,0],[14,0,\"actions\"],[12],[1,\"\\n        \"],[11,\"button\"],[24,0,\"emoji-button info\"],[24,\"data-bs-toggle\",\"tooltip\"],[24,\"data-bs-placement\",\"top\"],[24,\"title\",\"Live Chat\"],[24,4,\"button\"],[4,[38,4],[\"click\",[30,0,[\"startLiveChat\"]]],null],[12],[1,\"\\n          💬\\n        \"],[13],[1,\"\\n        \"],[11,\"button\"],[24,0,\"emoji-button info\"],[24,\"data-bs-toggle\",\"tooltip\"],[24,\"data-bs-placement\",\"top\"],[24,\"title\",\"Play Game\"],[24,4,\"button\"],[4,[38,4],[\"click\",[30,0,[\"playGame\"]]],null],[12],[1,\"\\n          🎮\\n        \"],[13],[1,\"\\n        \"],[11,\"button\"],[24,0,\"emoji-button info\"],[24,\"data-bs-toggle\",\"tooltip\"],[24,\"data-bs-placement\",\"top\"],[24,\"title\",\"Add Friend\"],[24,4,\"button\"],[4,[38,4],[\"click\",[30,0,[\"addFriend\"]]],null],[12],[1,\"\\n          ➕\\n        \"],[13],[1,\"\\n        \"],[11,\"button\"],[24,0,\"emoji-button info\"],[24,\"data-bs-toggle\",\"tooltip\"],[24,\"data-bs-placement\",\"top\"],[24,\"title\",\"Block User\"],[24,4,\"button\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"blockUser\"]],\"block\"],null]],null],[12],[1,\"\\n          🚫\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"points\"],[12],[1,[30,1,[\"trophies\"]]],[1,\"🏆\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[1,\"    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[8,[39,6],null,null,null],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"Wins: \"],[1,[30,1,[\"wins\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n\"],[41,[30,0,[\"isOnline\"]],[[[1,\"      \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"🟢 online\"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"🔴 offline\"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"Losses: \"],[1,[30,1,[\"losses\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n  \"],[13],[1,\"\\n\"],[13]],[\"@selectedUser\"],false,[\"div\",\"button\",\"img\",\"h2\",\"on\",\"fn\",\"modal-game-history\",\"if\"]]",
    "moduleName": "myapp/components/profile-other.hbs",
    "isStrictMode": false
  });
  let ProfileOtherComponent = _exports.default = (_class = class ProfileOtherComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "chat", _descriptor, this);
      _initializerDefineProperty(this, "session", _descriptor2, this);
    }
    startLiveChat() {
      console.log('Live chat started');
      this.chat.updateInputValue("/" + this.args.selectedUser.nickname + " ");
      this.chat.focusInput();
    }
    playGame() {
      console.log('Game initiated');
      this.chat.updateInputValue("/*invite " + this.args.selectedUser.nickname);
      this.chat.sendMessage();
    }
    addFriend() {
      this.chat.updateInputValue("/*add " + this.args.selectedUser.nickname);
      this.chat.sendMessage();
    }
    async blockUser(type) {
      const apiEndpoint = "users/users/block-user/";
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nickname: this.args.selectedUser.nickname,
            type: type
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to block user");
        }
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error("Error blocking user:", error.message);
        throw error;
      }
    }
    onCloseClick() {
      console.log('Close clicked!');
      this.args.selectUser(null);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "chat", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "startLiveChat", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "startLiveChat"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "playGame", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "playGame"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addFriend", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addFriend"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "blockUser", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "blockUser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onCloseClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onCloseClick"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ProfileOtherComponent);
});
;define("myapp/components/profile-own", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container-fluid row fill p-2">
    <!-- Profile picture column (1 part) -->
    <div class="col center">
      <img src={{this.user.profile.avatar}} alt="Profile Picture" class="profile-pic" />
    </div>
  
    <!-- Profile details column (3 parts) -->
    <div class="col-10">
      <!-- First row of profile details -->
      <div class="profile-details">
        {{#if this.isAuthenticated}}
          {{#if this.user.profile}} <!-- Access the user directly from the service -->
            <h2 class="name">{{this.user.profile.nickname}}</h2>
            <ModalProfile/>
          {{else}}
            <p>Loading user...</p> <!-- Or another fallback message -->
          {{/if}}
          <button class="logout-button" type="button" {{on "click" this.logout}}>Logout</button>
        {{/if}}
        <h2 class="points info">{{this.user.profile.trophies}} 🏆</h2>
      </div>
  
      <!-- Second row of profile details -->
      <div class="profile-details">
        <ModalGameHistory />
        <h2 class="info">Wins: {{this.user.profile.wins}}</h2>
      </div>
  
      <div class="profile-details">
        {{#if this.isOnline}} 
          <h2 class="info">🟢 online</h2>
        {{else}}
          <h2 class="info">🔴 offline</h2>
        {{/if}}
        <h2 class="info">Losses: {{this.user.profile.losses}}</h2>
      </div>
    </div>
  </div>
  
  
  */
  {
    "id": "gQKzSoKE",
    "block": "[[[10,0],[14,0,\"container-fluid row fill p-2\"],[12],[1,\"\\n  \"],[3,\" Profile picture column (1 part) \"],[1,\"\\n  \"],[10,0],[14,0,\"col center\"],[12],[1,\"\\n    \"],[10,\"img\"],[15,\"src\",[30,0,[\"user\",\"profile\",\"avatar\"]]],[14,\"alt\",\"Profile Picture\"],[14,0,\"profile-pic\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[3,\" Profile details column (3 parts) \"],[1,\"\\n  \"],[10,0],[14,0,\"col-10\"],[12],[1,\"\\n    \"],[3,\" First row of profile details \"],[1,\"\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n\"],[41,[30,0,[\"isAuthenticated\"]],[[[1,\"        \"],[41,[30,0,[\"user\",\"profile\"]],[[[1,\" \"],[3,\" Access the user directly from the service \"],[1,\"\\n          \"],[10,\"h2\"],[14,0,\"name\"],[12],[1,[30,0,[\"user\",\"profile\",\"nickname\"]]],[13],[1,\"\\n          \"],[8,[39,4],null,null,null],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,2],[12],[1,\"Loading user...\"],[13],[1,\" \"],[3,\" Or another fallback message \"],[1,\"\\n\"]],[]]],[1,\"        \"],[11,\"button\"],[24,0,\"logout-button\"],[24,4,\"button\"],[4,[38,7],[\"click\",[30,0,[\"logout\"]]],null],[12],[1,\"Logout\"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[10,\"h2\"],[14,0,\"points info\"],[12],[1,[30,0,[\"user\",\"profile\",\"trophies\"]]],[1,\" 🏆\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[3,\" Second row of profile details \"],[1,\"\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n      \"],[8,[39,8],null,null,null],[1,\"\\n      \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"Wins: \"],[1,[30,0,[\"user\",\"profile\",\"wins\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n\"],[41,[30,0,[\"isOnline\"]],[[[1,\"        \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"🟢 online\"],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"🔴 offline\"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,\"Losses: \"],[1,[30,0,[\"user\",\"profile\",\"losses\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"]],[],false,[\"div\",\"img\",\"if\",\"h2\",\"modal-profile\",\"p\",\"button\",\"on\",\"modal-game-history\"]]",
    "moduleName": "myapp/components/profile-own.hbs",
    "isStrictMode": false
  });
  let NavigationComponent = _exports.default = (_class = class NavigationComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
      _initializerDefineProperty(this, "user", _descriptor2, this);
    }
    // Inject the UserService to access user data

    get isAuthenticated() {
      return this.session.isAuthenticated;
    }
    get isOnline() {
      if (this.session.isAuthenticated && this.user.profile) {
        return this.user.profile.status === 'online'; // Access `user` directly from the service
      }
      return false;
    }
    logout() {
      this.session.invalidate();
      this.user.clearProfile(); // Clear user data from the service on logout
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "logout", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "logout"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, NavigationComponent);
});
;define("myapp/components/scoreboard", ["exports", "@ember/component", "@glimmer/component", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container-fluid row border">
    {{!-- Profile picture column (1 part) --}}
    <div class="col-5">
      
      <User @user={{this.gameData.player_1}} @selectUser={{this.args.selectUser}}/>
    </div>
  
    {{!-- Profile details column (3 parts) --}}
    <div class="col-2">
      <div class="waviy center"><span style="--i:1">{{this.gameData.left_score}}:{{this.gameData.right_score}}</span></div>
    </div>
  
    <div class="col-5">
      <User @user={{this.gameData.player_2}} @selectUser={{this.args.selectUser}}/>
    </div>
  </div>
  
  */
  {
    "id": "ZUTsvi0i",
    "block": "[[[10,0],[14,0,\"container-fluid row border\"],[12],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"col-5\"],[12],[1,\"\\n    \\n    \"],[8,[39,1],null,[[\"@user\",\"@selectUser\"],[[30,0,[\"gameData\",\"player_1\"]],[30,0,[\"args\",\"selectUser\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"col-2\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"waviy center\"],[12],[10,1],[14,5,\"--i:1\"],[12],[1,[30,0,[\"gameData\",\"left_score\"]]],[1,\":\"],[1,[30,0,[\"gameData\",\"right_score\"]]],[13],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"col-5\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@user\",\"@selectUser\"],[[30,0,[\"gameData\",\"player_2\"]],[30,0,[\"args\",\"selectUser\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"div\",\"user\",\"span\"]]",
    "moduleName": "myapp/components/scoreboard.hbs",
    "isStrictMode": false
  });
  let ScoreboardComponent = _exports.default = (_class = class ScoreboardComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "gameData", _descriptor, this);
    } // Inject the game-data service
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "gameData", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ScoreboardComponent);
});
;define("myapp/components/title-animation", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function (_exports, _component, _templateOnly, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/template-only",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="waviy">
     <span style="--i:1">4</span>
     <span style="--i:2">2</span>
     <span style="--i:3">_</span>
     <span style="--i:4">tr</span>
     <span style="--i:5">a</span>
     <span style="--i:6">s</span>
     <span style="--i:7">cen</span>
     <span style="--i:8">d</span>
     <span style="--i:8">e</span>
     <span style="--i:8">nc</span>
     <span style="--i:8">e</span>
  </div>
  
  */
  {
    "id": "l+mNLrgS",
    "block": "[[[10,0],[14,0,\"waviy\"],[12],[1,\"\\n   \"],[10,1],[14,5,\"--i:1\"],[12],[1,\"4\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:2\"],[12],[1,\"2\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:3\"],[12],[1,\"_\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:4\"],[12],[1,\"tr\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:5\"],[12],[1,\"a\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:6\"],[12],[1,\"s\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:7\"],[12],[1,\"cen\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:8\"],[12],[1,\"d\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:8\"],[12],[1,\"e\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:8\"],[12],[1,\"nc\"],[13],[1,\"\\n   \"],[10,1],[14,5,\"--i:8\"],[12],[1,\"e\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"div\",\"span\"]]",
    "moduleName": "myapp/components/title-animation.hbs",
    "isStrictMode": false
  });
  var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
});
;define("myapp/components/tournament-item", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="user-card">
          <p class="mb-0"><h2 class="info">{{@creator}}'s</h2>
          <h3 class="tournament-info">Tournament</h3></p>
          <div class="actions left">
              <button class="tournament-button join" {{on "click" (fn this.onJoinClick @creator)}} type="button">Join</button>
              <button class="tournament-button" {{on "click" (fn this.onLeaveClick @creator)}} type="button">Leave</button>
          </div>
          <h2 class="points info">👥 {{@current_players}}/{{@max_players}}</h2>
  </div>
  
  */
  {
    "id": "l+X2ycFG",
    "block": "[[[10,0],[14,0,\"user-card\"],[12],[1,\"\\n        \"],[10,2],[14,0,\"mb-0\"],[12],[10,\"h2\"],[14,0,\"info\"],[12],[1,[30,1]],[1,\"'s\"],[13],[1,\"\\n        \"],[10,\"h3\"],[14,0,\"tournament-info\"],[12],[1,\"Tournament\"],[13],[13],[1,\"\\n        \"],[10,0],[14,0,\"actions left\"],[12],[1,\"\\n            \"],[11,\"button\"],[24,0,\"tournament-button join\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"onJoinClick\"]],[30,1]],null]],null],[12],[1,\"Join\"],[13],[1,\"\\n            \"],[11,\"button\"],[24,0,\"tournament-button\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"onLeaveClick\"]],[30,1]],null]],null],[12],[1,\"Leave\"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"h2\"],[14,0,\"points info\"],[12],[1,\"👥 \"],[1,[30,2]],[1,\"/\"],[1,[30,3]],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"@creator\",\"@current_players\",\"@max_players\"],false,[\"div\",\"p\",\"h2\",\"h3\",\"button\",\"on\",\"fn\"]]",
    "moduleName": "myapp/components/tournament-item.hbs",
    "isStrictMode": false
  });
  let TournamentItemComponent = _exports.default = (_class = class TournamentItemComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "tournament", _descriptor, this);
      _initializerDefineProperty(this, "user", _descriptor2, this);
    }
    onJoinClick(creator) {
      console.log('Join clicked!', creator);
      this.tournament.connectToLobby(creator);
    }
    onLeaveClick(creator) {
      console.log('Leave clicked!', creator);
      this.tournament.disconnectFromLobby(creator);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "tournament", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "onJoinClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onJoinClick"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onLeaveClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onLeaveClick"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, TournamentItemComponent);
});
;define("myapp/components/tournament-list", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _tracking, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <nav class="navigation-bar">
      <h1 class="white">Tournaments</h1>
      <button class="tournament-button update" onclick={{this.fetchTournaments}} type="button">↻</button>
  </nav>
  <div class="scrollable-list middle-scroll">
      {{#each this.tournaments as |tournament|}}
          <TournamentItem @creator={{tournament.name}} @current_players={{tournament.num_players}} @max_players="10"/>
      {{/each}}
  </div>
  
  */
  {
    "id": "169tmhqw",
    "block": "[[[10,\"nav\"],[14,0,\"navigation-bar\"],[12],[1,\"\\n    \"],[10,\"h1\"],[14,0,\"white\"],[12],[1,\"Tournaments\"],[13],[1,\"\\n    \"],[10,\"button\"],[14,0,\"tournament-button update\"],[15,\"onclick\",[30,0,[\"fetchTournaments\"]]],[14,4,\"button\"],[12],[1,\"↻\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,0],[14,0,\"scrollable-list middle-scroll\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"tournaments\"]]],null]],null],null,[[[1,\"        \"],[8,[39,6],null,[[\"@creator\",\"@current_players\",\"@max_players\"],[[30,1,[\"name\"]],[30,1,[\"num_players\"]],\"10\"]],null],[1,\"\\n\"]],[1]],null],[13],[1,\"\\n\"]],[\"tournament\"],false,[\"nav\",\"h1\",\"button\",\"div\",\"each\",\"-track-array\",\"tournament-item\"]]",
    "moduleName": "myapp/components/tournament-list.hbs",
    "isStrictMode": false
  });
  let TournamentListComponent = _exports.default = (_class = class TournamentListComponent extends _component2.default {
    // To store the interval ID for cleanup

    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "session", _descriptor, this);
      _initializerDefineProperty(this, "tournaments", _descriptor2, this);
      _defineProperty(this, "intervalId", null);
      this.startFetchingTournaments();
    }

    /**
     * Start fetching tournaments every 10 seconds
     */
    startFetchingTournaments() {
      this.fetchTournaments(); // Fetch immediately on load
      this.intervalId = setInterval(() => {
        this.fetchTournaments();
      }, 10000); // 10 seconds
    }

    /**
     * Fetch tournaments from the API
     */
    async fetchTournaments() {
      try {
        const response = await fetch('/lobby/list/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch lobby list');
        }
        const data = await response.json();
        this.tournaments = data.tournaments;
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    }

    /**
     * Cleanup the interval when the component is destroyed
     */
    willDestroy() {
      super.willDestroy(...arguments);
      if (this.intervalId) {
        clearInterval(this.intervalId); // Clear the interval
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "tournaments", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _applyDecoratedDescriptor(_class.prototype, "fetchTournaments", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "fetchTournaments"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, TournamentListComponent);
});
;define("myapp/components/user-list-tournament", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _object, _service, _templateFactory) {
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
    <div class="scrollable-list middle-scroll">
      {{#each this.tournament.currentPlayers as |user|}}
          <User @user={{user}} @selectUser={{null}} />
      {{/each}}
  </div>
  */
  {
    "id": "P2DdJXcY",
    "block": "[[[10,0],[14,0,\"scrollable-list middle-scroll\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"tournament\",\"currentPlayers\"]]],null]],null],null,[[[1,\"        \"],[8,[39,3],null,[[\"@user\",\"@selectUser\"],[[30,1],null]],null],[1,\"\\n\"]],[1]],null],[13]],[\"user\"],false,[\"div\",\"each\",\"-track-array\",\"user\"]]",
    "moduleName": "myapp/components/user-list-tournament.hbs",
    "isStrictMode": false
  });
  let UserListComponent = _exports.default = (_class = class UserListComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "tournament", _descriptor, this);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "tournament", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserListComponent);
});
;define("myapp/components/user-list", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _tracking, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="scrollable-list middle-scroll">
      {{#each this.users as |user|}}
          <User @user={{user}} @selectUser={{this.args.selectUser}} />
      {{/each}}
  </div>
  */
  {
    "id": "KLr89RPk",
    "block": "[[[10,0],[14,0,\"scrollable-list middle-scroll\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"users\"]]],null]],null],null,[[[1,\"        \"],[8,[39,3],null,[[\"@user\",\"@selectUser\"],[[30,1],[30,0,[\"args\",\"selectUser\"]]]],null],[1,\"\\n\"]],[1]],null],[13]],[\"user\"],false,[\"div\",\"each\",\"-track-array\",\"user\"]]",
    "moduleName": "myapp/components/user-list.hbs",
    "isStrictMode": false
  });
  let UserListComponent = _exports.default = (_class = class UserListComponent extends _component2.default {
    // To store the interval ID for cleanup

    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "users", _descriptor, this);
      _initializerDefineProperty(this, "session", _descriptor2, this);
      _defineProperty(this, "intervalId", null);
      this.startFetchingUsers();
    }

    /**
     * Start fetching tournaments every 10 seconds
     */
    startFetchingUsers() {
      this.fetchUsers(); // Fetch immediately on load
      this.intervalId = setInterval(() => {
        this.fetchUsers();
      }, 10000); // 10 seconds
    }
    async fetchUsers() {
      try {
        const response = await fetch('/users/users/profile-list/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.users = await response.json();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
    willDestroy() {
      super.willDestroy(...arguments);
      if (this.intervalId) {
        clearInterval(this.intervalId); // Clear the interval
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "users", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "fetchUsers", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "fetchUsers"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserListComponent);
});
;define("myapp/components/user", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@glimmer/tracking", "@ember/template-factory"], function (_exports, _component, _component2, _object, _tracking, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/object",0,"@glimmer/tracking",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="user-card" role="button" onclick={{this.select}}>
      <img src={{@user.avatar}} alt="Profile Picture" class="user-pic user" />
      <div class="profile-details">
          {{#if this.isOnline}} 
          <h2 class="info">{{@user.nickname}} 🟢</h2>
          {{else}}
          <h2 class="info">{{@user.nickname}} 🔴</h2>
          {{/if}}
          <h2 class="points info">{{@user.trophies}} 🏆</h2>        
      </div>
  </div>
  
  */
  {
    "id": "KFUQYBB5",
    "block": "[[[10,0],[14,0,\"user-card\"],[14,\"role\",\"button\"],[15,\"onclick\",[30,0,[\"select\"]]],[12],[1,\"\\n    \"],[10,\"img\"],[15,\"src\",[30,1,[\"avatar\"]]],[14,\"alt\",\"Profile Picture\"],[14,0,\"user-pic user\"],[12],[13],[1,\"\\n    \"],[10,0],[14,0,\"profile-details\"],[12],[1,\"\\n\"],[41,[30,0,[\"isOnline\"]],[[[1,\"        \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,[30,1,[\"nickname\"]]],[1,\" 🟢\"],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,\"h2\"],[14,0,\"info\"],[12],[1,[30,1,[\"nickname\"]]],[1,\" 🔴\"],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[10,\"h2\"],[14,0,\"points info\"],[12],[1,[30,1,[\"trophies\"]]],[1,\" 🏆\"],[13],[1,\"        \\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"@user\"],false,[\"div\",\"img\",\"if\",\"h2\"]]",
    "moduleName": "myapp/components/user.hbs",
    "isStrictMode": false
  });
  let UserCardComponent = _exports.default = (_class = class UserCardComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "isActive", _descriptor, this);
    }
    select() {
      console.log('User clicked!');
      // Call the parent action passed via @selectUser
      this.args.selectUser(this.args.user); // Passing the selected user to the parent action
    }
    get isOnline() {
      return this.args.user?.status === 'online';
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isActive", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "select", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "select"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserCardComponent);
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
;define("myapp/controllers/application", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember/service"], function (_exports, _controller, _tracking, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ApplicationController = _exports.default = (_class = class ApplicationController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "selectedUser", _descriptor, this);
      // Initially no user is selected
      _initializerDefineProperty(this, "session", _descriptor2, this);
      _initializerDefineProperty(this, "router", _descriptor3, this);
      _initializerDefineProperty(this, "user", _descriptor4, this);
    }
    get activeRoute() {
      return this.router.currentRouteName;
    }

    // Action to handle the user selection
    selectUser(user) {
      console.log('Selected User:', user);
      if (user && user.nickname !== this.user.profile.nickname) this.fetchUserData(user.nickname);else this.selectedUser = null;
    }
    async fetchUserData(nickname) {
      try {
        const response = await fetch('/users/users/profile-info/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nickname
          })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        this.selectedUser = data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "selectedUser", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "selectUser", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "selectUser"), _class.prototype), _class);
});
;define("myapp/controllers/choose-game", ["exports", "@ember/controller", "@ember/object", "@ember/service", "@glimmer/tracking"], function (_exports, _controller, _object, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ChooseGameController = _exports.default = (_class = class ChooseGameController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "loading", _descriptor2, this);
      // Tracks the loading state
      _initializerDefineProperty(this, "gameData", _descriptor3, this);
      // Inject the game-data service
      _initializerDefineProperty(this, "user", _descriptor4, this);
      _initializerDefineProperty(this, "session", _descriptor5, this);
    }
    chooseGame(gameType) {
      this.loading = true;
      this.createRoom(gameType);
    }
    async createRoom(gameType) {
      try {
        //const response = await fetch('/api/create-room.json', {
        const response = await fetch('/pong/pong/create-room', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            player: this.user.profile.nickname,
            // Add player_1 with the user's value
            gameType: gameType // Set the selected game type
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.room_name) {
          this.loading = false;
          console.log("data:", data);
          this.gameData.setGameData(gameType, data);
          this.router.transitionTo('pong-game');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "loading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "gameData", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "chooseGame", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "chooseGame"), _class.prototype), _class);
});
;define("myapp/controllers/login", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/service", "@ember/object"], function (_exports, _controller, _tracking, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
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
      _initializerDefineProperty(this, "user", _descriptor3, this);
      _initializerDefineProperty(this, "username", _descriptor4, this);
      _initializerDefineProperty(this, "password", _descriptor5, this);
      _initializerDefineProperty(this, "error", _descriptor6, this);
    }
    update(attr, event) {
      this[attr] = event.target.value;
    }
    async login(event) {
      event.preventDefault();
      try {
        await this.session.authenticate('authenticator:token', this.username, this.password);
        this.fetchUserData("");
        console.log(this.session.data);
        console.log(this.session.data.authenticated.access);
        this.router.transitionTo('choose-game');
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
        this.fetchUserData("");
        this.router.transitionTo('choose-game');
      } catch (error) {
        this.error = error.message || 'An error occurred during registration';
      }
    }
    async fetchUserData(nickname) {
      try {
        const response = await fetch('/users/users/profile-info/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nickname
          })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        console.log(data);
        this.user.setProfile(data); // Store user data for use in the template
        console.log(this.user.profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
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
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "username", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "password", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "update", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "login", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "login"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "register", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "register"), _class.prototype), _class);
});
;define("myapp/controllers/tournament", ["exports", "@ember/controller", "@ember/service"], function (_exports, _controller, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let TournamentController = _exports.default = (_class = class TournamentController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "tournament", _descriptor, this);
      _initializerDefineProperty(this, "user", _descriptor2, this);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "tournament", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
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
;define("myapp/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/and"eaimeta@70e063a35619d71f
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
;define("myapp/helpers/bs-contains", ["exports", "ember-bootstrap/helpers/bs-contains"], function (_exports, _bsContains) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "bsContains", {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-contains"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/bs-default", ["exports", "ember-bootstrap/helpers/bs-default"], function (_exports, _bsDefault) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsDefault.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-default"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/bs-eq", ["exports", "ember-bootstrap/helpers/bs-eq"], function (_exports, _bsEq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-eq"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/bs-form-horiz-input-class", ["exports", "ember-bootstrap/helpers/bs-form-horiz-input-class"], function (_exports, _bsFormHorizInputClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsFormHorizInputClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-form-horiz-input-class"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/bs-form-horiz-offset-class", ["exports", "ember-bootstrap/helpers/bs-form-horiz-offset-class"], function (_exports, _bsFormHorizOffsetClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsFormHorizOffsetClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-form-horiz-offset-class"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/bs-noop", ["exports", "ember-bootstrap/helpers/bs-noop"], function (_exports, _bsNoop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNoop.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-noop"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/bs-size-class", ["exports", "ember-bootstrap/helpers/bs-size-class"], function (_exports, _bsSizeClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsSizeClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-size-class"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/bs-type-class", ["exports", "ember-bootstrap/helpers/bs-type-class"], function (_exports, _bsTypeClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTypeClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-type-class"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/cancel-all"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/did-insert-helper", ["exports", "ember-render-helpers/helpers/did-insert-helper"], function (_exports, _didInsertHelper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsertHelper.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-render-helpers/helpers/did-insert-helper"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/did-update-helper", ["exports", "ember-render-helpers/helpers/did-update-helper"], function (_exports, _didUpdateHelper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdateHelper.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-render-helpers/helpers/did-update-helper"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/element", ["exports", "ember-element-helper/helpers/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-element-helper/helpers/element"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/ensure-safe-component", ["exports", "@embroider/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _util.EnsureSafeComponentHelper;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/eq", ["exports", "ember-truth-helpers/helpers/eq"], function (_exports, _eq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _eq.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/eq"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gt"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gte"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-array"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-empty"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-equal"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lt"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lte"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-eq"], function (_exports, _notEq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEq.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not-eq"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/on-document", ["exports", "ember-on-helper/helpers/on-document"], function (_exports, _onDocument) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onDocument.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-on-helper/helpers/on-document"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/on-window", ["exports", "ember-on-helper/helpers/on-window"], function (_exports, _onWindow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onWindow.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-on-helper/helpers/on-window"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/on", ["exports", "ember-on-helper/helpers/on"], function (_exports, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _on.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-on-helper/helpers/on"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/or"eaimeta@70e063a35619d71f
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
;define("myapp/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/perform"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/popper-modifier", ["exports", "ember-popper-modifier/helpers/popper-modifier"], function (_exports, _popperModifier) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "buildPopperModifier", {
    enumerable: true,
    get: function () {
      return _popperModifier.buildPopperModifier;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _popperModifier.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-popper-modifier/helpers/popper-modifier"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/ref-to", ["exports", "ember-ref-bucket/helpers/ref-to"], function (_exports, _refTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _refTo.default;
    }
  });
  Object.defineProperty(_exports, "refTo", {
    enumerable: true,
    get: function () {
      return _refTo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-ref-bucket/helpers/ref-to"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/task"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/will-destroy-helper", ["exports", "ember-render-helpers/helpers/will-destroy-helper"], function (_exports, _willDestroyHelper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroyHelper.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-render-helpers/helpers/will-destroy-helper"eaimeta@70e063a35619d71f
});
;define("myapp/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/xor"eaimeta@70e063a35619d71f
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
;define("myapp/initializers/load-bootstrap-config", ["exports", "myapp/config/environment", "ember-bootstrap/config", "ember-bootstrap/version"], function (_exports, _environment, _config, _version) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  0; //eaimeta@70e063a35619d71f0,"myapp/config/environment",0,"ember-bootstrap/config",0,"ember-bootstrap/version"eaimeta@70e063a35619d71f
  function initialize(/* container, application */
  ) {
    _config.default.load(_environment.default['ember-bootstrap'] || {});
    (0, _version.registerLibrary)();
  }
  var _default = _exports.default = {
    name: 'load-bootstrap-config',
    initialize
  };
});
;define("myapp/instance-initializers/global-ref-cleanup", ["exports", "ember-ref-bucket/instance-initializers/global-ref-cleanup"], function (_exports, _globalRefCleanup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _globalRefCleanup.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _globalRefCleanup.initialize;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-ref-bucket/instance-initializers/global-ref-cleanup"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/bs-conditional-attribute", ["exports", "ember-bootstrap/modifiers/bs-conditional-attribute"], function (_exports, _bsConditionalAttribute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsConditionalAttribute.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/modifiers/bs-conditional-attribute"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/create-ref", ["exports", "ember-ref-bucket/modifiers/create-ref"], function (_exports, _createRef) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _createRef.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-ref-bucket/modifiers/create-ref"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-insert"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-update"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/focus-trap", ["exports", "ember-focus-trap/modifiers/focus-trap"], function (_exports, _focusTrap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _focusTrap.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-focus-trap/modifiers/focus-trap"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/popper-tooltip", ["exports", "ember-popper-modifier/modifiers/popper-tooltip"], function (_exports, _popperTooltip) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _popperTooltip.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-popper-modifier/modifiers/popper-tooltip"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/popper", ["exports", "ember-popper-modifier/modifiers/popper"], function (_exports, _popper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _popper.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-popper-modifier/modifiers/popper"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/style", ["exports", "ember-style-modifier/modifiers/style"], function (_exports, _style) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _style.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-style-modifier/modifiers/style"eaimeta@70e063a35619d71f
});
;define("myapp/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/will-destroy"eaimeta@70e063a35619d71f
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
    this.route('chat');
    this.route('tournament');
    this.route('choose-game');
  });
});
;define("myapp/routes/application", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
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
  let ApplicationRoute = _exports.default = (_class = class ApplicationRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    async beforeModel() {
      if (!this.sessionInitialized) {
        await this.session.setup();
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("myapp/routes/chat", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
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
  let ChatRoute = _exports.default = (_class = class ChatRoute extends _route.default {
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
;define("myapp/routes/choose-game", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
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
  let ChooseGameRoute = _exports.default = (_class = class ChooseGameRoute extends _route.default {
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
;define("myapp/routes/tournament", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
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
  let TournamentRoute = _exports.default = (_class = class TournamentRoute extends _route.default {
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
;define("myapp/services/-ensure-registered", ["exports", "@embroider/util/services/ensure-registered"], function (_exports, _ensureRegistered) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ensureRegistered.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util/services/ensure-registered"eaimeta@70e063a35619d71f
});
;define("myapp/services/chat", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ChatService = _exports.default = (_class = class ChatService extends _service.default {
    setInputElement(element) {
      this.inputElement = element;
    }
    focusInput() {
      if (this.inputElement) {
        this.inputElement.focus();
      }
    }
    constructor() {
      super(...arguments);

      // Initialize the WebSocket connection
      _initializerDefineProperty(this, "messages", _descriptor, this);
      // Track incoming messages
      _initializerDefineProperty(this, "messageInput", _descriptor2, this);
      // Input field value
      _initializerDefineProperty(this, "inputColor", _descriptor3, this);
      _initializerDefineProperty(this, "user", _descriptor4, this);
      _initializerDefineProperty(this, "websockets", _descriptor5, this);
      _initializerDefineProperty(this, "session", _descriptor6, this);
      _initializerDefineProperty(this, "tournament", _descriptor7, this);
      _defineProperty(this, "socketRef", null);
      _defineProperty(this, "inputElement", null);
      // Reference to the input element
      _defineProperty(this, "type", "all");
      _defineProperty(this, "to_user", "");
      _defineProperty(this, "words", null);
      _defineProperty(this, "predefinedColors", {
        all: 'rgb(0 0 0)',
        tournament: 'rgb(30 218 55)',
        whisper: 'rgb(255 49 255)',
        system: 'rgb(130 140 55)'
      });
      console.log("connect ...");
      const token = this.session.data.authenticated.access;
      const url = `wss://localhost/ws/chat/lobby/?token=${encodeURIComponent(token)}`;
      const socket = this.websockets.socketFor(url);
      socket.on('open', this.myOpenHandler, this);
      socket.on('message', this.myMessageHandler, this);
      socket.on('close', this.myCloseHandler, this);
      this.socketRef = socket;
    }
    myOpenHandler(event) {
      console.log(`On open event has been called token: ${this.session.data.authenticated.access}`);
    }
    myMessageHandler(event) {
      console.log(`Message recieve: ${event.data}`);
      const newMessage = JSON.parse(event.data);
      this.messages = [...this.messages, newMessage]; // Add the new message to the tracked array
      console.log(newMessage.content);
    }
    myCloseHandler(event) {
      console.log(`On close event has been called: ${event}`);
    }
    updateInputValue(input) {
      this.messageInput = input; // Update the tracked input value
      this.words = this.messageInput.trim().split(' ');
      if (this.words[0] === '/*tournament') {
        this.type = 'tournament';
        this.to_user = 'tournament';
        this.inputColor = this.predefinedColors.tournament;
      } else if (this.words[0] === '/*add') {
        this.type = 'add';
        this.to_user = this.words[1];
        this.inputColor = this.predefinedColors.system;
      } else if (this.words[0] === '/*invite') {
        this.type = 'invite';
        this.to_user = this.words[1];
        this.inputColor = this.predefinedColors.system;
      } else if (this.words[0].startsWith('/') && this.words[0].length > 1 && this.words[0][1] !== '*') {
        this.type = 'whisper';
        this.to_user = this.words[0].substring(1);
        this.inputColor = this.predefinedColors.whisper;
      } else {
        this.type = 'all';
        this.inputColor = this.predefinedColors.all;
      }
    }
    sendMessage() {
      let messageContent = this.messageInput.trim();
      if (this.type !== "all") {
        messageContent = this.words.slice(1).join(' ');
      }
      if (this.type === "tournament") {
        const data = {
          action: "message",
          sender: this.user.profile.nickname,
          message: messageContent,
          timestamp: new Date().toISOString()
        };
        this.tournament.sendMessage(data);
      } else if (messageContent && this.to_user !== this.user.profile.nickname) {
        this.socketRef.send(JSON.stringify({
          type: this.type,
          from: this.user.profile.nickname,
          to: this.to_user,
          content: messageContent,
          timestamp: new Date().toISOString()
        }));
      }
      if (this.type === "all") this.messageInput = '';else this.messageInput = this.words[0] + " ";
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "messages", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "messageInput", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "inputColor", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.predefinedColors.all;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "websockets", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "tournament", [_service.inject], {
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
;define("myapp/services/game-data", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let GameDataService = _exports.default = (_class = class GameDataService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "gameType", _descriptor, this);
      _initializerDefineProperty(this, "roomData", _descriptor2, this);
      _initializerDefineProperty(this, "player_1", _descriptor3, this);
      _initializerDefineProperty(this, "player_2", _descriptor4, this);
      _initializerDefineProperty(this, "left_score", _descriptor5, this);
      _initializerDefineProperty(this, "right_score", _descriptor6, this);
      _initializerDefineProperty(this, "session", _descriptor7, this);
    }
    async setGameData(gameType, roomData) {
      this.gameType = gameType;
      this.roomData = roomData;

      // Fetch user data for player_1 and player_2 asynchronously
      if (roomData.player1 !== "AI") this.player_1 = await this.fetchUserData(roomData.player1);else this.player_1 = {
        nickname: "Computer",
        avatar: "/images/default-profile.jpeg",
        trophies: 999,
        status: "online"
      };
      if (roomData.player2 !== "AI") this.player_2 = await this.fetchUserData(roomData.player2);else this.player_2 = {
        nickname: "Computer",
        avatar: "/images/default-profile.jpeg",
        trophies: 999,
        status: "online"
      };
    }
    clearGameData() {
      this.gameType = null;
      this.roomData = null;
      this.player_1 = null;
      this.player_2 = null;
    }
    async fetchUserData(nickname) {
      try {
        const response = await fetch('/users/users/profile-info/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.session.data.authenticated.access}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nickname
          })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "gameType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "roomData", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "player_1", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "player_2", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "left_score", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "right_score", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
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
;define("myapp/services/socket-io", ["exports", "ember-websockets/services/socket-io"], function (_exports, _socketIo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _socketIo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-websockets/services/socket-io"eaimeta@70e063a35619d71f
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
;define("myapp/services/tournament", ["exports", "@ember/service", "@glimmer/tracking", "@ember/object"], function (_exports, _service, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let TournamentService = _exports.default = (_class = class TournamentService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "websockets", _descriptor, this);
      _initializerDefineProperty(this, "user", _descriptor2, this);
      _initializerDefineProperty(this, "session", _descriptor3, this);
      _initializerDefineProperty(this, "chat", _descriptor4, this);
      _initializerDefineProperty(this, "currentLobby", _descriptor5, this);
      // Current lobby details
      _initializerDefineProperty(this, "currentPlayers", _descriptor6, this);
      _initializerDefineProperty(this, "admin", _descriptor7, this);
      _defineProperty(this, "socketRef", null);
      _defineProperty(this, "startTournament", () => {
        const data = {
          action: 'start_tournament'
        };
        this.sendMessage(data);
      });
    }
    async connectToLobby(tournamentName) {
      const token = this.session.data.authenticated.access;
      const wsUrl = `wss://localhost/ws/tournament/${tournamentName}/?token=${encodeURIComponent(token)}`;
      if (this.socketRef) {
        console.log("disconnect");
        this.disconnectFromLobby(this.currentLobby);
      }
      const socket = this.websockets.socketFor(wsUrl);
      // Register WebSocket event handlers
      socket.on('open', () => this.onOpen(tournamentName), this);
      socket.on('message', this.onMessage, this);
      socket.on('close', this.onClose, this);
      this.set('socketRef', socket);
    }
    async disconnectFromLobby(tournamentName) {
      const token = this.session.data.authenticated.access;
      const wsUrl = `wss://localhost/ws/tournament/${tournamentName}/?token=${encodeURIComponent(token)}`;
      console.log(tournamentName);
      this.websockets.closeSocketFor(wsUrl);
      console.log("websocket1", this.websockets.sockets);

      // Remove event handlers
      this.socketRef.off('open', this.onOpen, this);
      this.socketRef.off('message', this.onMessage, this);
      this.socketRef.off('close', this.onClose, this);

      // Reset WebSocket reference
      this.socketRef = null;
      // Reset state or perform other cleanup as needed
      this.currentLobby = null;
      this.messages = [];
      this.currentPlayers = [];
    }
    sendWinner(winner) {
      const data = {
        action: 'winner',
        // message/start
        winner: winner
      };
      this.sendMessage(data);
    }
    sendMessage(data) {
      if (this.socketRef) {
        console.log(data);
        this.socketRef.send(JSON.stringify(data));
      } else {
        console.error('WebSocket is not connected.');
      }
    }
    onOpen(tournamentName) {
      const data = {
        action: 'create_or_join',
        tournament_name: tournamentName,
        nickname: this.user.profile.nickname
      };
      console.log('WebSocket connection opened:');
      this.sendMessage(data);
      this.currentLobby = tournamentName;
      console.log(this.currentLobby);
    }
    onMessage(event) {
      console.log('WebSocket message received:', event.data);
      const parsedMessage = JSON.parse(event.data);
      switch (parsedMessage.type) {
        case "create":
          this.handleCreate(parsedMessage);
          break;
        case "join/create":
          this.handleJoin(parsedMessage);
          break;
        case "join":
          this.handleJoin(parsedMessage);
          break;
        case "message":
          this.handleMessage(parsedMessage);
          break;
        case "leave":
          this.handleLeave(parsedMessage);
          break;
        case "match":
          this.handleMatch(parsedMessage);
          break;
        case "tournament_winner":
          this.handleTournamentWinner(parsedMessage);
          break;
        default:
          // Handle the default case here (if needed)
          break;
      }
    }
    handleCreate(parsedMessage) {
      this.currentPlayers = [...parsedMessage.players];
      this.admin = parsedMessage.admin;
      const data = {
        type: 'tournament',
        from: 'System',
        content: 'You created the Tournament ' + this.currentLobby
      };
      this.chat.messages = [...this.chat.messages, data];
    }
    handleJoin(parsedMessage) {
      this.currentPlayers = [...parsedMessage.players];
      this.admin = parsedMessage.admin;
      const data = {
        type: 'tournament',
        from: 'System',
        content: parsedMessage.player + ' joined the Tournament!'
      };
      this.chat.messages = [...this.chat.messages, data];
    }
    handleMessage(parsedMessage) {
      const data = {
        type: 'tournament',
        from: parsedMessage.sender,
        content: parsedMessage.message
      };
      this.chat.messages = [...this.chat.messages, data];
    }
    handleStart(parsedMessage) {
      const data = {
        type: 'tournament',
        from: 'System',
        content: parsedMessage.message
      };
      this.chat.messages = [...this.chat.messages, data];
    }
    handleLeave(parsedMessage) {
      this.admin = parsedMessage.admin;
      this.currentPlayers = [...parsedMessage.players];
      const data = {
        type: 'tournament',
        from: 'System',
        content: parsedMessage.player + ' left the Tournament!'
      };
      this.chat.messages = [...this.chat.messages, data];
    }
    handleMatch(parsedMessage) {
      const opponent = parsedMessage.player1;
      if (parsedMessage.player1 === this.user.profile.nickname) opponent = parsedMessage.player2;
      const data = {
        type: 'tournament',
        from: 'System',
        content: "Get ready! Your next game is against " + opponent + " and it starts in just 20 seconds!"
      };
      this.chat.messages = [...this.chat.messages, data];
      const roomdata = {
        roomname: parsedMessage.room,
        player1: parsedMessage.player1,
        player2: parsedMessage.player2
      };
      this.gameData.setGameData("tournament", roomdata);
      this.router.transitionTo('pong-game');
    }
    handleTournamentWinner(parsedMessage) {}
    onClose(event) {
      console.log('WebSocket connection closed:', event);
      this.currentLobby = null;
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "user", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "chat", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "currentLobby", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "currentPlayers", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "admin", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "connectToLobby", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "connectToLobby"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disconnectFromLobby", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "disconnectFromLobby"), _class.prototype), _class);
});
;define("myapp/services/user", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let UserService = _exports.default = (_class = class UserService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "profile", _descriptor, this);
    }
    // Track the current user profile

    setProfile(userData) {
      this.profile = userData; // Set user data in the service
    }
    clearProfile() {
      this.profile = null; // Clear the user data (on logout)
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "profile", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _class);
});
;define("myapp/services/websockets", ["exports", "ember-websockets/services/websockets"], function (_exports, _websockets) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _websockets.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-websockets/services/websockets"eaimeta@70e063a35619d71f
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
  {{this.isAuthenticated}}
  <div class="container-fluid body">
    <div class="container-fluid row">
      <div class="col header">
       <ProfileOwn />
      </div>
      <div class="col header">
        {{#if this.selectedUser}}
          <ProfileOther @selectedUser={{this.selectedUser}} @selectUser={{this.selectUser}}/>
        {{else}}
          <TitleAnimation />
        {{/if}}
      </div>
    </div>
    <div class="container-fluid row">
      <div class="container-fluid col-3 middle">
          <TournamentList />
      </div>
      <div class="container-fluid col-6 middle custom-bg-black">
  		{{outlet}}
      </div>
      <div class="container-fluid col-3 middle">
        <NavigationBar />
        <UserList @selectUser={{this.selectUser}}/>
      </div>
    </div>
    <div class="container-fluid row">
      <div class="container-fluid col-3 footer">
              <LinkTo @route="choose-game" class="nav-button">Game</LinkTo>
              <LinkTo @route="chat" class="nav-button">Chat</LinkTo>            
              <LinkTo @route="tournament" class="nav-button">Tournament</LinkTo>
      </div>
      <div class="container-fluid col-6 footer">
        <Scoreboard @selectUser={{this.selectUser}}/>
      </div>
      <div class="container-fluid col-3 footer p-1">
        {{#if this.session.isAuthenticated}}
          {{#unless (eq this.activeRoute "chat")}}
            <Chat />
          {{/unless}}
        {{/if}}
      </div>
    </div>    
  </div>
  
  </main>
  
  */
  {
    "id": "00o/NGBf",
    "block": "[[[10,\"main\"],[12],[1,\"\\n\"],[1,[30,0,[\"isAuthenticated\"]]],[1,\"\\n\"],[10,0],[14,0,\"container-fluid body\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"container-fluid row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col header\"],[12],[1,\"\\n     \"],[8,[39,2],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col header\"],[12],[1,\"\\n\"],[41,[30,0,[\"selectedUser\"]],[[[1,\"        \"],[8,[39,4],null,[[\"@selectedUser\",\"@selectUser\"],[[30,0,[\"selectedUser\"]],[30,0,[\"selectUser\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[8,[39,5],null,null,null],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"container-fluid row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container-fluid col-3 middle\"],[12],[1,\"\\n        \"],[8,[39,6],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"container-fluid col-6 middle custom-bg-black\"],[12],[1,\"\\n\\t\\t\"],[46,[28,[37,8],null,null],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"container-fluid col-3 middle\"],[12],[1,\"\\n      \"],[8,[39,9],null,null,null],[1,\"\\n      \"],[8,[39,10],null,[[\"@selectUser\"],[[30,0,[\"selectUser\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"container-fluid row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container-fluid col-3 footer\"],[12],[1,\"\\n            \"],[8,[39,11],[[24,0,\"nav-button\"]],[[\"@route\"],[\"choose-game\"]],[[\"default\"],[[[[1,\"Game\"]],[]]]]],[1,\"\\n            \"],[8,[39,11],[[24,0,\"nav-button\"]],[[\"@route\"],[\"chat\"]],[[\"default\"],[[[[1,\"Chat\"]],[]]]]],[1,\"            \\n            \"],[8,[39,11],[[24,0,\"nav-button\"]],[[\"@route\"],[\"tournament\"]],[[\"default\"],[[[[1,\"Tournament\"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"container-fluid col-6 footer\"],[12],[1,\"\\n      \"],[8,[39,12],null,[[\"@selectUser\"],[[30,0,[\"selectUser\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"container-fluid col-3 footer p-1\"],[12],[1,\"\\n\"],[41,[30,0,[\"session\",\"isAuthenticated\"]],[[[41,[51,[28,[37,14],[[30,0,[\"activeRoute\"]],\"chat\"],null]],[[[1,\"          \"],[8,[39,15],null,null,null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"    \\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\"]],[],false,[\"main\",\"div\",\"profile-own\",\"if\",\"profile-other\",\"title-animation\",\"tournament-list\",\"component\",\"-outlet\",\"navigation-bar\",\"user-list\",\"link-to\",\"scoreboard\",\"unless\",\"eq\",\"chat\"]]",
    "moduleName": "myapp/templates/application.hbs",
    "isStrictMode": false
  });
});
;define("myapp/templates/chat", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <Chat/>
  
  */
  {
    "id": "X/fO1PyJ",
    "block": "[[[8,[39,0],null,null,null],[1,\"\\n\"]],[],false,[\"chat\"]]",
    "moduleName": "myapp/templates/chat.hbs",
    "isStrictMode": false
  });
});
;define("myapp/templates/choose-game", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="pong-game">
    {{#if this.loading}}
      <h2 class="white p-3">Waiting for Player</h2>
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden"></span>
      </div>
    {{else}}
    <div class="flex-col">
      <div class="waviy">
        <span style="--i:1">4</span>
        <span style="--i:2">2</span>
        <span style="--i:3">_</span>
        <span style="--i:4">PO</span>
        <span style="--i:5">NG</span>
      </div>
  
      <div class="game-buttons">
        <button type="button" {{on "click" (fn this.chooseGame "computer")}}>Single Player</button>
        <button type="button" {{on "click" (fn this.chooseGame "local")}}>Local Multiplayer</button>
        <button type="button" {{on "click" (fn this.chooseGame "remote")}}>Remote Multiplayer</button>
      </div>
    </div>
    {{/if}}
  </div>
  
  */
  {
    "id": "wfVEWvGZ",
    "block": "[[[10,0],[14,0,\"pong-game\"],[12],[1,\"\\n\"],[41,[30,0,[\"loading\"]],[[[1,\"    \"],[10,\"h2\"],[14,0,\"white p-3\"],[12],[1,\"Waiting for Player\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"spinner-border text-light\"],[14,\"role\",\"status\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"visually-hidden\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"flex-col\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"waviy\"],[12],[1,\"\\n      \"],[10,1],[14,5,\"--i:1\"],[12],[1,\"4\"],[13],[1,\"\\n      \"],[10,1],[14,5,\"--i:2\"],[12],[1,\"2\"],[13],[1,\"\\n      \"],[10,1],[14,5,\"--i:3\"],[12],[1,\"_\"],[13],[1,\"\\n      \"],[10,1],[14,5,\"--i:4\"],[12],[1,\"PO\"],[13],[1,\"\\n      \"],[10,1],[14,5,\"--i:5\"],[12],[1,\"NG\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"game-buttons\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"chooseGame\"]],\"computer\"],null]],null],[12],[1,\"Single Player\"],[13],[1,\"\\n      \"],[11,\"button\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"chooseGame\"]],\"local\"],null]],null],[12],[1,\"Local Multiplayer\"],[13],[1,\"\\n      \"],[11,\"button\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"chooseGame\"]],\"remote\"],null]],null],[12],[1,\"Remote Multiplayer\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]],[13],[1,\"\\n\"]],[],false,[\"div\",\"if\",\"h2\",\"span\",\"button\",\"on\",\"fn\"]]",
    "moduleName": "myapp/templates/choose-game.hbs",
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
  
        <button class="login" type="submit">Login</button>
        <button type="button" class="register-button" {{on "click" this.register}}>Register</button>
      </form>
  
      {{#if this.error}}
        <p><strong>{{this.error}}</strong></p>
      {{/if}}
    </div>
  </div>
  */
  {
    "id": "4p4XKAP+",
    "block": "[[[10,0],[14,0,\"overlay\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"overlay-content\"],[12],[1,\"\\n    \"],[11,\"form\"],[4,[38,2],[\"submit\",[30,0,[\"login\"]]],null],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"Username:\"],[13],[1,\"\\n      \"],[11,\"input\"],[24,3,\"username\"],[24,4,\"text\"],[4,[38,2],[\"change\",[28,[37,5],[[30,0,[\"update\"]],\"username\"],null]],null],[12],[13],[1,\"\\n\\n      \"],[10,\"label\"],[12],[1,\"Password:\"],[13],[1,\"\\n      \"],[11,\"input\"],[24,3,\"password\"],[24,4,\"password\"],[4,[38,2],[\"change\",[28,[37,5],[[30,0,[\"update\"]],\"password\"],null]],null],[12],[13],[1,\"\\n\\n      \"],[10,\"button\"],[14,0,\"login\"],[14,4,\"submit\"],[12],[1,\"Login\"],[13],[1,\"\\n      \"],[11,\"button\"],[24,0,\"register-button\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"register\"]]],null],[12],[1,\"Register\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"error\"]],[[[1,\"      \"],[10,2],[12],[10,\"strong\"],[12],[1,[30,0,[\"error\"]]],[13],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"form\",\"on\",\"label\",\"input\",\"fn\",\"button\",\"if\",\"p\",\"strong\"]]",
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
    <PongGame />
  */
  {
    "id": "rI24dgfT",
    "block": "[[[8,[39,0],null,null,null]],[],false,[\"pong-game\"]]",
    "moduleName": "myapp/templates/pong-game.hbs",
    "isStrictMode": false
  });
});
;define("myapp/templates/tournament", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container-fluid row">
  	{{#if this.tournament.currentLobby}}
  		<div class="col-7">
  			<h2 class="points center">👥 1/10</h2>
  			<UserListTournament/>
  		</div>
  		<div class="button-container col-5">
<<<<<<< HEAD
  		<button class="nav-button start" type="button" {{on "click" (fn this.tournament.startTournament)}}>Start Tournament</button>
=======
  			{{#if (eq this.tournament.admin this.user.profile.nickname)}}
  				<button class="nav-button start" type="button" {{on "click" (fn this.tournament.startTournament)}}>Start Tournament</button>
  			{{/if}}
>>>>>>> main
  		<button class="nav-button cancel" type="button" {{on "click" (fn this.tournament.disconnectFromLobby this.tournament.currentLobby)}}>Leave</button> 
  		</div>
  	{{else}}
  		<div class="d-flex justify-content-center align-items-center">
  			<button 
  				class="nav-button mt-5" 
  				type="button" 
  				{{on "click" (fn this.tournament.connectToLobby this.user.profile.nickname)}}
  			>
  			Create Tournament
  			</button>
  			</div>
  	{{/if}}
  </div>
  */
  {
<<<<<<< HEAD
    "id": "O22zL/cw",
    "block": "[[[10,0],[14,0,\"container-fluid row\"],[12],[1,\"\\n\"],[41,[30,0,[\"tournament\",\"currentLobby\"]],[[[1,\"\\t\\t\"],[10,0],[14,0,\"col-7\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"h2\"],[14,0,\"points center\"],[12],[1,\"👥 1/10\"],[13],[1,\"\\n\\t\\t\\t\"],[8,[39,3],null,null,null],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[10,0],[14,0,\"button-container col-5\"],[12],[1,\"\\n\\t\\t\"],[11,\"button\"],[24,0,\"nav-button start\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"tournament\",\"startTournament\"]]],null]],null],[12],[1,\"Start Tournament\"],[13],[1,\"\\n\\t\\t\"],[11,\"button\"],[24,0,\"nav-button cancel\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"tournament\",\"disconnectFromLobby\"]],[30,0,[\"tournament\",\"currentLobby\"]]],null]],null],[12],[1,\"Leave\"],[13],[1,\" \\n\\t\\t\"],[13],[1,\"\\n\"]],[]],[[[1,\"\\t\\t\"],[10,0],[14,0,\"d-flex justify-content-center align-items-center\"],[12],[1,\"\\n\\t\\t\\t\"],[11,\"button\"],[24,0,\"nav-button mt-5\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"tournament\",\"connectToLobby\"]],[30,0,[\"user\",\"profile\",\"nickname\"]]],null]],null],[12],[1,\"\\n\\t\\t\\tCreate Tournament\\n\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\"]],[]]],[13]],[],false,[\"div\",\"if\",\"h2\",\"user-list-tournament\",\"button\",\"on\",\"fn\"]]",
=======
    "id": "z25Bczj6",
    "block": "[[[10,0],[14,0,\"container-fluid row\"],[12],[1,\"\\n\"],[41,[30,0,[\"tournament\",\"currentLobby\"]],[[[1,\"\\t\\t\"],[10,0],[14,0,\"col-7\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"h2\"],[14,0,\"points center\"],[12],[1,\"👥 1/10\"],[13],[1,\"\\n\\t\\t\\t\"],[8,[39,3],null,null,null],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[10,0],[14,0,\"button-container col-5\"],[12],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"tournament\",\"admin\"]],[30,0,[\"user\",\"profile\",\"nickname\"]]],null],[[[1,\"\\t\\t\\t\\t\"],[11,\"button\"],[24,0,\"nav-button start\"],[24,4,\"button\"],[4,[38,6],[\"click\",[28,[37,7],[[30,0,[\"tournament\",\"startTournament\"]]],null]],null],[12],[1,\"Start Tournament\"],[13],[1,\"\\n\"]],[]],null],[1,\"\\t\\t\"],[11,\"button\"],[24,0,\"nav-button cancel\"],[24,4,\"button\"],[4,[38,6],[\"click\",[28,[37,7],[[30,0,[\"tournament\",\"disconnectFromLobby\"]],[30,0,[\"tournament\",\"currentLobby\"]]],null]],null],[12],[1,\"Leave\"],[13],[1,\" \\n\\t\\t\"],[13],[1,\"\\n\"]],[]],[[[1,\"\\t\\t\"],[10,0],[14,0,\"d-flex justify-content-center align-items-center\"],[12],[1,\"\\n\\t\\t\\t\"],[11,\"button\"],[24,0,\"nav-button mt-5\"],[24,4,\"button\"],[4,[38,6],[\"click\",[28,[37,7],[[30,0,[\"tournament\",\"connectToLobby\"]],[30,0,[\"user\",\"profile\",\"nickname\"]]],null]],null],[12],[1,\"\\n\\t\\t\\tCreate Tournament\\n\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\"]],[]]],[13]],[],false,[\"div\",\"if\",\"h2\",\"user-list-tournament\",\"eq\",\"button\",\"on\",\"fn\"]]",
>>>>>>> main
    "moduleName": "myapp/templates/tournament.hbs",
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
