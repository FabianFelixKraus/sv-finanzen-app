const express = require("express")
const router = express.Router()

const Transaction = require("../models/transaction")

//Getting all Transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.json(transactions)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Getting one Transaction
router.get("/:id", getTransaction, (req, res) => {
    res.json(res.transaction)
})
//Creating one Transaction
router.post("/", async (req, res) => {
    const transaction = new Transaction({
        date: req.body.date,
        description: req.body.description,
        statementOfAccountId: req.body.statementOfAccountId,
        isExpense: req.body.isExpense,
        location: req.body.location,
        amount: req.body.amount,
        account: req.body.account,
        taxClass: req.body.taxClass,
        taxGroup: req.body.taxGroup,
        taxRate: req.body.taxRate

    })
    try {
        const newTransaction = await transaction.save()
        res.status(201).json(newTransaction)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Updating one Transaction
router.put("/:id", getTransaction, async (req, res) => {
    
    if (req.body.date != null) {
        res.transaction.date = req.body.date
    }
    if (req.body.description != null) {
        res.transaction.description = req.body.description
    }
    if (req.body.statementOfAccountId != null) {
        res.transaction.statementOfAccountId = req.body.statementOfAccountId
    }
    if (req.body.isExpense != null) {
        res.transaction.isExpense = req.body.isExpense
    }
    if (req.body.location != null) {
        res.transaction.location = req.body.location
    }
    if (req.body.amount != null) {
        res.transaction.amount = req.body.amount
    }
    if (req.body.account != null) {
        res.transaction.account = req.body.account
    }
    if (req.body.taxClass != null) {
        res.transaction.taxClass = req.body.taxClass
    }
    if (req.body.taxGroup != null) {
        res.transaction.taxGroup = req.body.taxGroup
    }
    if (req.body.taxRate != null) {
        res.transaction.taxRate = req.body.taxRate
    }
    try {
        const updatedTransaction = await res.transaction.save()
        res.json(updatedTransaction)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Delete one Transaction
router.delete("/:id", async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findOneAndDelete({_id: req.params.id})
        if (deletedTransaction) {
            res.json({message: "Deleted transaction", transaction: deletedTransaction})
        } else {
            res.status(404).json({message: "Cannot find transaction"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


async function getTransaction(req, res, next) {
    let transaction
    try {
        transaction = await Transaction.findById(req.params.id)
        if (transaction == null) {
            return res.status(404).json({message: "Cannot find transaction"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    console.log(typeof transaction)
    res.transaction = transaction
    console.log(typeof res.transaction)
    next()
}

module.exports = router