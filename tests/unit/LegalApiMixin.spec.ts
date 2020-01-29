// Libraries
import Vue from 'vue'
import sinon from 'sinon'
import axios from '@/utils/axios-auth'
import { store } from '@/store'
import mockRouter from './mockRouter'
import { createLocalVue, mount } from '@vue/test-utils'

import { LegalApiMixin } from '@/mixins'
import any = jasmine.any;

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
    jestStore.defineCompanyStep.nameRequest = { nrNumber: 'NR1234567', entityType: 'BC' }
    jestStore.defineCompanyStep.businessContact = { email: 'mock@email.com', phone: '123-245-7891' }
    jestStore.defineCompanyStep.nameRequest.filingId = null

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
  })

  afterEach(() => {

  })

  it('does something', () => {
    // vm.createFiling(filing)

    // mock "save and file" endpoint
    // sinon.stub(axios, 'post').withArgs('').returns(new Promise(resolve => resolve(filing)))
  })

  it('calls create filing when there is no filingId', () => {
    vm.saveFiling(filing, true)

    expect(vm.saveFiling).toHaveBeenCalled()
  })
})
