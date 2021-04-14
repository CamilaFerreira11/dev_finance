const Modal = {
    open () {
        //abrir modal

       document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

        //adicionar a class active ao modal
    },

    close (){
        //fechar o modal 
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')


        //remover a classe active


    }
}

const transactions = [
    {
        
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'

    },
    {
        
        description: 'Criação de site',
        amount: 500000,
        date: '23/01/2021'

    },
    {
        
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'

    },
    {
        
        description: 'App',
        amount: 700000,
        date: '23/01/2021'

    },
]

const Transaction = {
    all: transactions, /* Refracionando a Transaction */
    add(transaction){

           Transaction.all.push(transaction)

           App.reload()

    },

    remove (index){
        Transaction.all.splice(index, 1)

        App.reload()

    },

    incomes(){  // somar as entradas //maior que 0 // 
        let income = 0;

            Transaction.all.forEach(transaction=> {
                if(transaction.amount > 0 ){
                    income = income + transaction.amount;
                }
            })

        return income;
    },
    expenses(){  // somar as saidas  // menor que 0 //
        let expense = 0;

        Transaction.all.forEach(transaction=> {
            if(transaction.amount < 0 ){
                expense = expense + transaction.amount;
            }
        })

    return expense;
    },

    total(){   // entradas - saidas
        return Transaction.incomes() + Transaction.expenses();
    }

}


// Substituir dados do html com os dados js
const DOM = {
    transactionsContainer: document.querySelector('#data-table'),
    
    addTransaction (transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmlTransaction(transaction)

    console.log(tr.innerHTML)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHtmlTransaction(transaction){ // criação do html dentro do javascript
        const CSSclass = transaction.amount > 0 ? "income": "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `         
                <td class="description">${transaction.description}</td>
                <td class ="${CSSclass}">${amount}</td>
                <td class ="date">${transaction.date}</td>
                <td>
                <img src="./assets/assets/minus.svg" alt="Remover Transação">
                </td>            
        `
        return html
    },

    updateBalance() {
        document.getElementById("incomeDisplay")
                .innerHTML = Utils.formatCurrency (Transaction.incomes())
        document.getElementById("expenseDisplay")
                .innerHTML = Utils.formatCurrency (Transaction.expenses())
        document.getElementById("totalDisplay")
                .innerHTML = Utils.formatCurrency (Transaction.total())
    },


    clearTransactions(){ /*Limpa as transações antes de rodar o init novamente*/

        DOM.transactionsContainer.innerHTML = ''

    }
}


const Utils = { /* Transforma para moeda*/
    formatCurrency(value){
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace (/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString ("pt-BR", {
            style: "currency",
            currency:"BRL"
        })
        return signal + value
    }
}

const App= { /* Define o fluxo para atualizar as transações*/
    init() {
            
        Transaction.all.forEach(transaction => {
            DOM .addTransaction(transaction)
        })

            DOM.updateBalance()

},

    reload () { 
        DOM.clearTransactions()
        App.init()
},

}

App.init()

Transaction.remove(1)


