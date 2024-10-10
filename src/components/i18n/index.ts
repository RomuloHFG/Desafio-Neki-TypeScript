import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import ptbr from './locales/pt-br/pt-br.json'
import enus from './locales/en/en-us.json'
import { useState } from 'react'



const resources = {
    'pt-br' : ptbr,
    'en-us' : enus
}



i18n
.use(initReactI18next)
.init({
    resources: {
        en: {...enus},
        pt: {...ptbr}
    },
    lng: 'pt',
    interpolation: {
        escapeValue:false,
    }

})

export default i18n;

