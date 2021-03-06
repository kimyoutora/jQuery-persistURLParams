jQuery Persistent URL Parameters plugin v0.1
============================================
Kang Chen

This plugin was written to address the pattern of having to persist certain URL parameters across requests. One instance where this might be useful is campaign codes. If someone visits the site with campaign=foo, this plugin will append that to all 'a' elements within the specified scope.

Usage
-----
1. Automatically append the specified parameters to all links on the page:

`jQuery("a").persistUrlParams({ params: "campaign" });`

2. Persisting multiple parameters:

`jQuery("a").persistUrlParams({ params: "param1, param2" });`

3. Chainability. Persistent URL Params supports maintains chainability that's often used in jQuery:

`jQuery("a").persistUrlParams({ params: "view, parent" }).css("color", "red");`

Bug Fixes and Requests
----------------------

I welcome any feedback and bug fix patches.