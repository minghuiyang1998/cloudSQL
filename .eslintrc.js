
module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
            modules: true,
            legacyDecorators: true
        }
    },
    plugins: [
        "react"
    ],
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
        // Take the current directory as the root directory, no longer look up .eslintrc.js
    root: true,
    globals: {
        __: true,
        Tea: true,
        Slardar: true,
    },
    rules: {
        //
        //
        // possible error
        // These rules are related to possible syntax or logic errors in JavaScript code
        //
        // Prohibit for loops in the wrong direction, such as for (i = 0; i <10; i--)
        'for-direction': 'error',
        // getter must have a return value, and it is forbidden to return empty, such as return;
        'getter-return': [
            'error',
            {
                allowImplicit: false
            }
        ],
        // It is forbidden to write await in a loop, because then it is not possible to send multiple asynchronous requests at the same time
        // @off is too strict, sometimes you need to write await in the loop
        'no-await-in-loop': 'off',
        // forbidden to compare with negative zero
        'no-compare-neg-zero': 'error',
        // Prohibit the use of assignment statements in if, for, while, unless the assignment statement is enclosed in parentheses
        'no-cond-assign': [
            'error',
            'except-parens'
        ],
        // disallow console
        // @off console is very common
        'no-console': 'off',
        // Forbid constants as test conditions for if or ternary expressions, such as if (true), let foo = 0? 'Foo': 'bar'
        'no-constant-condition': [
            'error',
            {
                checkLoops: false
            }
        ],
        // Forbid the ASCII representation of the Ctrl key in regular expressions, that is, the use of / \ x1f /
        // Turn on this rule, because the Ctrl key usually does not appear in the string, so once it appears, it may be a code error
        'no-control-regex': 'error',
        // @fixable disables debugger
        'no-debugger': 'error',
        // Prohibit duplicate names in function parameters
        'no-dupe-args': 'error',
        // disallow duplicate key names in object literals
        'no-dupe-keys': 'error',
        // Prohibit repeated test expression cases in switch statements
        'no-duplicate-case': 'error',
        // Prohibit empty code blocks
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        // Prohibit the use of empty character sets in regular expressions []
        'no-empty-character-class': 'error',
        // forbid the reassignment of the first error parameter of catch
        'no-ex-assign': 'error',
        // @fixable forbids using Boolean in test expressions
        'no-extra-boolean-cast': 'error',
        // @fixable prohibits extra parentheses in function expressions, such as let foo = (function () {return 1})
        'no-extra-parens': [
            'error',
            'functions'
        ],
        // @fixable forbid more than semicolons
        'no-extra-semi': 'error',
        // Forbid to reassign a function declaration, such as:
        // function foo() {}
        // foo = bar
        'no-func-assign': 'error',
        // Prohibit function declarations in if or use var to define variables
        // 'no-inner-declarations': [
        //     'error',
        //     'both'
        // ],
        // Prohibit illegal regular expressions
        'no-invalid-regexp': 'error',
        // Prohibit special whitespace characters (such as full-width spaces) unless they appear in a string, regular expression, or template string
        'no-irregular-whitespace': [
            'error',
            {
                skipStrings: true,
                skipComments: false,
                skipRegExps: true,
                skipTemplates: true
            }
        ],
        // Prohibit calling Math, JSON or Reflect directly as a function, must be used as a class
        'no-obj-calls': 'error',
        // disallow hasOwnProperty, isPrototypeOf or propertyIsEnumerable
        // @off uses hasOwnProperty in many places
        'no-prototype-builtins': 'off',
        // @fixable prohibits continuous spaces in regular expressions, you must use / foo {3} bar / instead
        'no-regex-spaces': 'error',
        // Prohibit continuous commas in the array, such as let foo = [,,]
        'no-sparse-arrays': 'error',
        // Prohibit the variable form of the template string in ordinary strings, such as 'Hello $ {name}!'
        'no-template-curly-in-string': 'error',
        // Prohibit multi-line expressions that are difficult to understand, such as:
        // let x = function () {}
        // `hello`
        'no-unexpected-multiline': 'error',
        // Prohibit code after return, throw, break or continue
        'no-unreachable': 'error',
        // forbid return, throw, break or continue in finally
        'no-unsafe-finally': 'error',
        // @fixable prohibits the use of exclamation marks to the left of the in or instanceof operator, such as if (! key in object)
        'no-unsafe-negation': 'error',
        // must use isNaN (foo) instead of foo === NaN
        'use-isnan': 'error',
        // comments must conform to jsdoc specifications
        // @off jsdoc is too strict
        'valid-jsdoc': 'off',
        // the typeof expression compares must be 'undefined', 'object', 'boolean', 'number', 'string', 'function' or 'symbol'
        'valid-typeof': 'error',



        //
        //
        // Best Practices
        // These rules help you avoid problems with some best practices
        //
        // Where there is a setter, there must be a getter, where there is no setter
        'accessor-pairs': [
            'error',
            {
                setWithoutGet: true,
                getWithoutSet: false
            }
        ],
        // Except forEach for array methods, the callback function must have a return value
        'array-callback-return': 'error',
        // Treat var-defined variables as block scope, prohibited from being used outside the block
        'block-scoped-var': 'error',
        // in a class's non-static method, a reference to this must exist
        // @off is too strict
        'class-methods-use-this': 'off',
        // Forbid the loop complexity of a function over 20, https://en.wikipedia.org/wiki/Cyclomatic_complexity
        // 'complexity': [
        //     'error',
        //     {
        //         max: 20
        //     }
        // ],
        // Prevent functions from returning different types of values ​​in different branches
        // @off is too strict
        'consistent-return': 'off',
        // // @fixable if must be followed by {unless it is a single line if
        // 'curly': [
        //     'error',
        //     'multi-line',
        //     'consistent'
        // ],
        // switch statement must have default
        // @off is too strict
        'default-case': 'off',
        // @fixable When chaining calls, the dot must be placed at the beginning of the second line, and prohibited at the end of the first line
        'dot-location': [
            'error',
            'property'
        ],
        // @fixable prohibits foo ['bar'] and must be written as foo.bar
        // @off can be more unified when you need to write a series of attributes
        'dot-notation': 'off',
        // @fixable must use === or! ==, prohibit == or! = except when comparing with null
        'eqeqeq': [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        // for in must have hasOwnProperty
        // 'guard-for-in': 'error',
        // forbid alert
        // @off alert is very common
        'no-alert': 'off',
        // disallow caller or callee
        'no-caller': 'error',
        // When there are variable definitions in the switch case, you must use curly brackets to turn the case into a code block
        'no-case-declarations': 'error',
        // Forbid the appearance of a division operator at the beginning of a regular expression, such as let a = / = foo /
        // @off If the code is highlighted, there will be no ambiguity or difficulty in understanding when reading this code
        'no-div-regex': 'off',
        // @fixable prohibits the use of return in else, it must be terminated early
        // Use return in @off else to make the code structure clearer
        'no-else-return': 'off',
        // No empty function is allowed, unless an empty function is set to the default value of an item
        'no-empty-function': [
            'error',
            {
                allow: [
                    'functions',
                    'arrowFunctions'
                ]
            }
        ],
        // disallow empty {} or []
        'no-empty-pattern': 'error',
        // Prohibit foo == null or foo! = Null, you must use foo === null or foo! == null
        // @off foo == null is used to judge that foo is not undefined and not null, which is more commonly used, so this writing is allowed
        'no-eq-null': 'off',
        // disallow eval
        'no-eval': 'off',
        // Prohibit modifying native objects
        'no-extend-native': 'error',
        // @fixable prohibit unnecessary bind
        'no-extra-bind': 'error',
        // @fixable prohibit unnecessary label
        'no-extra-label': 'error',
        // switch case must have break, return or throw
        'no-fallthrough': 'error',
        // @fixable is not allowed to omit 0 when decimal, such as .5
        'no-floating-decimal': 'error',
        // forbid assignment to global variables
        'no-global-assign': 'error',
        // @fixable forbids the use of !! ~ and other unintelligible operators
        // only allowed !!
        'no-implicit-coercion':
        [
            'error',
            {
                allow: [
                    '!!'
                ]
            }
        ],
        // forbid defining variables or declaring functions in global scope
        'no-implicit-globals': 'error',
        // Forbid to pass strings in setTimeout or setInterval, such as setTimeout ('alert ("Hi!")', 100);
        'no-implied-eval': 'error',
        // Prohibit the use of this outside the class
        // @off this is very flexible. The event callback can represent the current element. Functions can also use this first, and then call later when they are called later.
        'no-invalid-this': 'off',
        // Forbidden to use __iterator__
        'no-iterator': 'error',
        // forbid label
        'no-labels': 'error',
        // Prohibit unnecessary {} as code block
        'no-lone-blocks': 'error',
        // Forbid the variables defined in the loop body conditional statement in the function inside the loop, such as:
        // for (var i = 0; i < 10; i++) {
        //     (function () { return i })();
        // }
        'no-loop-func': 'error',
        // disallow magic numbers
        // @off is too strict
        'no-magic-numbers': 'off',
        // @fixable Forbid multiple consecutive spaces, except before comments, or to align object properties, variable definitions, import, etc.
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true,
                exceptions: {
                    Property: true,
                    BinaryExpression: false,
                    VariableDeclarator: true,
                    ImportDeclaration: true
                }
            }
        ],
        // Prohibit the use of \ for newline strings
        'no-multi-str': 'error',
        // forbid direct new class without assignment
        'no-new': 'error',
        // Prohibit the use of new functions, such as let x = new Function ("a", "b", "return a + b");
        'no-new-func': 'error',
        // forbid using new to generate String, Number or Boolean
        'no-new-wrappers': 'error',
        // Forbid digits starting with 0 to represent octal numbers
        'no-octal': 'error',
        // disallow octal escape characters
        'no-octal-escape': 'error',
        // forbid reassignment of function parameters
        // 'no-param-reassign': 'error',
        // Prohibit the use of __proto__
        // 'no-proto': 'error',
        // prohibit repeated definition of variables
        'no-redeclare': 'error',
        // Prohibit the use of specified object properties
        // @off It is used to restrict a specific API from being used
        'no-restricted-properties': 'off',
        // forbid assignment in return statements
        // 'no-return-assign': [
        //     'error',
        //     'always'
        // ],
        // Prohibit location.href = 'javascript: void (0)';
        'no-script-url': 'error',
        // Prohibit assigning yourself to yourself
        'no-self-assign': 'error',
        // don't compare yourself to yourself
        'no-self-compare': 'error',
        // disallow comma operator
        // 'no-sequences': 'error',
        // Prohibit throw literals, must throw an Error object
        'no-throw-literal': 'error',
        // The loop condition variable must be modified in the loop
        'no-unmodified-loop-condition': 'error',
        // disallow useless expressions
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true
            }
        ],
        // @fixable prohibits useless labels
        'no-unused-labels': 'error',
        // forbid unnecessary call or apply
        'no-useless-call': 'error',
        // prohibit unnecessary string concatenation
        'no-useless-concat': 'error',
        // prohibit unnecessary escaping
        // @off escape can make the code more understandable
        'no-useless-escape': 'off',
        // @fixable prohibits unnecessary return
        // @off does not need to restrict return
        'no-useless-return': 'off',
        // disallow void
        // 'no-void': 'error',
        // disallow TODO and FIXME in comments
        // @off TODO is very common
        'no-warning-comments': 'off',
        // forbid use
        'no-with': 'error',
        // Promise must pass in Error object instead of literal
        'prefer-promise-reject-errors': 'error',
        // parseInt must be passed in the second parameter
        'radix': 'error',
        // await statement must exist in async function
        // @off async function without await is very common, such as in koa's example
        'require-await': 'off',
        // var must be at the top of the scope
        // @off var is not at the top and is a common usage
        'vars-on-top': 'off',
        // @fixable function to be executed immediately must conform to the following format (function () (alert ('Hello'))) ()
        // 'wrap-iife': [
        //     'error',
        //     'inside',
        //     {
        //         functionPrototypeMethods: true
        //     }
        // ],
        // @fixable must use if (foo === 5) instead of if (5 === foo)
        'yoda': [
            'error',
            'never',
            {
                onlyEquality: true
            }
        ],



        //
        //
        // strict mode
        // These rules are related to strict mode instructions
        //
        // @fixable forbid 'strict'; quotes


        //
        //
        // variable
        // these rules are related to variable declarations
        //
        // variable must be assigned at definition time
        // @off Define first and assign later
        'init-declarations': 'off',
        // Prohibit duplicate parameter names for catch and defined variables
        // @off is too strict
        'no-catch-shadow': 'off',
        // forbid delete
        'no-delete-var': 'error',
        // forbid the label name to be duplicated with the defined variable
        'no-label-var': 'error',
        // disallow use of specified global variables
        // @off It is used to restrict a specific variable name from being used
        'no-restricted-globals': 'off',
        // Forbid variable names to overlap with defined variables in the upper scope
        // @off Many times the formal and passed parameters of a function have the same name
        'no-shadow': 'off',
        // Prohibit the use of reserved words as variable names
        'no-shadow-restricted-names': 'error',
        // Prohibit the use of undefined variables
        'no-undef': [
            'error',
            {
                typeof: false
            }
        ],
        // @fixable forbids assigning undefined to a variable
        'no-undef-init': 'error',
        // forbid reassignment to undefined
        'no-undefined': 'error',
        // defined variables must be used
        'no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '_JSXStyle', // Ignore globally
                vars: 'all',
                args: 'none',
                caughtErrors: 'none',
                ignoreRestSiblings: true
            }
        ],
        // variables must be defined before use
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: false,
                variables: false
            }
        ],



        //
        //
        // Node.js and CommonJS
        // These rules are related to code running in Node.js or CommonJS used in the browser
        //
        // must return immediately after callback
        // @off Limitations too much
        'callback-return': 'off',
        // require must be in global scope
        // @off conditional loading is common
        'global-require': 'off',
        // error in callback must be handled
        'handle-callback-err': 'error',
        // Forbid direct use of Buffer
        'no-buffer-constructor': 'error',
        // require of same type must be put together
        // @off is too strict
        'no-mixed-requires': 'off',
        // Forbid direct new require ('foo')
        'no-new-require': 'error',
        // disallow string concatenation for __dirname or __filename
        'no-path-concat': 'error',
        // Prohibit the use of process.env.NODE_ENV
        // @off is very common
        'no-process-env': 'off',
        // Prohibit the use of process.exit (0)
        // @off is very common
        'no-process-exit': 'off',
        // Prohibit the use of the specified module
        // @off It is used to restrict a specific module from being used
        'no-restricted-modules': 'off',
        // disallow synchronous methods in node, such as fs.readFileSync
        // @off is very common
        'no-sync': 'off',



        //
        //
        // style issues
        // These rules are related to code style, so they are very subjective
        //
        // @fixable configure the line break format before and after the brackets in the array
        // @off configuration item can't be configured as desired
        'array-bracket-newline': 'off',
        // Spaces are not allowed before and after the brackets of @fixable array
        // 'array-bracket-spacing': [
        //     'error',
        //     'never'
        // ],
        // @fixable configures the line break format between the elements of the array
        // @off allows a line to contain multiple elements, which facilitates writing a large number of arrays
        'array-element-newline': 'off',
        // @fixable code block if within a line, then there must be spaces at the beginning and end of the braces, such as function () {alert ('Hello')}
        'block-spacing': [
            'error',
            'always'
        ],
        // @fixable if must have the same brace style as else
        // @off else code block may need to be preceded by a line of comment
        'brace-style': 'off',
        // variable name must be camelcase style
        // @off many api or file names are not camelcase
        'camelcase': 'off',
        // @fixable first letter of the comment must be capitalized
        // @off does not need to be restricted
        'capitalized-comments': 'off',
        // @fixable object must have a comma at the end
        // @off does not need to be restricted
        'comma-dangle': 'off',
        // @fixable spaces are not allowed before the comma, there must be spaces after the comma
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        // @fixable forbid commas at the beginning of a line
        'comma-style': [
            'error',
            'last'
        ],
        // @fixable when used as a calculated property of an object
        'computed-property-spacing': [
            'error',
            'never'
        ],
        // limit aliases for this
        // @off does not need to be restricted
        'consistent-this': 'off',
        // @fixable file must have a blank line in the last line
        // @off does not need to be restricted
        'eol-last': 'off',
        // No space is allowed between @fixable function name and the parentheses that execute it
        'func-call-spacing': [
            'error',
            'never'
        ],
        // When a function is assigned to a variable, the function name must be the same as the variable name
        'func-name-matching': [
            'error',
            'always',
            {
                includeCommonJSModuleExports: false
            }
        ],
        // function must have a name
        // @off does not need to be restricted
        'func-names': 'off',
        // must use only function declarations or only function expressions
        // @off does not need to be restricted
        'func-style': 'off',
        // Prohibit the use of the specified identifier
        // @off It is used to restrict a specific identifier from being used
        'id-blacklist': 'off',
        // limit variable name length
        // @off does not need to limit variable name length
        'id-length': 'off',
        // Restrict variable names must match the specified regular expression
        // @off does not need to restrict variable names
        'id-match': 'off',
        // @fixable an indentation must be replaced with four spaces
        'indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ],
        // @fixable jsx attributes must be in double quotes
        'jsx-quotes': [
            'error',
            'prefer-double'
        ],
        // @fixable object literals must not have spaces before the colons, and must have spaces after
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true,
                mode: 'strict',
            }
        ],
        // @fixable keyword must have spaces before and after
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        // single line comment must be written on the previous line
        // @off does not need to be restricted
        'line-comment-position': 'off',
        // @fixable restrict newline to LF or CRLF
        // @off does not need to be restricted
        'linebreak-style': 'off',
        // @fixable annotation must have blank lines before and after
        // @off does not need to be restricted
        'lines-around-comment': 'off',
        // Code block nesting depth must not exceed 5 levels
        'max-depth': [
            'error',
            5
        ],
        // limit the length of a line
        // @off The editor is now very smart, there is no need to limit the length of a line
        'max-len': 'off',
        // limit the maximum number of lines in a file
        // @off does not need to be restricted
        'max-lines': 'off',
        // Callback function nesting is prohibited for more than 3 levels, please use async await instead
        'max-nested-callbacks': [
            'error',
            3
        ],
        // Function arguments must not exceed 7
        'max-params': [
            'error',
            10
        ],
        // limit the number of statements in a function block
        // @off does not need to be restricted
        'max-statements': 'off',
        // limit the number of statements in a line
        // @off does not need to be restricted
        'max-statements-per-line': 'off',
        // Ternary expression must wrap
        // @off ternary expression can be used at will
        'multiline-ternary': 'off',
        // the class name after new must be capitalized
        'new-cap': [
            'error',
            {
                newIsCap: true,
                capIsNew: false,
                properties: true
            }
        ],
        // classes after @fixable new must have parentheses
        'new-parens': 'error',
        // chained calls must wrap
        // @off does not need to be restricted
        'newline-per-chained-call': 'off',
        // disallow Array constructor
        'no-array-constructor': 'error',
        // bit operation is prohibited
        // @off bit operations are common
        'no-bitwise': 'off',
        // forbid continue
        // @off continue is very common
        'no-continue': 'off',
        // disallow inline comments after code
        // @off inline comments are very common
        'no-inline-comments': 'off',
        // @fixable prohibits only a single if in else
        // @off A single if can make the logic clearer
        'no-lonely-if': 'off',
        // Forbid to mix different operators, such as let foo = a && b <0 || c> 0 || d + 1 === 0
        // @off is too strict, it is up to the user to determine how to mix operators
        'no-mixed-operators': 'off',
        // Prohibit mixed spaces and indentation
        'no-mixed-spaces-and-tabs': 'error',
        // Forbid continuous assignment, such as a = b = c = 5
        // @off does not need to be restricted
        'no-multi-assign': 'off',
        // @fixable prohibits more than three consecutive blank lines
        'no-multiple-empty-lines': [
            'error',
            {
                max: 3,
                maxEOF: 1,
                maxBOF: 1
            }
        ],
        // Forbid negative expressions in if, for example:
        // if (a !== b) {
        //     doSomething();
        // } else {
        //     doSomethingElse();
        // }
        // @off Negative expressions can make the logic clearer
        'no-negated-condition': 'off',
        // Prohibit the use of nested ternary expressions, such as a? B: c? D: e
        // @off does not need to be restricted
        'no-nested-ternary': 'off',
        // Forbid direct new Object
        'no-new-object': 'error',
        // Prohibit the use of ++ or-
        // @off does not need to be restricted
        'no-plusplus': 'off',
        // disallow specific syntax
        // @off It is used to restrict a specific syntax from being used
        'no-restricted-syntax': 'off',
        // forbid tabs
        'no-tabs': 'error',
        // Prohibit the use of ternary expressions
        // @off ternary expression is very common
        'no-ternary': 'off',
        // @fixable forbid spaces at the end of a line
        'no-trailing-spaces': 'error',
        // Prohibit underscores in variable names
        // @off underscores are commonly used in variable names
        'no-underscore-dangle': 'off',
        // @fixable must use! a instead of a? false: true
        // @off The latter is more clear
        'no-unneeded-ternary': 'off',
        // @fixable forbid spaces before attributes, such as foo. bar ()
        'no-whitespace-before-property': 'error',
        // // @fixable prohibits writing two lines of code without increasing parentheses after the if
        // 'nonblock-statement-body-position': [
        //     'error',
        //     'beside',
        //     {
        //         overrides: {
        //             while: 'below'
        //         }
        //     }
        // ],
        // @fixable must have line breaks at the beginning and end of the braces
        'object-curly-newline': [
            'error',
            {
                multiline: true,
                consistent: true
            }
        ],
        // When @fixable object is only one line, there must be spaces at the beginning and end of the braces
        'object-curly-spacing': [
            'error',
            'always',
            {
                arraysInObjects: true,
                objectsInObjects: false
            }
        ],
        // @fixable object literal must have only one attribute per line
        // @off does not need to be restricted
        'object-property-newline': 'off',
        // Forbid variable declaration with commas at once
        // 'one-var': [
        //     'error',
        //     'never'
        // ],
        // @fixable variable declaration must be one per line
        // 'one-var-declaration-per-line': [
        //     'error',
        //     'always'
        // ],
        // @fixable must use x = x + y instead of x + = y
        // @off does not need to be restricted
        'operator-assignment': 'off',
        // @fixable When a newline is needed, the operator must be placed at the end of the line, for example:
        // let foo = 1 +
        //     2
        // @off is sometimes easier to read at the beginning of the second line
        'operator-linebreak': 'off',
        // @fixable block must have blank lines at the beginning and end
        // @off does not need to be restricted
        'padded-blocks': 'off',
        // @fixable restricts the blank line rules between statements, such as a blank line after a variable
        // @off does not need to be restricted
        'padding-line-between-statements': 'off',
        // @fixable object literal key names must not be enclosed in quotes
        // @off does not need to be restricted
        'quote-props': 'off',
        // @fixable must use single quotes, double quotes are prohibited
        // 'quotes': [
        //     'error',
        //     'single',
        //     {
        //         avoidEscape: true,
        //         allowTemplateLiterals: true
        //     }
        // ],
        // must use jsdoc style comments
        // @off is too strict
        'require-jsdoc': 'off',
        // @fixable must end with a semicolon
        // 'semi': [
        //     'error',
        //     'always',
        //     {
        //         omitLastInOneLineBlock: true
        //     }
        // ],
        // @fixable When there are multiple statements on one line, no spaces are allowed before the semicolon, and there must be spaces after the semicolon
        'semi-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        // @fixable semicolon must be written at the end of the line, prohibited from appearing at the beginning of the line
        'semi-style': [
            'error',
            'last'
        ],
        // Object literal keys must be ordered
        // @off does not need to be restricted
        'sort-keys': 'off',
        // Variable declarations must be ordered
        // @off does not need to be restricted
        'sort-vars': 'off',
        // @fixable if, function, etc. must have spaces before the braces, such as if (a) {
        'space-before-blocks': [
            'error',
            'always'
        ],
        // @fixable function must have spaces before the parentheses
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'ignore',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        // @fixable spaces are not allowed at the beginning and end of the parentheses
        'space-in-parens': [
            'error',
            'never'
        ],
        // @fixable operator must have spaces around it, such as let sum = 1 + 2;
        'space-infix-ops': 'error',
        // @fixable new, typeof, etc. must be followed by spaces, ++,-, etc. are not allowed to have spaces, such as:
        // let foo = new Person();
        // bar = bar++;
        'space-unary-ops': [
            'error',
            {
                words: true,
                nonwords: false
            }
        ],
        // @fixable comment must have spaces after the slash or *
        // 'spaced-comment': [
        //     'error',
        //     'always',
        //     {
        //         block: {
        //             exceptions: [
        //                 '*'
        //             ],
        //             balanced: true
        //         }
        //     }
        // ],
        // @fixable case No spaces are allowed before the colon, and there must be spaces after the colon
        'switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        // @fixable No spaces are allowed after the tag of the template string, such as tag`Hello World`
        'template-tag-spacing': [
            'error',
            'never'
        ],
        // @fixable file has no BOM at the beginning
        'unicode-bom': [
            'error',
            'never'
        ],
        // @fixable regular expression must be enclosed in parentheses
        // @off does not need to be restricted
        'wrap-regex': 'off',



        //
        //
        // ECMAScript 6
        // These rules are related to ES6 (also known as ES2015)
        //
        // @fixable When arrow function can omit return, it must be omitted. For example, it must be written as () => 0, and prohibited from writing as () => {return 0}
        // The return value of @off arrow function should allow flexible setting
        'arrow-body-style': 'off',
        // @fixable when the arrow function has only one parameter, you must add parentheses
        // @off should allow flexible settings
        'arrow-parens': 'off',
        // @fixable arrow function must have spaces before and after the arrow
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        // super must be in constructor
        'constructor-super': 'error',
        // @fixable generator's * must not have spaces in the front and must have spaces in the back
        'generator-star-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        // forbid reassignment to a defined class
        'no-class-assign': 'error',
        // @fixable forbids difficult-to-understand arrow functions, such as let x = a => 1? 2: 3
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
        ],
        // prohibit reassignment of constants defined with const
        'no-const-assign': 'error',
        // prohibit duplicate class definitions
        'no-dupe-class-members': 'error',
        // prohibit duplicate import modules
        'no-duplicate-imports': 'error',
        // Prohibit the use of new to generate Symbol
        'no-new-symbol': 'error',
        // disallow module specified by import
        // @off It is used to restrict a specific module from being used
        'no-restricted-imports': 'off',
        // forbid using this or super before super is called
        'no-this-before-super': 'error',
        // @fixable prohibits unnecessary calculation of key names, such as let a = {['0']: 0};
        'no-useless-computed-key': 'error',
        // Prohibit unnecessary constructors, such as constructor (value) {super (value)}
        // 'no-useless-constructor': 'error',
        // @fixable prohibits renaming of the same name when destructing, such as let {foo: foo} = bar;
        'no-useless-rename': 'error',
        // @fixable prohibits var
        // 'no-var': 'error',
        // @fixable must use a = (b) instead of a = (b: b)
        // @off does not need to be mandatory
        'object-shorthand': 'off',
        // @fixable must use arrow function as callback
        // @off does not need to be mandatory
        'prefer-arrow-callback': 'off',
        // @fixable variables that are no longer modified after declaration must be declared using const
        // @off does not need to be mandatory
        'prefer-const': 'off',
        // must use destructuring
        // @off does not need to be mandatory
        'prefer-destructuring': 'off',
        // @fixable must use 0b11111011 instead of parseInt ('111110111', 2)
        // @off does not need to be mandatory
        'prefer-numeric-literals': 'off',
        // must use ... args instead of arguments
        // @off does not need to be mandatory
        'prefer-rest-params': 'off',
        // @fixable must use ... instead of apply, such as foo (... args)
        // @off apply is very common
        'prefer-spread': 'off',
        // @fixable must use template literals instead of string concatenation
        // @off string concatenation is very common
        'prefer-template': 'off',
        // there must be yield inside the generator function
        'require-yield': 'error',
        // No spaces after @fixable ...
        'rest-spread-spacing': [
            'error',
            'never'
        ],
        // @fixable import must be ordered
        // @off does not need to be mandatory
        'sort-imports': 'off',
        // parameters must be passed when creating Symbol
        'symbol-description': 'error',
        // No spaces at the beginning and end of @fixable $ {name}
        'template-curly-spacing': [
            'error',
            'never'
        ],
        // @fixable yield * must be followed by a space
        'yield-star-spacing': [
            'error',
            'after'
        ],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error'
    }
};