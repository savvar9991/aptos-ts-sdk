// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { AnyNumber, GetObjectDataQueryResponse, OrderByArg, PaginationArgs } from "../types";
import { AccountAddressInput } from "../core";
import { AptosConfig } from "./aptosConfig";
import { ProcessorType } from "../utils";
import { waitForIndexerOnVersion } from "./utils";
import { getObjectData } from "../internal/object";

/**
 * A class to query all `Object` related queries on Aptos.
 */
export class AptosObject {
  constructor(readonly config: AptosConfig) {}

  /**
   * Fetch the object data based on the oabject address
   *
   * @example
   * const object = await aptos.getObjectData({objectAddress:"0x123"})
   *
   * @param args.objectAddress The object address
   * @param args.options Configuration options for waitForTransaction
   *
   * @returns The object data
   */
  async getObjectData(args: {
    objectAddress: AccountAddressInput;
    minimumLedgerVersion?: AnyNumber;
    options?: PaginationArgs & OrderByArg<GetObjectDataQueryResponse[0]>;
  }): Promise<GetObjectDataQueryResponse> {
    await waitForIndexerOnVersion({
      config: this.config,
      minimumLedgerVersion: args.minimumLedgerVersion,
      processorType: ProcessorType.OBJECT_PROCESSOR,
    });
    return getObjectData({
      aptosConfig: this.config,
      ...args,
    });
  }
}
