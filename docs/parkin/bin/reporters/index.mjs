import {
  emptyObj
} from "../../chunk-GN2YQI35.mjs";

// src/bin/reporters/cli/cli.ts
import { Logger as Logger2 } from "@keg-hub/cli-utils";

// src/bin/reporters/cli/formatters.ts
import { Logger } from "@keg-hub/cli-utils";
var Clrs = Logger.colors;
var FailTag = `${Clrs.colorMap.red}\u2718`;
var PassTag = `${Clrs.colorMap.green}\u2714`;
var WarnTag = `${Clrs.colorMap.yellow}\u25CB`;
var FPassTag = `\x1B[42m\x1B[30m PASS \x1B[0m`;
var FFailTag = `\x1B[41m\x1B[30m FAIL \x1B[0m`;
var FWarnTag = `\x1B[43m\x1B[30m WARN \x1B[0m`;
var Tags = {
  root: {
    fail: FFailTag,
    pass: FPassTag,
    warn: FWarnTag
  },
  child: {
    fail: FailTag,
    pass: PassTag,
    warn: WarnTag
  }
};
var DimText = (text) => `${Clrs.colorMap.dim}${text}`;
var ColorMap = {
  Feature: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.yellow
  },
  Rule: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.blue
  },
  Parent: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.magenta
  },
  Step: {
    text: Clrs.colorMap.gray,
    type: Clrs.colorMap.cyan
  },
  Error: {
    text: Clrs.colorMap.white,
    type: Clrs.colorMap.red
  }
};
var FormatLine = (args) => {
  const {
    type,
    text,
    failed,
    isParent,
    isFailed,
    isFeature
  } = args;
  const sep = isParent ? ` ${Clrs.colorMap.white}> ` : ` `;
  const [PTag, FTag, WTag] = isFeature ? [FPassTag, FFailTag, FWarnTag] : [PassTag, FailTag, WarnTag];
  const tag = !failed ? PTag : isFailed ? FTag : WTag;
  const colorType = ColorMap[type];
  const colors = failed && isFailed ? ColorMap.Error : colorType ? colorType : isParent ? ColorMap.Parent : ColorMap.Step;
  const line = `${tag} ${colors.type}${type}${sep}${colors.text}${text}${Clrs.colorMap.reset}`;
  return isFailed || !failed ? line : DimText(line);
};
var FormatParent = (text, failed, isFailed) => {
  const [first, description] = text.split(`>`);
  const type = first.trim();
  const isFeature = type.startsWith(`Feature`);
  const line = FormatLine({
    type,
    failed,
    isFailed,
    isParent: true,
    isFeature: type.startsWith(`Feature`),
    text: (description || ``)?.trim?.()
  });
  return isFeature ? `
${line}
` : `  ${line}
`;
};
var FormatChild = (text, failed, isFailed) => {
  const [type, ...rest] = text.split(` `);
  const line = FormatLine({
    failed,
    isFailed,
    isParent: false,
    type: type.trim(),
    text: (rest.join(` `) || ``)?.trim?.()
  });
  return `    ${line}
`;
};
var FormatError = (failed) => {
  const output = [];
  const space = `      `;
  const { fullName, description, error } = failed;
  const message = error ? error.stack : `${fullName}
${description}`;
  const [first, ...lines] = message.split(`
`);
  output.push(`
${space}${Clrs.red(first)}
`);
  output.push(Clrs.white(lines.map((line) => `${space}${line}`).join(`
`)));
  output.push(`

`);
  return output.join(``);
};
var FormatErrors = (failedExps) => {
  return failedExps.map((failed) => FormatError(failed)).join(``);
};
var Format = (text, failed, isFailed) => {
  return text.includes(`>`) ? FormatParent(text, failed, isFailed) : FormatChild(text, failed, isFailed);
};

// src/bin/reporters/cli/cli.ts
var FailText = (text) => `${Logger2.colors.red(`\u2718`)} ${Logger2.colors.gray(`-`)} ${text}`;
var PassText = (text) => `${Logger2.colors.green(`\u2714`)} ${Logger2.colors.gray(`-`)} ${text}`;
var printResult = (results, opts = emptyObj) => {
  const {
    errorOnly,
    failedOnly,
    steps = true,
    features = true,
    stepParents = true,
    exitWithError,
    throwOnFailed
  } = opts;
  let hasFailed;
  const output = [];
  results.forEach((result) => {
    if ((failedOnly || errorOnly) && result.passed)
      return;
    if (!hasFailed && result.failed)
      hasFailed = result.failed;
    if (features && (!errorOnly || !result.passed))
      output.push(FormatParent(result.fullName, result.failed, result.failed));
    result.describes.forEach((describe) => {
      if ((failedOnly || errorOnly) && describe.passed)
        return;
      if (stepParents && (!errorOnly || !describe.passed))
        output.push(FormatParent(describe.description, result.failed, describe.failed));
      describe.tests.forEach((test) => {
        if ((failedOnly || errorOnly) && test.passed)
          return;
        if (steps || !test.passed)
          output.push(FormatChild(test.description, result.failed, test.failed));
        test.failed && output.push(FormatErrors(test.failedExpectations));
      });
    });
  });
  if (!hasFailed) {
    if (!exitWithError)
      return output.length && Logger2.log(output.join(``));
    output.length && Logger2.log(output.join(``));
    Logger2.empty();
    Logger2.log(PassText(`All features ${Logger2.colors.green(`passed`)}
`));
    process.exit(0);
  }
  if (exitWithError) {
    output.length && Logger2.log(output.join(``));
    Logger2.empty();
    Logger2.log(FailText(`One or more Features ${Logger2.colors.red(`failed`)}
`));
    Logger2.empty();
    process.exit(1);
  }
  output.length && Logger2.log(output.join(``));
  if (throwOnFailed)
    throw new Error(`One or more Features failed`);
};
var CLIReporter = {
  tags: Tags,
  fail: FailText,
  pass: PassText,
  results: printResult,
  format: {
    format: Format,
    line: FormatLine,
    error: FormatError,
    child: FormatChild,
    parent: FormatParent,
    errors: FormatErrors
  }
};
export {
  CLIReporter
};
//# sourceMappingURL=index.mjs.map