// https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/
export const WP_API = 'wp-json/wp/v2'
export const ENDPOINT_HEADER_FOOTER = 'wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer'

// https://woocommerce.github.io/woocommerce-rest-api-docs/#introduction
export const WC_CART = `${process.env.NEXT_PUBLIC_WP_API}/wp-json/rae/v1/cart/items`
export const WC_API = `wp-json/wc/v3`
export const WC_AUTH = `?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`