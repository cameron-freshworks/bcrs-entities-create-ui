// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { store } from '@/store'
import { shallowMount, createLocalVue } from '@vue/test-utils'

// Components
import { Actions } from '@/components/common'

// Mixins
import { LegalApiMixin, FilingTemplateMixin } from '@/mixins'

// Interfaces
import { IncorporationFilingIF } from '@/interfaces'

// Other
import mockRouter from './MockRouter'

Vue.use(Vuetify)
let vuetify = new Vuetify({})

describe('Actions component', () => {
  let wrapper: any
  let filing: IncorporationFilingIF

  const header = {
    name: 'incorporationApplication',
    certifiedBy: 'Mock Full Name',
    email: 'mock@email.com',
    date: '2012/01/29'
  }

  const incorporationApplication = {
    nameRequest: {
      nrNumber: 'NR1234567',
      legalType: 'BC'
    },
    offices: {
      registeredOffice: {
        deliveryAddress: {
          addressCity: 'someCity',
          addressCountry: 'someCountry',
          addressRegion: 'someRegion',
          postalCode: 'somePostalCode',
          streetAddress: 'someStreet'
        },
        mailingAddress: {
          addressCity: 'someCity',
          addressCountry: 'someCountry',
          addressRegion: 'someRegion',
          postalCode: 'somePostalCode',
          streetAddress: 'someStreet'
        }
      },
      recordsOffice: {
        deliveryAddress: {
          addressCity: 'someCity',
          addressCountry: 'someCountry',
          addressRegion: 'someRegion',
          postalCode: 'somePostalCode',
          streetAddress: 'someStreet'
        },
        mailingAddress: {
          addressCity: 'someCity',
          addressCountry: 'someCountry',
          addressRegion: 'someRegion',
          postalCode: 'somePostalCode',
          streetAddress: 'someStreet'
        }
      }
    },
    contactPoint: {
      email: 'mock@email.com',
      phone: '123-245-7891'
    }
  }

  filing = {
    filing: {
      header: header,
      incorporationApplication: incorporationApplication
    }
  }

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.mixin(LegalApiMixin)

    const router = mockRouter.mock()
    wrapper = shallowMount(Actions, { localVue, store, router, vuetify })
  })

  it('Disables File and Pay button when certify from is not valid', () => {
    // verify File and Pay button state
    store.state.stateModel.certifyState = {
      certifyFormValid: false,
      certifiedBy: 'Some Certifier'
    }
    expect(wrapper.find('#file-pay-btn').attributes('disabled')).toBe('true')
  })

  it('Enables File and Pay button when certify from is valid', () => {
    store.state.stateModel.certifyState = {
      certifyFormValid: true,
      certifiedBy: 'Some certifier'
    }
    store.state.stateModel.nameRequest = { entityType: 'BC' }
    store.state.stateModel.defineCompanyStep = {
      valid: true,
      nameRequest: {
        entityType: 'BC'
      }
    }
    // verify File and Pay button state
    expect(wrapper.find('#file-pay-btn').attributes('disabled')).toBeUndefined()
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component properly', () => {
    // FUTURE
  })

  it.only('builds a filing when save is clicked', async () => {
    store.state.stateModel.defineCompanyStep.nameRequest = { nrNumber: 'NR12345', entityType: 'BC', filingId: null }
    store.state.stateModel.certifyState.certifiedBy = 'Mock Full Name'
    store.state.stateModel.certifyState.certifyFormValid = false
    store.state.stateModel.currentDate = '2012/01/29'
    store.state.stateModel.defineCompanyStep.nameRequest = { nrNumber: 'NR1234567', entityType: 'BC' }
    store.state.stateModel.defineCompanyStep.businessContact = { email: 'mock@email.com', phone: '123-245-7891' }
    store.state.stateModel.defineCompanyStep.nameRequest.filingId = null

    expect(wrapper.find('#save-btn').attributes('disabled')).toBeUndefined()

    const button = wrapper.find('#save-btn')
    await button.trigger('click')
    // console.log(button)
    // wrapper.vm.onClickSave()

    // expect(wrapper.vm.onClickSave).toHaveBeenCalled()
  })
})
