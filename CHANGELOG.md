# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.10.0] - 2026-02-17

### Added

- Added & updated Weblate translations

### Changed

- Updated several dependencies in package.json to latest versions
- NPM audit fix

## [6.9.0] - 2025-12-02

### Added

- Added & updated Weblate translations

### Changed

- Updated texts according to changes for Omnia NG
- Updated several dependencies in package.json to latest versions
- NPM audit fix

## [6.8.0] - 2025-09-19

### Added

- Added new modes for Wi-Fi 7
- Added & updated Weblate translations

### Changed

- Updated several dependencies in package.json to latest versions
- NPM audit fix

## [6.7.2] - 2025-04-22

### Added

- Added Turris logo to enhanced QR code display

### Changed

- Replaced deprecated QRCode component with QRCodeSVG
- Refactored button click handlers to simplify event handling in WiFiQRCode
- Re-resolved and re-locked all npm dependencies in package-lock.json
- Overridden markdown-to-jsx version in order to solve audit issues
- docs: Enhanced styleguide configuration with new font and layout options
- docs: Refactored development and introduction sections
- docs: Fixed code snippets syntax highlighting & some refactoring
- docs: Updated SubmitButton component
- NPM audit fix

## [6.7.1] - 2025-04-04

### Added

- Added & updated Weblate translations

## [6.7.0] - 2025-03-11

### Added

- Added encryption property to guest WiFi settings in tests
- Added global fuzzy search and columns visibility to RichTable

### Changed

- Made thead of RichTable lighter
- Updated dependencies in package.json to latest versions
- Enhanced ActionButtonWithModal to support dynamic methods
- NPM audit fix

## [6.6.2] - 2025-02-20

### Changed

- Enhanced SubmitButton component to accept a custom label prop
- Refactored RichTable component to remove forwardRef and simplify data handling

## [6.6.1] - 2025-02-17

### Changed

- Refactored RichTable component to use forwardRef

## [6.6.0] - 2025-02-07

### Added

- Added & updated Weblate translations
- Added Wi-Fi and LAN settings URLs to ForisURLs
- Added Wi-Fi modes VHT/HE 80+80
- Added encryption selection to WiFiGuestForm
- Added optional close button to ModalHeader component

### Changed

- Updated Wi-Fi API
- Enhanced NumberInput component with keyboard & touch accessibility
- Refactored pagination condition in RichTable component

## [6.5.0] - 2024-11-13

### Added

- Added & updated Weblate translations
- Added RichTable component with pagination and sorting
- Added @tanstack/react-table v8.20.5 to dependencies

### Changed

- Updated documentation
- Replaced RebootButton with ActionButtonWithModal component
- Fixed import path for CustomizationContextMock in customTestRender.js

## [6.4.0] - 2024-10-02

### Changed

- Refactored Alert component to include dismiss animation and timeout
- Refactored ThreeDotsMenu component to include additional props

## [6.3.0] - 2024-09-27

### Added

- Added ThreeDotsMenu component

### Changed

- Refactored EmailInput description
- Refactored RadioSet & ignore Radio component
- Refactored npm package badge in introduction.md
- NPM audit fix

## [6.2.1] - 2024-09-25

### Added

- Added & updated Weblate translations

### Changed

- Refactored CopyInput component
- Refactored ForisURLs to include new URLs for Overview page

## [6.2.0] - 2024-09-20

### Added

- Added useFocusTrap hook
- Added extendSession endpoint

### Changed

- Refactored Spinner.css to use CSS variable for color
- Refactored Modal component to use useFocusTrap hook
- Refactored Alert component to use useFocusTrap hook

## [6.1.1] - 2024-08-30

### Added

- Added & updated Weblate translations

### Changed

- Updated icon color classes to use "text-secondary" instead of "text-dark"
- Updated Wi-Fi QRCodeModal component to use new styles & added close button
- Refactored WiFiGuestForm component to get rid of obsolete div element
- NPM audit fix

