/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { FormDmnValidator } from "../src/FormDmnValidator";
import { formDmnI18n } from "../src/i18n";
import { FormDmnJsonSchemaBridge } from "../src/uniforms";
import type { JSONSchema4 } from "json-schema";

const schema: JSONSchema4 = {
  definitions: {
    InputSet: {
      type: "object",
      properties: {
        name: { type: "string" },
        lastName: { type: "string" },
        daysAndTimeDuration: { format: "days and time duration", type: "string" },
        yearsAndMonthsDuration: { format: "years and months duration", type: "string" },
      },
      required: ["name", "lastName"],
    },
    OutputSet: {
      type: "object",
      properties: {},
    },
  },
};

const i18n = formDmnI18n.getCurrent();

describe("FormDmnValidator Tests", () => {
  it("create instance", () => {
    const dmnValidator = new FormDmnValidator(i18n);
    expect(dmnValidator).toBeInstanceOf(FormDmnValidator);
  });

  describe("create validator", () => {
    it("valid model", () => {
      const model = {
        name: "Kogito",
        lastName: "Tooling",
        daysAndTimeDuration: "P1D",
        yearsAndMonthsDuration: "P1Y",
      };

      const validator = new FormDmnValidator(i18n);
      const validate = validator.createValidator(schema.definitions?.InputSet);
      const errors = validate(model);
      expect(errors).toBeNull();
    });

    it("invalid model - constraint", () => {
      const model = {
        name: "Kogito",
        lastName: "Tooling",
        daysAndTimeDuration: "P1H",
      };

      const validator = new FormDmnValidator(i18n);
      const validate = validator.createValidator(schema.definitions?.InputSet);
      const errors = validate(model);
      expect(errors?.details[0].keyword).toEqual("format");
      expect(errors?.details[0].message).toEqual("should match format P1D(ays)T2H(ours)3M(inutes)1S(econds)");
    });

    it("invalid model - format", () => {
      const model = {
        name: "Kogito",
        lastName: "Tooling",
        yearsAndMonthsDuration: "1M",
      };

      const validator = new FormDmnValidator(i18n);
      const validate = validator.createValidator(schema.definitions?.InputSet);
      const errors = validate(model);
      expect(errors?.details[0].keyword).toEqual("format");
      expect(errors?.details[0].message).toEqual("should match format P1Y(ears)2M(onths)");
    });
  });

  it("get bridge", () => {
    const validator = new FormDmnValidator(i18n);
    const bridge = validator.getBridge(schema);
    expect(bridge).toBeInstanceOf(FormDmnJsonSchemaBridge);
  });
});
