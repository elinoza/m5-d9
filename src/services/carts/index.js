const express = require("express")
const {  validationResult } = require("express-validator")
const uniqid = require("uniqid")
const { getcarts, writecarts } = require("../lib/cartUtilities")

const cartsRouter = express.Router()

//GET /carts/
cartsRouter.get("/", async (req, res, next) => {
  try {
    const carts = await getcarts()
      res.send(carts)
      server.use("/carts", cartsRouter);
  } catch (error) {
    console.log(error)
    next(error)
  }
})
//GET /carts/{cartId}
cartsRouter.get("/:cartId", async (req, res, next) => {
  try {
    const carts = await getcarts()

    const cartFound = carts.find(
      cart => cart._id === req.params.cartId
    )

    if (cartFound) {
      res.send(cartFound)
    } else {
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
//POST /carts/{cartId}/add-to-cart/{productId}
cartsRouter.post(
  "/:cartId/add-to-cart",
  async (req, res, next) => {
    try {
      const carts = await getcarts()

      const cartIndex = carts.findIndex(
        cart => cart._id === req.params.cartId
      )
      if (cartIndex !== -1) {
        // cart found
        carts[cartIndex].products.push({
          ...req.body,
          _id: uniqid(),
          createdAt: new Date(),
        })
        await writecarts(carts)
        res.status(201).send(carts)
      } else {
        // cart not found
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)
//DELETE /carts/{cartid}/remove-from-cart/{productId}
cartsRouter.delete(
  "/:cartId/remove-from-cart/:productId",
  async (req, res, next) => {
    try {
      const carts = await getcarts()
      const cartIndex = carts.findIndex(
        cart => cart._id === req.params.cartId
      )

      if (cartIndex !== -1) {
        carts[cartIndex].products = carts[cartIndex].products.filter(
          product => product._id !== req.params.productId
        )

        await writecarts(carts)
        res.send(carts)
      } else {
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

module.exports = cartsRouter