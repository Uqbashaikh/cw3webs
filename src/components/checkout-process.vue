<template>
  <div>
    <h1>checkout</h1>
    <p>
      <strong>First Name:</strong>
      <!-- This input field is bound to 'firstName' in the 'order' object -->
      <input v-model.trim="order.firstName" />
    </p>
    <p>
      <strong>Last Name:</strong>
      <!-- This input field is bound to 'lastName' in the 'order' object -->
      <input v-model.trim="order.lastName" />
    </p>
    <p><strong>Address:</strong><input v-model="order.address" /></p>
    <p><strong>City:</strong><input v-model="order.city" /></p>
    <p>
      <strong>Zip/Postal Code:</strong
      ><input v-model.number="order.zip" type="number" />
    </p>

    <p>
      <input
        type="checkbox"
        id="gift"
        value="true"
        v-model="order.gift"
        v-bind:true-value="order.sendGift"
        v-bind:false-value="order.dontSendGift"
      />
      <label for="gift"> Ship As Gift?</label>
    </p>
    <p>
      <input type="radio" id="home" value="Home" v-model="order.method" />
      <label for="home"> Home </label>
      <input
        type="radio"
        id="business"
        value="Business"
        v-model="order.method"
      />
      <label for="business"> Business </label>
    </p>

    <h2>Order Information</h2>
    <p>First Name: {{ order.firstName }}</p>
    <p>Last Name: {{ order.lastName }}</p>
    <p>Address: {{ order.address }}</p>
    <p>City: {{ order.city }}</p>
    <p>Zip: {{ order.zip }}</p>
    <p>Method: {{ order.method }}</p>
    <p>Gift: {{ order.gift }}</p>
    <button v-on:click="submittingform">Place Order</button>
  </div>
</template>
<script>
export default {
  name: "checkout-process",
  props: [],
  data() {
    return {
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
      isFormValid: false,
    };
  },
  methods: {
    updateFormValidity: function () {
      this.isFormValid =
        this.order.firstName.trim() !== "" &&
        this.order.lastName.trim() !== "" &&
        this.order.address.trim() !== "" &&
        this.order.city.trim() !== "" &&
        this.order.zip !== "" &&
        this.order.method.trim() !== "";
    },
    submittingform: function () {
      this.updateFormValidity(); // Call the method to update form validity
      if (this.isFormValid) {
        alert("Order submitted!");
      } else {
        alert("Please fill in all required fields.");
      }
    },
  },
};
</script>