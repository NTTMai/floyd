import FloydSDK from "../../../../src/core/index";
import Vechain from "../../../../src/abstract/dlts/vechain/vechain.dlt";
import { TypeDLT } from '../../../../src/types';

import 'jest-extended';
import VechainProvider from '../../../../src/abstract/dlts/vechain/vechain.provider';

describe("vechain", () => {
  var sdk;
  beforeEach(() => {
    const options = {
      dlts: [{ name: "vechain" }]
    };
    sdk = new FloydSDK(options);
  });

  describe("dlt", () => {
    it("should instantiate vechain as abstracdlt", () => {
      expect(sdk.dlts.vechain).toBeInstanceOf(Vechain);
    });
  })

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = {
        name: "notvechain"
      }
      try {
        new Vechain(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(Error("[Provider] The Provider for this DLT is not present, please add the provider for notvechain manually."));
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = {
        name: "vechain"
      }
      const vechain = new Vechain(sdk, dltOptions);
      expect(vechain.provider).toBeInstanceOf(VechainProvider);
    });
  });
});
