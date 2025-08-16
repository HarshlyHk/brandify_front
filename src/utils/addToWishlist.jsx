export function addToWishlist(item) {
  const stored = localStorage.getItem("wishlist");
  let wishlist = [];
  if (stored) {
    try {
      wishlist = JSON.parse(stored);
    } catch {
      wishlist = [];
    }
  }
  // Remove product without size if adding with size
  if (item.size) {
    wishlist = wishlist.filter(
      (i) => !(i.productId === item.productId && (!i.size || i.size === ""))
    );
  }
  // Prevent duplicates by productId and size
  const exists = wishlist.some(
    (i) => i.productId === item.productId && i.size === item.size
  );
  if (!exists) {
    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}