## [6.1.0] - 2024-08-23

### Added

- Added & updated Weblate translations

### Changed

- Migrated to Font Awesome v6
- NPM audit fix

## [6.0.3] - 2024-07-26

### Changed

- Updated WiFiQRCode component

## [6.0.2] - 2024-06-28

### Added

- Added className prop to CheckBox and Radio components

## [6.0.1] - 2024-06-26

### Added

- Added className prop to Switch component

### Changed

- Updated dependencies in package.json
- NPM audit fix

## [6.0.0] - 2024-06-11

### Added

- Added CHANGELOG.md
- Added JS_DIR variable to Makefile
- Added support for shared reForis ESLint configuration

### Changed

- Updated dependencies in package.json
- Updated Spinner.css styles for better positioning and responsiveness
- Migrated to Bootstrap 5
- NPM audit fix
- Other small improvements

## [5.6.1] - 2024-01-19

- Added & updated Weblate translations
- Fixed loading state & button's layout
- Updated bootstrap library to version 4.6.2
- Used custom reforis-image in GitLab CI/CD
- NPM audit fix

## [5.6.0] - 2022-12-29

- Add & update Weblate translations
- Add CustomizationContext and custom hook
- Update caniuse-lite
- Remove testUtils from .gitignore
- Make ieee80211w_disabled as optional in WiFiForm
- Move contexts in a context folder
- NPM audit fix

## [5.5.0] - 2022-12-02

- Add & update translations
- Add a switch to disable Management Frame Protection (802.11w)
- Improved Foris JS documentation
- NPM audit fix

## [5.4.1] - 2022-06-03

- Add Weblate translations
- Update PropType peer dependency
- NPM audit fix

## [5.4.0] - 2022-05-20

- Add & update translations
- Add CopyInput bootstrap component
- Update WiFiForm labels and description for wifi ax
- Make WS path in lighttpd mode configurable
- Fix Wi-Fi password helptext string
- NPM audit fix

## [5.3.0] - 2022-02-21

- Added & update translations
- Added rest of the props to DownloadButton component
- Added hostname validation
- Added wifi 802.11ax HE modes
- Set best Wi-Fi HT mode depending on the checked frequency
- Improved domain name RegEx pattern
- Removed customOrder prop in Select component
- Fixed Wi-Fi translation strings
- Fixed autocomplete attribute in PasswordInput
- Fixed WiFi password max length check
- Fixed documentation build
- Fixed access token in publish script
- Refined & restructure Makefile
- Updated GitLab CI image to Node.js v16
- NPM update (several dependencies)
- NPM audit fix

## [5.2.0] - 2021-12-15

- Remove login page
- NPM audit fix

## [5.1.16] - 2021-11-18

- Revert bad NPM audit fix
- NPM audit fix

## [5.1.15] - 2021-11-03

- Add WPA3 option
- Add custom order ability of Select options
- NPM audit fix

## [5.1.14] - 2021-07-30

- Add & update translations
- Fix infinity redirect loop when WS error occurs
- NPM audit fix

## [5.1.13] - 2021-06-30

- Add sentinelAgreement endpoint to forisUrls
- NPM audit fix

## [5.1.12] - 2021-05-14

- Add & update translations
- Add & fix obsolete links
- Expend library with the ResetWifiSettings function
- Fix switching Wi-Fi modes depending on bands in WiFiForm
- Fix translation sources in WiFiForm
- NPM audit fix
- Other small improvements

## [5.1.11] - 2021-01-04

- Remove duplicated file for Norwegian language
- Fix translations inconsistency

## [5.1.10] - 2021-12-29

- Add and update translations

## [5.1.9] - 2021-12-20

- Increase bottom margin of formFieldsSize
- Change formFieldsSize of ResetWiFiSettings card
- Fix trailing space in Modal classes

## [5.1.8] - 2020-12-19

- Add isPluginInstalled function

