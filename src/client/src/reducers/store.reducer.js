import { handleActions } from 'redux-actions'

import { addItemToCart, receiveBanks, bankSelected, paymentInitiated, paymentLoginCompleted } from '../actions/store.actions'

import _ from 'lodash'

const initialState = { cartItems: [], numItems: 0, banks: [] }

export default handleActions(
    {
        [ addItemToCart ]: ( state, action ) =>
        {
            let cartItems = { ...state }.cartItems

            let index = _.findIndex( cartItems, item => item.id === action.payload.id )

            if ( index === -1 )
            {
                action.payload.qty = 1
                cartItems.push( action.payload )
            }
            else
            {
                cartItems[ index ].qty++
            }

            let numItems = cartItems.reduce( ( v, item ) => v + item.qty, 0 )
            return {
                ...state,
                cartItems,
                numItems: numItems,
                total: cartItems.reduce( ( v, item ) => (parseInt( item.price ) * item.qty) + v, 0 )
            }
        },

        [ receiveBanks ]: ( state, action ) =>
        {
            //banks = action.payload

            return {
                ...state,
                banks: action.payload,
            }
        },

        [bankSelected]: (state, action) => ({
            ...state,
            selectedBank: action.payload
        }),

        [paymentInitiated]: (state, action) => ({
            ...state,
            paymentMethodLoginUrl: action.payload
        }),

        [paymentLoginCompleted]: (state, action) => ({
            ...state,
            paymentMethodLoginUrl: null
        }),

    },
    initialState,
)
