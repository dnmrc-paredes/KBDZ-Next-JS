import { url } from "../../constants/url"

// Types
import { Iitem } from "../../types/types"

export const paymayaBody = (total: number, items: Iitem[]) => {

    return {
      totalAmount: {
          value: total + 30,
          currency: 'PHP',
          details: {
              discount: 0,
              serviceCharge: 10,
              shippingFee: 20,
              tax: 0,
              subtotal: 0
          },
      },
      items: items.map(cartItem => {
          return {
              name: cartItem.id.toString(),
              quantity: cartItem.qty,
              totalAmount: {
                  value: cartItem.total
              }
          }
      }),
      redirectUrl: {
          cancel: `${url}/checkout/payment/status/`,
          failure: `${url}/checkout/payment/status/`,
          success: `${url}/checkout/payment/status/`
      },
      requestReferenceNumber: '000141386713',
      metadata: {}
  }

}