## [5.1.7] - 2020-11-27

## [5.1.6] - 2020-11-25

- NPM audit fix
- Add displayCard function to utils
- Add optional sizes to Modal
- Add information about optional sizes to docs
- Remove redundant merge.py

## [5.1.5] - 2020-09-25

- Fix DateTime import
- Fix extra empty space in Switch's classes

## [5.1.4] - 2020-09-25

- Add inline option to Wi-Fi's RadioSet
- Fix Alert's dismissible class condition
- Add closing bootstrap modal using ESC
- Change reboot modal's heading to "Warning!"

## [5.1.3] - 2020-09-11

- Add SSID validation for 32 bytes length
- Add helpText for SSID input

## [5.1.2] - 2020-09-08

- Fix infinity loop caused by WebSockets
- Resolve small issues

## [5.1.1] - 2020-08-31

- Add "inline" option to RadioSet
- NPM audit fix

## [5.1.0] - 2020-08-25

- Add new Switch component
- Swap checkboxes for switches on Wi-Fi page
- Decrease button width on different breakpoints
- Add integration of Prettier + ESLint + reForis Style Guide
- Add appropriate links to dropdown headers
- Add semantic & accessibility structure for headings
- NPM audit & Update packages
- GitLab CI: image update to node 10

## [5.0.3] - 2020-09-23

- Fixes issue with WebSockets

## [5.0.2] - 2020-09-22

- Fix infinity loop caused by WebSockets

## [5.0.1] - 2020-07-21

- Fix Wi-Fi Form
- NPM audit fix & update of packages

## [5.0.0] - 2020-05-07

- I've realized that it should be major update due to broken API.

## [4.5.1] - 2020-05-07

- Add initialData to ForisForm children.
- Update translations .pot file.

## [4.5.0] - 2020-03-25

- Use exposed pdfmake.
- NPM audit fix & update of packages.

## [4.4.0] - 2020-03-13

- Update domain validation.

## [4.3.1] - 2020-03-06

- Add logout link.

## [4.3.0] - 2020-02-26

- Allow RadioSet accept elements as children.
- Add option to make modal scrollable.

## [4.2.0] - 2020-02-21

- Add translations.
- Improve datatime localization.

## [4.1.0] - 2020-02-20

- Added date and time utilities.

## [4.0.0] - 2020-02-20

- Throw an error if unhandled exception happens during API request.

## [3.4.0] - 2020-02-17

- Display actual GET error response within the form.
- Added styles extracted from reForis.
- Added reference to form element (for programmatically submitting it).

## [3.2.0] - 2020-01-17

- Swapped react-router with react-router-dom. Prepared Foris JS for using
  react-router-dom exposed by reForis.
- Added controller ID filter to WebSocket hook.
- Updated translation messages after moving WiFi form.
- Increased request timeout to 30.5 sec.

## [3.1.1] - 2020-01-10

- Fixed package dependencies related to exposing libraries via reForis

## [3.1.0] - 2020-01-09

- Added Wi-Fi settings form
- Fixed path to index.js file in package.json

## [3.0.0] - 2020-01-07

- Removal of Babel compiler
- Fixed width of ForisForm, removed default sizing for form widgets (like
  buttons)

## [2.1.1] - 2020-01-06

- Display date and time picker above input element

## [2.1.0] - 2019-12-19

- Set WebSocket logging to debug level
- Added hook that detects clicking outside of component
- Added Radio to list of publicly available components
- Fixed link to git repository in package.json

## [2.0.0] - 2019-12-09

- Added dynamic suffix for API URLs (allowing to use one hook for different
  resources with e.g. PUT)
- Added unsubscribe method to WebSocket client
- Added custom class to SpinnerElement
- Improved documentation
- Published README.md

## [1.4.0] - 2019-11-29

- Add reboot button.
- Fix Foris URLs prefixes

## [1.3.3] - 2019-11-22

- Add translations from Weblate.

