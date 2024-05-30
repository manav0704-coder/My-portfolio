//Import the library into your project
var easyinvoice = require('easyinvoice');
const fs = require('fs')


var data = {
    apiKey: " https://app.budgetinvoice.com/register",
    mode: "development", // Production or development, defaults to production   
    
    // Your own data
    sender: {
        company: "Swadeshi",
        address: "hinjewadi",
        zip: "411033",
        city: "PUNE",
        country: "INDIA"
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
    },
    // Your recipient
    client: {
        company: "MUNNA TASEWALE",
        address: "More waste chikhli",
        zip: "396325",
        city: "Pune",
        country: "INDIA"
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
    },
    information: {
        // Invoice number
        number: "2021.0001",
        // Invoice data
        date: "12-12-2024",
        // Invoice due date
        dueDate: "31-12-2024"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: [
        {
            quantity: 1,
            description: "Boult Eardrop",
            taxRate: 6,
            price: 33.87
        },
        {
            quantity: 2,
            description: "Shirt",
            taxRate: 6,
            price: 12.34
        },
        {
            quantity: 4,
            description: "Acer Laptop",
            taxRate: 21,
            price: 64.45
        }
    ],
    // The message you would like to display on the bottom of your invoice
    bottomNotice: "Kindly pay your invoice within 15 days.",
    // Settings to customize your invoice
    settings: {
        currency: "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // locale: "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        // marginTop: 25, // Defaults to '25'
        // marginRight: 25, // Defaults to '25'
        // marginLeft: 25, // Defaults to '25'
        // marginBottom: 25, // Defaults to '25'
        // format: "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // height: "1000px", // allowed units: mm, cm, in, px
        // width: "500px", // allowed units: mm, cm, in, px
        // orientation: "landscape" // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
        // invoice: "FACTUUR",  // Default to 'INVOICE'
        // number: "Nummer", // Defaults to 'Number'
        // date: "Datum", // Default to 'Date'
        // dueDate: "Verloopdatum", // Defaults to 'Due Date'
        // subtotal: "Subtotaal", // Defaults to 'Subtotal'
        // products: "Producten", // Defaults to 'Products'
        // quantity: "Aantal", // Default to 'Quantity'
        // price: "Prijs", // Defaults to 'Price'
        // productTotal: "Totaal", // Defaults to 'Total'
        // total: "Totaal", // Defaults to 'Total'
        // taxNotation: "btw" // Defaults to 'vat'
    },

    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    // "customize": {
    //      "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    // }
};

//Create your invoice! Easy!
easyinvoice.createInvoice(data, async function (result) {
    //The response will contain a base64 encoded PDF file
    console.log('PDF base64 string: ', result.pdf);

    await fs.writeFileSync("invoice.pdf",result.pdf,'base64');
});