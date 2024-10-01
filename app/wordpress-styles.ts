// WordPress block styles
// 
// Our WP sites need to be able to use WP blocks and their styles.
// Pull in individual block styles that we want instead of all styles to help reduce the size.
// Some of the core blocks have so little styling that it doesn't make sense to include them.
// For NPM reference: 
// https://www.npmjs.com/package/@wordpress/block-library?activeTab=code
// What blocks we allow in WP: 
// https://bitbucket.org/ket-dev/education-headless-configuration-plugin/src/production/functions/theme-support.php

import "@wordpress/block-library/build-style/button/style.css"
import "@wordpress/block-library/build-style/buttons/style.css"
import "@wordpress/block-library/build-style/columns/style.css"
import "@wordpress/block-library/build-style/cover/style.css"
import "@wordpress/block-library/build-style/embed/style.css"
import "@wordpress/block-library/build-style/gallery/style.css"
import "@wordpress/block-library/build-style/image/style.css"
import "@wordpress/block-library/build-style/media-text/style.css"
import "@wordpress/block-library/build-style/navigation/style.css"
import "@wordpress/block-library/build-style/navigation-link/style.css"
import "@wordpress/block-library/build-style/pullquote/style.css"
import "@wordpress/block-library/build-style/quote/style.css"
import "@wordpress/block-library/build-style/table/style.css"
import "@wordpress/block-library/build-style/separator/style.css"

// import "./styles/wp/utility.css" // Our own documentation of WP utility classes