## [1.3.2] - 2019-11-20

- Expose only AlertContext.
- Add hook for API pooling.

## [1.3.1] - 2019-11-14

## [1.2.0] - 2019-10-24

## [1.1.0] - 2019-10-22

## [1.0.0] - 2019-10-07

## [0.0.7] - 2019-09-02

[unreleased]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.10.0...dev
[6.10.0]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.9.0...v6.10.0
[6.9.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.8.0...v6.9.0
[6.8.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.7.2...v6.8.0
[6.7.2]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.7.1...v6.7.2
[6.7.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.7.0...v6.7.1
[6.7.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.6.2...v6.7.0
[6.6.2]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.6.1...v6.6.2
[6.6.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.6.0...v6.6.1
[6.6.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.5.0...v6.6.0
[6.5.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.4.0...v6.5.0
[6.4.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.3.0...v6.4.0
[6.3.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.2.1...v6.3.0
[6.2.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.2.0...v6.2.1
[6.2.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.1.1...v6.2.0
[6.1.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.1.0...v6.1.1
[6.1.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.0.3...v6.1.0
[6.0.3]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.0.2...v6.0.3
[6.0.2]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.0.1...v6.0.2
[6.0.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v6.0.0...v6.0.1
[6.0.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.6.1...v6.0.0
[5.6.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.6.0...v5.6.1
[5.6.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.5.0...v5.6.0
[5.5.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.4.1...v5.5.0
[5.4.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.4.0...v5.4.1
[5.4.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.3.0...v5.4.0
[5.3.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.2.0...v5.3.0
[5.2.0]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.16...v5.2.0
[5.1.16]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.15...v5.1.16
[5.1.15]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.14...v5.1.15
[5.1.14]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.13...v5.1.14
[5.1.13]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.12...v5.1.13
[5.1.12]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.11...v5.1.12
[5.1.11]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.10...v5.1.11
[5.1.10]:
    https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.9...v5.1.10
[5.1.9]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.8...v5.1.9
[5.1.8]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.7...v5.1.8
[5.1.7]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.6...v5.1.7
[5.1.6]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.5...v5.1.6
[5.1.5]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.4...v5.1.5
[5.1.4]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.3...v5.1.4
[5.1.3]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.2...v5.1.3
[5.1.2]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.1...v5.1.2
[5.1.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.1.0...v5.1.1
[5.1.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.0.3...v5.1.0
[5.0.3]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.0.2...v5.0.3
[5.0.2]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.0.1...v5.0.2
[5.0.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v5.5.0...v5.0.1
[5.0.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.5.1...v5.0.0
[4.5.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.5.0...v4.5.1
[4.5.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.4.0...v4.5.0
[4.4.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.3.1...v4.4.0
[4.3.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.3.0...v4.3.1
[4.3.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.2.0...v4.3.0
[4.2.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.1.0...v4.2.0
[4.1.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v4.0.0...v4.1.0
[4.0.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v3.4.0...v4.0.0
[3.4.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v3.2.0...v3.4.0
[3.2.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v3.1.1...v3.2.0
[3.1.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v3.1.0...v3.1.1
[3.1.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v3.0.0...v3.1.0
[3.0.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v2.1.1...v3.0.0
[2.1.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v2.1.0...v2.1.1
[2.1.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v2.0.0...v2.1.0
[2.0.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v1.4.0...v2.0.0
[1.4.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v1.3.3...v1.4.0
[1.3.3]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v1.3.2...v1.3.3
[1.3.2]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v1.3.1...v1.3.2
[1.3.1]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v1.2.0...v1.3.1
[1.2.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v1.1.0...v1.2.0
[1.1.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v1.0.0...v1.1.0
[1.0.0]: https://gitlab.nic.cz/turris/reforis/foris-js/-/compare/v0.0.7...v1.0.0
[0.0.7]: https://gitlab.nic.cz/turris/reforis/foris-js/-/tags/v0.0.7
