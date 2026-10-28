/*
 * PROJECT DATA
 * ------------------------------------------------------------------
 * Every card in the Portfolio section is generated from this array.
 * To add a project, copy one { ... } block, paste it, and edit it.
 * To remove a project, delete its block. The order here is the order
 * on the page.
 *
 *   title    - project name shown on the card
 *   category - small label above the title (Branding, Poster Design, ...)
 *   client   - optional; leave "" to hide it
 *   image    - path to the image inside assets/images/
 *   alt      - short description of the image for screen readers
 *   driveUrl - Google Drive link for this project. If you leave it as
 *              "PASTE_GOOGLE_DRIVE_LINK_HERE" (or ""), the card shows
 *              "Link coming soon" instead of a clickable button.
 *
 * NOTE: Only one Drive link (the main portfolio folder) has been provided
 * so far, so every project currently points to that folder. Replace each
 * driveUrl with the project's own file/folder link when you have it.
 */

const PORTFOLIO_DRIVE_URL =
  "https://drive.google.com/drive/folders/1VFGQzdBcvAS4JRkp8YRSlMr0mie9z2so";

const projects = [
  {
    title: "Hair Smoothening Offer Standee",
    category: "Print Design",
    client: "Be U Natural Unisex Salon",
    image: "assets/images/hair-smoothening-standee.png",
    alt: "Tall salon standee advertising hair smoothening for ₹1999 and global fashion shade for ₹2499, with an 'As Seen on Shark Tank India' badge",
    driveUrl: PORTFOLIO_DRIVE_URL
  },
  {
    title: "Agami Korean Facial Poster",
    category: "Poster Design",
    client: "Be U Natural Unisex Salon",
    image: "assets/images/korean-facial-poster.png",
    alt: "Green and cream poster for a 10-step Korean facial at ₹999, with an icon for each step",
    driveUrl: PORTFOLIO_DRIVE_URL
  },
  {
    title: "Bridal Make-Up Offer Poster",
    category: "Poster Design",
    client: "Be U Natural Unisex Salon",
    image: "assets/images/bridal-makeup-poster.png",
    alt: "Bridal make-up poster featuring a bride in red and gold, a list of make-up services and a ₹4999 price tag",
    driveUrl: PORTFOLIO_DRIVE_URL
  },
  {
    title: "Karwachauth Campaign (Hindi)",
    category: "Social Media Design",
    client: "Be U Natural Unisex Salon",
    image: "assets/images/karwachauth-hindi-poster.png",
    alt: "Red festive Hindi-language Karwachauth poster with a smiling woman giving a thumbs up and a ₹2999 package badge",
    driveUrl: PORTFOLIO_DRIVE_URL
  },
  {
    title: "Glow Bright Karwachauth Flyer",
    category: "Social Media Design",
    client: "Be U Natural Unisex Salon",
    image: "assets/images/karwachauth-glow-poster.png",
    alt: "Gold-toned Karwachauth night flyer listing beauty services, starting from ₹2499",
    driveUrl: PORTFOLIO_DRIVE_URL
  },
  {
    title: "Karwachauth Special Offer",
    category: "Social Media Design",
    client: "Be U Natural Unisex Salon",
    image: "assets/images/karwachauth-special-offer.png",
    alt: "Karwachauth special offer poster with a woman in traditional jewellery holding a diya, starting from ₹999",
    driveUrl: PORTFOLIO_DRIVE_URL
  },
  {
    title: "Franchise Investment Banner",
    category: "Banner Design",
    client: "Be U Natural Salon",
    image: "assets/images/franchise-banner.jpg",
    alt: "Dark brown and gold landscape banner inviting franchise investment in the Be U Natural salon chain",
    driveUrl: PORTFOLIO_DRIVE_URL
  }
];
