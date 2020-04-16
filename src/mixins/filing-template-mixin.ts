// Libraries
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'

// Interfaces
import { ActionBindingIF, StateModelIF, IncorporationFilingIF, GetterIF, OrgPersonIF } from '@/interfaces'

// Constants
import { INCORPORATION_APPLICATION } from '@/constants'

/**
 * Mixin that provides the integration with the legal api.
 */
@Component
export default class FilingTemplateMixin extends Vue {
  // Global state
  @State stateModel!: StateModelIF

  // Global Getters
  @Getter isTypeBcomp!: GetterIF

  // Global actions
  @Action setEntityType!: ActionBindingIF
  @Action setBusinessContact!: ActionBindingIF
  @Action setOfficeAddresses!: ActionBindingIF
  @Action setDefineCompanyStepValidity!: ActionBindingIF
  @Action setNameRequestState!: ActionBindingIF
  @Action setOrgPersonList!: ActionBindingIF
  @Action setFilingId!: ActionBindingIF
  @Action setCertifyState!: ActionBindingIF
  @Action setShareClasses!: ActionBindingIF

  /**
   * Method to construct a filing body when making an api request
   */
  buildFiling (): IncorporationFilingIF {
    return {
      filing: {
        header: {
          name: INCORPORATION_APPLICATION,
          certifiedBy: this.stateModel.certifyState.certifiedBy,
          email: this.stateModel.defineCompanyStep.businessContact.email,
          date: this.stateModel.currentDate
        },
        incorporationApplication: {
          nameRequest: {
            nrNumber: this.stateModel.nameRequest.nrNumber,
            legalType: this.stateModel.nameRequest.entityType
          },
          offices: this.stateModel.defineCompanyStep.officeAddresses,
          contactPoint: {
            email: this.stateModel.defineCompanyStep.businessContact.email,
            phone: this.stateModel.defineCompanyStep.businessContact.phone,
            extension: this.stateModel.defineCompanyStep.businessContact.extension
          },
          parties: this.stateModel.addPeopleAndRoleStep.orgPeople,
          shareClasses: this.stateModel.createShareStructureStep.shareClasses
        }
      }
    }
  }

  /**
   * Method to parse a received draft filing into the store
   * @param draftFiling The draft filing body to be parsed and assigned to store
   */
  parseDraft (draftFiling: any): void {
    try {
      // Set Office Addresses
      this.setOfficeAddresses(draftFiling.incorporationApplication.offices)

      // Set Contact Info
      const draftContact = {
        ...draftFiling.incorporationApplication.contactPoint,
        confirmEmail: draftFiling.incorporationApplication.contactPoint.email
      }
      this.setBusinessContact(draftContact)

      // Set Persons and Organizations
      this.setOrgPersonList(draftFiling.incorporationApplication.parties)

      // Set Share Structure
      this.setShareClasses(draftFiling.incorporationApplication.shareClasses)

      // Set Certified By
      this.setCertifyState({
        certifyFormValid: false, // always override this
        certifiedBy: draftFiling.header.certifiedBy
      })
    } catch (e) {
      // TODO: Throw a flag to the ui from here, if we want to trigger error handling in ui
    }
  }
}
