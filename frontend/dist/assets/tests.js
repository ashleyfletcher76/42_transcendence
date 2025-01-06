'use strict';

define("myapp/tests/helpers/index", ["exports", "ember-qunit"], function (_exports, _emberQunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setupApplicationTest = setupApplicationTest;
  _exports.setupRenderingTest = setupRenderingTest;
  _exports.setupTest = setupTest;
  0; //eaimeta@70e063a35619d71f0,"ember-qunit"eaimeta@70e063a35619d71f
  // This file exists to provide wrappers around ember-qunit's
  // test setup functions. This way, you can easily extend the setup that is
  // needed per test type.

  function setupApplicationTest(hooks, options) {
    (0, _emberQunit.setupApplicationTest)(hooks, options);

    // Additional setup for application tests can be done here.
    //
    // For example, if you need an authenticated session for each
    // application test, you could do:
    //
    // hooks.beforeEach(async function () {
    //   await authenticateSession(); // ember-simple-auth
    // });
    //
    // This is also a good place to call test setup functions coming
    // from other addons:
    //
    // setupIntl(hooks, 'en-us'); // ember-intl
    // setupMirage(hooks); // ember-cli-mirage
  }
  function setupRenderingTest(hooks, options) {
    (0, _emberQunit.setupRenderingTest)(hooks, options);

    // Additional setup for rendering tests can be done here.
  }
  function setupTest(hooks, options) {
    (0, _emberQunit.setupTest)(hooks, options);

    // Additional setup for unit tests can be done here.
  }
});
define("myapp/tests/integration/components/ball-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | ball', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Ball />
      */
      {
        "id": "cgZ2Ft6+",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"ball\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/ball-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Ball>
              template block text
            </Ball>
          
      */
      {
        "id": "EyHO0xKK",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"ball\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/ball-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/chat-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | chat', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Chat />
      */
      {
        "id": "oIlyLVgb",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"chat\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/chat-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Chat>
              template block text
            </Chat>
          
      */
      {
        "id": "P1USgWxA",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"chat\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/chat-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/direct-message-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | direct-message', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <DirectMessage />
      */
      {
        "id": "3pH7VZ2k",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"direct-message\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/direct-message-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <DirectMessage>
              template block text
            </DirectMessage>
          
      */
      {
        "id": "HwdhEKdf",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"direct-message\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/direct-message-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/login-overlay-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | login-overlay', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <LoginOverlay />
      */
      {
        "id": "A5CNjoMq",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"login-overlay\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/login-overlay-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <LoginOverlay>
              template block text
            </LoginOverlay>
          
      */
      {
        "id": "N2tp/RwR",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"login-overlay\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/login-overlay-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/message-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | message', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Message />
      */
      {
        "id": "LF1Fszl7",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"message\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/message-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Message>
              template block text
            </Message>
          
      */
      {
        "id": "t0Vz7GrW",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"message\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/message-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/modal-profile-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | modal-profile', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ModalProfile />
      */
      {
        "id": "0jG2RVyQ",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"modal-profile\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/modal-profile-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <ModalProfile>
              template block text
            </ModalProfile>
          
      */
      {
        "id": "u6Kc4DMz",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"modal-profile\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/modal-profile-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/navi-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | navi', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Navi />
      */
      {
        "id": "JPbp8zTQ",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"navi\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/navi-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Navi>
              template block text
            </Navi>
          
      */
      {
        "id": "SAxS/GXS",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"navi\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/navi-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/navigation-bar-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | navigation-bar', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <NavigationBar />
      */
      {
        "id": "jz0/uOUx",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"navigation-bar\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/navigation-bar-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <NavigationBar>
              template block text
            </NavigationBar>
          
      */
      {
        "id": "ES0Gxr7c",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"navigation-bar\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/navigation-bar-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/paddle-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | paddle', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Paddle />
      */
      {
        "id": "ewR6EwT5",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"paddle\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/paddle-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Paddle>
              template block text
            </Paddle>
          
      */
      {
        "id": "JUjf+Kfl",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"paddle\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/paddle-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/pong-game-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | pong-game', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <PongGame />
      */
      {
        "id": "loEgmG+n",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"pong-game\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/pong-game-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <PongGame>
              template block text
            </PongGame>
          
      */
      {
        "id": "dRjVm3Sn",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"pong-game\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/pong-game-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/profile-other-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | profile-other', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ProfileOther />
      */
      {
        "id": "+CTsiQTf",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"profile-other\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/profile-other-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <ProfileOther>
              template block text
            </ProfileOther>
          
      */
      {
        "id": "zgtLXsCr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"profile-other\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/profile-other-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/profile-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | profile', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Profile />
      */
      {
        "id": "XugIzddM",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"profile\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/profile-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Profile>
              template block text
            </Profile>
          
      */
      {
        "id": "46PpVauM",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"profile\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/profile-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/scoreboard-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | scoreboard', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Scoreboard />
      */
      {
        "id": "etV3evST",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"scoreboard\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/scoreboard-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Scoreboard>
              template block text
            </Scoreboard>
          
      */
      {
        "id": "3iAQdbh6",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"scoreboard\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/scoreboard-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/title-animation-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | title-animation', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <TitleAnimation />
      */
      {
        "id": "U+E494i5",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"title-animation\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/title-animation-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <TitleAnimation>
              template block text
            </TitleAnimation>
          
      */
      {
        "id": "3ABxg+Hf",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"title-animation\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/title-animation-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/tournament-list-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | tournament-list', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <TournamentList />
      */
      {
        "id": "LTZSIIx3",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"tournament-list\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/tournament-list-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <TournamentList>
              template block text
            </TournamentList>
          
      */
      {
        "id": "DfIaxG7W",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"tournament-list\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/tournament-list-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/tournament-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | tournament', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Tournament />
      */
      {
        "id": "VxjpdWCg",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"tournament\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/tournament-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Tournament>
              template block text
            </Tournament>
          
      */
      {
        "id": "7cJU3djr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"tournament\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/tournament-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/user-list-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | user-list', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <UserList />
      */
      {
        "id": "H8KDqDhT",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"user-list\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/user-list-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <UserList>
              template block text
            </UserList>
          
      */
      {
        "id": "CrBNMxGI",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"user-list\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/user-list-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/integration/components/user-test", ["qunit", "myapp/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | user', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <User />
      */
      {
        "id": "HabwCvOB",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"user\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/user-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <User>
              template block text
            </User>
          
      */
      {
        "id": "vogxZv/G",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"user\"]]",
        "moduleName": "/myapp/myapp/tests/integration/components/user-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("myapp/tests/test-helper", ["myapp/app", "myapp/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"myapp/app",0,"myapp/config/environment",0,"qunit",0,"@ember/test-helpers",0,"qunit-dom",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.start)();
});
define("myapp/tests/unit/routes/chat-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | chat', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:chat');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/choose-game-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | choose-game', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:choose-game');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/home-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | home', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:home');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/index-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/login-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | login', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:login');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/pong-game-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | pong-game', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:pong-game');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/protected-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | protected', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:protected');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/tournament-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | tournament', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:tournament');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/routes/user-profile-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | user-profile', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:user-profile');
      assert.ok(route);
    });
  });
});
define("myapp/tests/unit/services/auth-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | auth', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:auth');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/chat-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | chat', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:chat');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/game-data-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | game-data', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:game-data');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/selected-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | selected', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:selected');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/session-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | session', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:session');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/shopping-cart-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | shopping-cart', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:shopping-cart');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/user-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | user', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:user');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/user-tracker-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | user-tracker', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:user-tracker');
      assert.ok(service);
    });
  });
});
define("myapp/tests/unit/services/user-tracking-test", ["qunit", "myapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"myapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | user-tracking', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:user-tracking');
      assert.ok(service);
    });
  });
});
define('myapp/config/environment', [], function() {
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

require('myapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
