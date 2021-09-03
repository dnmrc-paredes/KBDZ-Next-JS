import { Iitem, IpayerPaypal } from "../types/types";

export const invoiceData = (products: Iitem[], payer: IpayerPaypal) => {

    return {
        "documentTitle": "KBDZ | RECEIPT", //Defaults to INVOICE
        //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
        "currency": "USD", //See documentation 'Locales and Currency' for more info
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        // "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
        // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
        "sender": {
            "company": "KBDZ",
            "address": "Sample Street 123",
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Samplecountry"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "client": {
               "company": `${payer.name.given_name} ${payer.name.surname}`,
               "address": 'Sample Address',
               "zip": "12345",
               "city": "Sample City",
               "country": "Sample Country"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "invoiceNumber": "2021.0001",
        "invoiceDate": new Date().toLocaleDateString(),
        "products": products.map(item => {
            return {
                "quantity": item.qty.toString(),
                "description": item.id.toString(),
                "tax": 5,
                "price": item.total
            }
        }),
        "bottomNotice": "Thank you for choosing KBDZ, have a great day!",
        //Used for translating the headers to your preferred language
        //Defaults to English. Below example is translated to Dutch
        // "translate": { 
        //     "invoiceNumber": "Factuurnummer",
        //     "invoiceDate": "Factuurdatum",
        //     "products": "Producten", 
        //     "quantity": "Aantal", 
        //     "price": "Prijs",
        //     "subtotal": "Subtotaal",
        //     "total": "Totaal" 
        // }
    };

}