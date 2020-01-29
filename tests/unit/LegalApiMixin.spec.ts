// Libraries
import Vue from 'vue'
import sinon from 'sinon'
import axios from '@/utils/axios-auth'
import { store } from '@/store'
import mockRouter from './mockRouter'
import { createLocalVue, mount } from '@vue/test-utils'

import { LegalApiMixin } from '@/mixins'

describe('LegalApiMixin', () => {
  let vm: LegalApiMixin
  let filing: any

  beforeEach(() => {
    vm = new LegalApiMixin()
    const jestStore = store.state.stateModel

    jestStore.defineCompanyStep.nameRequest = { nrNumber: 'NR12345', entityType: 'BC', filingId: null }
    jestStore.certifyState.certifiedBy = 'Mock Full Name'
    jestStore.certifyState.certifyFormValid = false
    jestStore.currentDate = '2012/01/29'
    jestStore.defineCompanyStep.nameRequest = { nrNumber: 'NR1234567', entityType: }

    const header = {
      name: 'incorporationApplication',
      certifiedBy: jestStore.certifyState.certifiedBy,
      email: jestStore.defineCompanyStep.businessContact.email,
      date: jestStore.currentDate
    }

    const incorporation = {
      nameRequest: {
        nrNumber: this.nrNumber,
        legalType: this.legalType
      },
      offices: {
        registeredOffice: this.registeredOffice
      },
      contactPoint: {
        email: this.email,
        phone: this.phone
      }
    }
  })

  afterEach(() => {

  })

  it('does something', () => {
    vm.createFiling()
  })
})
