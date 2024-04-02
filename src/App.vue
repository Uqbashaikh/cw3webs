<template>
  <div id="app">
    <header>
      <h1 v-text="sitename"></h1>
      <button v-on:click="showCheckout">
        {{ checkoutButtonText }}
        <span class="fas fa-cart-plus"></span>
      </button>
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="sortCriteria" @change="sortProducts">
        <option value="default">Default</option>
        <option value="location">Location</option>
        <option value="title">Title</option>
        <option value="price">Price</option>
      </select>
      <div class="search-container">
        <label for="search">Search:</label>
        <input
          type="text"
          id="search"
          v-model="searchQuery"
          @input="performSearch"
        />
        <button @click="clearSearch">Clear</button>
      </div>
    </header>
    <main>
      <product-list
        v-if="showProduct"
        :products="products"
        @addingCart="addToCart"
        :cart="cart"
      >
      </product-list>
      <checkout v-else :products="products" :cart="cart"> </checkout>
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import productList from "./components/products-list.vue";
import checkout from "./components/checkout-process.vue";

export default {
  name: "App",
  components: {
    productList,
    checkout,
  },
  data() {
    return {
      sitename: "asus study mania",
      showProduct: true,
      products: [],
      isFormValid: false,

      cart: [],
      sortCriteria: "default",
      searchQuery: "",
      originalProducts: [],
      order: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        gift: false,
        sendGift: true,
        dontSendGift: false,
        method: "",
      },
    };
  },
  methods: {
    displayProducts() {},
    addToCart: function (product) {
      if (product.availableInventory > 0) {
        this.cart.push(product.id);
      }
    },
    // updateFormValidity: function () {
    //   this.isFormValid =
    //     this.order.firstName.trim() !== "" &&
    //     this.order.lastName.trim() !== "" &&
    //     this.order.address.trim() !== "" &&
    //     this.order.city.trim() !== "" &&
    //     this.order.zip !== "" &&
    //     this.order.method.trim() !== "";
    // },
    sortProducts: function () {
      switch (this.sortCriteria) {
        case "location":
          this.sortByLocation();
          break;
        case "title":
          this.sortByTitle();
          break;
        case "price":
          this.sortByPrice();
          break;
        default:
          // Default sorting (you can implement your default sorting logic)
          break;
      }
    },
    sortByLocation: function () {
      this.products.sort((a, b) => {
        return a.location.localeCompare(b.location);
      });
    },
    sortByTitle: function () {
      this.products.sort((a, b) => {
        return a.subject.localeCompare(b.subject);
      });
    },
    sortByPrice: function () {
      this.products.sort((a, b) => {
        return a.price - b.price;
      });
    },
    performSearch: function () {
      if (this.searchQuery.trim() === "") {
        this.products = this.originalProducts.slice();
      } else {
        const query = this.searchQuery.toLowerCase();
        this.products = this.originalProducts.filter((product) => {
          return (
            product.subject.toLowerCase().includes(query) ||
            product.location.toLowerCase().includes(query) ||
            product.price.toString().includes(query)
          );
        });
      }
    },
    clearSearch: function () {
      this.searchQuery = "";
      this.products = this.originalProducts.slice();
    },
    showCheckout: function () {
      this.showProduct = !this.showProduct;
    },
    // submitform: function () {
    //   this.updateFormValidity(); // Call the method to update form validity
    //   if (this.isFormValid) {
    //     alert("Order submitted!");
    //   } else {
    //     alert("Please fill in all required fields.");
    //   }
    // },
    // cartCount: function (id) {
    //   return this.cart.filter((itemId) => itemId === id).length;
    // },
    // canAddToCart: function (product) {
    //   return product.availableInventory > this.cartCount(product.id);
    // },
  },
  computed: {
    cartItemCount: function () {
      return this.cart.length || "";
    },
    checkoutButtonText: function () {
      return this.showProduct
        ? `${this.cartItemCount} Checkout`
        : "Back to Products";
    },
  },
  created: function () {
    let webstore = this;
    //showing
    console.log("requesting data from server ...");

    fetch("http://localhost:3000/collection/lessons").then(function (response) {
      response.json().then(function (json) {
        // save the returned JSON object to
        // "product" data property
        // connect data with back end
        webstore.products = json;
        console.log(json);
      });
    });
  },
  mounted: function () {
    this.originalProducts = this.products.slice();
  },
};
</script>

<style>
/* Product Card Styles */
.product-card {
  width: 100%;
  /* Take full width */
  max-width: 300px;
  border: 1px solid #ddd;
  background-color: #d9534f;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-card figure {
  margin: 0;
  overflow: hidden;
}

.product-card img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  /* Add a border between image and details */
}

.product-details {
  padding: 15px;
}

.product-details h2 {
  font-size: 1.2em;
  margin: 0;
  color: #333;
}

.product-details p {
  color: #666;
  margin: 10px 0;
}

.product-details strong {
  color: #333;
}

.product-rating {
  margin-top: 10px;
}

.product-rating span {
  color: #ffc107;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.product-actions button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.product-inventory {
  margin-top: 10px;
}

.product-inventory span {
  color: #d9534f;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-card {
    max-width: 100%;
  }
}
</style>
