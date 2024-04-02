<template>
  <div id="lessons">
    <div v-for="product in products" :key="product.id">
      <div class="product-card">
        <figure>
          <img v-bind:src="product.image" />
        </figure>
        <h2 v-text="product.subject"></h2>
        <p><strong>Location:</strong> {{ product.location }}</p>
        <p>Price: {{ product.price }}</p>
        <p>Available Spaces: {{ product.availableInventory }}</p>
        <div>
          <span v-for="n in parseInt(product.rating)" :key="n">★</span>
          <span v-for="n in 5 - parseInt(product.rating)" :key="'star_' + n"
            >☆</span
          >
        </div>
        <button v-on:click="addProduct(product)" v-if="canAddToCart(product)">
          Add to cart
        </button>
        <button disabled="disabled" v-else>Add To Cart</button>

        <span v-if="product.availableInventory === cartCount(product.id)"
          >All out!</span
        ><span
          v-else-if="product.availableInventory - cartCount(product.id) < 5"
          >Only
          {{ product.availableInventory - cartCount(product.id) }}
          left!</span
        ><span v-else>Buy now!</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "products-list",
  props: ["products", "cart"],
  data() {},
  methods: {
    addProduct: function (product) {
      this.$emit("addingCart", product);
    },
    cartCount: function (id) {
      return this.cart.filter((itemId) => itemId === id).length;
    },
    canAddToCart: function (product) {
      return product.availableInventory > this.cartCount(product.id);
    },
  },
};
</script>
<style>
</style>